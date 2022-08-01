import './search.scss';

import { useContext } from 'react';
import AppContext from '../../context';

const Search = () => {
    const {filterData, searchString} = useContext(AppContext);

    return(
        <div className="search">
            <div className="search__title">Все кроссовки</div>
           <div className="search__input-wrapper">
                <input
                    value={searchString}
                    onChange={(e) => {filterData(e.target.value)}}
                    placeholder="Поиск..." 
                    type="text" 
                    className="search__input" />
           </div>
        </div>
    )
};

export default Search;