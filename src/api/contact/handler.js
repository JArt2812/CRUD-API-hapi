class ContactHandler{
    constructor(services){
        this._services = services;
    }

    postContactHandler(request,h) {
        const contactId = this._services.addContact(request.payload);

        const response = h.response({
            status: 'success',
            data: {
                contactId,
            },
        });
        response.code(201);
        return response;
    }

    getContactsHandler() {
        const contact = this._services.getContacts();
        return {
            status: 'success',
            data: {
                contact,
            },
        };
    }

    getContactByIdHandler(request) {
        const { id } = request.params;
        const contact = this._services.getContactById(id);

        return {
            status: 'success',
            data: {
                contact,
            },
        };
    }

    putContactByIdHandler(request) {
        const { id } = request.params;
        this._services.editContactById(id, request.payload);

        return {
            status: 'success',
            message: 'CONTACT EDIT SUCCESS',
        }

    }

    deleteContactByIdHandler(request) {
        const { id } = request.params;

        this._services.deleteContactById(id);

        return {
            status: 'success',
            message: 'CONTACT DELETE SUCCESS',
        }
    }
}

module.exports = ContactHandler;