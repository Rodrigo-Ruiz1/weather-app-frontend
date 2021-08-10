import {Card, ListGroup, ListGroupItem, Button} from 'react-bootstrap';

const ForecastCards = ({forecast, index, search, user}) => {

    return (
        <>
                    <Card style={{ width: '18rem' }}>
                        {forecast[1].list[index].weather[0].main === 'Clouds' ? (
                            <Card.Img variant="top" src="https://64.media.tumblr.com/5670cfe270505127cfe23973b12aff02/tumblr_mtv8cieZCz1s9xty6o1_500.gif" style={{height: "220px"}}/>
                        ) : forecast[1].list[index].weather[0].main === 'Clear' ? (
                            <Card.Img variant="top" src="https://www.climatecouncil.org.au/wp-content/uploads/2018/12/3-solar.gif" style={{height: "220px"}}/>
                        ) : forecast[1].list[index].weather[0].main === 'Thunderstorm' ? (
                            <Card.Img variant="top" src="https://i.pinimg.com/originals/86/e9/3c/86e93c22dc293e0213e56cf467bce44f.gif" style={{height: "220px"}}/>
                        ) : forecast[1].list[index].weather[0].main === 'Rain' ? (
                            <Card.Img variant="top" src="https://giffiles.alphacoders.com/333/3331.gif" style={{height: "220px"}}/>
                        ) : forecast[1].list[index].weather[0].main === 'Drizzle' ? (
                            <Card.Img variant="top" src="https://64.media.tumblr.com/7e8fc92fb4ce74d211e1cb18093775a1/tumblr_mwpchkUCbD1qct5eso1_500.gif" style={{height: "220px"}}/>
                        ) : forecast[1].list[index].weather[0].main === 'Snow' ? (
                            <Card.Img variant="top" src="https://data.whicdn.com/images/305814092/original.gif" style={{height: "220px"}}/>
                        ) : (
                            <Card.Img variant="top" src="https://ukmadcat.com/wp-content/uploads/2019/04/sleepy-cat.jpg" style={{height: "220px"}}/>
                        )}
                        <div id="weatherDiv">
                            <Card.Title>{forecast[1].city.name}</Card.Title>
                            <Card.Text>
                                <br/>
                                <h3>{forecast[1].list[index].main.temp}°<br/>
                                </h3>
                                <strong>{forecast[1].list[index].weather[0].main}</strong>
                            </Card.Text>
                        </div>
                        <br/>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Feels like: {forecast[1].list[index].main.feels_like}°</ListGroupItem>
                            <ListGroupItem>Humidity: {forecast[1].list[index].main.humidity}%</ListGroupItem>
                        </ListGroup>
                    </Card>
        </>
    )
}

export default ForecastCards;