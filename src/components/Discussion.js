import React, { useEffect, useState } from "react";
import { Route, Routes, Param, Link } from "react-router-dom";
import { Button, Form, Header, Comment, Message } from 'semantic-ui-react'
import Post from "./Post";
import 'semantic-ui-css/semantic.min.css'





const Discussion = ({ id, user }) => {


    const [comments, setComments] = useState([])
    const [commentsExist, setCommentsExist] = useState(true)
    const [formData, setFormData] = useState({
        date: "",
        text: ""
    })


    useEffect(() => {

        if (commentsExist) {
            fetch(`http://localhost:3000/discussion/${id}`)
                .then(r => r.json())
                .then(d => {
                    console.log(d)
                    if (d.id == null) {
                        setCommentsExist(false)
                    } else {
                        setComments(d.comments)
                    }
                })
        } else {
            const commentObj = {
                id: id,
                comments: []
            }

            fetch(`http://localhost:3000/discussion/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(commentObj)
            })
                .then(r => r.json())
                .then(d => console.log("test"))
        }

    }, [commentsExist])


    const handleChange = (e) => {

        setFormData({
            ...formData,
            text: e.target.value
        } )

    }
     console.log(user)
     console.log(formData)
     console.log("this is form data ^")

    const handleSubmit = (e) => {
        e.preventDefault()

        const date = new Date().toLocaleString()
        // console.log(date)

        fetch(`http://localhost:3000/discussion/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comments: [...comments, { ...formData, date: date, user: user.userName, avatar: user.avatar }]
            })
        })
            .then(r => r.json())
            .then(d => {
                // setFormData((formData) => ({ ...formData, text: "" }))
                setComments(d.comments)
            })

        // setFormData((formData) => ({ ...formData, text: "" }))

    }


    const commentArray = comments.map((comment) => {
        return <Post key={comment.id} user={comment.user} avatar={comment.avatar} text={comment.text} date={comment.date} />
    })




    return (


        <div>
            <br />
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {commentArray}
                <br />


                { user.loggedIn ? 
                    <Form onSubmit={handleSubmit}>
                        <Form.TextArea name="text" value={formData.text} onChange={handleChange} />
                        <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                    </Form>
                    :
                    <Message>
                    <h3>You Must Log In To Comment</h3>
                    <Link to={'/login'}>LOG IN</Link>
                </Message>

                }
            </Comment.Group>

        </div>


    )
}

export default Discussion