function createContactsList() {
    const contacts = JSON.parse(loadContacts());
    const contactsList = document.querySelector('.contacts-list');

    contactsList.innerHTML = '';

    for (let contact of contacts) {
        const li = document.createElement('li');
        li.dataset.email = contact.email;
        li.dataset.phone = contact.phone;
        li.innerHTML = `<strong>${contact.name}</strong>`;
        contactsList.appendChild(li);
    }
}

document.addEventListener('DOMContentLoaded', createContactsList);