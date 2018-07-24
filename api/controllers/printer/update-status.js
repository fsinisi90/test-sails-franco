module.exports = {

  friendlyName: 'Update status',

  description: 'Update the status of a printer.',

  inputs: {
    id: {
      type: 'number'
    },
    status: {
      type: 'string'
    }
  },

  fn: async function (inputs, exits) {
    const ws = new sails.WebSocket('wss://techlab-staging-pr-275.herokuapp.com/cable');
    let printer = await Printer.findOne(inputs.id);

    ws.on('open', function open() {
      console.log('ws connection open');
       
      let msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
        channel: 'CloudFactory::ServicesChannel',
        }),
      };

      ws.send(JSON.stringify(msg));
      
      setTimeout(function() {

        let msg2 = {
          command: 'message',
          identifier: JSON.stringify({
          channel: 'CloudFactory::ServicesChannel',
          }),
          data: JSON.stringify({
          action: 'update_status',
          printer_name: printer.name,
          status: inputs.status
          }),
        };
        
        ws.send(JSON.stringify(msg2));
        
      }, 500);
    });

    ws.on('message', function incoming(data) {
      console.log(data);
    });

    return 1;
  }


};
