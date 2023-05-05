import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.css';
import overlay from './images/overlay.png';
import bg from './images/bg.jpg';

const root = ReactDOM.createRoot(document.getElementById('root'));
const wrapperStyle = {
    // backgroundImage: `url(${overlay}), linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${bg})`,
    // backgroundPosition: 'top',
    // backgroundSize: 'cover',
    // backgroundSize: '100%',
    // backgroundRepeat: 'no-repeat',
    // overflow: 'hidden',
    // backgroundColor: '#222931',
    backgroundColor: '#212830',
    
};

// radial-gradient(circle 50rem at 50% 0, rgba(87,84,77,1), rgba(33,40,48,1)),
// linear-gradient(0deg, rgba(33,40,48,1), rgba(0,255,0,0))
const wrapperColorStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    background: `radial-gradient(circle 50rem at 50% 0, rgba(87,84,77,1), rgba(33,40,48,1)),
                linear-gradient(0deg, rgba(33,40,48,1), rgba(0,255,0,0))`,
    
    
}
root.render(
    <React.StrictMode>
        <div id="wrapper" style={wrapperStyle}>
            <div id="wrapper-color" style={wrapperColorStyle} />
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
