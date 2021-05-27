import React, { useEffect, useRef, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Feed from './sidebarfeed/Feed';
import db from "../../firebase"
import { useStateValue } from '../../StateProvider';

const Sidebar = () => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");
    const [{user}, dispatch] = useStateValue(); 


    useEffect(() => {
        db.collection("contacts").onSnapshot(snapshot => (
            setContacts(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
        )) 
        
}, [])

const handleSubmit = (e) => {
    e.preventDefault()
    setSearch("")
}
    return (
        <div className="sidebar">
           <div className="sidebar__header">
            <Avatar src={user.photoURL}/>
            <div className="sidebar__headerIcons">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <MessageIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
           </div>

           <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <form>
                    <input type="text" placeholder="search or start a new chat" value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                    </div>
           </div>
        
           <div className="sidebar__feed">
               <Feed addNewChat/>
               {contacts.filter((contact) => {
                   console.log(contact.data.name);
                        if(search === ""){
                            return contact
                        }else if(contact.data.name.toLowerCase().includes(search.toLowerCase())){
                            return contact
                        }
                    }).map((contact) => (
                   <Feed name={contact.data.name} id={contact.id} key={contact.id}/>
               ))}
           </div>
        </div>
    )
}

export default Sidebar;
