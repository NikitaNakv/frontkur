import React, { Component } from 'react';
import Client from './Client';

export default class CaseSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            cases : []
        };
        this.client = new Client();
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="caseSettings">
                <form>
                    <div>
                        {}
                    </div>
                </form>
                <div id="idsa_div">
                    <label id="idsa"/>
                </div>
            </div>
        );
    }
}