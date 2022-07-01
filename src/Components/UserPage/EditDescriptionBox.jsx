import { useContext, useState } from "react";
import userContext from "../../contexts/userContext";
import { updateUserDescription } from "../../db/utils";

const EditDescriptionBox = ({ setDescriptionBox }) => {
    const { loggedUser } = useContext(userContext);
    const [input, setInput ] = useState("");
    const [message, setMessage] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (input) {
            updateUserDescription(loggedUser.user_id, input);
            loggedUser.description = input
            setDescriptionBox(false);
        } else {
            setMessage(true)
        }
    };

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    return (
        <div className="AddRoomBox">
            <h2>Edit Description</h2>
            <form className="dropdown" onSubmit={handleSubmit}>
                <label>About you:</label>
                <input type="text" className="roomNameInput" onChange={handleChange}/>
                {message ? (
                    <p className="error-message">Please, try again.</p>
                ) : null}
                <button type="submit" className="submitBtn">Submit</button>
            </form>
        </div>
    )
};

export default EditDescriptionBox;