import Card from '../../components/card/Card';
import Search from '../../components/search/Search';
import SneakersList from '../../components/sneakers-list/SneakersList';

const ShopPage = ({loading}) => {

	const renderSkeletonCards = () => {
		const skeletonCards = [];
		for (let i = 0; i < 12; i++) {
			skeletonCards.push(<Card key={i} skel={true}/>)
		}
		return skeletonCards;
	}

    return (
       <>
         <Search/>
            {loading 
                ? 
                <div className="sneakers">
                    {renderSkeletonCards().map(item => {return item})}
                </div> 
                : 
                null
            }
            {loading ? null : <SneakersList/>}
       </>
    )
};

export default ShopPage;