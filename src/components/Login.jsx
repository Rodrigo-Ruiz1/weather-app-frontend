import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })
    const { email, password } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { email, password }
            const response = await fetch('http://localhost:3333/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const parseResponse = await response.json()
            localStorage.setItem('token', parseResponse.token)
            setAuth(true)
        } catch (error) {
            console.log('ERROR: ', error);
            return error;
        }
    }

    return (
        <Fragment>

            <h1>Login</h1>
            <Form onSubmit={onSubmitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)} />
                </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
            </Form>
            <p>Don't have an account yet? Try: <Link to='/register'>Register</Link></p>
        </Fragment>
                
            )
}
            export default Login;