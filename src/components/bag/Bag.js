import { useState, useEffect } from 'react';

import axios from 'axios';

import './bag.scss';

const Bag = ({bagActive, sneakers, onOrderClick, handleCard, handleBag, price}) => {

	const [order, setOrder] = useState(false);
	const [tax, setTax] = useState(0);

	useEffect(() => {
		let newTax = Math.floor(price * 0.05);
		setTax(newTax);
	}, [price]);

	useEffect(() => {
		setOrder(false);
		sneakers.some(item => {
			if (item.selected) {
				setOrder(true);
				return false;
			}
		});
	}, [sneakers]);


    return (
        <div className={bagActive ? "bag bag_active" : "bag"}>
            <div className="bag__title">Корзина</div>
			{
				order ?
				<>
					<div className="bag__wrapper">
					{
						sneakers.map((item, i) => {
							if (item.selected) {
								return (
									<div key={item.id} className="bag__item">
										<img className="bag__img" src={item.imgURL} alt="img" />
										<div>
											<div className="bag__name">{item.title}</div>
											<div className="bag__price">{item.price + ' руб.'}</div>
										</div>
										<button onClick={() => handleCard(item.id, 'select')} className="bag__closebtn">
											<img src="/img/card-plus.svg" alt="close"/>
										</button>
									</div>
								)
							}
						})
					}
					</div>
					<div className="bag__check">
						<div className="bag__info">
							<div className="bag__word">Итого: </div>
							<div className="bag__border"></div>
							<div className="bag__finally">{price + ' руб.'}</div>
						</div>
						<div className="bag__info">
							<div className="bag__word">Налог 5%: </div>
							<div className="bag__border"></div>
							<div className="bag__finally">{tax + ' руб.'}</div>
						</div>
						<button onClick={onOrderClick} className="bag__btn">Оформить заказ</button>
					</div>
				</>
				:
				<div className="bag__wrapper-second">
					<div className="bag__state">Корзина пустая</div>
					<div className="bag__subtitle">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</div>
					<button onClick={handleBag} className="bag__btn">Вернуться назад</button>
				</div>
			}
        </div>
    )
};

export default Bag;