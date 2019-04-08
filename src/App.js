import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Login from './Login';
import Profile from './Profile';
import Info from './Info';
import Register from './Register';
import Client from "./Client";
import Dungeon from "./Dungeon";
import Inventory from "./Inventory";
import Stats from "./Stats";
import Arena from "./Arena";
import ChatManager from './ChatManager';
import Fight from './Fight';

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
            <div className="App">
                <div className="Router">
                    <Router>
                        <div>
                            <Route path="/register" component={Register}/>
                            <Route path="/info" component={Info}/>
                            <Route path="/login" render={(props) => <Login {...props} />} />
                            <PrivateRoute path="/profile" component={Profile} />
                            <PrivateRoute path="/inventory" component={Inventory} />
                            <PrivateRoute path="/stats" component={Stats} />
                            <PrivateRoute path="/dungeon" component={Dungeon} />
                            <PrivateRoute path="/arena" component={Arena} />
                            <PrivateRoute path="/managechats" component={ChatManager} />
                            <PrivateRoute path="/fight" component={Fight} />
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
