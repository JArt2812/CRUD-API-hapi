// Create a CRUD API of a contact list. Please provide firstName, lastName, numberPhone, and address on the attribute.

// Please provide a postman collection regarding Task number 3.

// With the code of the contact list that you created, push your code to the Git repository and leave a comment ( using git commit -m “” ) on every change you create. Please attach the link repository.
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const ClientError = require('./exception/ClientError');

const contact = require('./api/contact');
const ContactService = require('./services/ContactService');

const init = async () => {
    const contactService = new ContactService();

    const server = Hapi.server({
      port: process.env.PORT,
      host: process.env.HOST,
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });
  
    await server.register([
        {
            plugin: contact,
            options: {
                service: contactService,
            },
        },
    ]);
  
    server.ext('onPreResponse', (request, h) => {
      const { response } = request;
      if (response instanceof Error) {
        if (response instanceof ClientError) {
          const newResponse = h.response({
            status: 'fail',
            message: response.message,
          });
          newResponse.code(response.statusCode);
          return newResponse;
        }
        if (!response.isServer) {
          return h.continue;
        }
        const newResponse = h.response({
          status: 'error',
          message: 'terjadi kegagalan pada server kami',
        });
        newResponse.code(500);
        return newResponse;
      }
      return h.continue;
    });
  
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  };
  
  init();