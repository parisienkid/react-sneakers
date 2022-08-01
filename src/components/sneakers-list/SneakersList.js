import './sneakersList.scss';
import Card from '../card/Card';

import { useContext } from 'react';
import AppContext from '../../context';

const SneakersList = () => {
    const {handleCard, sneakersList} = useContext(AppContext);

    return (
        <div className="sneakers">
            {sneakersList.map((item, i) => {
                return <Card handleCard={handleCard} id={sneakersList[i].id} key={sneakersList[i].id} title={sneakersList[i].title} img={sneakersList[i].imgURL} price={sneakersList[i].price} likeActive={sneakersList[i].liked} selectActive={sneakersList[i].selected} searchedActive={sneakersList[i].searched}/>
            })}
        </div>
    )
};

export default SneakersList;