import { Fragment } from "react";
import { Link } from "react-router-dom";

const BlockTitle = (props) => {
  const { title, subs = [] } = props;
  return (
    <div className="v-hd2">
      <Link to={title.path} className="a">
        {title.txt}
      </Link>
      <div className="tab">
        {subs.map((item, index) => {
          return (
            <Fragment key={item.path}>
              <Link to={item.path}>{item.txt}</Link>
              {index < subs.length - 1 ? <span className="line">|</span> : null}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default BlockTitle;
