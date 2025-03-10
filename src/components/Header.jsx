import { useState } from "react";
import company_logo from "../../images/company_logo_2.jpg"


const loggedInUser = () => {
    return true;
}





export const Logo = () => {
    return (
        <div className="logo">
            <img src={company_logo} alt="MealBox logo" />
        </div>
    );
}

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return(
        <div className="header">
            <a href="/">
                <Logo />
            </a>
            <div className="nav-items">
                <ul>
                    <li>Add Restaurant</li>
                    <li>Deals</li>
                    <li>Signup</li>
                </ul>
            </div>
            {isLoggedIn ? (<button onClick={()=>setIsLoggedIn(false)}>Logout</button>
            ) : (
                <button onClick={() => setIsLoggedIn(true)}>Login</button>)}
        </div>
    );
}


export default Header;