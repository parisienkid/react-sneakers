import { useState, useEffect } from 'react';

import './card.scss';
import likeImg from '../../resources/img/like-card.svg';
import likeActiveImg from '../../resources/img/like-active-card.svg';

import AppContext from '../../context';
import { useContext } from 'react';


const Card = ({title,img,price,skel,id, likeActive, selectActive, searchedActive, likeCard = false}) => {
    const {handleCard} = useContext(AppContext);

    const [select, setSelect] = useState(selectActive);
    const [like, setLike] = useState(likeActive);
    const [skeleton, setSkeleton] = useState(false);
    const [searched, setSearched] = useState(searchedActive);

    const okSrc = '/img/card-ok.svg';
    const plusSrc = '/img/card-plus.svg';

    useEffect(() => {
        if (skel) {
            setSkeleton(true)
        }
    },[]);

    useEffect(() => {
        setSearched(searchedActive);
    },[searchedActive]);

    useEffect(() => {
        setLike(likeActive);
    },[likeActive]);

    useEffect(() => {
        setSelect(selectActive);
    },[selectActive]);


    const changeSelect = () => {
        setSelect(select => !select)
        handleCard(id, 'select')
    };

    const changeLike = () => {
        setLike(like => !like)
        handleCard(id, 'like');
    };

    const onLoadCard = () => {
        return (
            <div className="card-skeleton">
                <div className="card__photo-skeleton"></div>
                <div className="card__title-skeleton"></div>
                <div className="card__subtitle-skeleton"></div>
                <div className="card__info-skeleton">
                    <div className="card__price-skeleton"></div>
                    <div className="card__select-skeleton"></div>
                </div>
            </div>
        )
    }

    const card = () => {
        return (
            <div className="card">
                <img src={img} className="card__img"></img>
                <div onClick={changeLike} className={like ? "card__like card__like_active" : "card__like"}>
                    <img src={like ? likeActiveImg : likeImg} alt="Like" />
                </div>
                <div className="card__title">{title}</div>
                <div className="card__info">
                    <div>
                        <div className="card__price">Цена:</div>
                        <div className="card__count">{price + ' руб.'}</div>
                    </div>
                    <div onClick={changeSelect} className={select ? "card__select card__select_active" : "card__select"}>
                        <img src={select ? okSrc : plusSrc} alt="select"/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {
            skeleton 
            ? 
                onLoadCard() 
            : 
                searched || likeCard
                ?
                card()
                :
                null
            }
        </>
    )
};

export default Card;