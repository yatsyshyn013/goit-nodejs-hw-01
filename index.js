const contactsFunction = require("./contacts");

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          const allContacts = await contactsFunction.listContacts();
          return console.log(allContacts);
     

    case 'get':
        const oneContact = await contactsFunction.getContactById(id)  
        return console.log(oneContact);

    case 'add':
      const newContact = await contactsFunction.addContact({name, email, phone})
      return console.log(newContact);;

    case 'remove':
          const removeContact = await contactsFunction.removeContact(id);
          return console.log(removeContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
// invokeAction({ action: 'list' });
// invokeAction({action: 'get', id: 'AeHIrLTr6JkxGE6SN-0Rw'});
// invokeAction({action: 'add', name: 'Max', email: 'mailgo@mail.com', phone: '45430304'});
// invokeAction({action: 'remove', id: 'AeHIrLTr6JkxGE6SN-0Rw'});