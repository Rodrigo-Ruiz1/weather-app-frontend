import React from 'react';
import { useState, useEffect } from 'react';
import WeatherCard from '../WeatherCard';
import { Card, Button, Form } from 'react-bootstrap';

const Homepage = () => {
    const [search, setSearch] = useState({
        city: '',
        state: ''
    })

    const [weather, setWeather] = useState({})
    const [user, setUser] = useState('');
    const [favorites, setFavorites] = useState([])
    const [button, setButton] = useState('Favorite');
    const [profilePic, setProfilePic] = useState({
        pic: ''
    });

    const _fetchWeather = async (city, state) => {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&units=imperial&appid=${process.env.REACT_APP_NOT_SECRET_CODE}`
        ).then(response => response.json());
        console.log('response for single date: ', response);
        setWeather([weather, response])
        return response;
    }

    async function getUser() {
        try {
            const response = await fetch('http://localhost:3333/dashboard/', {
                method: 'GET',
                headers: { token: localStorage.token }
            });

            const parseResponse = await response.json()
            setUser(parseResponse.user)
            console.log('USER SET AS: ', user)
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


    useEffect(() => {

        getUser();
        if (button === 'Remove') {
            const result = favorites.map(favorite => favorite.id)
            console.log('result', result)
        }
    }, [])

    const _handleChange = (field, val) => {
        setSearch({
            ...search,
            [field]: val
        })
    }


    const _handleSubmit = (e) => {
        if (user) {
            _fetchFavorites(user.id)
            _fetchWeather(search.city, search.state)
            const match = favorites.some(favorite => favorite.city === `${search.city}`)
            if (match === true) {
                setButton('Remove')
            } else {
                setButton('Favorite')
            }
        } else {
            _fetchWeather(search.city, search.state)
            const match = favorites.some(favorite => favorite.city === `${search.city}`)
            if (match === true) {
                setButton('Remove')
            } else {
                setButton('Favorite')
            }
        }

    }



    return (
        <>
            {/* <main>
                {weather.length > 0 ? (
                    <WeatherCard search={search} weather={weather} user={user} button={button} setButton={setButton} favorites={favorites} />
                ) : (
                    null
                )}
                <div id="search">
                    <h1>Search a city!</h1>
                    <form onSubmit={_handleSubmit}>
                        <input type="text" value={search.city} onChange={(event) => _handleChange('city', event.target.value)} />
                        <input type="text" value={search.state} onChange={(event) => _handleChange('state', event.target.value)} />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </main> */}
            <Card>
                <Card.Header>Daily Weather</Card.Header>
                <Card.Body>
                    <Card.Title><h3>Search a city</h3></Card.Title>
                    <Card.Text>
                            <form onSubmit={_handleSubmit}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Form.Control type="text" placeholder="city" style={{width: '200px'}} value={search.city} onChange={(event) => _handleChange('city', event.target.value)} />
                        <Form.Control type="text" placeholder="st" style={{width: '200px'}} value={search.state} onChange={(event) => _handleChange('state', event.target.value)} />
                        </div>
                            </form>
                    </Card.Text>
                    <Button variant="primary" onClick={e => {_handleSubmit(e)}}>Search</Button>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    {weather.length > 0 ? (
                    <WeatherCard search={search} weather={weather} user={user} button={button} setButton={setButton} favorites={favorites} />
                ) : (
                    null
                )}
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default Homepage;