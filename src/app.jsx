import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

{/* <header className="container-fluid text-center text-light">
<nav className="navbar navbar-expand navbar-light">
    <a className="navbar-brand" href="index.html">
        <img src="assets/favicon.png" width="50" height="50"/>
    </a>
    <menu className="navbar-nav">
        <li className="nav-item"><a id="user-option-nav-active" className="nav-link text-light" href="index.html">Home</a></li>
        <li id="user-options1" className="nav-item" style="display: none"><a className="nav-link text-light" href="calculator.html">Calculator</a></li>
        <li id="user-options2" className="nav-item" style="display: none"><a className="nav-link text-light" href="saves.html">Saved Reactions</a></li>
        <li id="user-options3" className="nav-item" style="display: none"><a className="nav-link text-light" href="about.html">About</a></li>        
    </menu>
</nav>
</header> */}

export default function App() {
    return (
        <div className="bg-light text-dark">
            <header className="container-fluid text-center text-light">
                <nav className="navbar navbar-expand navbar-light">
                    <a className="navbar-brand" href="index.html">
                        <img src="assets/favicon.png" width="50" height="50"/>
                    </a>
                    <menu className="navbar-nav">
                        <li className="nav-item"><a id="user-option-nav-active" className="nav-link text-light" href="index.html">Home</a></li>
                        {/* <li id="user-options1" className="nav-item" style="display: none"><a className="nav-link text-light" href="calculator.html">Calculator</a></li>
                        <li id="user-options2" className="nav-item" style="display: none"><a className="nav-link text-light" href="saves.html">Saved Reactions</a></li>
                        <li id="user-options3" className="nav-item" style="display: none"><a className="nav-link text-light" href="about.html">About</a></li>         */}
                    </menu>
                </nav>
            </header>
            <main>MAIN APP COMPONENTS HERE</main>
            <footer className="d-flex flex-wrap py-4">
                <p className="col-md-4 mb-0 text-light">© 2024 Andrew Jenkins</p>
            
                <ul className="nav col-md-4 justify-content-center">
                    <li className="nav-item"><a href="https://github.com/anjenkins1/startup" className="nav-link px-2 text-light">Github</a></li>
                    <li className="nav-item"><a href="https://www.flaticon.com/free-icons/rat" className="nav-link px-2 text-light">Rat icons created by Freepik - Flaticon</a></li>
                </ul>
            </footer>
        </div>
    );
  }