import { useEffect, useState } from 'react';
import {
    collection,
    addDoc,
    query,
    onSnapshot,
    orderBy,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
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
                const docRef = await addDoc(collection(db, 'tweets'), {
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
                    placeholder='What`s on your mind?'
                    value={tweet}
                ></input>
                <button>tweet</button>
            </form>
            {tweets.map((item) => (
                <div key={item.docId}>
                    <h4>
                        {'=>'} {item.content}
                    </h4>
                    <button onClick={onDelete}>삭제</button>
                    <span style={{ fontSize: 12 }}>by {item.author}</span>
                </div>
            ))}
        </div>
    );
};

export default Home;
