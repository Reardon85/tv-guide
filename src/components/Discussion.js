import React, {useEffect, useState} from "react";
import { Route, Routes, Param} from "react-router-dom";
import { Button, Form, Header, Comment } from 'semantic-ui-react'
import Post from "./Post";
import 'semantic-ui-css/semantic.min.css'


const Discussion = ({id, user}) => {

   
    const [comments, setComments] = useState([])
    const [commentsExist, setCommentsExist] = useState(true)
    const [formData, setFormData] = useState({
        user: user.userName,
        date: "",
        avatar: user.avatar,
    })


    useEffect (() => {

        if(commentsExist){
        fetch(`http://localhost:3000/discussion/${id}`)
        .then(r => r.json())
        .then(d => { 
            console.log(d)
            if(d.id== null){
                setCommentsExist(false)
            }else{
            setComments(d.comments)}
        })
        }else{
            const commentObj = {
                id: id,
                comments:[]
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
            [e.target.name]: e.target.value
        })

    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const date = new Date().toLocaleString()
        console.log(date)

        

        //setComments([...comments, formData])

        fetch(`http://localhost:3000/discussion/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comments: [...comments, {...formData, date: date}]
            })
        })
        .then(r => r.json())
        .then(d => setComments(d.comments))

        setFormData((formData) => ({...formData, text:""}))

    }


    const commentArray = comments.map((comment) => {
        return <Post key={comment.id} user={comment.user} avatar={comment.avatar} text={comment.text} date={comment.date} />
    })

    


    return(
        
        
        <div>
      <br/>
    <Comment.Group>
        <Header as='h3' dividing>
            Comments
        </Header>
            {commentArray}
            <br />
   
    
            
            <Form onSubmit={handleSubmit}>
            <Form.TextArea name="text" value={formData.text} onChange={handleChange} />
            <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                {/* <input type="text" name="title" value={formData.title} onChange={handleChange} />
                <input type="text" name="body" value={formData.body} onChange={handleChange} />
                <input type="submit" /> */}


            </Form>
        </Comment.Group>
            
        </div>
       
        
    )
}

export default Discussion