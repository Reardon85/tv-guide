import React, {useEffect, useState} from "react";
import { Route, Routes, Param} from "react-router-dom";
import Comment from "./Comment";

const Discussion = ({id}) => {

   
    const [comments, setComments] = useState([])
    const [commentsExist, setCommentsExist] = useState(true)
    const [formData, setFormData] = useState({
        user: "Anoymous",
        title: "",
        body: ""
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

        //setComments([...comments, formData])

        fetch(`http://localhost:3000/discussion/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comments: [...comments, formData]
            })
        })
        .then(r => r.json())
        .then(d => setComments(d.comments))

    }


    const commentArray = comments.map((comment) => {
        return <Comment key={comment.id} user={comment.user} title={comment.title} body={comment.body} />
    })

    


    return(
        
        
        <div>
            <h2>COMMENTS</h2>
            {commentArray}
            <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
                <input type="text" name="body" value={formData.body} onChange={handleChange} />
                <input type="submit" />


            </form>
            </div>
        </div>
       
        
    )
}

export default Discussion