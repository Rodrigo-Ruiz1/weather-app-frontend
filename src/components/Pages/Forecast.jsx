import {useState, useEffect} from 'react';
import ForecastCards from '../StyledComponents/FavoritesCards';
import { Card, Form, Button } from 'react-bootstrap';

const Forecast = () => {
    const [search, setSearch] = useState({
        city: '',
        state: '',
    });
    const [forecast, setForecast] = useState({});
    const [user, setUser] = useState('');

    const _fetchForecast = async (city, state) => {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},us&units=imperial&appid=${process.env.REACT_APP_NOT_SECRET_CODE}`
        ).then(response => response.json());
        console.log('response: ', response)
        setForecast([forecast, response])
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
        _fetchForecast(search.city, search.state);
    }

    return (
        <>
                {/* <div id="search">
                    <h1>Search a city for a forecast</h1>
                    <form onSubmit={_handleSubmit}>
                        <input type="text" value={search.city} onChange={(event) => _handleChange('city', event.target.value)} />
                        <input type="text" value={search.state} onChange={(event) => _handleChange('state', event.target.value)} />
                        <button type="submit">Search</button>
                    </form>
                    {forecast.length > 0 ? (
                        <>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap"}}>
                    <ForecastCards forecast={forecast} search={search} user={user} index={0}/>
                    <ForecastCards forecast={forecast} search={search} user={user} index={8}/>
                    <ForecastCards forecast={forecast} search={search} user={user} index={16}/>
                    <ForecastCards forecast={forecast} search={search} user={user} index={24}/>
                    <ForecastCards forecast={forecast} search={search} user={user} index={32}/>
                        </div>
                    </>
                ) : (
                    null
                )}
                </div> */}
                <Card>
                <Card.Header>Forecast</Card.Header>
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
                    {forecast.length > 0 ? (
                        <>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap"}}>
                    <ForecastCards forecast={forecast} search={search} user={user} index={0}/>
                    <ForecastCards forecast={forecast} search={search} user={user} index={8}/>
                    <ForecastCards forecast={forecast} search={search} user={user} index={16}/>
                    <ForecastCards forecast={forecast} search={search} user={user} index={24}/>
                    <ForecastCards forecast={forecast} search={search} user={user} index={32}/>
                        </div>
                    </>
                ) : (
                    null
                )}
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default Forecast;