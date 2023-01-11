// 首页
import { PureComponent } from "react";
// import AsyncComponent from "@/components/AsyncComponent";
import Banner from "@/components/Banner";
import { hotNav } from "./config";
import BlockTitle from "@/components/BlockTitle";
import Main from "@/components/Main";
import { Spin } from "antd";
import { homeApis } from "@/api/home";
import { connect } from "react-redux";
import { setCurSong, setSubNav } from "@store/action";
import homeAction from "./store/action";
import sessionStore from "@utils/sessionStore";
import CoverItem from "@/components/Covers/CoverItem";
import { playList } from "@/utils/utils";
import NewDiskSwiper from "./NewDiskSwiper";
import RankModule from "./Rank";
import Charts from "@/components/Echarts";
// mapStateToProps 函数用来指定如何把当前redux store 的state 映射到展示组件的props 中
const mapStateToProps = (state) => {
  return {
    curSong: state.globalData.curSong
      ? state.globalData.curSong
      : sessionStore.get("globalData").curSong,
    userInfo: state.user.userInfo,
    banners: state.homeData.banners,
    recommends: state.homeData.recommends,
    newDisk: state.homeData.newDisk,
    ranks: state.homeData.ranks,
    hotSingers: state.homeData.hotSingers,
    hotDjs: state.homeData.hotDjs,
    token: state.user.token,
  };
};
// mapDispatchToProps方法接受dispatch()方法并返回期望注入到展示组件的props中的回调方法
const mapDispatchToProps = (dispatch) => {
  return {
    setCurSong: (song) => dispatch(setCurSong(song)),
    setSubNav: (show) => dispatch(setSubNav(show)),
    setBanners: (banners) => dispatch(homeAction.setBanners(banners)),
    setRecommends: (recommends) =>
      dispatch(homeAction.setRecommends(recommends)),
    setNewDisk: (newDisk) => dispatch(homeAction.setNewDisk(newDisk)),
    setRanks: (ranks) => dispatch(homeAction.setRanks(ranks)),
    setHotSingers: (hotSingers) =>
      dispatch(homeAction.setHotSingers(hotSingers)),
    setHotDjs: (hotDjs) => dispatch(homeAction.setHotDjs(hotDjs)),
  };
};
let timer;
class Home extends PureComponent {
  state = {
    banners: [],
    recommends: [],
    newDisk: [],
    ranks: [],
    loading: false,
    hotSingers: [],
    hotDjs: [],
  };
  async componentDidMount() {
    this.props.setSubNav(true);
    this.setState({ loading: true });
    Promise.all([this._getRecommend()]).then(() => {
      timer = setTimeout(() => this.setState({ loading: false }), 500);
    });
  }

  componentWillUnmount() {
    clearTimeout(timer);
    timer = null;
  }

  _getRecommend = async () => {
    let res = this.props.recommends;
    if (res.length === 0) {
      res = await homeApis.getRecommend({
        limit: 8,
        order: "hot",
      });
    }
    this.setState({
      recommends: res,
    });
  };

  render() {
    const { loading, recommends } = this.state;

    return (
      <div>
        <Spin tip="Loading..." spinning={loading}>
          <Banner />
          <Charts />
          <Main className="g-bd1">
            <BlockTitle {...hotNav} />
            <ul className="m-cvrlst f-cb">
              {recommends.map((item, i) => {
                return (
                  <CoverItem playFn={playList} key={item.id + i} {...item} />
                );
              })}
            </ul>
            <div className="n-new">
              <BlockTitle title={{ path: "/home/disk", txt: "新碟上架" }} />
              <NewDiskSwiper />
            </div>
            <div className="n-bill">
              <BlockTitle title={{ path: "/home/toplist", txt: "榜单" }} />
              <RankModule />
            </div>
          </Main>
        </Spin>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
