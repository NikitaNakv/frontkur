import React, { Component } from 'react';
import RouterButton from './RouterButton';
import Logo from './Logo';


class Info extends Component{

    render() {
        return(
            <div className="info">
                <div>
                    <Logo id="LOGO" path="/info" text="LOGO"/>
                    <RouterButton path="/login" text="Login"/>
                    <RouterButton path="/register" text="Register"/>
                </div>
            </div>
        )
    };
}

export default Info;