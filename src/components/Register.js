import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import rhino from '../avatars/rhino.svg'
import duck from '../avatars/duck.svg'
import eagle from '../avatars/eagle.svg'
import fox from '../avatars/fox.svg'
import owl from '../avatars/owl.svg'
import tiger from '../avatars/tiger.svg'
import whale from '../avatars/whale.svg'

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
    
    const avatarArray = [rhino, duck, eagle, fox, owl, tiger, whale]
    const navigate = useNavigate()
    const randomNumber = Math.floor(Math.random()*7)

    useEffect(() => {
        fetch(`https://hbomin.onrender.com/exist/check`)
            .then(r => r.json())
            .then(d => {
                setAccountExists({
                    email: d.email,
                    userName: d.userName
                })
            })
    }, []);


    var bcrypt = require('bcryptjs');


  


    const createAccount = (hashPassword) => {
        console.log(typeof(hashPassword))
        const newPw = String(hashPassword)
        
        console.log("hashed PW: ", newPw)
        const userObj = {
            id: accountRegister.email.toLowerCase(),
            userName: accountRegister.userName,
            password: hashPassword,
            avatar: avatarArray[randomNumber]
        }

        console.log(userObj)

        fetch(`https://hbomin.onrender.com/users`, {
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
        fetch(`https://hbomin.onrender.com/exist/check`, {
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

        if (accountExists.email.includes(accountRegister.email.toLowerCase()) ) {

            alert("Email is Already Registered")
        } else if( accountExists.userName.includes(accountRegister.userName.toLowerCase())){
            alert("User Name Is Already Taken")
        } else {

            const saltRounds = 10

            bcrypt.hash(accountRegister.password, saltRounds)
            .then( d =>  createAccount(d)
            )
           
        }
    }

    






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