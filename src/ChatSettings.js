import React, { Component } from 'react';
import Client from './Client';

export default class ChatSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            adminedChats : [],
            requests : []
        };
        this.client = new Client();
    }

    componentWillMount() {
        this.client.getAdminedChats(localStorage.getItem("username"),localStorage.getItem("authKey"))
            .then(r=>this.setState({adminedChats:r}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.client.getChatRequests(localStorage.getItem("username"),localStorage.getItem("authKey"),this.getSelected("selectChat"))
            .then(r=>this.setState({requests:r}));
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.requests.length === nextState.requests.length && this.state.adminedChats === nextState.adminedChats) {
            return false
        }
        return true
    }

    getSelected(id){
        return document.getElementById(id).value
    }

    joinHandler(){
        let joinChat = document.getElementById("join").value;
        this.client.joinChat(localStorage.getItem("username"),localStorage.getItem("authKey"),joinChat);
    }

    createHandler(){
        let createChat = document.getElementById("create").value;
        this.client.createChat(localStorage.getItem("username"),localStorage.getItem("authKey"),createChat)
    }

    acceptRequestHandler(){
        this.client.acceptChatRequest(localStorage.getItem("username"),localStorage.getItem("authKey")
            ,this.getSelected("selectRequest"),this.getSelected("selectChat"));
    }

    chatSelectHandler(){
        this.client.getChatRequests(localStorage.getItem("username"),localStorage.getItem("authKey"),this.getSelected("selectChat"))
            .then(r=>this.setState({requests:r}));
    }


    render() {
        return (
            <div className="profileSettings">
                <form>
                    <div>
                        <select id="selectChat" onChange={()=>{this.chatSelectHandler()}}>
                            {this.state.adminedChats.map((chat, i) =>
                                <option key={i} value={chat.chatname}>{chat.chatname}</option>)}
                        </select>
                    </div>
                    <div>
                        <select id="selectRequest">
                            {this.state.requests.map((request, i) =>
                                <option key={i} value={request.username}>{request.username}</option>)}
                        </select>
                        <button className="button" onClick={()=>{this.acceptRequestHandler()}}>Accept request</button>
                    </div>
                    <div>
                        <input id="create" className="text" type="text" placeholder="chat name"/>
                        <button className="button" onClick={()=>{this.createHandler()}}>Create chat</button>
                    </div>
                    <div>
                        <input id="join" className="text" type="text" placeholder="chat name"/>
                        <button className="button" onClick={()=>{this.joinHandler()}}>Join chat</button>
                    </div>
                </form>
                <div id="idsa_div">
                    <label id="idsa"/>
                </div>
            </div>
        );
    }
}