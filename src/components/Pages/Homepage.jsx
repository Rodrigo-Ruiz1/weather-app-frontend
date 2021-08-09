import React from 'react';
import { useState, useEffect } from 'react';
import WeatherCard from '../WeatherCard';

const Homepage = () => {
    const [search, setSearch] = useState({
        city: '',
        state: ''
    })

    const [weather, setWeather] = useState({})
    const [user, setUser] = useState('');
    const [profilePic, setProfilePic] = useState({
        pic: ''
    });
    const [condition, setCondition] = useState()

    const _fetchWeather = async (city, state) => {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&units=imperial&appid=${process.env.REACT_APP_NOT_SECRET_CODE}`
        ).then(response => response.json());
        console.log('response for single date: ', response);
        setWeather([weather, response])
        setCondition([condition, response.weather[0].main])
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

    useEffect(() => {
        getUser();
    }, [])

    const _handleChange = (field, val) => {
        setSearch({
            ...search,
            [field]: val
        })
    }


    const _handleSubmit = (e) => {
        e.preventDefault();
        _fetchWeather(search.city, search.state);
    }
    console.log('condition: ', condition)



    return (
        <>
            <main>
            {weather.length > 0 ? (
                <WeatherCard search={search} weather={weather} condition={condition} />
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
            </main>
        </>
    )
}

export default Homepage;