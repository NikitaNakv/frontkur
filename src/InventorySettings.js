import React, { Component } from 'react';
import Client from './Client';

export default class InventorySettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            items : [],
            currentItem : ""

        };
        this.client = new Client();
    }

    componentDidMount() {
    }

    getSelectedItem(){
        let currentItem = this.state.items.filter(x=>x.name===document.getElementById("selectItem").value);
        this.setState({currentItem : currentItem});
    }

    render() {
        return (
            <div className="inventorySettings">
                <form>
                    <div>
                        <select id="selectItem" onChange={()=>{this.getSelectedItem()}}>
                            {this.state.items.map((item, i) =>
                                <option key={i} value={item.itemname}>{item.itemname}</option>)}
                        </select>
                    </div>
                    <div>
                        <div>
                            <label >{this.state.currentItem.count}</label>
                        </div>
                        <div>
                            <label >{this.state.currentItem.itemname}</label>
                        </div>
                        <div>
                            <label >{this.state.currentItem.attack}</label>
                        </div>
                        <div>
                            <label >{this.state.currentItem.defense}</label>
                        </div>
                        <div>
                            <label >{this.state.currentItem.hp}</label>
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