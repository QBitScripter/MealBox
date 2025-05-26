import React from "react";
import { createBrowserRouter, Outlet, RouterProvider} from "react-router";
import ReactDOM from "react-dom/client";

//Components
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/error";
import Contact from "./components/contact";
import RestaurantPage from "./components/RestaurantPage"
import Header_CC from "./components/Header_Class_Comp"
import { CartProvider } from "./contexts/CartContext";

const AppLayout = () => {
    return(
        <CartProvider>
            <React.Fragment>
                <Header />
                <Outlet/>
            </React.Fragment>
        </CartProvider>
    );
}

const appRouter = createBrowserRouter([
    //Each path is an object
    {
        path: "/",  
        element : <AppLayout />,
        errorElement : <Error/>,
        
        children: [
            {
                path :"/",
                element : <Body />
            },              
            
            {
                path : "/about",
                element : <About />,
            },
            
            {
                path : "/contact" ,
                element : <Contact />     
            },
            {    
                path : "/restaurant/:id", 
                element : <RestaurantPage/> 

            },
            {
                path : "/about/cc",
                element : <Header_CC/>
            }
            
        ]
      

    },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);




