module.exports = {

  friendlyName: 'Search',

  description: 'Search Blockchain Explorer.',

  inputs: {
    data: {
      type: 'string'
    }
  },

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'explorer/no-results'
    },
  },


  fn: async function (inputs, exits) {

    if (inputs.data.length == 64) {
      let block = await Block.findOne({ hash: inputs.data });
      
      if (!block) {
        let transaction = await Transaction.findOne({ id: inputs.data });
        
        if (!transaction) {
          return exits.success();
        } else {
          this.res.redirect('/explorer/transaction/' + inputs.data);
          return;
        }

      } else {
        this.res.redirect('/explorer/block/' + (block.id - 1));
        return;
      }

    } else {
      let result, transactions;
      
      result = await sails.sendNativeQuery('SELECT * FROM transaction cross join json_array_elements_text("imputsArgs") where value in ($1)', [ inputs.data ]);
      transactions = result.rows;

      if (transactions.length == 0) {
        let newData = String(parseInt(inputs.data));
        let result = newData.localeCompare(inputs.data);
        if(result == 0) {
          let block = await Block.findOne({ id: (parseInt(inputs.data) + 1) });
          if (!block) {
            return exits.success();
          } else {
            this.res.redirect('/explorer/block/' + (block.id - 1));
            return;
          }
        } else {
          return exits.success();
        }
      }

      this.res.redirect('/explorer/address/' + inputs.data);
      return;

    }

  }

};