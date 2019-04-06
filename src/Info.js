import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Info extends Component{

    render() {
        return(
            <div className="info">
                <ul>
                    <li>
                        <Link to="/info">Info Page</Link>
                        <Link to="/register">Register Page</Link>
                        <Link to="/login">Login Page</Link>
                    </li>
                </ul>
                Its a info page!
            </div>
        )
    };
}

export default Info;