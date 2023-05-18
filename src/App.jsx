import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Organisms/Header';
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';
import RegisterPage from './components/Pages/RegisterPage';
import Footer from './components/Organisms/Footer';
import PostoKortelesPage from './components/Pages/PostoKortelesPage';
import AddNewPost from './components/Pages/AddNewPost';

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/profile' element={<PostoKortelesPage />}/>
        <Route path='/newPost' element={<AddNewPost />}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
