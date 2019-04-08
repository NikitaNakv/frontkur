import React, { Component } from 'react';
import Chat from "./Chat";
import ArenaSettings from "./ArenaSettings"
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
            <div className="arena">
                <Menu/>
                <div className="Main">
                    <ArenaSettings/>
                    <Chat/>
                </div>
            </div>
        )
    };
}

export default Arena;