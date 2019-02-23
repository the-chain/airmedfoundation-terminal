var moment = require('moment');

module.exports = {

    friendlyName: 'Charts',
  
    description: 'Blockchain explorer Charts',

    exits: {
      notFound: {
        responseType: 'not-found',
        description: 'No se encontraron los datos.'
      },
    },
  
    fn: async function (inputs, exits) {
      let labels, today, transactions, blocks;

      labels = [];
      transactions = [];
      blocks = []

      for(let i = 4; i - 1 > -1; i--) {
        day1 = moment().subtract(i, 'days').format('MM/DD/YYYY');
        day2 = moment().subtract(i - 1, 'days').format('MM/DD/YYYY');
        time1 = new Date(day1).getTime();
        time2 = new Date(day2).getTime();
        labels.push(day1);
        transactions.push(await Transaction.count({ and: [ { timestamp: { '>=': time1 } }, {timestamp: { '<': time2 } } ] }));
        blocks.push(await Block.count({ and: [ { timestamp: { '>=': time1 } }, {timestamp: { '<': time2 } } ] }));
      }
      
      today = moment().subtract(0, 'days').format('MM/DD/YYYY')
      labels.push(today);
      transactions.push(await Transaction.count({ timestamp: { '>=': new Date(today).getTime() } }));
      blocks.push(await Block.count({ timestamp: { '>=': new Date(today).getTime() } }));
      
      if (transactions.length == 0) throw 'notFound';
  
      return exits.success({
        labels: labels,
        dataTx: transactions,
        dataBlocks: blocks
      });
  
    }
  
  };