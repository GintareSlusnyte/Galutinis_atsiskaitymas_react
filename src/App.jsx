import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Organisms/Header';
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';
import RegisterPage from './components/Pages/RegisterPage';
import Footer from './components/Organisms/Footer';
import PostoKortelesPage from './components/Pages/PostoKortelesPage';
import AddNewPost from './components/Pages/AddNewPost';
import CommentsPage from './components/Pages/CommentsPage';
import AddNewComment from './components/Pages/AddNewComment';
import EditPost from './components/Pages/EditPost';


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
        <Route path='/comments/:id' element={<CommentsPage />}/>
        <Route path='/newComment/:id' element={<AddNewComment />}/>
        <Route path='/editPost/:id' element={<EditPost />}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
