import { doc, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';
const TweetContent = ({ tweet, isOwner, db }) => {
    const [edit, setEdit] = useState(false);
    const [newContent, setNewContent] = useState(tweet.content);
    const onDelete = async (id) => {
        if (window.confirm('삭제 하시겠습니까?')) {
            await deleteDoc(doc(db, 'tweets', id));
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        tweet.content = newContent;
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewContent(value);
    };
    return (
        <div>
            {edit ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type='text'
                            value={newContent}
                            onChange={onChange}
                            required
                        ></input>
                    </form>
                    <button
                        onClick={() => {
                            setEdit((cur) => !cur);
                        }}
                    >
                        수정
                    </button>
                </>
            ) : null}
            <h4>
                {'=>'} {tweet.content}
                {isOwner ? (
                    <button
                        onClick={() => setEdit((cur) => !cur)}
                        style={{ marginLeft: 10 }}
                    >
                        수정
                    </button>
                ) : null}
                {isOwner ? (
                    <button
                        onClick={() => onDelete(tweet.docId)}
                        style={{ marginLeft: 5 }}
                    >
                        삭제
                    </button>
                ) : null}{' '}
            </h4>
            <span style={{ fontSize: 12 }}>by {tweet.author}</span>
        </div>
    );
};

export default TweetContent;
