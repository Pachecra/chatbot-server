const API_URL = "https://chatbot-server-b1xy.onrender.com/api/chat";

document.addEventListener("DOMContentLoaded", () => {
    const widget = document.createElement("div");
    widget.id = "chat-widget";
    widget.innerHTML = `
        <div id="chat-header">Chatbot</div>
        <div id="chat-body"></div>
        <input id="chat-input" placeholder="Frage mich etwas..." />
        <button id="chat-send">Senden</button>
    `;
    document.body.appendChild(widget);

    const body = document.getElementById("chat-body");
    const input = document.getElementById("chat-input");

    async function sendMessage() {
        const msg = input.value.trim();
        if (!msg) return;

        body.innerHTML += `<div class="msg user">${msg}</div>`;
        input.value = "";

        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });

        const data = await res.json();
        const reply = data.reply || "Fehler 😢";

        body.innerHTML += `<div class="msg bot">${reply}</div>`;
        body.scrollTop = body.scrollHeight;
    }

    document.getElementById("chat-send").onclick = sendMessage;
    input.addEventListener("keypress", e => {
        if (e.key === "Enter") sendMessage();
    });
});
