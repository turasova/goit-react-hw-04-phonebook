import { Component } from "react";
import css from './Form.module.css'

export class Form extends Component {
    state = {
        name: '',
        number: '',
    }

    handleChange = ({target:{value,name}}) => {    
        this.setState({ [name]: value })      
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onCreateContact(this.state)
        this.reset();
    }

    reset = () =>
        this.setState({
            name: '',
            number: '',
        })
    
    render() {
        const { name, number } = this.state;
        
        return (
            <form className={css.form} onSubmit={this.handleSubmit}>
                <label>Name <br />
                    <input className={css.input} type="text" name="name" value={name} required onChange={this.handleChange}/>
                </label>
                <label>Phone number <br />
                    <input className={css.input} type="tel" name="number" value={number} required onChange={this.handleChange}/>
                </label>
                <button className={css.button } type="submit">Add contact</button>
            </form>
        )
    }

}