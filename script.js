const formatDoc = (cmd, value = false) => {
  if (value) {
    document.execCommand(cmd, false, value);
  } else {
    document.execCommand(cmd);
  }
};

const addLink = () => {
  const url = prompt("Enter your URL: ");
  formatDoc("createLink", url);
};

let content = document.getElementById("content");

content.addEventListener("mouseenter", () => {
  let anchors = content.querySelectorAll("a");

  anchors.forEach((anchor) => {
    anchor.addEventListener("mouseenter", () => {
      anchor.setAttribute("target", "_blank");
      content.setAttribute("contentEditable", "false");
    });

    anchor.addEventListener("mouseleave", () => {
      content.setAttribute("contentEditable", "true");
    });
  });
});
