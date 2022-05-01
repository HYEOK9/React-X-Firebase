import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../firebase';

const TweetContent = ({ tweet, isOwner, db }) => {
    const [edit, setEdit] = useState(false);
    const [newContent, setNewContent] = useState(tweet.content);

    const onDelete = async () => {
        if (window.confirm('삭제 하시겠습니까?')) {
            await deleteDoc(doc(db, 'tweets', tweet.docId));
            if (tweet.fileURL) {
                await deleteObject(ref(storage, tweet.filePath));
            }
        }
    };
    const onDeleteFile = async () => {
        await deleteObject(
            ref(
                storage,
                `${tweet.author}/${tweet.createdTime}/${tweet.filePath}`
            )
        );
        await updateDoc(doc(db, 'tweets', tweet.docId), {
            fileURL: null,
            filePath: null,
        });
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
        <div>
            <h4>
                {'->'} {tweet.content}
                <div>
                    {tweet.fileURL && (
                        <img src={tweet.fileURL} height='300vh'></img>
                    )}
                </div>
                {isOwner && (
                    <>
                        <button
                            onClick={() => setEdit((cur) => !cur)}
                            style={{ marginLeft: 10 }}
                        >
                            수정
                        </button>
                        <button onClick={onDelete} style={{ marginLeft: 5 }}>
                            삭제
                        </button>
                    </>
                )}
                {edit && (
                    <>
                        <form onSubmit={onSubmit} style={{ marginTop: 20 }}>
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
                                <img src={tweet.fileURL} height='300vh'></img>
                            )}
                        </div>
                        <button onClick={onDeleteFile}>삭제</button>
                    </>
                )}
            </h4>
            <span style={{ fontSize: 12 }}>by {tweet.author}</span>
        </div>
    );
};

export default TweetContent;
