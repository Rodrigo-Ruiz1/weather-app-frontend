import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

const WeatherCard = ({ search, weather, user, button, favorites, setButton }) => {

    const _addFavorite = async (city, state, user_id) => {
        const body = { city, state, user_id }
        const response = await fetch('http://localhost:3333/dashboard/add_favorite', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const parseResponse = await response.json()
        console.log(parseResponse)
    }

    const _removeFavorite = async () => {
        const filtered = favorites.filter(favorite => favorite.city == `${search.city}`)
        const favorite_id = filtered.map(favorite => {
            return (favorite.id)
        })
        const response = await fetch('http://localhost:3333/dashboard/delete_favorite', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: favorite_id[0]
            })
        });
        const parseResponse = await response.json();
        console.log(parseResponse)

    }

    const _handleAddRemove = (e) => {
        if (button === 'Favorite') {
            _addFavorite(search.city, search.state, user.id);
            setButton('Remove')
        } else if (button === 'Remove') {
            _removeFavorite()
            setButton('Favorite')
        }
    }

    return (
        <>
            <Card style={{ width: '18rem' }}>
                {weather[1].weather[0].main === 'Clouds' ? (
                    <Card.Img variant="top" src="https://64.media.tumblr.com/5670cfe270505127cfe23973b12aff02/tumblr_mtv8cieZCz1s9xty6o1_500.gif" style={{ height: "220px" }} />
                ) : weather[1].weather[0].main === 'Clear' ? (
                    <Card.Img variant="top" src="https://www.climatecouncil.org.au/wp-content/uploads/2018/12/3-solar.gif" style={{ height: "220px" }} />
                ) : weather[1].weather[0].main === 'Thunderstorm' ? (
                    <Card.Img variant="top" src="https://i.pinimg.com/originals/86/e9/3c/86e93c22dc293e0213e56cf467bce44f.gif" style={{ height: "220px" }} />
                ) : weather[1].weather[0].main === 'Rain' ? (
                    <Card.Img variant="top" src="https://giffiles.alphacoders.com/333/3331.gif" />
                ) : weather[1].weather[0].main === 'Drizzle' ? (
                    <Card.Img variant="top" src="https://64.media.tumblr.com/7e8fc92fb4ce74d211e1cb18093775a1/tumblr_mwpchkUCbD1qct5eso1_500.gif" style={{ height: "220px" }} />
                ) : weather[1].weather[0].main === 'Snow' ? (
                    <Card.Img variant="top" src="https://data.whicdn.com/images/305814092/original.gif" style={{ height: "220px" }} />
                ) : (
                    <Card.Img variant="top" src="https://ukmadcat.com/wp-content/uploads/2019/04/sleepy-cat.jpg" style={{ height: "220px" }} />
                )}
                <div id="weatherDiv">
                    <Card.Title>{weather[1].name}</Card.Title>
                    <Card.Text>
                        <br />
                        <h3>{weather[1].main.temp}°<br />
                        </h3>
                        <strong>{weather[1].weather[0].main}</strong>
                    </Card.Text>
                </div>
                <br />
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Feels like: {weather[1].main.feels_like}°</ListGroupItem>
                    <ListGroupItem>Humidity: {weather[1].main.humidity}%</ListGroupItem>
                    <ListGroupItem>Wind Speed: {weather[1].wind.speed} MPH</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    {user ? (
                        <Button onClick={e => _handleAddRemove(e)}>{button}</Button>
                    ) : (
                        null
                    )}
                </Card.Body>
            </Card>
        </>
    )
}

export default WeatherCard;