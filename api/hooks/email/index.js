var nodemailer = require('nodemailer');
var htmlToText = require('nodemailer-html-to-text').htmlToText;
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');
var async = require('async');
var _ = require('lodash');
var smtpPool = require('nodemailer-smtp-pool');

/**
 * @hook
 * @description Sails hook email
 */
module.exports = function Email(sails) {
  var transport;
  var self;

  var compileTemplate = function (view, data, cb) {
    // Use Sails View Hook if available
    if (sails.hooks.views && sails.hooks.views.render) {
      var relPath = path.relative(sails.config.paths.views, view);
      sails.hooks.views.render(relPath, data, cb);
      return;
    }
    // No Sails View hook, fallback to ejs
    fs.readFile(view + '.ejs', function (err, source) {
      if (err) return cb(err);

      try {
        var compileFn = ejs.compile((source || "").toString(), {
          cache: true, filename: view
        });

        cb(null, compileFn(data));
      } catch (e) {
        return cb(e);
      }
    });
  };
  // Public functions
  return {
    /**
     * Default configuration
     * @type {Object}
     */
    defaults: {
      __configKey__: {
        service: 'Gmail',
        auth: {
          user: 'myemailaddress@gmail.com',
          pass: 'mypassword'
        },
        templateDir: path.resolve(sails.config.appPath, 'views/emailTemplates'),
        from: 'noreply@hydra.com'
      }
    },
    /**
     * Ensure we have the full path, relative to app directory
     */
    configure: function () {
      sails.config[this.configKey].templateDir = path.resolve(sails.config.appPath, sails.config[this.configKey].templateDir);
    },
    /**
     * @param  {Function} cb
     */
    initialize: function (cb) {
      self =  this;
      try {
        if (sails.config[self.configKey].transporter) {
          // If custom transporter is set, use that first
          transport = nodemailer.createTransport(sails.config[self.configKey].transporter);
        } else {
          // create reusable transport method (opens pool of SMTP connections)
          transport = nodemailer.createTransport(smtpPool({
            service: sails.config[self.configKey].service,
            auth: sails.config[self.configKey].auth
          }));
        }
        // Auto generate text
        transport.use('compile', htmlToText());
        return cb();
      } catch (e) {
        return cb(e);
      }
    },

  /**
     * Send an email.
     * @param  {Sting}    template (a named template to render)
     * @param  {Object}   data (data to pass into the template)
     * @param  {Object}   options (email options including to, from, etc)
     * @param  {Function} cb
     */

    send:  function (template, data, options, cb) {
      try {
        data = data || {};
        // Turn off layouts by default
        if (typeof data.layout === 'undefined') data.layout = false;
        var templateDir = sails.config[self.configKey].templateDir;
        var templatePath = path.join(templateDir, template);
        // Set some default options
        var defaultOptions = {
          from: sails.config[self.configKey].from
        };
      }catch(err){
        cb(err);
      }
      sails.log.verbose('EMAILING:', options);
      var Text, Html;
      var compileText = async function() {
        compileTemplate(templatePath + "/html", data, function(err,text){
          Text = text;
        });
      }
      var compileHtml = async function (){
        compileTemplate(templatePath + "/text", data, function (err, html) {
          Html = html;
        });
      }

      var sendEmail = async function () {
        try{
          await compileHtml();
          await compileText();
          resultHtml = Text;
          resultText = Html;
          defaultOptions.html = resultHtml;
          if (resultText) defaultOptions.text = resultText;
          var mailOptions = _.defaults(options, defaultOptions);
          mailOptions.to = sails.config[self.configKey].alwaysSendTo || mailOptions.to;
          transport.sendMail(mailOptions, function(err,data){
            if (err)
              cb(err);
            cb(undefined);
          });
        }catch(err){
          cb(err);
        }
      }
      sendEmail();
    }

  };
}