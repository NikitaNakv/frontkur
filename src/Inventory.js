import React, { Component } from 'react';
import Chat from "./Chat";
import InventorySettings from "./InventorySettings"
import CaseSettings from "./CaseSettings"
import Client from './Client';
import Menu from './Menu';

class Inventory extends Component{


    constructor(props) {
        super(props);
        this.client = new Client();
    }

    render() {
        return(
            <div className="inventory">
                <Menu/>
                <InventorySettings/>
                <Chat/>
            </div>
        )
    };
}

export default Inventory;