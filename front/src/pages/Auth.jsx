import { useState } from 'react';
import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider,
} from 'firebase/auth';

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
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={onChange}
                        required
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
                    ></input>
                </div>
                <div>
                    <button type='submit' value='login'>
                        로그인
                    </button>
                    <button type='button' onClick={newAccount}>
                        회원가입
                    </button>
                </div>
            </form>

            <button name='google' onClick={onClick}>
                google이메일로 로그인
            </button>
            <button name='github' onClick={onClick}>
                Github로 로그인
            </button>
        </div>
    );
};

export default Auth;
