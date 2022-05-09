import { useEffect, useState, useRef } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import TweetContent from '../components/TweetContent';
import UploadTweet from '../components/UploadTweet';

const Home = ({ user }) => {
    const [tweets, setTweets] = useState([]);

    const getTweets = () => {
        const q = query(
            collection(db, 'tweets'),
            orderBy('createdTime', 'desc')
        );
        onSnapshot(q, (querySnapshot) => {
            const tweetArray = querySnapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    docId: doc.id,
                };
            });
            setTweets(tweetArray);
        });
    };

    useEffect(() => {
        getTweets();
    }, []);

    return (
        <div className='container'>
            <UploadTweet user={user} />
            <div style={{ marginTop: 30 }}>
                {tweets.map((tweet) => (
                    <TweetContent
                        key={tweet.docId}
                        tweet={tweet}
                        isOwner={tweet.userId === user.uid}
                        db={db}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
