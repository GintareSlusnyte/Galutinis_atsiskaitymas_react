import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Organisms/Header';
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
      </Routes>
    </>
  );
}

export default App;
