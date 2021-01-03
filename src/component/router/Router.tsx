import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import TableList from '../../table/render-dom';
import Card from '../card';
import Editor from '../../editor';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/table-dom" component={TableList} />
                <Route path="/editor" component={Editor} />
                <Route path="/card" component={Card} />
                <Redirect from="*" to="/table-dom" />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
