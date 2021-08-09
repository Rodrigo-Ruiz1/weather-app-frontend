import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';

const WeatherCard = ({ search, weather, condition }) => {
    console.log(condition[1])
    let background 
    if (condition[1] == "cloudy") {
        let background = "https://www.hartlepoolmail.co.uk/jp-ct.co.uk/image/onecms:36ac21ea-e68e-47c7-bde3-c49e6c29a2bf:c82615b6-7f20-45f8-9a65-94425e5fc404/GettyImages-1175368521.jpg?c=52,0,4733,3152"
    }

    return (
        <>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                        <div id="weatherDiv">
                            <Card.Title>{weather[1].name}, {search.state.toUpperCase()}</Card.Title>
                            <Card.Text>
                                <br/>
                                <h3>{weather[1].main.temp}<br/>
                                </h3>
                                <strong>{weather[1].weather[0].main}</strong>
                            </Card.Text>
                        </div>
                        <br/>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Feels like: {weather[1].main.feels_like}</ListGroupItem>
                            <ListGroupItem>Humidity: {weather[1].main.humidity}%</ListGroupItem>
                            <ListGroupItem>Vestibulum at eros</ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
        </>
    )
}

export default WeatherCard;