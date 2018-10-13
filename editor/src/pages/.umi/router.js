import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';



let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


let routes = [
  {
    "path": "/site/components/editArea/components/routesInfo/components/routeEdit",
    "exact": true,
    "component": require('../site/components/editArea/components/routesInfo/components/routeEdit/index.js').default
  },
  {
    "path": "/",
    "exact": true,
    "component": require('../index.js').default
  },
  {
    "path": "/component/components/modalCreate",
    "exact": true,
    "component": require('../component/components/modalCreate/index.js').default
  },
  {
    "path": "/component/components/viewer",
    "exact": true,
    "component": require('../component/components/viewer/index.js').default
  },
  {
    "path": "/component",
    "exact": true,
    "component": require('../component/index.js').default
  },
  {
    "path": "/component/model",
    "exact": true,
    "component": require('../component/model.js').default
  },
  {
    "path": "/component/service",
    "exact": true,
    "component": require('../component/service.js').default
  },
  {
    "path": "/editor/:id/components/console",
    "exact": true,
    "component": require('../editor/$id/components/console/index.js').default
  },
  {
    "path": "/editor/:id/components/propSet/formMulti",
    "exact": true,
    "component": require('../editor/$id/components/propSet/formMulti.js').default
  },
  {
    "path": "/editor/:id/model",
    "exact": true,
    "component": require('../editor/$id/model.js').default
  },
  {
    "path": "/editor/:id/components/editor/event",
    "exact": true,
    "component": require('../editor/$id/components/editor/event.js').default
  },
  {
    "path": "/editor/:id/components/editor",
    "exact": true,
    "component": require('../editor/$id/components/editor/index.js').default
  },
  {
    "path": "/editor/:id/components/editor/utils",
    "exact": true,
    "component": require('../editor/$id/components/editor/utils.js').default
  },
  {
    "path": "/editor/:id/components/header",
    "exact": true,
    "component": require('../editor/$id/components/header/index.js').default
  },
  {
    "path": "/editor/:id/components/editor/createEditor",
    "exact": true,
    "component": require('../editor/$id/components/editor/createEditor.js').default
  },
  {
    "path": "/editor/:id/components/propSet/formEdit",
    "exact": true,
    "component": require('../editor/$id/components/propSet/formEdit.js').default
  },
  {
    "path": "/editor/:id",
    "exact": true,
    "component": require('../editor/$id/index.js').default
  },
  {
    "path": "/editor/:id/components/propSet",
    "exact": true,
    "component": require('../editor/$id/components/propSet/index.js').default
  },
  {
    "path": "/editor/:id/components/propSet/modelCreateKey",
    "exact": true,
    "component": require('../editor/$id/components/propSet/modelCreateKey.js').default
  },
  {
    "path": "/editor/:id/components/propSet/pan",
    "exact": true,
    "component": require('../editor/$id/components/propSet/pan.js').default
  },
  {
    "path": "/editor/:id/components/tabLeft",
    "exact": true,
    "component": require('../editor/$id/components/tabLeft/index.js').default
  },
  {
    "path": "/editor/:id/components/tabRight",
    "exact": true,
    "component": require('../editor/$id/components/tabRight/index.js').default
  },
  {
    "path": "/editor/:id/components/output",
    "exact": true,
    "component": require('../editor/$id/components/output/index.js').default
  },
  {
    "path": "/editor/:id/components/editor/createPan",
    "exact": true,
    "component": require('../editor/$id/components/editor/createPan.js').default
  },
  {
    "path": "/editor/:id/service",
    "exact": true,
    "component": require('../editor/$id/service.js').default
  },
  {
    "path": "/component/components/editArea",
    "exact": true,
    "component": require('../component/components/editArea/index.js').default
  },
  {
    "path": "/site/:id/model",
    "exact": true,
    "component": require('../site/$id/model.js').default
  },
  {
    "path": "/site",
    "exact": true,
    "component": require('../site/index.js').default
  },
  {
    "path": "/site/model",
    "exact": true,
    "component": require('../site/model.js').default
  },
  {
    "path": "/site/service",
    "exact": true,
    "component": require('../site/service.js').default
  },
  {
    "path": "/component/components/list",
    "exact": true,
    "component": require('../component/components/list/index.js').default
  },
  {
    "path": "/site/components/editArea/components/routesInfo/components/tree",
    "exact": true,
    "component": require('../site/components/editArea/components/routesInfo/components/tree/index.js').default
  },
  {
    "path": "/site/components/editArea/components/routesInfo",
    "exact": true,
    "component": require('../site/components/editArea/components/routesInfo/index.js').default
  },
  {
    "path": "/site/components/editArea",
    "exact": true,
    "component": require('../site/components/editArea/index.js').default
  },
  {
    "path": "/site/components/list/components/modalCreate",
    "exact": true,
    "component": require('../site/components/list/components/modalCreate.js').default
  },
  {
    "path": "/site/components/list",
    "exact": true,
    "component": require('../site/components/list/index.js').default
  },
  {
    "path": "/site/components/editArea/components/baseInfo",
    "exact": true,
    "component": require('../site/components/editArea/components/baseInfo/index.js').default
  },
  {
    "path": "/site/components/editArea/components/routesInfo/components/list",
    "exact": true,
    "component": require('../site/components/editArea/components/routesInfo/components/list/index.js').default
  },
  {
    "path": "/site/components/editArea/components/routesInfo/components/routeCreate",
    "exact": true,
    "component": require('../site/components/editArea/components/routesInfo/components/routeCreate/index.js').default
  },
  {
    "path": "/site/:id/components/routeDetail/components/componentSetting/components/viewer",
    "exact": true,
    "component": require('../site/$id/components/routeDetail/components/componentSetting/components/viewer/index.js').default
  },
  {
    "path": "/site/:id",
    "exact": true,
    "component": require('../site/$id/index.js').default
  },
  {
    "path": "/site/components/editArea/components/infoWrapper",
    "exact": true,
    "component": require('../site/components/editArea/components/infoWrapper/index.js').default
  },
  {
    "path": "/site/:id/components/routeDetail/components/componentSetting/components/list/components",
    "exact": true,
    "component": require('../site/$id/components/routeDetail/components/componentSetting/components/list/components/index.js').default
  },
  {
    "path": "/site/:id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/components",
    "exact": true,
    "component": require('../site/$id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/components/index.js').default
  },
  {
    "path": "/site/:id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/components/list",
    "exact": true,
    "component": require('../site/$id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/components/list/index.js').default
  },
  {
    "path": "/site/:id/components/routeDetail/components/componentSetting/components/list/components/componentSelect",
    "exact": true,
    "component": require('../site/$id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/index.js').default
  },
  {
    "path": "/site/:id/components/header",
    "exact": true,
    "component": require('../site/$id/components/header/index.js').default
  },
  {
    "path": "/site/:id/components/routeDetail/components/componentSetting/components",
    "exact": true,
    "component": require('../site/$id/components/routeDetail/components/componentSetting/components/index.js').default
  },
  {
    "path": "/site/:id/components",
    "exact": true,
    "component": require('../site/$id/components/index.js').default
  },
  {
    "path": "/site/:id/components/routeDetail/components/componentSetting",
    "exact": true,
    "component": require('../site/$id/components/routeDetail/components/componentSetting/index.js').default
  },
  {
    "path": "/site/:id/components/routeDetail/components/details",
    "exact": true,
    "component": require('../site/$id/components/routeDetail/components/details/index.js').default
  },
  {
    "path": "/site/:id/components/routeDetail/components",
    "exact": true,
    "component": require('../site/$id/components/routeDetail/components/index.js').default
  },
  {
    "path": "/site/:id/components/routeDetail",
    "exact": true,
    "component": require('../site/$id/components/routeDetail/index.js').default
  },
  {
    "path": "/site/:id/components/routeList",
    "exact": true,
    "component": require('../site/$id/components/routeList/index.js').default
  },
  {
    "path": "/site/:id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/components/detail",
    "exact": true,
    "component": require('../site/$id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/components/detail/index.js').default
  },
  {
    "path": "/site/:id/components/routeDetail/components/componentSetting/components/list",
    "exact": true,
    "component": require('../site/$id/components/routeDetail/components/componentSetting/components/list/index.js').default
  },
  {
    "path": "/site/:id/service",
    "exact": true,
    "component": require('../site/$id/service.js').default
  },
  {
    "path": "/template/components/list",
    "exact": true,
    "component": require('../template/components/list/index.js').default
  },
  {
    "path": "/template",
    "exact": true,
    "component": require('../template/index.js').default
  },
  {
    "path": "/template/model",
    "exact": true,
    "component": require('../template/model.js').default
  },
  {
    "component": () => React.createElement(require('D:/code/cmrh/cms_all/cms_all_in_one/editor/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', routes: '[{"path":"/site/components/editArea/components/routesInfo/components/routeEdit","exact":true,"component":"./src/pages/site/components/editArea/components/routesInfo/components/routeEdit/index.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/component/components/modalCreate","exact":true,"component":"./src/pages/component/components/modalCreate/index.js"},{"path":"/component/components/viewer","exact":true,"component":"./src/pages/component/components/viewer/index.js"},{"path":"/component","exact":true,"component":"./src/pages/component/index.js"},{"path":"/component/model","exact":true,"component":"./src/pages/component/model.js"},{"path":"/component/service","exact":true,"component":"./src/pages/component/service.js"},{"path":"/editor/:id/components/console","exact":true,"component":"./src/pages/editor/$id/components/console/index.js"},{"path":"/editor/:id/components/propSet/formMulti","exact":true,"component":"./src/pages/editor/$id/components/propSet/formMulti.js"},{"path":"/editor/:id/model","exact":true,"component":"./src/pages/editor/$id/model.js"},{"path":"/editor/:id/components/editor/event","exact":true,"component":"./src/pages/editor/$id/components/editor/event.js"},{"path":"/editor/:id/components/editor","exact":true,"component":"./src/pages/editor/$id/components/editor/index.js"},{"path":"/editor/:id/components/editor/utils","exact":true,"component":"./src/pages/editor/$id/components/editor/utils.js"},{"path":"/editor/:id/components/header","exact":true,"component":"./src/pages/editor/$id/components/header/index.js"},{"path":"/editor/:id/components/editor/createEditor","exact":true,"component":"./src/pages/editor/$id/components/editor/createEditor.js"},{"path":"/editor/:id/components/propSet/formEdit","exact":true,"component":"./src/pages/editor/$id/components/propSet/formEdit.js"},{"path":"/editor/:id","exact":true,"component":"./src/pages/editor/$id/index.js"},{"path":"/editor/:id/components/propSet","exact":true,"component":"./src/pages/editor/$id/components/propSet/index.js"},{"path":"/editor/:id/components/propSet/modelCreateKey","exact":true,"component":"./src/pages/editor/$id/components/propSet/modelCreateKey.js"},{"path":"/editor/:id/components/propSet/pan","exact":true,"component":"./src/pages/editor/$id/components/propSet/pan.js"},{"path":"/editor/:id/components/tabLeft","exact":true,"component":"./src/pages/editor/$id/components/tabLeft/index.js"},{"path":"/editor/:id/components/tabRight","exact":true,"component":"./src/pages/editor/$id/components/tabRight/index.js"},{"path":"/editor/:id/components/output","exact":true,"component":"./src/pages/editor/$id/components/output/index.js"},{"path":"/editor/:id/components/editor/createPan","exact":true,"component":"./src/pages/editor/$id/components/editor/createPan.js"},{"path":"/editor/:id/service","exact":true,"component":"./src/pages/editor/$id/service.js"},{"path":"/component/components/editArea","exact":true,"component":"./src/pages/component/components/editArea/index.js"},{"path":"/site/:id/model","exact":true,"component":"./src/pages/site/$id/model.js"},{"path":"/site","exact":true,"component":"./src/pages/site/index.js"},{"path":"/site/model","exact":true,"component":"./src/pages/site/model.js"},{"path":"/site/service","exact":true,"component":"./src/pages/site/service.js"},{"path":"/component/components/list","exact":true,"component":"./src/pages/component/components/list/index.js"},{"path":"/site/components/editArea/components/routesInfo/components/tree","exact":true,"component":"./src/pages/site/components/editArea/components/routesInfo/components/tree/index.js"},{"path":"/site/components/editArea/components/routesInfo","exact":true,"component":"./src/pages/site/components/editArea/components/routesInfo/index.js"},{"path":"/site/components/editArea","exact":true,"component":"./src/pages/site/components/editArea/index.js"},{"path":"/site/components/list/components/modalCreate","exact":true,"component":"./src/pages/site/components/list/components/modalCreate.js"},{"path":"/site/components/list","exact":true,"component":"./src/pages/site/components/list/index.js"},{"path":"/site/components/editArea/components/baseInfo","exact":true,"component":"./src/pages/site/components/editArea/components/baseInfo/index.js"},{"path":"/site/components/editArea/components/routesInfo/components/list","exact":true,"component":"./src/pages/site/components/editArea/components/routesInfo/components/list/index.js"},{"path":"/site/components/editArea/components/routesInfo/components/routeCreate","exact":true,"component":"./src/pages/site/components/editArea/components/routesInfo/components/routeCreate/index.js"},{"path":"/site/:id/components/routeDetail/components/componentSetting/components/viewer","exact":true,"component":"./src/pages/site/$id/components/routeDetail/components/componentSetting/components/viewer/index.js"},{"path":"/site/:id","exact":true,"component":"./src/pages/site/$id/index.js"},{"path":"/site/components/editArea/components/infoWrapper","exact":true,"component":"./src/pages/site/components/editArea/components/infoWrapper/index.js"},{"path":"/site/:id/components/routeDetail/components/componentSetting/components/list/components","exact":true,"component":"./src/pages/site/$id/components/routeDetail/components/componentSetting/components/list/components/index.js"},{"path":"/site/:id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/components","exact":true,"component":"./src/pages/site/$id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/components/index.js"},{"path":"/site/:id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/components/list","exact":true,"component":"./src/pages/site/$id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/components/list/index.js"},{"path":"/site/:id/components/routeDetail/components/componentSetting/components/list/components/componentSelect","exact":true,"component":"./src/pages/site/$id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/index.js"},{"path":"/site/:id/components/header","exact":true,"component":"./src/pages/site/$id/components/header/index.js"},{"path":"/site/:id/components/routeDetail/components/componentSetting/components","exact":true,"component":"./src/pages/site/$id/components/routeDetail/components/componentSetting/components/index.js"},{"path":"/site/:id/components","exact":true,"component":"./src/pages/site/$id/components/index.js"},{"path":"/site/:id/components/routeDetail/components/componentSetting","exact":true,"component":"./src/pages/site/$id/components/routeDetail/components/componentSetting/index.js"},{"path":"/site/:id/components/routeDetail/components/details","exact":true,"component":"./src/pages/site/$id/components/routeDetail/components/details/index.js"},{"path":"/site/:id/components/routeDetail/components","exact":true,"component":"./src/pages/site/$id/components/routeDetail/components/index.js"},{"path":"/site/:id/components/routeDetail","exact":true,"component":"./src/pages/site/$id/components/routeDetail/index.js"},{"path":"/site/:id/components/routeList","exact":true,"component":"./src/pages/site/$id/components/routeList/index.js"},{"path":"/site/:id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/components/detail","exact":true,"component":"./src/pages/site/$id/components/routeDetail/components/componentSetting/components/list/components/componentSelect/components/detail/index.js"},{"path":"/site/:id/components/routeDetail/components/componentSetting/components/list","exact":true,"component":"./src/pages/site/$id/components/routeDetail/components/componentSetting/components/list/index.js"},{"path":"/site/:id/service","exact":true,"component":"./src/pages/site/$id/service.js"},{"path":"/template/components/list","exact":true,"component":"./src/pages/template/components/list/index.js"},{"path":"/template","exact":true,"component":"./src/pages/template/index.js"},{"path":"/template/model","exact":true,"component":"./src/pages/template/model.js"}]' })
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
