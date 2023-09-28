import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import Feed from "./Pages/Feed";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './firebase/config';
import moment from "moment";
import "moment/locale/tr";

function App() {
  moment.locale("tr");
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/feeds');
      } else {
        navigate('/');
      }
    });
  }, []);
 
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/feeds" element={<Feed />} />
      </Routes>
    </>
  );
}

export default App;
