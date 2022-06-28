import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../contexts/userContext";

const LoginPage = () => {
    const { loggedUser, setLoggedUser } = useContext(userContext);
    const [ input, setInput ] = useState("");

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoggedUser(input);
    };

    console.log(loggedUser)

    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <label className="login-label">username:</label>
                <input className="username-input" type="text" onChange={handleChange}/>
                <button type="submit" className="login-submit-button">Submit</button>
                <Link to={`/`} className="back-button">Back</Link>
            </form>
        </div>
    )
};

export default LoginPage;