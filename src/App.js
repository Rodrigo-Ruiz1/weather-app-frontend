import React, { Fragment, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './components/StyledComponents/themes';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import Homepage from './components/Pages/Homepage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Forecast from './components/Pages/Forecast';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  const isAuth = async () => {
    try {
      const response = await fetch('http://localhost:3333/auth/is-verify', {
        method: 'GET',
        headers: { token: localStorage.token }
      });
      const parseResponse = await response.json();
      parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.log('ERROR: ', error);
      return error;
    }
  }

  useEffect(() => {
    isAuth();
  })

  return (
    <Fragment>
      <Router>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <GlobalStyles />
          <div className="App">
            <Navbar bg="light" expand="lg" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

              <button onClick={() => themeToggler()}></button>
              <Container >
                <Navbar.Brand><Link to="/">Weather App #10</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                      <Nav.Link>
                        <Link to="/">Home</Link>
                      </Nav.Link>
                      <Nav.Link><Link to="/forecast">Forecast</Link></Nav.Link>
                      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item>
                          <Link to="/dashboard">Profile</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link to="/login">Login</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link to="/register">Register</Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Switch>
              <Route exact path='/'>
                <Homepage isAuthenticated={isAuthenticated} />
              </Route>
              <Route exact path='/forecast'>
                <Forecast />
              </Route>
              <Route exact path='/login' render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} />) : (<Redirect to='/' />)} />
              <Route exact path='/register' render={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth} />) : (<Redirect to='/login' />)} />
              <Route exact path="/dashboard" render={props => isAuthenticated ? (<Dashboard {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}/>
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    </Fragment>
  );
}

export default App;
