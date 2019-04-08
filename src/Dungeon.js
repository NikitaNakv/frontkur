import React, { Component } from 'react';
import Chat from "./Chat";
import DungeonSettings from "./DungeonSettings"
import Client from './Client';
import Menu from './Menu';

class Dungeon extends Component{


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
                <DungeonSettings/>
                <Chat/>
            </div>
        )
    };
}

export default Dungeon;