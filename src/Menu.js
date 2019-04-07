import React, { Component } from 'react';
import Client from "./Client";
import CaseContainer from './CaseContainer';

class Menu extends Component{

    constructor(props) {
        super(props);
        this.client = new Client();
    }

    logOutHandler = ()=> {
        this.client.logout(localStorage.getItem("username"),localStorage.getItem("authKey"));
    };

    onClick(path){
        window.location.assign("." + path);
    }

    render() {
        return(
            <div className="menu">

                <button className="button" id="LOGO" onClick={() => {this.onClick("/profile")}}>LOGO</button>

                <button className="button" onClick={() => {this.onClick("/profile")}}>Profile settings</button>

                <button className="button" onClick={()=>{this.onClick("/arena")}}>Arena</button>

                <button className="button" onClick={()=>{this.onClick("/dungeon")}}>Dungeon</button>

                <button className="button" onClick={()=>{this.onClick("/stats")}}>Hero settings</button>

                <button className="button" onClick={()=>{this.onClick("/inventory")}}>Inventory</button>

                <button className="button" onClick={()=>{this.logOutHandler()}}>Log out</button>

                <CaseContainer/>

            </div>
        )
    };
}

export default Menu;