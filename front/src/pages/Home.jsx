import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    collection,
    addDoc,
    query,
    onSnapshot,
    orderBy,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import TweetContent from '../components/TweetContent';

const Home = ({ user }) => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);
    const [file, setFile] = useState('');

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

    const onChange = (event) => {
        const { value } = event.target;
        setTweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!tweet && !file) alert('트윗을 작성해주세요');
        else {
            try {
                if (file) {
                    const createdTime = Date.now();
                    const filePath = uuidv4();
                    const fileRef = await ref(
                        storage,
                        `${user.email}/${createdTime}/${filePath}`
                    );
                    await uploadString(fileRef, file, 'data_url').then(() => {
                        getDownloadURL(fileRef).then((url) => {
                            addDoc(collection(db, 'tweets'), {
                                content: tweet,
                                author: user.email,
                                userId: user.uid,
                                createdTime: createdTime,
                                fileURL: url,
                                filePath: filePath,
                            });
                        });
                    });

                    setFile(null);
                    setTweet('');
                } else {
                    await addDoc(collection(db, 'tweets'), {
                        content: tweet,
                        author: user.email,
                        userId: user.uid,
                        createdTime: Date.now(),
                        fileURL: null,
                        filePath: null,
                    });
                    setTweet('');
                }
            } catch (e) {
                console.log(e);
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
                <button>tweet</button>
            </form>
            <input
                type='file'
                id='fileinput'
                accept='image/*'
                onChange={onFileChange}
            ></input>
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
