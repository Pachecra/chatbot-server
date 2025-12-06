// =====================================================
// Chat Widget – Premium Check & Messaging
// =====================================================

// Get client ID from URL
const urlParams = new URLSearchParams(window.location.search);
const client_id = urlParams.get("client");

// Elements
const bubble = document.getElementById("chat-bubble");
const chatWindow = document.getElementById("chat-window");
const chatMessages = document.getElementById("chat-messages");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Open/close chat
bubble.addEventListener("click", () => {
    chatWindow.classList.toggle("open");
});

// Send message
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = sender === "user" ? "message-user" : "message-bot";
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: text,
            client_id: client_id
        })
    });

    const data = await response.json();

    // If payment required
    if (data.upgrade) {
        addMessage("⚠️ Upgrade erforderlich! 👉 " + data.upgrade_url, "bot");
        return;
    }

    addMessage(data.response, "bot");
}
