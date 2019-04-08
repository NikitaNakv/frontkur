import React, { Component } from 'react';
import Client from './Client';

export default class DungeonSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            worldname: localStorage.getItem("worldname"),
            battleInfo: {}
        };
        this.client = new Client();
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount(){
        this.client.worldBattle(localStorage.getItem("username"),localStorage.getItem("authKey"),this.state.worldname)
    .then(r=>{this.setState({battleInfo:r})});
        console.log(this.state.battleInfo);
        this.interval = setInterval(()=>document.getElementById("textArea").innerHTML = this.state.battleInfo,500);
    }


    render() {
        return (
            <div className="fightSettings">
                <form>
                    <div>
                        <textarea className="text" id="textArea">{this.state.battleInfo}</textarea>
                    </div>
                </form>
                <div id="idsa_div">
                    <label id="idsa"/>
                </div>
            </div>
        );
    }
}