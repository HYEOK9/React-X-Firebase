import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Profile = ({ user }) => {
    const navigate = useNavigate();
    const logOut = () => {
        auth.signOut();
        navigate('/');
    };
    console.log(user);
    return (
        <div>
            <h2>Profile</h2>
            {user.reloadUserInfo.email}
            <button onClick={logOut}>로그아웃</button>
        </div>
    );
};

export default Profile;
