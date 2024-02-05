import React from 'react';
import ReactDOM from 'react-dom/client';

//styles
import App from './App';
//redux
// import {configureStore} from "@reduxjs/toolkit";
// import allReducers from './reducers';

// export const store = configureStore (allReducers);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


