import { useEffect, createRef } from "react";
import * as echarts from "echarts";
import defaultConfig from "./config/options";
// const defaultConfig = {}; // 默认配置
const isEmpty = false;
const Charts = (props) => {
  const chartRef = createRef(null);
  // renderer 用于配置渲染方式 可以是 svg 或者 canvas
  const { renderer, series } = props.renderer || "canvas";
  let myChart;
  function _initChart(el) {
    return new Promise((resolve) => {
      myChart = echarts.init(el, null, {
        renderer,
        width: "100%",
        height: "100%",
      });
    });
  }
  const resize = () => {
    myChart.resize();
  };
  function _setOption(option) {
    if (!myChart) return;
    _updateChartView();
  }
  function _updateChartView() {
    if (!myChart) return;
    // 合并options
    const params = Object.assign({}, defaultConfig, series);
    // TODO // 统一导入配置文件 modules[props.type](params);
    myChart.setOption(params);
  }
  function _dispose() {
    if (myChart) myChart.dispose(); //销毁
    window.removeEventListener("resize", resize);
  }
  useEffect(() => {
    _initChart(chartRef.current).then(() => {
      _setOption();
      window.addEventListener("resize", resize);
    });
  }, []);
  return (
    <div className="echarts-container">
      {isEmpty ? <div>暂无数据</div> : <div ref={chartRef}></div>}
    </div>
  );
};
export default Charts;
