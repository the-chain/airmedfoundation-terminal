module.exports = {

  friendlyName: 'Recovery',

  description: 'Recovery identity.',

  inputs: {
    privateKey: {
      type: 'string'
    }
  },

  exits: {
    invalid: {
      responseType: 'bad-combo',
      description: 'Los parámetros proporcionados son inválidos.'
    },
  },

  fn: async function (inputs, exits) {
    // If one of required parameters is missing
    if(!inputs.privateKey)
      return exits.invalid();
    
    return exits.success({
      success: true, 
      message: 'Successful recovery, your public key is the following',
      publicKey: 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUh3d0RRWUpLb1pJaHZjTkFRRUJCUUFEYXdBd2FBSmhBTDdwUmJVUThnNHM5T09iSUtYTkxhWkhlMTFGU2luYwovVkZjVUZnaDBRRHVpS3Z6NjcrU1dTS2E5eWtxV2tSbzhURTVoSmkzNWF6Yk9KVzZKZEg3blkrR1VVby9uSU9jCkpGOHppUVZoeXpGUXFhamh6MjBZWkJ4dXdCZ1FWTDluZndJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg=='
    });

  }

};
