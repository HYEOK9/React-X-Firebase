import { useEffect, useState } from 'react';
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
const Home = ({ user }) => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);

    const getTweets = () => {
        const q = query(collection(db, 'tweets'));
        onSnapshot(q, (querySnapshot) => {
            const tweetArray = querySnapshot.docs
                .map((doc) => ({
                    ...doc.data(),
                    docId: doc.id,
                }))
                .sort((a, b) => b.tweetedTime - a.tweetedTime);
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
        try {
            const docRef = await addDoc(collection(db, 'tweets'), {
                content: tweet,
                author: user.email,
                userId: user.uid,
                tweetedTime: Date.now(),
            });
            console.log('Document written with ID: ', docRef.id);
            setTweet('');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    onChange={onChange}
                    placeholder='What`s on your mind?'
                    value={tweet}
                ></input>
                <button>tweet</button>
            </form>
            <ul>
                {tweets.map((item) => (
                    <div key={item.docId}>
                        <h4>
                            {'=>'} {item.content}
                        </h4>
                        <li style={{ fontSize: 12 }}>by {item.author}</li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Home;
