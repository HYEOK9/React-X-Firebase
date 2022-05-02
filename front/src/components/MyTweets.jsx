import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    getDocs,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
const MyTweets = ({ user }) => {
    const [myTweets, setMyTweets] = useState([]);

    const getMyTweets = async () => {
        const q = query(
            collection(db, 'tweets'),
            where('author', '==', user.email),
            orderBy('createdTime', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const tweetArray = querySnapshot.docs.map((doc) => {
            return { ...doc.data() };
        });
        setMyTweets(tweetArray);
    };
    useEffect(() => {
        getMyTweets();
    }, []);

    return (
        <div>
            {myTweets.length ? (
                myTweets.map((tweet) => (
                    <div key={tweet.createdTime}>
                        <h3>
                            {'=>'} {tweet.content}
                        </h3>
                    </div>
                ))
            ) : (
                <span style={{ color: 'gray' }}>작성한 트윗이 없습니다.</span>
            )}
        </div>
    );
};

export default MyTweets;
