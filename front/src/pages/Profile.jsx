import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import MyTweets from '../components/MyTweets';
import { useState } from 'react';

const Profile = ({ user }) => {
    const [seeMyTweets, setSeeMyTweets] = useState(false);
    const navigate = useNavigate();
    const logOut = async () => {
        await auth.signOut();
        navigate('/');
    };

    return (
        <div>
            <h2>Profile</h2>
            <span sylte={{ color: 'gray' }}>{user.reloadUserInfo.email}</span>
            <button onClick={logOut}>로그아웃</button>
            <button
                onClick={() => {
                    setSeeMyTweets((cur) => !cur);
                }}
            >
                My tweets
            </button>
            {seeMyTweets && (
                <div>
                    <MyTweets user={user} />
                </div>
            )}
        </div>
    );
};

export default Profile;
