
import ResaurentCard from "./ResaurentCard";
import { resList } from "../util/mockdata";
import {useState,useEffect} from "react";
import YouTube from "./YouTube";

const Body = () => {
    
const [resListData, setResListData] = useState(resList);

const handleTopRated = () => {
    const filteredList = resList.filter((res) => res.info.avgRating > 4.4)
    setResListData(filteredList);   
}
return (
    <>
    <div className="rest-container container">
        <h1>Top Restaurants</h1>
        <div className="top-filter">
           <button  className="filter-btn" 
           onClick={handleTopRated}>
            Top Rated Restaurants</button>
            <button className="filter-btn" 
            onClick={() => 
            setResListData(resList)}>
                Reset</button>
        </div>
        <div className="total-items">Total items: {resListData.length}</div>
        <div className="restaurant-list">
            {resListData.map((restaurant) => (
                <ResaurentCard key={restaurant.info.id} restData={restaurant} />
            ))}
        </div>
    </div>
    <div className="container">
        <YouTube />
    </div>
    </>
);   
};

export default Body;