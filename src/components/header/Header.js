import './header.scss';
import logo from '../../resources/img/header-logo.svg';
import bag from '../../resources/img/bag.svg';
import like from '../../resources/img/like.svg';
import profile from '../../resources/img/profile.svg';

import {
    NavLink
} from "react-router-dom";

const Header = ({handleBag, price}) => {

    const toggleBag = () => {
        handleBag();
    };

    return (
        <header className="header">
            <NavLink to="/" className="header__logo">
                <img src={logo} alt="logo"/>
                <div className="header__shop">
                    <div className="header__title">REACT SNEAKERS</div>
                    <div className="header__descr">Магазин лучших кроссовок</div>
                </div>
            </NavLink>
            <div onClick={toggleBag} className="header__bag">
                <img src={bag} alt="bag"/>
                <div className="header__price">{price + ' руб.'}</div>
            </div>
            <NavLink to="/liked" className="header__like">
                <img src={like} alt="like"/>
            </NavLink>
            <NavLink to='/orders' className="header__profile">
                <img src={profile} alt="profile"/>
            </NavLink>
        </header>
    )
}

export default Header;