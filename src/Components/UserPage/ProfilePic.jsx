import * as filestack from 'filestack-js';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../../contexts/userContext';
import { updateUserImage } from '../../db/utils';

const ProfilePic = () => {
    const { loggedUser } = useContext(userContext);
    const options = {
        onFileUploadFinished(file) {
            updateUserImage(loggedUser.user_id, file.url);
            loggedUser.avatar_url = file.url;
            window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser))
        }
    };
    
    const filestack_apikey = "An1BmavtPQxOZ9tAQhqAPz"
    const client = filestack.init(filestack_apikey, options);
    client.picker(options).open();
    
    return (
        <div>
            <Link to={`/`} className="back-button">Back to Home</Link>
        </div>
    )
}

export default ProfilePic;