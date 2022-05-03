import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
        <div>
            <UploadTweet user={user} />
            {tweets.map((tweet) => (
                <TweetContent
                    key={tweet.docId}
                    tweet={tweet}
                    isOwner={tweet.userId === user.uid}
                    db={db}
                />
            ))}
        </div>
    );
};

export default Home;
