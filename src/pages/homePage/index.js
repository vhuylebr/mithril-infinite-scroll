import m from "mithril";
import infinite from "mithril-infinite";
import AuthorTitle from "./AuthorTitle";
import { addStyle } from "../../helpers/styler";
import styles from "./styles";

addStyle("grid", styles);

const incr = 100;
const defaultSize = 50;
const loadImage = (
  el,
  { download_url, width: maxWidth, height: maxHeight }
) => {
  const smoothLoad = (width = defaultSize, height = defaultSize) => {
    if (width > 300) return;
    const url = download_url
      .replace(maxWidth, width)
      .replace(maxHeight, height);
    const img = new Image();
    img.onload = () => {
      el.style.backgroundImage = `url(${url})`;
      smoothLoad(width + incr, height + incr);
    };
    img.src = url;
  };
  smoothLoad();
};

const maybeLoadImage = (vnode, data) => {
  if (vnode.state.inited) {
    return;
  }
  if (infinite.isElementInViewport({ el: vnode.dom })) {
    loadImage(vnode.dom, data);
    vnode.state.inited = true;
  }
};

const item = ({ author, ...data }) =>
  m(
    "a.grid-item",
    m(
      ".image-holder",
      m(
        ".image",
        {
          oncreate: (vnode) => maybeLoadImage(vnode, data),
          onupdate: (vnode) => maybeLoadImage(vnode, data),
        },
        m(AuthorTitle, { author })
      )
    )
  );

const dataUrl = (pageNum) =>
  `https://picsum.photos/v2/list?page=${pageNum}&limit=12`;

const pageData = (pageNum) =>
  m.request({
    method: "GET",
    dataType: "jsonp",
    url: dataUrl(pageNum),
  });

export default {
  view: () =>
    m(infinite, {
      preloadPages: 2,
      item,
      pageData,
      class: "grid",
    }),
};
