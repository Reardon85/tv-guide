import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const Register = ({ user, onSetUser }) => {



    const [accountRegister, setAccountRegister] = useState({
        userName: "",
        email: "",
        password: ""
    })
    const [accountExists, setAccountExists] = useState({
        email: [],
        userName: []
    })
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3000/exist/check`)
            .then(r => r.json())
            .then(d => {
                setAccountExists({
                    email: d.email,
                    userName: d.userName
                })
            })
    }, []);



    const createAccount = () => {
        const userObj = {
            id: accountRegister.email,
            userName: accountRegister.userName,
            password: accountRegister.password,
            avatar: "duck"
        }

        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        })
            .then(r => r.json())
            .then(d => {
                if (Object.keys(d).length !== 0) {
                    addToExists(d.userName.toLowerCase(), d.id.toLowerCase())
                }
            })
    }

    const addToExists = (newUser, newEmail) => {
        fetch(`http://localhost:3000/exist/check`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: [...accountExists.email, newEmail],
                userName: [...accountExists.userName, newUser]
            })
        })
            .then(r => r.json())
            .then(d => {
                if (Object.keys(d).length !== 0) {
                    setAccountExists({
                        email: d.email,
                        userName: d.userName
                    })
                }
                alert("Registration Successful")
                navigate("/login")
            })
    }

    const handleChange = (e) => {
        setAccountRegister((accountRegister) => ({
            ...accountRegister,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (accountExists.email.includes(accountRegister.email.toLocaleLowerCase()) ) {

            alert("Email is Already Registered")
        } else if( accountExists.userName.includes(accountRegister.userName.toLocaleLowerCase)){
            alert("User Name Is Already Taken")
        } else {
            createAccount()
        }
    }

    console.log(accountExists)






    return (


        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center'>
                    {/* <Image src={logo}  /> */} Register Account
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            fluid icon='user'
                            iconPosition='left'
                            placeholder='User Name'
                            name="userName"
                            value={accountRegister.userName}
                            onChange={handleChange}
                        />
                        <Form.Input
                            fluid icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            name="email"
                            value={accountRegister.email}
                            onChange={handleChange}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="password"
                            value={accountRegister.password}
                            onChange={handleChange}
                        />

                        <Button color='black' fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>


    )
}

export default Register