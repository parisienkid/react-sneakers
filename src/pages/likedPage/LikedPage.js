import Card from '../../components/card/Card';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './likedPage.scss';

const LikedPage = ({sneakers, handleCard}) => {

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(false);
        sneakers.some(sneaker => {
            if (sneaker.liked == true) {
                setActive(true);
                return false;
            }
        });
    }, [sneakers]);

    return (
        <div className="liked">
            <h2 className="liked__title">Мои закладки:</h2>
                {
                    active
                    ?
                    <div className="liked__wrapper">
                        {
                            sneakers.map((item, i) => {
                                if (item.liked) {
                                    return <Card likeCard={true} handleCard={handleCard} id={sneakers[i].id} key={sneakers[i].id} title={sneakers[i].title} img={sneakers[i].imgURL} price={sneakers[i].price} likeActive={sneakers[i].liked} selectActive={sneakers[i].selected} searchedActive={sneakers[i].searched}/>
                                }
                            })
                        }
                    </div>
                    :
                    <div className="liked__null">
                        <div className="liked__descr">Закладок нет :(</div>
                        <Link to='/'><button className="liked__btn">Вернуться назад</button></Link>
                    </div>
                }
        </div>
    )
};

export default LikedPage;