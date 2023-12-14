import { ContactItem } from "components/ContactItem/ContactItem"
import css from './ContactList.module.css';

export const ContactList = ({ contacts,deleteContact }) => {
    return (
      <ul className={css.listContact}>
        {contacts.map((contact) => (
            <ContactItem
                contacts={contact}
                key={contact.id}
                deleteContact={deleteContact}
            />
        ))}
    </ul>
  )  
}