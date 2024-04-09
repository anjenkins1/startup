import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Calculate } from './calculate/calculate';
//import { Saves } from './saves/saves';
import { About } from './about/about';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {

    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);  

    return (
        <BrowserRouter>
            <div className="body bg-light text-dark">
                <header className="container-fluid text-center text-light">
                    <nav className="navbar navbar-expand navbar-light">
                        <a className="navbar-brand" href="index.html">
                            <img src="assets/favicon.png" width="50" height="50"/>
                        </a>
                        <menu className="navbar-nav">
                            <li className='nav-item'>
                                <NavLink className='nav-link' to=''>
                                Login
                                </NavLink>
                            </li>
                            {authState === AuthState.Authenticated && (
                                <li className='nav-item'>
                                <NavLink className='nav-link' to='calculate'>
                                    Calculate
                                </NavLink>
                                </li>
                            )}
                            {/* {authState === AuthState.Authenticated && (
                                <li className='nav-item'>
                                <NavLink className='nav-link' to='saves'>
                                    Saves
                                </NavLink>
                                </li>
                            )} */}
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='about'>
                                About
                                </NavLink>
                            </li> 
                        </menu>
                    </nav>
                </header>
                <Routes>
                    <Route
                        path='/'
                        element={
                        <Login
                            userName={userName}
                            authState={authState}
                            onAuthChange={(userName, authState) => {
                            setAuthState(authState);
                            setUserName(userName);
                            }}
                        />
                        }
                        exact
                    />
                    <Route path='/calculate' element={<Calculate userName={userName} />} />
                    {/* <Route path='/saves' element={<Saves />} /> */}
                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className="d-flex flex-wrap py-4">
                    <p className="col-md-4 mb-0 text-light">© 2024 Andrew Jenkins</p>
                
                    <ul className="nav col-md-4 justify-content-center">
                        <li className="nav-item"><a href="https://github.com/anjenkins1/startup" className="nav-link px-2 text-light">Github</a></li>
                        <li className="nav-item"><a href="https://www.flaticon.com/free-icons/rat" className="nav-link px-2 text-light">Rat icons created by Freepik - Flaticon</a></li>
                    </ul>
                </footer>
            </div>
        </BrowserRouter>
    );
  }

  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }

  export default App;