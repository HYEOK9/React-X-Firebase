import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Auth from '../pages/Auth';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedin, user }) => {
    return (
        <BrowserRouter>
            {isLoggedin && <Navigation />}
            <div
                style={{
                    maxWidth: 890,
                    width: '100%',
                    margin: '0 auto',
                    marginTop: 80,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
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
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;
