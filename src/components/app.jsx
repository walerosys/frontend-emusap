import React, { Fragment, } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from '../pages/Login';
import { useSelector } from 'react-redux';
import withClearCache from "../ClearCache";
import LoaderAuth from '../layout/LoaderInicio';

const ClearCacheComponent = withClearCache(MainApp);

function AppLayout() {
    return <ClearCacheComponent />;
}

function MainApp (props) {
    const AuthStatus = useSelector(state => state.Auth.AuthStatus);
    return(
        <Fragment>
            <LoaderAuth/>
            <Router basename={`/`}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    {
                        AuthStatus ?
                        <Home anim={props.anim} />
                        : <Redirect to="/" />
                    }
                </Switch>
            </Router>
        </Fragment>  
    )
}

export default AppLayout