import css from './Filter.module.css';

export const Filter = ({ filter, changeFilter }) => {
    return (
        <label className={css.filterInput}>
            Find contacts by name: <br />
            <input className={css.filterField}
                   type="text"
                   name="filter"
                   value={filter}
                   onChange={changeFilter}
            />
        </label>
    )
    
}