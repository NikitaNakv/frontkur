import React, { Component } from 'react';
import {Link,Redirect} from "react-router-dom";
import Client from "./Client";

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
                <ul>
                    <li>
                        <Link to="/info">Info Page</Link>
                        <Link to="/register">Register Page</Link>
                        <Link to="/login">Login Page</Link>
                    </li>
                </ul>
                <form>
                    <input id="us" className="text" type="text" placeholder="username"/>
                    <input id="ps" className="text" type="password" placeholder="current-password"/>
                </form>
                <button className="button" onClick={()=>{this.login().bind(this)}}>Log in</button>
            </div>
        );
    }
}