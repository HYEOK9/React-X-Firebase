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
        <div className='container'>
            <span sylte={{ color: 'gray' }}>{user.reloadUserInfo.email}</span>
            <span className='formBtn cancelBtn logOut' onClick={logOut}>
                Log Out
            </span>
            <button
                className='formBtn'
                onClick={() => {
                    setSeeMyTweets((cur) => !cur);
                }}
            >
                내 트윗 보기
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
