
import ResaurentCard from "./ResaurentCard";
import {useState,useEffect} from "react";
import YouTube from "./YouTube";
import Shimmer from "./Shimmer";

const Body = () => {
    
const [resListData, setResListData] = useState([]);
const [searcResturent, setSearcResturent] = useState([]);
const [searchText, setSearchText] = useState("");
const [resetData , setResetData] = useState([]);
const [isTopRated, setIsTopRated] = useState(false);

useEffect(() =>{
    fetchdata();
},[]);

const fetchdata = async () =>{
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7198207&lng=76.6441591&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

    const json  = await data.json();
    console.log(json);
    //optional chaining
    const jsondata = json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setResListData(jsondata);
    setResetData(jsondata)
     setSearcResturent(jsondata);
};

const handleTopRated = () => {
    const filteredList = resListData.filter((res) => res.info.avgRating > 4.4)
    setResListData(filteredList);   
     setIsTopRated(true);
}

return resListData.length === 0 ? (
    <Shimmer />
    ): (
    <>
    <div className="rest-container container">
        <h1>Top Restaurants</h1>
        <div className="top-filter">
            <div className="search">
                <input type="text"
                className="search-box"
                value={searchText}
                onChange={(e)=>
                     setSearchText(e.target.value)   
                }
                />
                <button onClick={()=>{
                    const searcResturent = resListData.filter((res) => res.info.name.toLowerCase().includes(searchText.toLocaleLowerCase()) );
                    setSearcResturent(searcResturent);
                    setIsTopRated(true);
                }}
                >Search</button>
            </div>
           <button  className="filter-btn" 
           onClick={handleTopRated}>
            Top Rated Restaurants</button>
            <button className="filter-btn"  disabled={!isTopRated}
            onClick={() => {
            setResetData(resetData)
        }}
        >
                Reset</button>
        </div>
        <div className="total-items">Total items: {resListData.length}</div>
        <div className="restaurant-list">
            {searcResturent.map((restaurant) => (
                <ResaurentCard key={restaurant.info.id} restData={restaurant} />
            ))}
        </div>
    </div>
    <div className="container">
        
    </div>
    </>
);   
};

export default Body;