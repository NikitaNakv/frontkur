import React from 'react';
import {withRouter} from "react-router-dom";


const RouterButton = withRouter(({history}) => (
                <button
                    className="button"
                    type='button'
                    id="LOGO"
                    onClick={() => { history.push("/info"); }}
                >
                    LOGO
                </button>
            ));

export default RouterButton;