import { useState } from 'react';
import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider,
} from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTwitter,
    faGoogle,
    faGithub,
} from '@fortawesome/free-brands-svg-icons';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setErrorMsg(error.message);
            alert(errorMsg);
        }
    };

    const newAccount = async (event) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setErrorMsg(error.message);
            alert(errorMsg);
        }
    };

    const onClick = async (event) => {
        let provider;
        const {
            target: { name },
        } = event;
        if (name == 'google') {
            provider = new GoogleAuthProvider();
        } else if (name == 'github') {
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(auth, provider);
    };

    return (
        <div className='authContainer'>
            <FontAwesomeIcon
                icon={faTwitter}
                color={'#04AAFF'}
                size='3x'
                style={{ marginBottom: 30 }}
            />
            <form onSubmit={onSubmit} className='container'>
                <div>
                    <input
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={onChange}
                        required
                        className='authInput'
                    ></input>
                </div>
                <div>
                    <input
                        name='password'
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={onChange}
                        required
                        className='authInput'
                    ></input>
                </div>
                <div>
                    <button
                        type='submit'
                        value='login'
                        className='authInput authSubmit'
                    >
                        로그인
                    </button>
                    <span onClick={newAccount}>회원가입</span>
                </div>
            </form>
            <div className='authBtns'>
                <button name='google' onClick={onClick} className='authBtn'>
                    google이메일로 로그인
                    <FontAwesomeIcon icon={faGoogle} />
                </button>
            </div>
            <button name='github' onClick={onClick} className='authBtn'>
                Github로 로그인
                <FontAwesomeIcon icon={faGithub} />
            </button>
        </div>
    );
};

export default Auth;
