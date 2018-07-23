module.exports = {


  friendlyName: 'List printers',


  description: 'List all printers.',


  exits: {

    success: {
      viewTemplatePath: 'pages/printer/list',
    }

  },


  fn: async function (inputs, exits) {

    let printers = await Printer.find();

    return exits.success({ printers: printers });

  }


};
