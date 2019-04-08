import React, { Component } from 'react';
import Client from './Client';

class CaseContainer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            cases : []
        };
        this.client = new Client();
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
        document.getElementById("papichCaseMenu").innerHTML = this.state.cases.find(x=>x.casetype==="papich").quantity;
        document.getElementById("itmoCaseMenu").innerHTML = this.state.cases.find(x=>x.casetype==="itmo").quantity;
    }

    render() {
        return(
            <div className="caseContainer">
                <div>
                    <button disabled="disabled" className="button">Cases</button>
                </div>
                <div>
                    <label className="textLabel">papich :</label>
                    <label id="papichCaseMenu" className="textLabel"/>
                </div>
                <div>
                    <label className="textLabel">itmo :</label>
                    <label id="itmoCaseMenu" className="textLabel"/>
                </div>
            </div>
        )
    };
}

export default CaseContainer;