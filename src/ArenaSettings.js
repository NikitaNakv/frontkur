import React, { Component } from 'react';
import Client from './Client';
import Register from "./Register";

export default class ArenaSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            battleInfo: {}
        };
        this.client = new Client();
        this.regist = new Register();
    }

    componentWillMount() {
        this.timeout = setTimeout(()=>{this.regist.upd("no opponents")},100000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    componentDidMount(){
        this.client.arena(localStorage.getItem("username"),localStorage.getItem("authKey"))
            .then(r=>{this.setState({battleInfo:r})});
        setInterval(()=>document.getElementById("textArea").innerHTML = this.state.battleInfo,5000);
    }


    render() {
        return (
            <div className="arenaSettings">
                <div>
                    <label className="textLabel">you will get your opponent soon</label>
                </div>
                <form>
                    <div>
                        <textarea className="textArea" id="textArea">{this.state.battleInfo}</textarea>
                    </div>
                </form>
                <div id="idsa_div">
                    <label id="idsa"/>
                </div>
            </div>
        );
    }
}