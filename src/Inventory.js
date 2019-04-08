import React, { Component } from 'react';
import Chat from "./Chat";
import InventorySettings from "./InventorySettings"
import CaseSettings from "./CaseSettings"
import Client from './Client';
import Menu from './Menu';

class Inventory extends Component{


    constructor(props) {
        super(props);
        this.state = {
        };
        this.client = new Client();
    }

    componentDidMount() {
        this.client.auth(localStorage.getItem("username"),localStorage.getItem("authKey"));
    }

    render() {
        return(
            <div className="inventory">
                <Menu/>
                <div className="Main">
                    <InventorySettings/>
                    <CaseSettings/>
                    <Chat/>
                </div>
            </div>
        )
    };
}

export default Inventory;