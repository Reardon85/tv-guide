import logo from '../HBOMIN.png'
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const LogIn = ({ user, onSetUser }) => {

  //  const path = useParams()

  //  console.log(path['*'])

  // useEffect(() => {
  //        fetch(`https://api.tvmaze.com/shows/${path['*']}`)
  // .then(r => r.json())
  // .then(d => {
  //   console.log(d)
  //   onSetShowDetails(d)})

  //   }, []);

  const [accountLogIn, setAccountLogIn] = useState({
    email: "",
    password: ""
  })

  const logInPersist = (d) => {

    const statusObj = {
      id: user.ip,
      loggedIn: true,
      userName: d.userName,
      avatar: d.avatar
    }

    fetch(`http://localhost:3000/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(statusObj)
    })
      .then(r => r.json())
      .then(d => {
        if(Object.keys(d).length !== 0){
        onSetUser((user) => ({
          ...user,
          loggedIn: true
        }))
      }
      })



  }

  const handleLogOut = () => {

    fetch(`http://localhost:3000/status/${user.ip}`, {
      method: "DELETE"
    })
    .then(onSetUser((user) => ({
      ...user,
      loggedIn: false
    })))
  }

  const handleChange = (e) => {
    setAccountLogIn((accountLogIn) => ({
      ...accountLogIn,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/users/${accountLogIn.email}`)
      .then(r => r.json())
      .then(d => {
        if (Object.keys(d).length !== 0) {
          logInPersist(d)
        }
      })
  }


  console.log(user)






  return (
    <>
      {
        user.loggedIn ?

          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>

              <Message>
                <h3>You Are Already Logged In </h3>
                <Button color='black' fluid size='large' onClick={handleLogOut}>
                  Log Out
                </Button>
              </Message>
            </Grid.Column>

          </Grid>
          :
          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='black' textAlign='center'>
                {/* <Image src={logo}  /> */} Log In
              </Header>
              <Form size='large' onSubmit={handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                    name="email"
                    value={accountLogIn.email}
                    onChange={handleChange}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name="password"
                    value={accountLogIn.password}
                    onChange={handleChange}
                  />

                  <Button color='black' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <Link to={"/register"}>Sign Up</Link>
              </Message>
            </Grid.Column>
          </Grid>
      }

    </>
  )
}

export default LogIn