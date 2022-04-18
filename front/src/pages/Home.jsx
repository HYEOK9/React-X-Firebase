import { useEffect, useState } from 'react';
import {
    collection,
    addDoc,
    query,
    onSnapshot,
    orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';
import TweetContent from '../components/TweetContent';

const Home = ({ user }) => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);
    const getTweets = () => {
        const q = query(
            collection(db, 'tweets'),
            orderBy('tweetedTime', 'desc')
        );
        onSnapshot(q, (querySnapshot) => {
            const tweetArray = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                docId: doc.id,
            }));
            setTweets(tweetArray);
        });
    };

    useEffect(() => {
        getTweets();
    }, []);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setTweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (tweet === '') alert('트윗을 작성해주세요');
        else {
            try {
                await addDoc(collection(db, 'tweets'), {
                    content: tweet,
                    author: user.email,
                    userId: user.uid,
                    tweetedTime: Date.now(),
                });
                setTweet('');
            } catch (e) {
                alert(e);
            }
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    onChange={onChange}
                    placeholder="what's on your mind?"
                    value={tweet}
                ></input>
                <button>upload</button>
            </form>
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
