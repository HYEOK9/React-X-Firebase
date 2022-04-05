import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import Auth from '../pages/Auth';
const AppRouter = ({ isLoggedin, user }) => {
    return (
        <BrowserRouter>
            <Routes>
                {isLoggedin ? (
                    <>
                        <Route path='/' element={<Home user={user} />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/profile/edit' element={<EditProfile />} />
                    </>
                ) : (
                    <Route path='/' element={<Auth />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
