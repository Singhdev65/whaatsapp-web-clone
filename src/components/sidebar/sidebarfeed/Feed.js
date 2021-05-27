import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import "./Feed.css"
import db from "../../../firebase";
import {Link} from "react-router-dom"

const Feed = ({addNewChat, name, id}) => {
    
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if(id) {
            db.collection("contacts").doc(id).collection('messages').orderBy("timestamp", "desc").onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => 
                doc.data()))
            )
        }
    }, [id])

    const createContact = () => {
        const contactName = prompt("Enter the name: ")
        
        if(contactName) {
            db.collection("contacts").add({
                name: contactName
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/contacts/${id}`}>
    <div className="feed">
            <Avatar />
            <div className="feed__info">
                <h3>{name}</h3>
                <p>{messages[0]?.message}</p>
            </div>
    </div> 
    </Link>
    ) : (
        <div className="feed" onClick={createContact}>
            <h3>Add Contact</h3>
        </div>
    )
}

export default Feed;
