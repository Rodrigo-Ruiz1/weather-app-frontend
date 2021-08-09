import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';

const Register = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        username: ''
    })
    const { email, password, username } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {email, password, username}
            const response = await fetch('http://localhost:3333/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
        });
        const parseResponse = await response.json()
        localStorage.setItem('token', parseResponse.token)
        setAuth(true);
        } catch (error) {
            console.log('ERROR: ', error);
            return error;
        }
    }

    return (
        <Fragment>
            <h1>Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)}></input>
                <input type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)}></input>
                <input type="test" name="username" placeholder="username" value={username} onChange={e => onChange(e)}></input>
                <button>Submit</button>
            </form>
            <Link to='/login'>Login</Link>
        </Fragment>
    )
}
export default Register;