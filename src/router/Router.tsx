import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import TableDom from '@/cool-table/render-dom';
import TableCanvas from '@/cool-table-canvas/konva/table';
import KanBanCanvas from '@/cool-table-canvas/konva/kanban';
import Editor from '@/editor';
import Di from '@/di';
import { Counter } from '@/use-interval-demo';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/table-dom" component={TableDom} />
        <Route path="/table-canvas/table" component={TableCanvas} />
        <Route path="/table-canvas/kanban" component={KanBanCanvas} />
        <Route path="/editor" component={Editor} />
        <Route path="/di" component={Di} />
        <Route path="/use-interval-demo" component={Counter} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
