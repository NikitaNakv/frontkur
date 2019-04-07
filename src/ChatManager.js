import React, { Component } from 'react';
import Chat from "./Chat";
import ChatSettings from "./ChatSettings"
import Client from './Client';
import Menu from './Menu';

class ChatManager extends Component{


    constructor(props) {
        super(props);
        this.client = new Client();
    }


    render() {

        return(
            <div className="profile">
                <Menu/>
                <ChatSettings/>
                <Chat/>
            </div>
        )
    };
}

export default ChatManager;