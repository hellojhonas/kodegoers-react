import React from 'react';
import ReactDOM from 'react-dom/client';
import './index-quiz.css';
// import ReactDOM from 'react-dom';
import Quiz from './components/Quiz';
import { QuizProvider } from './context/quiz';

 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
  <React.StrictMode>
    <QuizProvider>
    <Quiz />
    </QuizProvider>
  </React.StrictMode>
);