import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import Client from "./Client";
import RouterButton from './RouterButton';
import Logo from './Logo';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false
        };
        this.client = new Client();
    }

    componentWillMount() {
        let client = new Client();
        console.log(client.auth(localStorage.getItem("username"),localStorage.getItem("authKey")));
        this.client.auth(localStorage.getItem("username"),localStorage.getItem("authKey"));
        if (localStorage.getItem("auth") === "pass"){
            window.location.assign("./profile");
        }
    }



    login = () => {
        if (document.getElementById("us").value !== undefined &&
            document.getElementById("ps").value !== undefined ) {
            let us = document.getElementById("us").value;
            let ps = document.getElementById("ps").value;
            this.client.login(us,ps);
        }
    };

    render() {

        let { from } = this.props.location.state || { from: { pathname: "/profile" } };

        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;


        return (

            <div className="login">
                <div>
                    <Logo id="LOGO" path="/info" text="LOGO"/>
                    <RouterButton path="/login" text="Login"/>
                    <RouterButton path="/register" text="Register"/>
                </div>
                <div className="loginForm">
                    <form>
                        <div>
                            <label className="textLabel">User name</label>
                            <input id="us" className="text" type="text" placeholder="username"/>
                        </div>
                        <div>
                            <label className="textLabel">User password</label>
                            <input id="ps" className="text" type="password" placeholder="current-password"/>
                        </div>
                    </form>
                    <button className="button" onClick={()=>{this.login()}}>Log in</button>
                </div>
            </div>
        );
    }
}