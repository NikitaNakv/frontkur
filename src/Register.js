import React, { Component } from 'react';
import Client from './Client';
import RouterButton from './RouterButton';
import Logo from './Logo';


export default class Register extends Component {
    constructor(props){
        super(props);
        this.client = new Client();
    }

    login = () => {
        this.props.login(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    handleFormReg = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        if (document.getElementById("us").value !== undefined &&
            document.getElementById("ps").value !== undefined &&
            document.getElementById("email").value !== undefined) {
            let us = document.getElementById("us").value;
            let ps = document.getElementById("ps").value;
            let email = document.getElementById("email").value;
            console.log("You have submitted username:", us);
            console.log("You have submitted password:", ps);
            this.client.register(us, ps, email);
            document.getElementById("code").removeAttribute("hidden");
            document.getElementById("codeButton").removeAttribute("hidden");
            document.getElementById("codeLabel").removeAttribute("hidden");
        }

    };

    handleFormRegCheck = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        if (document.getElementById("code").value !== undefined &&
            document.getElementById("email").value !== undefined) {
            let code = document.getElementById("code").value;
            let email = document.getElementById("email").value;
            this.client.registerCheck(email,code);
        }

    };

    upd(error) {
        if (error !== "successful") {
            document.getElementById("idsa").innerHTML = error;
            document.getElementById("idsa").setAttribute("style", "color: black");
            document.getElementById("idsa_div").setAttribute("style", "background-color: red");
        }else{
            document.getElementById("idsa").innerHTML = error;
            document.getElementById("idsa").setAttribute("style", "color: black");
            document.getElementById("idsa_div").setAttribute("style", "background-color: green");
        }
    }

    render() {


        return (
            <div className="register">
                <div>
                    <Logo id="LOGO" path="/info" text="LOGO"/>
                    <RouterButton path="/login" text="Login"/>
                    <RouterButton path="/register" text="Register"/>
                </div>
                <div id="idsa_div">
                    <label id="idsa"/>
                </div>
                <form>
                    <div>
                        <label className="textLabel">User name</label>
                        <input className="text" id="us" type="text" placeholder="username"/>
                    </div>
                    <div>
                        <label className="textLabel">User email</label>
                        <input className="text" id="email" type="text" placeholder="email"/>
                    </div>
                    <div>
                        <label className="textLabel">User password</label>
                        <input className="text" id="ps" type="password" placeholder="password"/>
                    </div>
                    <div>
                        <label className="textLabel">Confirm user password</label>
                        <input className="text" type="password" placeholder="confirm password"/>
                    </div>
                    <div>
                        <label className="textLabel" id="codeLabel" hidden="hidden">Check your email address for auth code</label>
                    </div>
                    <div>
                        <input className="text" id="code" type="text" hidden="hidden" placeholder="confirm email code"/>
                        <button className="button" id="codeButton" hidden="hidden" onClick={this.handleFormRegCheck}>confirm email</button>
                    </div>
                </form>
                <button className="button" onClick={this.handleFormReg}>Register</button>
            </div>
        );
    }
}