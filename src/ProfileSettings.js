import React, { Component } from 'react';
import Client from './Client';

export default class ProfileSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : "username",
            email : "email"

        };
        this.client = new Client();
    }

    componentDidMount() {
        this.client.getInfo(localStorage.getItem("username"),localStorage.getItem("authKey"))
            .then(r => this.setState({username:r.username,email:r.email}));
    }



    emailChangerHandler = () => {

        let newEmail = document.getElementById("newEmailInput").value;
        let oldPass = document.getElementById("currentPassword").value;
        this.client.changeEmail(localStorage.getItem("username"),oldPass,newEmail)
            .then(email => this.setState({email:email}));
    };

    passwordChangeHandler = () => {

        let newPass = document.getElementById("newPasswordInput").value;
        let oldPass = document.getElementById("currentPassword").value;
        this.client.changePassword(localStorage.getItem("username"),oldPass,newPass);
    };

    render() {
        return (
            <div className="profileSettings">
                <div className="profileInfoContainer">
                    <div className="profileInfo">
                        <label className="textLabel">current username:</label>
                        <label className="textLabel">current email:</label>
                    </div>
                    <div className="profileInfo">
                        <label className="textLabel">{this.state.username}</label>
                        <label className="textLabel">{this.state.email}</label>
                    </div>
                </div>
                <form>
                    <div>
                        <label className="textLabel">change password</label>
                        <div>
                            <input id="newPasswordInput" type="text" className="text"/>
                            <button className="button" type="button" onClick={()=> {this.passwordChangeHandler()}}>change</button>
                        </div>
                    </div>
                    <div>
                        <label className="textLabel">change email</label>
                        <div>
                            <input id="newEmailInput" type="text" className="text"/>
                            <button className="button" type="button" onClick={()=> {this.emailChangerHandler()}}>change</button>
                        </div>
                    </div>
                    <div>
                        <label className="textLabel" id="codeLabel">Confirm your current password</label>
                    </div>
                    <div>
                        <input id="currentPassword" type="password" className="text"/>
                    </div>
                    <div id="idsa_div">
                        <label id="idsa"/>
                    </div>
                </form>
            </div>
        );
    }
}
