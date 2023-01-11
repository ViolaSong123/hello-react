// import React from "react";
// import { Switch, HashRouter as Router } from "react-router-dom";
import { routerConfig } from "./config";
import { generateFn } from "./permissionAuth";

// class Routes extends React.Component {
//   render() {
//     return (
//       // <Router>
//       //   <Switch>
//       //     <PermissionAuth config={routerConfig} />
//       //   </Switch>
//       // </Router>
//       <PermissionAuth config={routerConfig} />
//     );
//   }
// }
const Routes = generateFn(routerConfig);
export default Routes;
