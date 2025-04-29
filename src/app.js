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



const AppLayout = () => {
    return(
        <React.Fragment>
            <Header />
            <Outlet/> {/*According to the config all the childeren will go the outlet*/}
        </React.Fragment>
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

            }
            
        ]
      

    },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);  



// createRoot(document.getElementById("root")).render(
//     <RouterProvider router={appRouter} />
//   );

