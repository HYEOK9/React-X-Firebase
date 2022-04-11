import { useEffect, useState } from 'react';

const Home = () => {
    const [tweet, setTweet] = useState('');
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setTweet(value);
    };
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(tweet);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    onChange={onChange}
                    placeholder='What is on your mind?'
                    value={tweet}
                ></input>
                <button>tweet</button>
            </form>
        </div>
    );
};

export default Home;
