const ContactHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'contact',
    register: async(server, {service} ) => {
        const contactHandler = new ContactHandler(service);
        server.route(routes(contactHandler));
    }
}