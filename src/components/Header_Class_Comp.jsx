import React, { Component } from "react";
import { Link } from "react-router";
import company_logo from "../assets/images/company_logo_2.jpg";

export class Logo extends Component {
    render() {
        return (
            <div className="logo-container">
                <img src={company_logo} alt="Mealbox logo" />
            </div>
        );
    }
}

class Header_CC extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        };
    }

    render() {
        const { isLoggedIn } = this.state;
        return (
            <div className="header">
                <Link to="/">
                    <Logo />
                </Link>
                <div className="nav-items">
                    <ul>
                        <li><Link to="/add-restaurant">Add Restaurants</Link></li>
                        <li><Link to="/deals">Deals</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="auth-buttons">
                    {isLoggedIn ? (
                        <button
                            className="logout-btn"
                            onClick={() => {
                                this.setState({
                                    isLoggedIn: false
                                });
                            }}
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            className="login-btn"
                            onClick={() => 
                                this.setState({
                                    isLoggedIn: true
                                })
                            }
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

export default Header_CC;

