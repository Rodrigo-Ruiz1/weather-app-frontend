import React, { Fragment, useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const Dashboard = ({ setAuth }) => {

    const [user, setUser] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [newPic, setNewPic] = useState({
        pic: ""
    });
    
    const [fCity, setFCity] = useState([]);
    const [fState, setFState] = useState([]);
    const [fId, setFId] = useState([]);

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
        response.map(favorite => {
            console.log(favorite.city)
            setFCity({...fCity}, favorite.city)
            setFState({...fState}, favorite.state)
            setFId({...fId}, favorite.id)
        })
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

    return (
        <Fragment>
            {user ? (
                <>
                    <Card style={{ width: '18rem' }}>
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
                            <Button variant="primary" onClick={e => logout(e)}>Logout</Button>
                        </Card.Body>
                    </Card>
                </>
            ) : (
                <h1>Currently not logged in</h1>
            )}
        </Fragment>
    )
}
export default Dashboard;