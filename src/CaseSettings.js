import React, { Component } from 'react';
import Client from './Client';

export default class CaseSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            cases : []
        };
        this.client = new Client();
        this.lastDrop = "last drop: ";
    }

    componentWillMount() {
        this.client.getUserCases(localStorage.getItem("username"),localStorage.getItem("authKey"))
            .then(r=>this.setState({cases:r}));
        this.interval = setInterval(()=>{ this.client.getUserCases(localStorage.getItem("username"),localStorage.getItem("authKey"))
            .then(r=>this.setState({cases:r}))},1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.cases === undefined){
            return true;
        }
        /*if (this.state.cases.find(x=>x.casetype==="papich").quantity === nextState.cases.find(x=>x.casetype==="papich").quantity &&
            this.state.cases.find(x=>x.casetype==="itmo").quantity === nextState.cases.find(x=>x.casetype==="itmo").quantity){
            return false;
        }*/
        if (this.state.cases === nextState.cases){
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        document.getElementById("papichCase").innerHTML = this.state.cases.find(x=>x.casetype==="papich").quantity;
        document.getElementById("itmoCase").innerHTML = this.state.cases.find(x=>x.casetype==="itmo").quantity;
    }


    itmoCaseOpenHandler() {
        this.client.openCase(localStorage.getItem("username"),localStorage.getItem("authKey"),"itmo")
            .then(r=>{document.getElementById("lastDrop").innerHTML=this.lastDrop.concat(r)});
        this.client.getUserCases(localStorage.getItem("username"),localStorage.getItem("authKey"))
            .then(r=>this.setState({cases:r}));
    }

    papichCaseOpenHandler() {
       this.client.openCase(localStorage.getItem("username"),localStorage.getItem("authKey"),"papich")
           .then(r=>{document.getElementById("lastDrop").innerHTML=this.lastDrop.concat(r)});
        this.client.getUserCases(localStorage.getItem("username"),localStorage.getItem("authKey"))
            .then(r=>this.setState({cases:r}));
    }


    render() {
        return (
            <div className="caseSettings">
                <div>
                    <label className="textLabel">CASES</label>
                </div>
                <form>
                    <div>
                        <label className="textLabel">papich :</label>
                        <label id="papichCase" className="textLabel"/>
                        <button type="button" className="button" onClick={()=>this.papichCaseOpenHandler()}>Open</button>
                    </div>
                    <div>
                        <label className="textLabel">itmo :</label>
                        <label id="itmoCase" className="textLabel"/>
                        <button type="button" className="button" onClick={()=>this.itmoCaseOpenHandler()}>Open</button>
                    </div>
                    <div>
                        <label id="lastDrop" className="textLabel"/>
                    </div>
                </form>
                <div id="idsa_div">
                    <label id="idsa"/>
                </div>
            </div>
        );
    }

}