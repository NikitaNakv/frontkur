import React, { Component } from 'react';
import Chat from "./Chat";
import FightSettings from "./FightSettings"
import Client from './Client';
import Menu from './Menu';

class Arena extends Component{


    constructor(props) {
        super(props);
        this.client = new Client();
    }

    componentDidMount() {
        this.client.auth(localStorage.getItem("username"),localStorage.getItem("authKey"));
    }

    render() {

        return(
            <div className="dungeon">
                <Menu/>
                <FightSettings/>
                <Chat/>
            </div>
        )
    };
}

export default Arena;