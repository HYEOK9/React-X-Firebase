import { storage, db } from '../firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useState, useRef } from 'react';
const UploadTweet = ({ user }) => {
    const [tweet, setTweet] = useState('');
    const [file, setFile] = useState('');
    const fileInput = useRef();

    const onChange = (event) => {
        const { value } = event.target;
        setTweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!tweet && !file) alert('트윗을 작성해주세요');
        else {
            try {
                const createdTime = Date.now();
                let fileURL = null;
                let filePath = null;
                if (file) {
                    filePath = `${user.email}/${createdTime}/${uuidv4()}`;
                    const fileRef = await ref(storage, filePath);
                    await uploadString(fileRef, file, 'data_url');
                    fileURL = await getDownloadURL(fileRef);
                }
                const newObj = {
                    content: tweet,
                    author: user.email,
                    userId: user.uid,
                    createdTime: Date.now(),
                    fileURL,
                    filePath,
                };
                await addDoc(collection(db, 'tweets'), newObj);
                setTweet('');
                onClearFile();
            } catch (e) {
                console.log(e);
            }
        }
    };
    const onFileChange = (event) => {
        const { files } = event.target;
        const reader = new FileReader();
        reader.onloadend = (finishiedevent) => {
            const { result } = finishiedevent.currentTarget;
            setFile(result);
        };
        reader.readAsDataURL(files[0]);
    };
    const onClearFile = () => {
        setFile(null);
        fileInput.current.value = null;
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
                accept='image/*'
                onChange={onFileChange}
                ref={fileInput}
            ></input>
            {file && (
                <div>
                    <img src={file} height='300vh'></img>
                    <button onClick={onClearFile}>삭제</button>
                </div>
            )}
        </div>
    );
};

export default UploadTweet;
