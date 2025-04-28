import './About.scss'; 
import Loader from './Loader';

const About = () => {
    return(
        <div className="about-container">
            <div className="about-card">
                <h1>About Us</h1>
                <p>
                    At MealBox, we're passionate about bringing delicious meals to your doorstep with just a few clicks. Founded by food enthusiasts who understand the challenge of balancing busy schedules with quality dining, we've created a seamless solution for hungry people on the go.
                </p>
                
                <div className="about-image">
                        <Loader/>
                </div>
                
                <p>
                    Our curated network of local restaurants offers everything from comfort classics to international cuisines, ensuring there's something for every palate. We pride ourselves on lightning-fast delivery, maintaining food quality from kitchen to table, and providing exceptional customer service every step of the way.
                </p>
                
                <div className="feature-box">
                    <div className="feature">
                        <div className="icon"><i className="fa-solid fa-truck-fast"></i></div>
                        <h3>Fast Delivery</h3>
                        <p>Your food arrives hot and fresh in record time</p>
                    </div>
                    
                    <div className="feature">
                        <div className="icon"><i className="fa-solid fa-utensils"></i></div>
                        <h3>Quality Food</h3>
                        <p>Partnered with the best restaurants in town</p>
                    </div>
                    
                    <div className="feature">
                        <div className="icon"><i className="fa-solid fa-headset"></i></div>
                        <h3>24/7 Support</h3>
                        <p>Our team is always ready to assist you</p>
                    </div>
                </div>
                
                <p>
                    More than just a delivery service, MealBox is building a community that celebrates great food. Whether you're craving a quick lunch, planning a family dinner, or hosting friends, we're here to make every meal memorable.
                </p>
            </div>
        </div>
    );
}
export default About;