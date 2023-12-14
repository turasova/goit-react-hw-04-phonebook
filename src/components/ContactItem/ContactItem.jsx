import css from './ContactItem.module.css'

export const ContactItem = ({ contacts, deleteContact}) => {
    return (
        <>
        <li className={css.contactItem}>
                <p>{contacts.name}: {contacts.number}</p>
                <button className={css.buttonDelete} onClick={() => deleteContact(contacts.id)}>Delete</button>  
        </li>
            
        </>
    )
}