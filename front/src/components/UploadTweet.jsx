import { storage, db } from '../firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

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
        <>
            <form onSubmit={onSubmit} className='factoryForm'>
                <div className='factoryInput__container'>
                    <input
                        className='factoryInput__input'
                        value={tweet}
                        onChange={onChange}
                        type='text'
                        placeholder="What's on your mind?"
                        maxLength={120}
                    />
                    <input
                        type='submit'
                        value='&rarr;'
                        className='factoryInput__arrow'
                    />
                </div>
                <label htmlFor='attach-file' className='factoryInput__label'>
                    <span>Add photos</span>
                    <FontAwesomeIcon icon={faPlus} />
                </label>
            </form>
            <input
                id='attach-file'
                type='file'
                accept='image/*'
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
                ref={fileInput}
            />
            {file && (
                <div className='factoryForm__attachment'>
                    <img
                        src={file}
                        style={{
                            backgroundImage: file,
                        }}
                    />
                    <div className='factoryForm__clear' onClick={onClearFile}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </>
    );
};

export default UploadTweet;
