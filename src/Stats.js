import React, { Component } from 'react';
import Chat from "./Chat";
import ProfileSettings from "./ProfileSettings"
import Client from './Client';
import Menu from './Menu';

class Stats extends Component{


    constructor(props) {
        super(props);
        this.client = new Client();
    }

    render() {

        return(
            <div className="profile">
                <Menu/>
                <ProfileSettings/>
                <Chat/>
            </div>
        )
    };
}

export default Stats;