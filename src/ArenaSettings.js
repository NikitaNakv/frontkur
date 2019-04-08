import React, { Component } from 'react';
import Client from './Client';

export default class ArenaSettings extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
        this.client = new Client();
    }


    render() {
        return (
            <div className="arenaSettings">
                <form>
                    <div>
                        <select id="select">

                        </select>
                    </div>
                    <div>
                        <div>
                            <label className="textLabel" >count:</label>
                            <label className="textLabel"></label>
                        </div>
                        <div>
                            <label className="textLabel">Item's name:</label>
                            <label className="textLabel" ></label>
                        </div>
                        <div>
                            <label className="textLabel">attack:</label>
                            <label className="textLabel" ></label>
                        </div>
                        <div>
                            <label className="textLabel">defense:</label>
                            <label className="textLabel" ></label>
                        </div>
                        <div>
                            <label className="textLabel">hp:</label>
                            <label className="textLabel" ></label>
                        </div>
                        <button type="button" className="button" >Equip it</button>
                        <div>
                            <label className="textLabel">Equiped item:</label>
                            <label className="textLabel" ></label>
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