const colorCode = document.getElementById("color-code");
const bgBtn = document.getElementById("bgBtn");
const copyBtn = document.getElementById("copyBtn");
const tooltip = document.getElementById("tooltip");
const layer = document.getElementById("colorLayer");

bgBtn.addEventListener("click", changeBg);
copyBtn.addEventListener("click", copyColor);

/* Change Background */
function changeBg() {
    const color = generateHexColor();
    colorCode.textContent = color;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const radius = Math.sqrt(width * width + height * height);

    // reset layer
    layer.style.transition = "none";
    layer.style.width = "0px";
    layer.style.height = "0px";
    layer.style.backgroundColor = color;

    // force repaint
    layer.offsetHeight;

    // enable transition again
    layer.style.transition =
        "width 0.6s cubic-bezier(0.4, 0, 0.2, 1), height 0.6s cubic-bezier(0.4, 0, 0.2, 1)";

    // expand circle
    layer.style.width = radius * 2 + "px";
    layer.style.height = radius * 2 + "px";

    // after animation completes
    setTimeout(() => {
        document.body.style.backgroundColor = color;

        // hide instantly (no animation back)
        layer.style.transition = "none";
        layer.style.width = "0px";
        layer.style.height = "0px";
    }, 600);
}


/* HEX Generator */
function generateHexColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

/* Copy Function */
function copyColor() {
    const text = colorCode.textContent;

    navigator.clipboard.writeText(text);

    colorCode.classList.add("copied");
    tooltip.classList.add("show");

    setTimeout(() => {
        colorCode.classList.remove("copied");
        tooltip.classList.remove("show");
    }, 1200);
}
