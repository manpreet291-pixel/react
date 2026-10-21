import { LOGO_URL } from "../util/constant";

const Header  = () => (
    <div className="header container">
        <div className="logo">
            <img 
            src={LOGO_URL} alt="Logo" /></div>
        <div className="nav-items">
            <ul>
                <li><a href="https://www.swiggy.com/">Home</a></li>
                <li><a href="https://www.swiggy.com/support">help</a></li>
                <li><a href="#">Cart</a></li>
            </ul>
        </div>  
    </div>
);

export default Header;