const routes = (handler) => [
    {
        method: 'POST',
        path: '/contact',
        handler: (request, h) => handler.postContactHandler(request,h),
    },
    {
        method: 'GET',
        path: '/contact',
        handler: () => handler.getContactsHandler(),
    },
    {
        method: 'GET',
        path: '/contact/{id}',
        handler: (request) => handler.getContactByIdHandler(request),
    },
    {
        method: 'PUT',
        path: '/contact/{id}',
        handler: (request) => handler.putContactByIdHandler(request),
    },
    {
        method: 'DELETE',
        path: '/contact/{id}',
        handler: (request) => handler.deleteContactByIdHandler(request),
    },
]

module.exports = routes;