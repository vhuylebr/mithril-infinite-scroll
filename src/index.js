import m from "mithril";
import { homePage } from "./pages";
import { addStyle } from "./helpers/styler";
import styles from "./styles";

addStyle("common", styles);

const mountNode = document.querySelector("#app");
m.route(mountNode, "/", {
  "/": homePage,
});
