import React, { Component } from 'react';
import Client from './Client';

export default class CaseSettings extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
        this.client = new Client();
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="caseSettings">
                <form>

                </form>
                <div id="idsa_div">
                    <label id="idsa"/>
                </div>
            </div>
        );
    }
}