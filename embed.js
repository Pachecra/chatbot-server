(function () {
    const widgetScript = document.createElement("script");
    widgetScript.src = "https://chatbot-server-b1xy.onrender.com/chat-widget.js";
    widgetScript.defer = true;

    widgetScript.onload = function () {
        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = "https://chatbot-server-b1xy.onrender.com/chat-widget.css";
        document.head.appendChild(style);
    };

    document.head.appendChild(widgetScript);
})();
