import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';

const defoltContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? defoltContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onCreateContact = contacts => {
    const newContact = {
      ...contacts,
      id: nanoid(),
    };

    setContacts(prevContacts => {
      if (isDuplicated(prevContacts, newContact) === undefined) {
        return [...prevContacts, newContact];
      } else {
        Notiflix.Notify.failure(`${newContact.name} is already in contacts`, {
          width: '400px',
          position: 'center-center',
          timeout: 3000,
          fontSize: '20px',
        });
      }
    });
  };

  const isDuplicated = (prevContacts, newContact) => {
    return prevContacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const filterByName = () => {
    const lowerFilter = filter.toLowerCase();
    console.log(contacts);
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerFilter)
    );
  };

  const visibleContacts = filterByName();

  return (
    <div>
      <div className={css.phonebookWrapper}>
        <h1 className={css.title}>Phonebook</h1>
        <Form onCreateContact={onCreateContact} />
      </div>
      <div className={css.contactsWrapper}>
        <h2 className={css.title}>Contacts</h2>
        <Filter filter={filter} changeFilter={changeFilter} />
        <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
      </div>
    </div>
  );
};
