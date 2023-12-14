import { Component } from "react"
import { Form } from "./Form/Form";
import { ContactList } from "./ContactList/ContactList";
import { nanoid } from "nanoid";
import { Filter } from "./Filter/Filter";
import css from './App.module.css';
import Notiflix from "notiflix";

export class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: ''
  }

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    if (localContacts && JSON.parse(localContacts).length > 0) {
      this.setState({
        contacts: JSON.parse(localContacts),
      })
    } else {
      this.setState({
        contacts: [
          {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
          {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
          {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
          {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
      
  }
  

  onCreateContact = (contacts) => {
    const isDuplicated = this.state.contacts.find((contact) => 
      contact.name === contacts.name)
    
      const newContact = {
      ...contacts,
      id: nanoid(),
    }
    
    if (isDuplicated) {
      return Notiflix.Notify.failure(`${newContact.name} is already in contacts`,
      {
          width: '400px',
          position: 'center-center',
          timeout: 3000,
          fontSize: '20px',
        })
    } 
   
    this.setState((prev) => ({
      contacts: [...prev.contacts, newContact ]
    }))
    localStorage.setItem('contacts', JSON.stringify(this.setState.contacts))
}

  deleteContact = (id) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter((contact) => contact.id !==id)
  }))
  }
  
  changeFilter = (e) => {
    const { value } = e.currentTarget;
    this.setState({filter: value})
  }

  filterByName = () => {
    const { contacts, filter } = this.state;
    const lowerFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => 
    (name.toLowerCase().includes(lowerFilter)))
  }
  
  render() {
    const { filter } = this.state;
    const visibleContacts = this.filterByName();
    return (
      <div>
        <div className={css.phonebookWrapper}>
        <h1 className={css.title}>Phonebook</h1>
        <Form
          onCreateContact={this.onCreateContact}
        />
        </div>
      <div className={css.contactsWrapper}>
        <h2 className={css.title}>Contacts</h2>
        <Filter
          filter={filter}
          changeFilter={this.changeFilter}
        />
        <ContactList
          contacts={visibleContacts}
          deleteContact={this.deleteContact}
          />   
          </div>
      </div>
    );
  }
}
