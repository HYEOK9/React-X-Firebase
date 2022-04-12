import { useEffect, useState } from 'react';
import { collection, doc, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
const Home = () => {
    const [tweet, setTweet] = useState('');
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setTweet(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'users'), {
                content: tweet,
            });
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };
    const onClick = async () => {
        //fill in
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
            <button onClick={onClick}>tweet console.log</button>
        </div>
    );
};

export default Home;
