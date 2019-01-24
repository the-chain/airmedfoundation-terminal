module.exports = {

  friendlyName: 'Get files',

  description: 'Get all files related with a public key',

  inputs: {
    publicKey: {
      type: 'string'
    },
  },

  exits: {
    invalid: {
      responseType: 'bad-combo',
      description: 'Los parámetros proporcionados son inválidos.'
    }
  },

  fn: async function (inputs, exits) {
    // If one of required parameters is missing
    if(!inputs.publicKey)
      return exits.invalid();

    return exits.success(
    { 
        success: true,
        userSender: {
            hashSet: [ { to: 'LUqZ7NA6PcQpG/YbIW1k7NfSKoPIC8dO+FZbTQKNMks=', hash: 'QmWmyoMoctfbAaiEs2G46gpeUmhqFRDW6KWo64y5r581Vz' } ], 
            hashReceived:[ { from: 'LUqZ7NA6PcQpG/YbIW1k7NfSKoPIC8dO+FZbTQKNMks=', hash: 'QmWmyoMoctfbAaiEs2G46gpeUmhqFRDW6KWo64y5r581Vz' } ] 
        }
    });

  }

};