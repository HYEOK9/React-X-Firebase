import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Auth from '../pages/Auth';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedin, user }) => {
    return (
        <BrowserRouter>
            {isLoggedin && <Navigation />}
            <Routes>
                {isLoggedin ? (
                    <>
                        <Route path='/' element={<Home user={user} />} />
                        <Route
                            path='/profile'
                            element={<Profile user={user} />}
                        />
                    </>
                ) : (
                    <Route path='/' element={<Auth />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
