import React, {useEffect} from "react";
import { Route, Routes, Param} from "react-router-dom";

const Comment = ({user, title, body}) => {



    


    return(
        
        
        <div>
            <p>
            <b>
            Author: {user}
            <br/>
            Topic: {title}
            </b><br/>
            {body}
            </p>
        </div>

        
    )
}

export default Comment