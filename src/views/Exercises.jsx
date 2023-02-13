import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index-quiz.css';
// import ReactDOM from 'react-dom';
import Quiz from '../components/Quiz'
import {QuizProvider} from '../context/quiz';
import Grid from '@mui/material/Grid';

export default function Exercises() {
    return (
        <Grid container>
            <Grid item xs={12}>
            <QuizProvider>
                <Quiz/>
            </QuizProvider>
            </Grid>
        </Grid>
    )
}