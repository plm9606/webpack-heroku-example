function currentTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
}

const div = document.createElement("div");
document.body.appendChild(div);
setInterval(() => (div.innerText = currentTime()), 1000);
