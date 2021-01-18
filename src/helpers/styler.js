import { prefixPlugin } from "j2c-plugin-prefix-browser";
import J2c from "j2c";
const j2c = new J2c(prefixPlugin);

const removeStyle = (id) => {
  if (id) {
    const old = document.getElementById(id);
    if (old) {
      old.parentNode.removeChild(old);
    }
  }
};

export const addStyle = (id, ...styles) => {
  removeStyle(id);
  const styleEl = document.createElement("style");
  if (id) {
    styleEl.setAttribute("id", id);
  }
  styles.forEach((styleList) => {
    if (Object.keys(styleList).length) {
      styleList.forEach((style) => {
        const scoped = { "@global": style };
        const sheet = j2c.sheet(scoped);
        styleEl.appendChild(document.createTextNode(sheet));
      });
    }
  });
  document.head.appendChild(styleEl);
};
