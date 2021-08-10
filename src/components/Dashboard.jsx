import React, { Fragment, useState, useEffect } from 'react';
import { Card, Button, Form, Dropdown, Spinner } from 'react-bootstrap';
import WeatherCard from './WeatherCard';

const Dashboard = ({ setAuth }) => {

    const [user, setUser] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [newPic, setNewPic] = useState({
        pic: ""
    });

    const [favorites, setFavorites] = useState([])
    const [weather, setWeather] = useState({})
    const [condition, setCondition] = useState()
    const [menu, setMenu] = useState('')


    async function getUser() {
        try {
            const response = await fetch('http://localhost:3333/dashboard/', {
                method: 'GET',
                headers: { token: localStorage.token }
            });

            const parseResponse = await response.json()
            console.log(parseResponse)
            console.log(parseResponse.user)
            setUser(parseResponse.user)
            setProfilePic(parseResponse.user.profile_pic)
        } catch (error) {
            console.log('ERROR: ', error)
            return error;
        }
    }

    const _fetchFavorites = async (user_id) => {
        const response = await fetch(
            `http://localhost:3333/dashboard/favorites/${user_id}`
        ).then(response => response.json());
        console.log('favorites response: ', response);
        setFavorites(response)

    }

    const _fetchWeather = async (city, state) => {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&units=imperial&appid=${process.env.REACT_APP_NOT_SECRET_CODE}`
        ).then(response => response.json());
        console.log('response for single date: ', response);
        setWeather([weather, response])
        setCondition([condition, response.weather[0].main])
        return response;
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token');
        setAuth(false);
        localStorage.setItem('token', null)
    }

    useEffect(() => {
        getUser()
    }, [])

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3333/dashboard/profile_pic', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: `'${newPic.pic}'`,
                    user_id: user.id
                })
            });
            const parseResponse = await response.json();
            console.log(parseResponse);
            setProfilePic(newPic.pic)
            console.log("profile pic: ", profilePic)
        } catch (error) {
            console.log('ERROR: ', error);
            return error;
        }
    }

    const _handleFavoritesRequest = async (e) => {
        _fetchFavorites(user.id)
    }

    const onChange = (e) => {
        setNewPic({
            ...newPic,
            [e.target.name]: e.target.value
        })
    }

    const _menuChange = (field, val) => {

    }

    return (
        <Fragment>
            {user ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card style={{ width: '25rem' }}>
                            {profilePic == null ? (
                                <Card.Img variant="top" src="http://cdn.onlinewebfonts.com/svg/img_258083.png"></Card.Img>
                            ) : (

                                <Card.Img variant="top" src={profilePic} />
                            )}
                            <Card.Body>
                                <Card.Title>{user.username}</Card.Title>
                                <Card.Text>
                                    <form onSubmit={onSubmitForm}>
                                        <input value={newPic.pic} name="pic" placeholder="Enter URL for new image" onChange={e => onChange(e)}></input>
                                        <button variant="primary">Submit</button>
                                    </form>
                                </Card.Text>
                                <Button variant="primary" onClick={e => _handleFavoritesRequest(e)}>View your favorites</Button>
                                <Button variant="primary" onClick={e => logout(e)}>Logout</Button>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Dropdown Button
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Body>
                        </Card>
                    </div>
                </>
            ) : (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
        </Fragment>
    )
}
export default Dashboard;