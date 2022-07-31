import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
   
} from "react-router-dom";
import LoopLogin from './components/LoopLogin';
import { LoopProvider } from './context/LoopContext';
import Dashboard from './components/Dashboard';
import AddedRestaurants from './components/AddedRestaurants';
import AutoComplete from './components/AutoComplete';
import BookmarkedRestaurants from './components/BookmarkedRestaurants';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './components/Theme';
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={Theme}>
  <LoopProvider>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard><AutoComplete /> 
            <AddedRestaurants /></Dashboard>}> 
    </Route>
    <Route path="home" element={<Dashboard><AutoComplete /> <AddedRestaurants /></Dashboard>}> 
    </Route>
    <Route path="bookmark" element={<Dashboard>
            <BookmarkedRestaurants /></Dashboard>}> 
    </Route>
    
    <Route path="login" element={<LoopLogin />}> 
    
    </Route>
    <Route path="*" element={<LoopLogin />} />

  </Routes>
</BrowserRouter>
</LoopProvider>
</ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
