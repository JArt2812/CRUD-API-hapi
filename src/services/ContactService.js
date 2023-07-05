const {nanoid} = require('nanoid');
const InvariantError = require('../exception/InvariantError');
const NotFoundError = require('../exception/NotFoundError');

class ContactService{
    constructor(){ 
        this._contactList = [];
    }

    addContact({firstName, lastName, numberPhone, address}){
        const id = `contact-${nanoid(16)}`;
        
        const newContact = {
            id, firstName, lastName, numberPhone, address,
        };

        this._contactList.push(newContact);

        const isSuccess = this._contactList.filter((contact) => contact.id === id).length > 0;

        if(!isSuccess){
            throw new InvariantError('FAIL TO ADD');
        }

        return id;
    }

    getContacts() {
        return this._contactList;
    }
    
    getContactById(id) {
        const contact = this._contactList.filter((c) => c.id === id)[0];
        if (!contact) {
          throw new NotFoundError('CONTACT NOT FOUND');
        }
        return contact;
    }

    editContactById(id, {firstName, lastName, numberPhone, address}){
        const index = this._contactList.findIndex((contact) => contact.id === id);
        if(index === -1){
            throw new NotFoundError('FAIL TO UPDATE, CONTACT NOT FOUND');
        }

        this._contactList[index] = {
            ...this._contactList[index],
            firstName,
            lastName,
            numberPhone,
            address,
        };
    }

    deleteContactById(id){
        const index = this._contactList.findIndex((contact) => contact.id === id);
        if (index === -1) {
            throw new NotFoundError('FAIL TO DELETE, CONTACT NOT FOUND');
        }
        this._contactList.splice(index, 1);
    }
}

module.exports = ContactService;