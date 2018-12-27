/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

    // var path = require('path');

    // var HARD_CODED_DATA_VERSION = 0;

    // var bootstrapLastRunInfoPath = path.resolve(sails.config.appPath, '.tmp/bootstrap-version.json');
  
    // if (sails.config.models.migrate !== 'drop' && sails.config.environment !== 'test') {
    //   if (process.env.NODE_ENV==='production' || sails.config.models.migrate === 'safe') {
    //     sails.log.warn('Since we are running with migrate: \'safe\' and/or NODE_ENV=production (in the "'+sails.config.environment+'" Sails environment, to be precise), skipping the rest of the bootstrap to avoid data loss...');
    //     return done();
    //   }
    //   var lastRunBootstrapInfo = await sails.helpers.fs.readJson(bootstrapLastRunInfoPath)
    //   .tolerate('doesNotExist');
  
    //   if (lastRunBootstrapInfo && lastRunBootstrapInfo.lastRunVersion === HARD_CODED_DATA_VERSION) {
    //     sails.log('Skipping v'+HARD_CODED_DATA_VERSION+' bootstrap script...  (because it\'s already been run)');
    //     sails.log('(last run on this computer: @ '+(new Date(lastRunBootstrapInfo.lastRunAt))+')');
    //     return done();
    //   }
  
    //   sails.log('Running v'+HARD_CODED_DATA_VERSION+' bootstrap script...  ('+(lastRunBootstrapInfo ? 'before this, the last time the bootstrap ran on this computer was for v'+lastRunBootstrapInfo.lastRunVersion+' @ '+(new Date(lastRunBootstrapInfo.lastRunAt)) : 'looks like this is the first time the bootstrap has run on this computer')+')');
    // }
    // else {
    //   sails.log('Running bootstrap script because it was forced...  (either `--drop` or `--environment=test` was used)');
    // }
  
    // for (let identity in sails.models) {
    //   await sails.models[identity].destroy({});
    // }

    // await User.createEach([
    //   { emailAddress: 'admin@example.com', fullName: 'Ryan Dahl', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('abc123') },
    // ]);
  
    // await sails.helpers.fs.writeJson.with({
    //   destination: bootstrapLastRunInfoPath,
    //   json: {
    //     lastRunVersion: HARD_CODED_DATA_VERSION,
    //     lastRunAt: Date.now()
    //   },
    //   force: true
    // })
    // .tolerate((err)=>{
    //   sails.log.warn('For some reason, could not write bootstrap version .json file.  This could be a result of a problem with your configured paths, or, if you are in production, a limitation of your hosting provider related to `pwd`.  As a workaround, try updating app.js to explicitly pass in `appPath: __dirname` instead of relying on `chdir`.  Current sails.config.appPath: `'+sails.config.appPath+'`.  Full error details: '+err.stack+'\n\n(Proceeding anyway this time...)');
    // });

    return done();

};
