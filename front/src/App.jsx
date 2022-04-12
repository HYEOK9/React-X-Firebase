import Router from './components/Router';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
const App = () => {
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const [init, setInit] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);
    return (
        <div>
            {init ? <Router isLoggedin={isLoggedin} user={user} /> : null}
        </div>
    );
};

export default App;
