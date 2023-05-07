import PropTypes from 'prop-types';
import s from './ContactList.module.css';

function ContactList({ contacts, deleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(contact => (
        <li
          className={s.item}
          key={contact.id}>
          {contact.name}: {contact.number}

          <button
              className={s.button}
              type="button"
              id={contact.id}
              onClick={() => deleteContact(contact.id)}
            >
              Delete
          </button>
        </li>
        
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
};

export default ContactList;