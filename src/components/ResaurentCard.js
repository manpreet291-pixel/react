import { REST_IMG } from "../util/constant";


const ResaurentCard = (props) => {
    const { restData } = props; 
    const { name, cloudinaryImageId, costForTwo, cuisines, areaName, sla, avgRating, cta } = restData?.info;
    return (        
    <div className="resaurent-card" style={{ padding: "10px", borderRadius: "5px" }}>
        <img className="resaurent-image" src={`${REST_IMG}${restData.info.cloudinaryImageId}`} alt="Logo" />
        <h3 className="resaurent-name">{props.restData.info.name}</h3>
        <h4 className="resaurent-cuisines">{props.restData.info.cuisines.join(", ")}</h4>
        <h4 className="resaurent-area">Location: {props.restData.info.areaName}</h4>
        <h4 className="resaurent-delivery">Delivery Time: {props.restData.info.sla?.slaString}</h4>
        <h4 className="resaurent-price">{props.restData.info.costForTwo}</h4>
        <h4 className="resaurent-rating">{props.restData.info.avgRating} ⭐ Stars</h4>
        <a className="order-link" href={props.restData.cta.link+"?utm_source=manni&utm_medium=web&utm_campaign=manni_search"} target="_blank" rel="noopener noreferrer">Order Now</a>    
    </div>
);
}
export default ResaurentCard;