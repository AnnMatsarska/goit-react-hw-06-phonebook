import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';
import { Container } from './Container.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts-list'));
    if (parsedContacts) {
      return [...parsedContacts];
    } else {
      return [
        { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
        { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
        { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
        { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
      ];
    }
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts-list', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const hasNameDuplicate = contacts.some(
      contact => contact.name === data.name
    );
    const hasNamberDuplicate = contacts.some(
      contact => contact.number === data.number
    );
    if (hasNameDuplicate) {
      alert(` ${data.name} is already in contacts`);
      return;
    }
    if (hasNamberDuplicate) {
      alert(` ${data.number} is already in contacts`);
      return;
    }
    const newContact = {
      ...data,
      id: nanoid(),
    };

    setContacts([...contacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  const handleChange = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  const contactsFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Container>
      <Section title="PHONEBOOK">
        <ContactForm addContact={addContact} />
      </Section>
      <Section title="CONTACTS">
        {contacts.length !== 0 && (
          <Filter onChange={handleChange} filter={filter} />
        )}
        <ContactList contacts={contactsFilter()} handleDelete={deleteContact} />
      </Section>
    </Container>
  );
};
