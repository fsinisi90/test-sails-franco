module.exports = {


  friendlyName: 'Register printer',


  description: 'Register a printer in Cloud Factory through WebSockets.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
    }

  },


  fn: async function (inputs, exits) {

    const ws = new sails.WebSocket('wss://techlab-staging-pr-275.herokuapp.com/cable');

    ws.on('open', function open() {
      console.log('open');
       
      const msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
        channel: 'CloudFactory::ServicesChannel',
        }),
      };

      let times = new Date().getTime();
      
      ws.send(JSON.stringify(msg));
      
      setTimeout(function() {
        const msg = {
          command: 'message',
          identifier: JSON.stringify({
          channel: 'CloudFactory::ServicesChannel',
          }),
          data: JSON.stringify({
          action: 'register',
          printer_name: 'FrancoPrinter' + times,
          printer_model: 'Prusa MK3',
          factory_name: 'Factory1'
          }),
        };
        
        ws.send(JSON.stringify(msg));
      }, 3000);
      
      setTimeout(function() {
        const msg = {
          command: 'message',
          identifier: JSON.stringify({
          channel: 'CloudFactory::ServicesChannel',
          }),
          data: JSON.stringify({
          action: 'update_status',
          printer_name: 'FrancoPrinter' + times,
          status: 'ready'
          }),
        };
        
        ws.send(JSON.stringify(msg));
      }, 6000);
    });

    ws.on('message', function incoming(data) {
      console.log(data);
    });

    return exits.success();

  }


};
