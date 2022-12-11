import React, { Suspense, useContext } from 'react'
import { Route, Routes } from "react-router-dom";
import { AuthContext } from './contexts/AuthContext';
import './App.css'
import SimpleSnackbar from './components/notifications/Notifications';

const Home = React.lazy(() => import("./pages/home/Home"));
const Register = React.lazy(() => import( "./pages/register/Register"))
const LogIn = React.lazy(() => import( "./pages/logIn/LogIn"))
const LogOut = React.lazy(() => import( "./pages/logOut/LogOut"))
const Profile = React.lazy(() => import( "./pages/profile/Profile"))
const NotFound = React.lazy(() => import( "./pages/notfound/NotFound"))

function App() {
  const { token } = useContext(AuthContext)
  return (
    <>
      {!token && 
      <Routes>
        <Route path='/register' element={<Suspense><Register /></Suspense>} />
        <Route path='/login' element={<Suspense><LogIn /></Suspense>} />
        <Route path="*" element={<Suspense><Register /></Suspense>} />
      </Routes>
      }
      {token && <>
        <Routes>
          <Route path="/" element={<Suspense><Home /></Suspense>} />
          <Route path='/logout' element={<Suspense><LogOut /></Suspense>} />
          <Route path='/profile' element={<Suspense><Profile /></Suspense>} />
          <Route path="*" element={<Suspense><NotFound /></Suspense>} />
        </Routes>
      </>
      }
      <SimpleSnackbar/>
    </>
  );
}

export default App;