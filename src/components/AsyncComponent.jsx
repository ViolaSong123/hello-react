//  异步加载文件
import { Component } from "react";
import Main from "./Main";

const AsyncComponent = (importFn) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Com: null,
      };
    }
    componentDidMount() {
      this.setComponents();
    }
    setComponents = () => {
      importFn().then((Com) => {
        debugger;
        this.setState({
          Com: Com.defalut ? Com.defalut : null,
        });
      });
    };
    render() {
      let Com = this.state.Com;
      return Com ? <Com {...this.props}></Com> : <Main />;
    }
  };
};
export default AsyncComponent;
