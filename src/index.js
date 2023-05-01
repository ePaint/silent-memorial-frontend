import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.css';
import overlay from './images/overlay.png';
import bg from './images/bg.jpg';

const root = ReactDOM.createRoot(document.getElementById('root'));
const style = { backgroundImage: `url(${overlay}), linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${bg})` };
root.render(
    <React.StrictMode>
        <div id="wrapper" className="fade-in" style={style}>
            <App />
        </div>
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/jquery.scrollex.min.js"></script>
        <script src="assets/js/jquery.scrolly.min.js"></script>
        <script src="assets/js/browser.min.js"></script>
        <script src="assets/js/breakpoints.min.js"></script>
        <script src="assets/js/util.js"></script>
        <script src="assets/js/main.js"></script>
    </React.StrictMode>
);
