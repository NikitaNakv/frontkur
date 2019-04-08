import React, { Component } from 'react';
import Client from './Client';

export default class InventorySettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            items : [],
            currentItem : {},
            equipedItem : {}

        };
        this.client = new Client();
    }

    componentWillMount() {
        this.client.getUserItems(localStorage.getItem("username"),localStorage.getItem("authKey"))
            .then(r=>this.setState({items:r}));
        this.interval = setInterval(()=>this.client.getUserItems(localStorage.getItem("username"),localStorage.getItem("authKey"))
            .then(r=>this.setState({items:r})),1000);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getSelectedItem(){
        let currentItem = this.state.items.find(x=>x.itemName === document.getElementById("select").value);
        this.setState({currentItem : currentItem});
    };
    getEquipedItem(){
        this.client.getEquipedItem(localStorage.getItem("username"),localStorage.getItem("authKey"))
            .then(r=>this.setState({equipedItem : r}));
    };


    componentDidUpdate() {
        this.getSelectedItem();
        this.getEquipedItem();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.items === nextState.items && this.state.currentItem === nextState.currentItem &&
            this.state.equipedItem === nextState.equipedItem) {
            return false
        }
        return true
    }

    equipHandler() {
        this.client.equipItem(localStorage.getItem("username"),localStorage.getItem("authKey"),
            this.state.items.find(x=>x.itemName === document.getElementById("select").value).itemName);
        setTimeout(() => this.forceUpdate(),100);
    }

    render() {
        return (
            <div className="inventorySettings">
                <form>
                    <div>
                        <select id="select" onChange={()=>{this.getSelectedItem()}}>
                            {this.state.items.map((item, i) =>
                                <option key={i} value={item.itemName}>{item.itemName}</option>)}
                        </select>
                    </div>
                    <div>
                        <div>
                            <label className="textLabel" >count:</label>
                            <label className="textLabel">{this.state.currentItem.itemsCount}</label>
                        </div>
                        <div>
                            <label className="textLabel">Item's name:</label>
                            <label className="textLabel" >{this.state.currentItem.itemName}</label>
                        </div>
                        <div>
                            <label className="textLabel">attack:</label>
                            <label className="textLabel" >{this.state.currentItem.attack}</label>
                        </div>
                        <div>
                            <label className="textLabel">defense:</label>
                            <label className="textLabel" >{this.state.currentItem.defense}</label>
                        </div>
                        <div>
                            <label className="textLabel">hp:</label>
                            <label className="textLabel" >{this.state.currentItem.hp}</label>
                        </div>
                        <button type="button" className="button" onClick={()=>this.equipHandler()}>Equip it</button>
                        <div>
                            <label className="textLabel">Equiped item:</label>
                            <label className="textLabel" >{this.state.equipedItem.toString()}</label>
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