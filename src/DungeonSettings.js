import React, { Component } from 'react';
import Client from './Client';

export default class DungeonSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            worlds : [],
            info : {}
        };
        this.client = new Client();
    }

    componentWillMount() {
        this.getWorlds();
    }

    componentDidMount() {
        this.getWorldInfo();
    }

    getWorlds(){
        this.client.getAllWorlds(localStorage.getItem("username"),localStorage.getItem("authKey"))
            .then(r=>{this.setState({worlds : r})});
    }

    getWorldInfo(){
        if (document.getElementById("selectWorld").value === null ||
            document.getElementById("selectWorld").value === "" ||
            document.getElementById("selectWorld").value === undefined) {
            let world = "dota";
            this.client.getWorldInfo(localStorage.getItem("username"), localStorage.getItem("authKey"), world)
                .then(r => {
                    this.setState({info: r})
                });
        }else {
            let world = document.getElementById("selectWorld").value;
            this.client.getWorldInfo(localStorage.getItem("username"),localStorage.getItem("authKey"),world)
                .then(r=>{this.setState({info:r})});
        }
    }

    fightHandler() {
        localStorage.setItem("worldname",document.getElementById("select").value);
        window.location.assign("./fight");
    }

    selectHandler(e){
        let world = e.target.value;
        this.client.getWorldInfo(localStorage.getItem("username"),localStorage.getItem("authKey"),world)
            .then(r=>{this.setState({info:r})});
    }

    render() {
        return (
            <div className="dungeonSettings">
                <form>
                    <div>
                        <select className="select" id="selectWorld" onChange={(e)=>{this.selectHandler(e)}}>
                            {this.state.worlds.map((world, i) =>
                                <option key={i} value={world.worldname}>{world.worldname}</option>)}
                        </select>
                    </div>
                    <div>
                        <div>
                            <label className="textLabel" >enemy name:</label>
                            <label className="textLabel">{this.state.info.creatureName}</label>
                        </div>
                        <div>
                            <label className="textLabel" >enemy count:</label>
                            <label className="textLabel">{this.state.info.creaturesCount}</label>
                        </div>
                        <div>
                            <label className="textLabel" >enemy attack:</label>
                            <label className="textLabel">{this.state.info.creatureAttack}</label>
                        </div>
                        <div>
                            <label className="textLabel">enemy defense:</label>
                            <label className="textLabel" >{this.state.info.creatureDefense}</label>
                        </div>
                        <div>
                            <label className="textLabel">enemy hp:</label>
                            <label className="textLabel" >{this.state.info.creatureHp}</label>
                        </div>
                        <button type="button" className="button" onClick={()=>{this.fightHandler()}}>Fight</button>
                    </div>
                </form>
                <div id="idsa_div">
                    <label id="idsa"/>
                </div>
            </div>
        );
    }
}