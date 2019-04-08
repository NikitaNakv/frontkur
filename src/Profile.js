import React, { Component } from 'react';
import Chat from "./Chat";
import ProfileSettings from "./ProfileSettings"
import Client from './Client';
import Menu from './Menu';

class Profile extends Component{


    constructor(props) {
        super(props);
        this.client = new Client();
    }

    componentDidMount() {
        this.client.auth(localStorage.getItem("username"),localStorage.getItem("authKey"));
    }

    render() {

        return(
            <div className="profile">
                <Menu/>
                <div className="Main">
                    <ProfileSettings/>
                    <Chat/>
                </div>
            </div>
        )
    };
}

export default Profile;