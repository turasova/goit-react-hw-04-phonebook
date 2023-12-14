import css from './Form.module.css';
import { useState } from 'react';

export const Form = ({ onCreateContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contact = { name, number };
    onCreateContact(contact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label>
        Name <br />
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          required
          onChange={handleChange}
        />
      </label>
      <label>
        Phone number <br />
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          required
          onChange={handleChange}
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
