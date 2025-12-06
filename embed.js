// == EMBED SCRIPT FOR SAAS CHAT WIDGET ==
// Dieses Script wird bei deinen Kunden eingebunden
// <script src="https://DEIN-SERVER/embed.js" data-client="kunde123"></script>

(function () {
    console.log("Embed.js geladen");

    // 1️⃣ Client-ID aus dem Script-Tag lesen
    const scriptTag = document.currentScript;
    const CLIENT_ID = scriptTag.getAttribute("data-client");

    if (!CLIENT_ID) {
        console.error("❌ Fehler: data-client fehlt im Embed-Code!");
        return;
    }

    // 2️⃣ Chat-Widget HTML in Kundenseite einfügen
    const chatContainer = document.createElement("div");
    chatContainer.id = "chat-widget-container";
    chatContainer.style.position = "fixed";
    chatContainer.style.bottom = "20px";
    chatContainer.style.right = "20px";
    chatContainer.style.width = "350px";
    chatContainer.style.height = "550px";
    chatContainer.style.display = "none"; // Start hidden
    chatContainer.style.zIndex = "999999";

    chatContainer.innerHTML = `
        <iframe 
            src="https://localhost:3000/chat-widget.html?client=${CLIENT_ID}"
            style="width:100%;height:100%;border-radius:15px;border:none;box-shadow:0px 0px 10px rgba(0,0,0,0.3);background:white;">
        </iframe>
    `;

    document.body.appendChild(chatContainer);

    // 3️⃣ Chat-Bubble Button hinzufügen
    const chatButton = document.createElement("div");
    chatButton.id = "chat-open-button";
    chatButton.style.position = "fixed";
    chatButton.style.bottom = "20px";
    chatButton.style.right = "20px";
    chatButton.style.width = "60px";
    chatButton.style.height = "60px";
    chatButton.style.borderRadius = "50%";
    chatButton.style.background = "#007bff";
    chatButton.style.display = "flex";
    chatButton.style.alignItems = "center";
    chatButton.style.justifyContent = "center";
    chatButton.style.color = "white";
    chatButton.style.fontSize = "30px";
    chatButton.style.cursor = "pointer";
    chatButton.style.zIndex = "999999";
    chatButton.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.25)";
    chatButton.innerHTML = "💬";

    document.body.appendChild(chatButton);

    // 4️⃣ Öffnen / Schließen Logik
    let isOpen = false;
    chatButton.onclick = () => {
        isOpen = !isOpen;
        chatContainer.style.display = isOpen ? "block" : "none";
    };
})();
