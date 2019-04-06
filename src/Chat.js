import React, { Component } from 'react';
import './App.css';

const DUMMY_DATA = [
    {
        senderId: "perborgen",
        text: "who'll win?"
    },
    {
        senderId: "janedoe",
        text: "who'll win?"
    }
];

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            chatRooms:[]
        };
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {

        // TODO запрос на получение сообщений

    }

    sendMessage(text) {
    }

    render() {
        return (
            <div className="app">
                <Rooms chatRooms={this.state.chatRooms}/>
                <MessageList
                    messages={this.state.messages} />
                <SendMessageForm
                    sendMessage={this.sendMessage} />
            </div>
        );
    }
}

class MessageList extends Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <li  key={message.id} className="message">
                            <div>{message.senderId}</div>
                            <div>{message.text}</div>
                        </li>
                    )
                })}
            </ul>
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
            <select>
            {this.props.chatRooms.map((chatRooms, i) => <option key={i}>{chatRooms.name}</option>)}
            </select>
        )
    }
}




/*<td>{Math.round(this.props.pts.x*100)/100}</td>
                <td>{Math.round(this.props.pts.y*100)/100}</td>
                <td>{Math.round(this.props.pts.r*100)/100}</td>
                <td>{Math.round(this.props.pts.result*100)/100}</td>*/