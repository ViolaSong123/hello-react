import { Carousel } from "antd";
import { useState, memo, useCallback, useEffect } from "react";
import { useSelector, useStore } from "react-redux";

import "./index.scss";
import { homeApis } from "@/api/home";
import homeAction from "@/views/Home/store/action";

const Banner = (props) => {
  const [bannerIdx, setIdx] = useState(0);
  function onChange(from, to) {
    setIdx(to);
  }
  const store = useStore();
  // 从store中取轮播图
  const bannerOfStore = useSelector((state) => state.homeData.banners);

  const [bannersData, setBannersData] = useState([]);
  const _loadBanners = useCallback(async () => {
    // 异步加载轮播图
    const res = await homeApis.getBanners();
    setBannersData(res);
    store.dispatch(homeAction.setBanners(res));
  }, []);

  function getStoreBanner() {
    // 从store中取轮播图
    if (bannerOfStore.length) {
      setBannersData(bannerOfStore);
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (getStoreBanner()) return;
    _loadBanners();
  });

  return (
    <section
      className="banners"
      style={{
        backgroundImage: `url(${
          bannersData[bannerIdx] && bannersData[bannerIdx].imageUrl
        }?imageView&blur=40x20)`,
      }}
    >
      <div className="banner-wrap">
        <Carousel beforeChange={onChange} autoplay>
          {bannersData.map((item) => (
            <div key={item.encodeId}>
              <img
                className="banner-item"
                src={item.imageUrl + "?imageView&quality=89"}
                alt=""
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};
export default memo(Banner);
