import { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import Container from "./Container/Container";
import Section from "./Section/Section";

export class App extends Component {
  state = {
    contacts: [],
      filter: '',
      name: '',
      number: ''
    };
  
  addContact = data => {
    this.setState(prevState => {
      if (prevState.contacts.some(contact => contact.name.includes(data.name))) {
        return alert(`${data.name} is already in contacts!`);
      }

      return { contacts: [...prevState.contacts, data] };
    });
  };

  deleteContact = currentId => {
    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts.filter(contact => contact.id !== currentId),
        ],
      };
    });
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value.toLocaleLowerCase() });
  };

  onFilter = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter),
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts")
    const parsedContacts = JSON.parse(contacts)

    if (parsedContacts) {
      this.setState({contacts : parsedContacts})
    }    
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }    
  }

  render() {   
    
    return (      
      <Container>
        <Section title="Phonebook">
          <ContactForm
            onSubmit={this.addContact} 
          />
        </Section>                

        <Section title="Contacts">        
          <Filter
            filter={this.state.filter}
            onChangeFilter={this.changeFilter}
          />
          {this.state.filter === '' ? (
            <ContactList
              contacts={this.state.contacts}
              deleteContact={this.deleteContact}
            />
          ) : (
            <ContactList
              contacts={this.onFilter()}
              deleteContact={this.deleteContact}
            />
          )}
        </Section>
      </Container>        
    );
  }
}

