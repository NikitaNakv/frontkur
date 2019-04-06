import React, { Component } from 'react';
import Chat from "./Chat";
import ProfileSettings from "./ProfileSettings"
import Client from './Client';

class Profile extends Component{


    constructor(props) {
        super(props);
        this.client = new Client();
    }

    onClick(path){
        window.location.assign("." + path);
    }

    logOutHandler = ()=> {
        this.client.logout(localStorage.getItem("username"),localStorage.getItem("authKey"));
    };



    render() {




        return(
            <div className="player">
                <div className="menu">

                    <button className="button" id="LOGO" onClick={() => {this.onClick("/profile")}}>LOGO</button>
                    <button className="button" onClick={() => {this.onClick("/profile")}}>Profile settings</button>

                    <button className="button" onClick={()=>{this.onClick("/arena")}}>Arena</button>

                    <button className="button" onClick={()=>{this.onClick("/dungeon")}}>Dungeon</button>

                    <button className="button" onClick={()=>{this.onClick("/stats")}}>Hero settings</button>

                    <button className="button" onClick={()=>{this.onClick("/inventory")}}>Inventory</button>

                    <button className="button" onClick={()=>{this.logOutHandler()}}>Log out</button>
                </div>
                <ProfileSettings/>
                <div>
                    <Chat/>
                </div>
            </div>
        )
    };
}

export default Profile;