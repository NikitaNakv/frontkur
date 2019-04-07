import React, { Component } from 'react';

class CaseContainer extends Component{

    render() {
        return(
            <div className="caseContainer">
                <div>
                    <button disabled="disabled" className="button">Cases</button>
                </div>
                <div>
                    <button disabled="disabled" className="button">World1 cases</button>
                    <button disabled="disabled" className="button">Amount</button>
                </div>
                <div>
                    <button disabled="disabled" className="button">World2 cases</button>
                    <button disabled="disabled" className="button">Amount</button>
                </div>
                <div>
                    <button disabled="disabled" className="button">World3 cases</button>
                    <button disabled="disabled" className="button">Amount</button>
                </div>
                <div>
                    <button disabled="disabled" className="button">World4 cases</button>
                    <button disabled="disabled" className="button">Amount</button>
                </div>
            </div>
        )
    };
}

export default CaseContainer;