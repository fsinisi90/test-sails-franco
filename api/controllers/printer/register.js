module.exports = {

    friendlyName: 'Register printer',

    description: 'Register a printer in Cloud Factory through WebSockets.',

    inputs: {
        token: {
            type: 'string'
        }
    },

    fn: async function (inputs, exits) {
        let ws = new sails.WebSocket(sails.config.custom.cloudFactoryWS);
        let _this = this;

        ws.on('open', function open() {
            console.log('WebSocket connection opened.');

            let subscribe = {
                command: 'subscribe',
                identifier: JSON.stringify({
                    channel: 'CloudFactoryChannel',
                }),
            };

            ws.send(JSON.stringify(subscribe));
        });

        ws.on('message', function incoming(data) {
            console.log(data);
            let message = JSON.parse(data);
            if (message.type == 'welcome') {
                let register = {
                    command: 'message',
                    identifier: JSON.stringify({
                        channel: 'CloudFactoryChannel',
                    }),
                    data: JSON.stringify({
                        action: 'register',
                        email: _this.req.me.emailAddress,
                        token: inputs.token
                    }),
                };

                ws.send(JSON.stringify(register));
            }
        });
    }

};