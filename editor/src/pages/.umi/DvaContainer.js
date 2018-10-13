import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  ...((require('D:/code/cmrh/cms_all/cms_all_in_one/editor/src/dva.js').config || (() => ({})))()),
});

window.g_app = app;
app.use(createLoading());

app.model({ namespace: 'model', ...(require('D:/code/cmrh/cms_all/cms_all_in_one/editor/src/pages/site/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/code/cmrh/cms_all/cms_all_in_one/editor/src/pages/component/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/code/cmrh/cms_all/cms_all_in_one/editor/src/pages/editor/$id/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/code/cmrh/cms_all/cms_all_in_one/editor/src/pages/site/$id/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/code/cmrh/cms_all/cms_all_in_one/editor/src/pages/template/model.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
