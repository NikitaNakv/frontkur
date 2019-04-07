import React  from 'react';
import {withRouter} from "react-router-dom";

const RouterButton = withRouter(({history,path,text}) => (
                <button
                    className="button"
                    type='button'
                    onClick={() => { history.push(path); }}
                >
                    {text}
                </button>
            ));

export default RouterButton;