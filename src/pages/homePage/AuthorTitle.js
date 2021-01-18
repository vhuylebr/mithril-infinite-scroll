import m from "mithril";

const AuthorTitle = {
  visible: false,
  view: (vnode) =>
    m(
      ".authorTitle",
      {
        onmouseover: () => (vnode.state.visible = true),
        onmouseout: () => (vnode.state.visible = false),
        style: {
          background: vnode.state.visible
            ? "linear-gradient(#101010, transparent 50%)"
            : "",
        },
      },
      vnode.state.visible && vnode.attrs.author
    ),
};

export default AuthorTitle;
