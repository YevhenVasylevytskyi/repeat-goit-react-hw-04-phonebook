import { useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import s from "./ContactForm.module.css";

function ContactForm({ onSubmit }) {
  const loginInputId = nanoid();
  const numberInputId = nanoid();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // const handleNameChange = event => {
  //   setName(event.target.value)
  // }

  // const handleNumberChange = event => {
  //   setNumber(event.target.value)
  // }

  const handleCange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value)
        break;
      case 'number':
        setNumber(value)
        break;
      default:
        return;
    }
  }
  
  const handleSubmit = event => {
    event.preventDefault();    

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    onSubmit(contact);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };
  
  return (
    <form
      className={s.form}
      onSubmit={handleSubmit}
    >
      <label className={s.label} htmlFor={loginInputId}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={loginInputId}
          value={name}
          onChange={handleCange}
        />
      </label>
      <label className={s.label} htmlFor={numberInputId}>
        Number
        <input
          className={s.input_number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id={numberInputId}
          value={number}
          onChange={handleCange}
        />
      </label>
      <button className={s.button} type="submit">Add contact</button>
    </form>
  )

}

ContactForm.protoType = {
  onSubmit: PropTypes.func,
};

export default ContactForm;