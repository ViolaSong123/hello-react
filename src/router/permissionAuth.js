import React, { createRef } from "react";
// import store from "./index";
import {
  Switch,
  HashRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
export const routerRef = createRef();

// export class PermissionAuth extends React.Component {
//   render() {
//     const { location, config } = this.props;
//     const { pathname } = location;
//     // const isLogin = store.getState().user.data.token;
//     const isLogin = true;
//     // 如果该路由不用进行权限校验，登录状态下登陆页除外
//     // 因为登陆后，无法跳转到登陆页
//     // 这部分代码，是为了在非登陆状态下，访问不需要权限校验的路由
//     const targetRouterConfig = config.find((v) => v.path === pathname);
//     if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
//       const { component } = targetRouterConfig;
//       return <Route exact path={pathname} component={component} />;
//     }
//     if (isLogin) {
//       if (pathname === "/login") {
//         // 如果登录了，想要跳转到登录页，则重定向到首页
//         return <Redirect to="/" />;
//       } else {
//         // 如果访问的路由有权限，则跳转到指定页面
//         if (targetRouterConfig) {
//           return (
//             <Route path={pathname} component={targetRouterConfig.component} />
//           );
//         } else {
//           return <Redirect to="/404" />;
//         }
//       }
//     } else {
//       // 非登录状态下
//       if (targetRouterConfig && targetRouterConfig.auth) {
//         // 路由合法：去登录页
//         return <Redirect to="/login" />;
//       } else {
//         //不合法的话，重定向到404
//         return <Redirect to="/404" />;
//       }
//     }
//   }
// }

export const generateFn = (route, basePath = "") => {
  return (
    <Router ref={routerRef}>
      <Switch>
        {route.map((parentRoute) => {
          let realPath = "",
            redirectPath = "";
          if (parentRoute.path.startsWith("/")) {
            realPath = parentRoute.path;
          } else {
            realPath = basePath + "/" + parentRoute.path;
          }
          if (parentRoute.redirect) {
            if (parentRoute.redirect.startsWith("/")) {
              redirectPath = parentRoute.redirect;
            } else {
              redirectPath = basePath + "/" + parentRoute.redirect;
            }
          }
          if (parentRoute.children) {
            return (
              <Route path={realPath} key={parentRoute.name}>
                <parentRoute.component>
                  {generateFn(parentRoute.children, parentRoute.path)}
                </parentRoute.component>
              </Route>
            );
          } else {
            if (parentRoute.redirect) {
              return (
                <Route exact path={realPath} key={parentRoute.name}>
                  <Redirect to={redirectPath} />
                </Route>
              );
            } else {
              return (
                <Route
                  path={realPath}
                  component={parentRoute.component}
                  key={parentRoute.name}
                  exact
                />
              );
            }
          }
        })}
      </Switch>
    </Router>
  );
};
