module.exports = {


  friendlyName: 'Create a printer',


  description: 'Save a printer to the DB.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
    }

  },


  fn: async function (inputs, exits) {

    await Printer.create({
	  name: sails.faker.name.findName() + '\'s printer',
	  model: "Prusa MK3",
	  owner: this.req.me.id
	});

    //return exits.success();

  }


};
