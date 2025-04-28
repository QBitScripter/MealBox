import { Router } from "react-router"

const Error = ({ errorMessage }) => {
    return (
        <div>
            <h1>Oops!!</h1>
            <h2>Something went wrong!!</h2>
            <h3>{errorMessage || "Unknown error occurred."}</h3> {/* Display error message */}
        </div>
    );
};

export default Error;