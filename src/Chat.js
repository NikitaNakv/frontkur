import React, { Component } from 'react';
import './App.css';
import Client from './Client';


export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            chatRooms: []
        };
        this.client = new Client();
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
       this.client.getChats(localStorage.getItem('username'),localStorage.getItem('authKey'))
            .then(r => this.setState({chatRooms:r}));

        console.log(this.state.messages);

        this.interval = setInterval(()=>this.client.getChatMessages(localStorage.getItem('username'),localStorage.getItem('authKey'),this.getSelectedRoom())
            .then(r => this.setState({messages:r})),500);

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.messages === nextState.messages && this.state.chatRooms === nextState.chatRooms){
            console.log("false");
            return false;
        }
        return true;
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    sendMessage(text) {
        let room = this.getSelectedRoom();
        let message = {
            id : 0,
            chatname : room,
            username : localStorage.getItem("username"),
            text : text,
            date : Date.now().toString()

        };
        this.state.messages.unshift(message);
        this.forceUpdate();
        this.client.sendMessage(localStorage.getItem("username"),localStorage.getItem("authKey"),
            this.getSelectedRoom(),text);
    }

    getSelectedRoom(){
        return document.getElementById("selectRoom").value
    }

    onClick(path){
        window.location.assign("." + path);
    }

    render() {
        return (
            <div className="app">
                <Rooms chatRooms={this.state.chatRooms}/>
                <MessageList
                    messages={this.state.messages} />
                <SendMessageForm
                    sendMessage={this.sendMessage} />
                    <button className="button" onClick={() => {this.onClick("/managechats")}}>Manage Chats</button>
            </div>
        );
    }
}

class MessageList extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="message-list" className="message-list">
                {this.props.messages.map((message, i) => {
                    return (
                        <li  key={i} className="message">
                            <div>{message.username}</div>
                            <div>{message.text}</div>
                        </li>
                    )
                })}
            </div>
        )
    }
}

class SendMessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message"
                    type="text" />
            </form>
        )
    }
}

class Rooms extends Component{

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <select id="selectRoom">
                {this.props.chatRooms.map((chatRooms, i) =>
                    <option key={i} value={chatRooms.chatname}>{chatRooms.chatname}</option>)}
            </select>
        )
    }
}