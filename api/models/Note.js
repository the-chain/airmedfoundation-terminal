/**
 * Block.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
  
        hash: {
            type: 'string',
            required: true,
            unique: true,
        },
        note: {
            type: 'string',
            required: true,
        }

    }
  
};
  
  