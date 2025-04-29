import { useRouteError } from "react-router"

const Error = () => {
    
const err = useRouteError()

    return (
        <div>
            <h1>Oops!!</h1>
            <h2>Something went wrong!!</h2>
            <h3>{err.status +" :: " + err.statusText || "Unknown error occurred."}</h3> {/* Display error message */}
        </div>
    );
};

export default Error;