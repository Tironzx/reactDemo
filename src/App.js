
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './assets/css/App.css';

import routes from './router/router.js'; //引入路由配置文件




class App extends Component {
  render() {
    return (

        <Router>
            <div className="main">
                {
                    routes.map((route,key)=>{
                        if(route.exact){
                            return <Route key={key} exact path={route.path}
                                // route.component     value.component   <User  {...props}  routes={route.routes} />
                                  render={props => (
                                // pass the sub-routes down to keep nesting
                                <route.component {...props} routes={route.routes} />
                            )}
                            />
                        }else{
                            return <Route  key={key}  path={route.path}
                                   render={props => (
                                       // pass the sub-routes down to keep nesting
                                       <route.component {...props} routes={route.routes} />
                                   )}
                            />
                        }
                    })
                }
            </div>
        </Router>
    );
  }
}

export default App;
