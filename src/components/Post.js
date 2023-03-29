import React, { useEffect } from "react";
import { Route, Routes, Param } from "react-router-dom";
import { Button, Form, Header, Comment } from 'semantic-ui-react'


const Post = ({ user, avatar, text, date }) => {






    return (

        
        <Comment>
            <Comment.Avatar src={"./duck.svg"} />
            <Comment.Content>

                <Comment.Author>{user}</Comment.Author>
                <Comment.Metadata>
          <div>{date}</div>
        </Comment.Metadata>
                <Comment.Text>{text}</Comment.Text>
            </Comment.Content>
        </Comment>


    )
}

export default Post