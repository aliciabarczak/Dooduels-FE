import * as filestack from 'filestack-js';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../../contexts/userContext';
import { updateUserImage } from '../../db/utils';

const ProfilePic = () => {
    const { loggedUser } = useContext(userContext);
    const client = filestack.init("An1BmavtPQxOZ9tAQhqAPz");
    const options = {
        onFileUploadFinished(file) {
            updateUserImage(loggedUser.user_id, file.url);
        }
    };
    const picker = client.picker(options);

    picker.open();

    return (
        <div>
            <Link to={`/`} className="back-button">Back to Home</Link>
            <script src="//static.filestackapi.com/filestack-js/3.x.x/filestack.min.js"></script>
        </div>
    )
}

export default ProfilePic;