"use strict";
const start = Date.now();
window.onload = () => {
    const loadTime = Date.now() - start;
    const container = document.getElementById("load");
    if (!container) {
        return;
    }
    container.style.visibility = "visible";
    const target = document.getElementById("load-time");
    if (target) {
        target.innerHTML = `${loadTime}`;
    }
};
