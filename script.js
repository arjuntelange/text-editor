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

let fileName = document.getElementById("filename");

const handleFileExport = (value) => {
  const name = fileName.value.trim() || "document";

  if (value === "new") {
    content.innerHTML = "";
    fileName.value = "";
    localStorage.removeItem("editorContent");
  }

  if (value === "pdf") {
    html2pdf().from(content).save(`${name}.pdf`);
  }

  if (value === "txt") {
    const extractedText = content.innerText;

    const blob = new Blob([extractedText], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `${name}.txt`;

    a.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  }
};

let active = false;
let showCode = document.getElementById("show-code");
showCode.addEventListener("click", () => {
  active = !active;
  showCode.dataset.active = active;
  if (active) {
    content.textContent = content.innerHTML;
    showCode.setAttribute("contenteditable", false);
  } else {
    content.innerHTML = content.textContent;
    showCode.setAttribute("contenteditable", true);
  }
});

content.addEventListener("input", () => {
  localStorage.setItem("editorContent", content.innerHTML);
});

window.addEventListener("load", () => {
  const savedContent = localStorage.getItem("editorContent");

  if (savedContent) {
    content.innerHTML = savedContent;
  }
});

const wordCount = document.getElementById("word-count");
const charCount = document.getElementById("char-count");

const updateCounts = () => {
  const text = content.innerText.trim();

  const words = text ? text.split(/\s+/).length : 0;
  const chars = text.length;

  wordCount.textContent = `Words: ${words}`;
  charCount.textContent = `Characters: ${chars}`;
};

content.addEventListener("input", updateCounts);
window.addEventListener("load", updateCounts);
