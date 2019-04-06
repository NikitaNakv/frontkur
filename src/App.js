import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Login from './Login';
import Profile from './Profile';
import Info from './Info';
import Register from './Register';
import Client from "./Client";

class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false
        };
        this.client = new Client();
    };

    render() {


        return(
            <div>
                <div className="Router">
                    <Router>
                        <div>
                            <Route path="/register" component={Register}/>
                            <Route path="/info" component={Info}/>
                            <Route path="/login" render={(props) => <Login {...props} />} />
                            <PrivateRoute path="/profile" component={Profile} />
                            <PrivateRoute path="/inventory" component={Profile} />
                            <PrivateRoute path="/stats" component={Profile} />
                            <PrivateRoute path="/dungeon" component={Profile} />
                            <PrivateRoute path="/arena" component={Profile} />
                            <PrivateRoute path="/chat" component={Profile} />
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

function PrivateRoute({component: Component, ...rest }) {
  return (
      <Route
          {...rest}
          render={props =>
              localStorage.getItem("auth") === "pass"
                  ? (
                  <Component {...props} />
              ) : (
                  <Redirect
                      to={{
                        pathname: "/login",
                        state: { from: props.location }
                      }}
                  />
              )
          }
      />
  );
}


export default App;
