import React, { useState , useEffect, useRef} from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MicIcon from '@material-ui/icons/Mic';
import db from "../../firebase";
import firebase from 'firebase';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';


const Chat = () => {
    const [input, setInput] = useState("");
    const {contactId} = useParams();
    const [contactName, setContactName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    const messagesEndRef = useRef(null)

    
  
    useEffect(() => {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
          }, [messages]);

    useEffect(() => {
        // to Display the name at the top 

        if(contactId) {
            db.collection('contacts').doc(contactId).onSnapshot((snapshot) => (
                setContactName(snapshot.data().name)
            ));



            // to display the messages from data base

            db.collection('contacts').doc(contactId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))

        }
  
    }, [contactId])


    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);

        //sending message data to the database

        db.collection("contacts").doc(contactId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput("");
    }


    return (
        <div className="chat">
        <div className="chat__header">
                <Avatar /> 
                <div className="chat__headerInfo">
                    <h3>{contactName}</h3>
                    <p>
                    {new Date().toLocaleTimeString()}
                    </p>
                </div>

                <div className="chat__headerRight">
                <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertOutlinedIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
            {messages.map((message) => (
                    <p className={`chat__message ${ message.name === user.displayName && 'chat__receiver'}`}>
                        {message.message}
                        <span className="chat__time">{new Date(message.timestamp?.toDate()).toLocaleTimeString()}</span>
                    </p>
                    ))}
                    <div ref={messagesEndRef} />   
               </div> 

        <div className="chat__footer">
        <IconButton>
                    <InsertEmoticonOutlinedIcon />
                    </IconButton>
                    <IconButton>
                    < AttachFileOutlinedIcon/>
                    </IconButton>
                    
                    <form>
                        <input type="text" placeholder="Type a message" value={input} onChange={(e) => setInput(e.target.value)} />
                        <button onClick={sendMessage} type="submit">Send a message</button>
                    </form>
                    <MicIcon />
        </div>
        </div>
    )
}

export default Chat;
