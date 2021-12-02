import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TaskProvider from './TaskContext'
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <TaskProvider>
    <Router>
    <App />
    </Router>
  </TaskProvider>
  ,
  document.getElementById('root')
);
