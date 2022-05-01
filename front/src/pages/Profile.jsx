import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

const Profile = ({ user }) => {
    const navigate = useNavigate();
    const logOut = async () => {
        await auth.signOut();
        navigate('/');
    };
    const getTweets = async () => {
        const querySnapshot = await getDocs(collection(db, 'tweets'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
        });
    };
    return (
        <div>
            <h2>Profile</h2>
            {user.reloadUserInfo.email}
            <button onClick={logOut}>로그아웃</button>
            <button onClick={getTweets}>My tweets</button>
        </div>
    );
};

export default Profile;
