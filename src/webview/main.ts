window.onmessage = (ev) => {
    const container = document.getElementById("messageContainer");
    const pre = document.createElement('pre');
    pre.style.whiteSpace = "noWrap";
    pre.onclick = (ev) => {
        pre.style.whiteSpace = pre.style.whiteSpace === "pre" ? "noWrap" : "pre";
    };
    pre.textContent = JSON.stringify(ev.data, undefined, 2);
    container?.appendChild(pre);
};

window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnClear') as HTMLButtonElement;
    btn.onclick = () => {
        const container = document.getElementById("messageContainer")!;
        container.innerHTML = '';
    };
});
