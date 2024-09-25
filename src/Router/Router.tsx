import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Intro from 'pages/Intro';
import LoginPage from 'pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import RegisterPage from 'pages/RegisterPage';
import Main from 'pages/Main';
import Main2 from 'pages/Main2';
import PhotoPage from 'pages/PhotoPage';
import { Fortune } from 'pages/Fortune';
import MooQuiz from 'pages/MooQuiz';
import StartQuiz from 'pages/StartQuiz';
import { ContentIntro } from 'pages/ContentIntro';
import { StampPage } from 'pages/StampPage';
import CheerUpPage from 'pages/CheerUpPage';
import FourCutPage from 'pages/FourCutPage';
import KonvaTextOnImage from '../components/KonvaTextOnImage';

import { Introduce } from 'pages/Introduce';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/photo" element={<PhotoPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main2" element={<Main2 />} />
        <Route path="/fourcut" element={<FourCutPage />} />
        <Route path="/contIntro/:id" element={<ContentIntro />} />
        <Route path="/mooQuiz" element={<MooQuiz />} />
        <Route path="/startQuiz" element={<StartQuiz />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/fortune" element={<Fortune />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/a" element={<KonvaTextOnImage />} />
          {/* 로그인이 필요한 라우트 같은 경우에는 아래에 작성. */}
          <Route path="/main" element={<Main />} />
          <Route path="/cheerup" element={<CheerUpPage />} />
          <Route path="/stamp" element={<StampPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
