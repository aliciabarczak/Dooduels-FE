import * as filestack from 'filestack-js';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfilePic = () => {
    // const client = filestack.init("An1BmavtPQxOZ9tAQhqAPz");

    // const options = {
    //     onFileUploadFinished(file) {
    //         console.log(file);
    //     }
    // };

    useEffect(() => {
        // client.picker(options).open();
    })

    return (
        <div>
            <Link to={`/`} className="back-button">Back to Home</Link>
            {/* <script src="//static.filestackapi.com/filestack-js/3.x.x/filestack.min.js"></script> */}
        </div>
    )
}

export default ProfilePic;