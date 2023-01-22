import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import TableDom from '@/cool-table/render-dom';
// import TableCanvas from '@/cool-table-canvas/konva/table';
// import KanBanCanvas from '@/cool-table-canvas/konva/kanban';
import Editor from '@/editor';
import Di from '@/di';
import { Counter } from '@/use-interval-demo';
import { IdleSchedulerDemo } from '@/idle-scheduler/demo';
import { RichTextEditor } from '@/delta-based-editor/demo';
import { ForSale } from '@/for-sale/client/components';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/table-dom" component={TableDom} /> */}
        {/* <Route path="/table-canvas/table" component={TableCanvas} /> */}
        {/* <Route path="/table-canvas/kanban" component={KanBanCanvas} /> */}
        <Route path="/editor" component={Editor} />
        <Route path="/di" component={Di} />
        <Route path="/use-interval-demo" component={Counter} />
        <Route path="/idle-scheduler" component={IdleSchedulerDemo} />
        <Route path="/rich-text-editor" component={RichTextEditor} />
        <Route path="/for-sale" component={ForSale} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
