import React, { Component } from 'react';
import Chat from "./Chat";
import StatsSettings from "./StatsSettings"
import Client from './Client';
import Menu from './Menu';

class Stats extends Component{


    constructor(props) {
        super(props);
        this.client = new Client();
    }

    componentDidMount() {
        this.client.auth(localStorage.getItem("username"),localStorage.getItem("authKey"));
    }

    render() {

        return(
            <div className="stats">
                <Menu/>
                <StatsSettings/>
                <Chat/>
            </div>
        )
    };
}

export default Stats;