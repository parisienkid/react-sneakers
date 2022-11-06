import { useState, useEffect } from 'react';

import Header from './components/header/Header';
import ShopPage from './pages/shopPage/shopPage';
import LikedPage from './pages/likedPage/LikedPage';
import OrdersPage from './pages/ordersPage/OrdersPage';
import SneakersFetch from './service/SneakersFetch';
import Bag from './components/bag/Bag';

import AppContext from './context';

import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import '../src/style/style.scss';

function App() {

	const [bagActive, setBagActive] = useState(false);
	const [price, setPrice] = useState(0);
	const [overlay, setOverlay] = useState(false);
	const [searchString, setSeachString] = useState('');

	const {request} = SneakersFetch();
	const [sneakersList, setSneakersList] = useState([]);
	const [loading, setLoading] = useState(false);


	const handleBag = () => {
		setBagActive(bagActive => !bagActive)
		setOverlay(overlay => !overlay);
		document.documentElement.classList.toggle('overflow');
	};

	const handleCard = (key, method) => {
		let newItems = [...sneakersList];
		if (method === 'like') {
			newItems[key - 1].liked = !newItems[key - 1].liked;
			setSneakersList(newItems);
		}
		if (method === 'select') {
			newItems[key - 1].selected = !newItems[key - 1].selected;
			setSneakersList(newItems);
		}
	}

	const onOrderClick = () => {
		let orders = {
			name: 'order',
			orders: [],
		};
		sneakersList.forEach(item => {
			if (item.selected) {
				orders.orders.push(item);
			}
		});
		axios.post('https://6224cd6e6c0e396620472b80.mockapi.io/orders', orders)
		.then(res => {
			let newSelected = [...sneakersList];
			newSelected.forEach(item => {
				item.selected = false;
			});
			setSneakersList(newSelected);
		});
	};

	const filterData = (string) => {
		setSeachString(string);
		if (string.length !== 0) {
			const reg = new RegExp(string.toLowerCase());
			const newSearched = [...sneakersList];
			newSearched.forEach(item => {
				if (item.title.toLowerCase().match(reg)) {
					item.searched = true
				} else {
					item.searched = false
				}
			});
			setSneakersList(newSearched)
		} else {
			const newSearched = [...sneakersList];
			newSearched.forEach(item => {
				item.searched = true;
			});
			setSneakersList(newSearched);
		}
	};

	useEffect(() => {
		let newPrice = 0;
		sneakersList.forEach(item => {
			if (item.selected) {
				newPrice += item.price;
			}
		});
		setPrice(newPrice);
	}, [sneakersList]);

	useEffect(() => {
		(async function() {
			setLoading(true);
			const sneakersData = await request('https://6224cd6e6c0e396620472b80.mockapi.io/sneakers');
			const reformSneakers = [...sneakersData];
			reformSneakers.forEach(item => {
				item.liked = false;
				item.selected = false;
				item.searched = true;
			});
			setSneakersList(reformSneakers);
			setLoading(false);
		}());
	},[]);

	return (
		<AppContext.Provider
		value={{
			searchString,
			sneakersList,
			handleBag,
			handleCard,
			filterData
		}}
		>
			<Router>
				<div onClick={handleBag} className={overlay ? "overlay overlay_active" : "overlay"}></div>
				<div className="App">
					<div className="wrapper">
						<Header price={price} handleBag={handleBag}/>
						<Routes>
							<Route path='/react-sneakers/' element={<ShopPage loading={loading}/>}/>
							<Route path='/react-sneakers/liked' element={<LikedPage sneakers={sneakersList} handleCard={handleCard}/>}/>
							<Route path='/react-sneakers/orders' element={<OrdersPage/>}></Route>
						</Routes>
					</div>
					<Bag price={price} handleBag={handleBag} handleCard={handleCard} onOrderClick={onOrderClick} sneakers={sneakersList} bagActive={bagActive}/>
				</div>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
