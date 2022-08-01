import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

import './ordersPage.scss';

const OrdersPage = () => {

    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
		(async function() {
            setLoading(true);
            let orderHistory = await axios.get('https://6224cd6e6c0e396620472b80.mockapi.io/orders');
			setLoading(false);
            setOrderHistory(orderHistory.data);
		}());
	},[]);

    return (
        <div className="orders">
            <h2 className="orders__title">Мои покупки:</h2>
                {
                    loading 
                    ?
                    null
                    :
                        orderHistory.length > 0
                        ?
                        <div className="orders__wrapper">
                            {
                                orderHistory.map((item,i) => {
                                    let names = item.orders.map((item) => {
                                        
                                        return (
                                            <div key={Math.random()} className="orders__sneaker">{item.title}</div>
                                        )
                                    });

                                    return (
                                        <div key={i} className='orders__order'>
                                            <h3 className='orders__name'>{'Заказ номер ' + `${item.orderId}`}</h3>
                                            {names}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        <div className="orders__null">
                            <div className="liked__descr">Покупок нет :(</div>
                            <Link to='/'><button className="liked__btn">Вернуться назад</button></Link>
                        </div>
                }
        </div>
    )
};

export default OrdersPage;