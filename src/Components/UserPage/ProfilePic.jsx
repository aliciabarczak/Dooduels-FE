import * as filestack from 'filestack-js';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../../contexts/userContext';
import { getUserById, updateUserImage } from '../../db/utils';

const ProfilePic = () => {
    const { loggedUser, setLoggedUser, users } = useContext(userContext);
    const [ currUser, setCurrUser ] = useState({})
    // const client = filestack.init("An1BmavtPQxOZ9tAQhqAPz");
    // const options = {
    //     onFileUploadFinished(file) {
    //         updateUserImage(loggedUser.user_id, file.url);
    //     },
    //     onClose() {
    //         getUserById(loggedUser.user_id, setCurrUser);
    //         setLoggedUser(currUser);
    //         window.localStorage.setItem("loggedUser", JSON.stringify(currUser))
    //     }
    // };
    
    // const picker = client.picker(options)


    // useEffect(() => {
    //     picker.open();
    // })
    
    return (
        <div>
            <Link to={`/`} className="back-button">Back to Home</Link>
            <script src="//static.filestackapi.com/filestack-js/3.x.x/filestack.min.js"></script>
        </div>
    )
}

export default ProfilePic;