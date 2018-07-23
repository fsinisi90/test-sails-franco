module.exports = {


  friendlyName: 'Register printer',


  description: 'Register a printer in Cloud Factory through WebSockets.',

  inputs: {

    id: {
      type: 'number'
    }

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/printer/list'
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
          action: 'register',
          printer_name: printer.name,
          printer_model: printer.model,
          factory_name: 'Factory1'
          }),
        };
        
        ws.send(JSON.stringify(msg2));
        
      }, 500);
     /* 
        const msg = {
          command: 'message',
          identifier: JSON.stringify({
          channel: 'CloudFactory::ServicesChannel',
          }),
          data: JSON.stringify({
          action: 'update_status',
          printer_name: printer.name,
          status: 'ready'
          }),
        };
        
        ws.send(JSON.stringify(msg));*/
    });

    ws.on('message', function incoming(data) {
      console.log(data);
    });

    return 1;
  }


};
