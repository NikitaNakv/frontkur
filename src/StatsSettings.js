import React, { Component } from 'react';
import Client from './Client';

export default class StatsSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            stats : {},
            equipedItem : {}
        };
        this.client = new Client();
    }

    componentWillMount() {
        this.getStats();
        this.getEquipedItem();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.stats === nextState.stats && this.state.equipedItem === nextState.equipedItem){
            return false;
        }
        return true;
    }

    getStats(){
        this.client.getHeroStats(localStorage.getItem("username"),localStorage.getItem("authKey"))
            .then(r=>{this.setState({stats:r})});
    }

    getEquipedItem(){
        this.client.getEquipedItem(localStorage.getItem("username"),localStorage.getItem("authKey"))
            .then(r=>this.setState({equipedItem : r}));
    }

    changeHeroNameHandler() {
        let newName = document.getElementById("newName").value;
        this.client.changeHeroName(localStorage.getItem("username"),localStorage.getItem("authKey"),newName)
            .then(r=>{this.setState({stats : r })});
    }

    render() {
        return (
            <div className="statsSettings">
                <form>
                    <div>
                        <div>
                            <label className="textLabel" >heroname:</label>
                            <label className="textLabel">{this.state.stats.heroname}</label>
                        </div>
                        <div>
                            <label className="textLabel">attack:</label>
                            <label className="textLabel" >{this.state.stats.attack}</label>
                        </div>
                        <div>
                            <label className="textLabel">defense:</label>
                            <label className="textLabel" >{this.state.stats.defense}</label>
                        </div>
                        <div>
                            <label className="textLabel">hp:</label>
                            <label className="textLabel" >{this.state.stats.hp}</label>
                        </div>
                        <div>
                            <label className="textLabel">Equiped item:</label>
                            <label className="textLabel" >{this.state.equipedItem.toString()}</label>
                        </div>
                        <div>
                            <input id="newName" className="text" type="text" placeholder="new name"/>
                            <button type="button" className="button" onClick={()=>this.changeHeroNameHandler()}>Change name</button>
                        </div>
                    </div>
                </form>
                <div id="idsa_div">
                    <label id="idsa"/>
                </div>
            </div>
        );
    }
}