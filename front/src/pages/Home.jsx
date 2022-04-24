import { useEffect, useState } from 'react';
import {
    collection,
    addDoc,
    query,
    onSnapshot,
    orderBy,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import TweetContent from '../components/TweetContent';

const Home = ({ user }) => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);
    const [file, setFile] = useState(null);
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
        const { value } = event.target;
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
    const onFileChange = (event) => {
        const { files } = event.target;
        const reader = new FileReader();
        reader.onloadend = (finishiedevent) => {
            const { result } = finishiedevent.target;
            setFile(result);
        };
        reader.readAsDataURL(files[0]);
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
            <input type='file' accept='image/*' onChange={onFileChange}></input>
            {file && (
                <div>
                    <img src={file} height='300vh'></img>
                    <button
                        onClick={() => {
                            setFile(null);
                        }}
                    >
                        삭제
                    </button>
                </div>
            )}

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
