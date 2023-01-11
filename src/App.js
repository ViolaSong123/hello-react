import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
import Router from "@/router";
import Layout from "@/components/Layout";
class App extends React.Component {
  render() {
    return (
      <Layout>{Router}</Layout>
      // <Router>
      //   <Routes></Routes>
      // </Router>
    );
  }
}

export default App;
