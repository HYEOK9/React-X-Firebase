import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const TweetContent = ({ tweet, isOwner, db }) => {
    const [edit, setEdit] = useState(false);
    const [newContent, setNewContent] = useState(tweet.content);
    const onDelete = async () => {
        if (window.confirm('삭제 하시겠습니까?')) {
            if (tweet.fileURL) await onDeleteFile();
            await deleteDoc(doc(db, 'tweets', tweet.docId));
        }
    };
    const onDeleteFile = async () => {
        await updateDoc(doc(db, 'tweets', tweet.docId), {
            fileURL: null,
            filePath: null,
        });
        await deleteObject(ref(storage, tweet.filePath));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setEdit((cur) => !cur);
        await updateDoc(doc(db, 'tweets', tweet.docId), {
            content: newContent,
        });
    };

    const onChange = (event) => {
        const { value } = event.target;
        setNewContent(value);
    };

    return (
        <div className='tweet'>
            <h3>
                {'->'} {tweet.content}
                <div>
                    {tweet.fileURL && (
                        <img src={tweet.fileURL} height='300vh'></img>
                    )}
                </div>
                {isOwner && (
                    <div className='nweet__actions'>
                        <span onClick={() => setEdit((cur) => !cur)}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                        <span onClick={onDelete}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </div>
                )}
                {edit && (
                    <>
                        <form
                            onSubmit={onSubmit}
                            className='container nweetEdit'
                        >
                            <input
                                type='text'
                                value={newContent}
                                onChange={onChange}
                                required
                            ></input>
                            <button>확인</button>
                        </form>
                        <div>
                            {tweet.fileURL && (
                                <>
                                    <img
                                        src={tweet.fileURL}
                                        height='300vh'
                                    ></img>{' '}
                                    <button onClick={onDeleteFile}>삭제</button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </h3>
            <span style={{ fontSize: 8, marginTop: 10 }}>
                by {tweet.author}
            </span>
        </div>
    );
};

export default TweetContent;
