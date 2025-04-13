let latestValue = 0;

const socket = new WebSocket("wss://link");

socket.onopen = () => {
    console.log("WebSocket conectado");
};

socket.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data);
        if (data.value !== undefined) {
            latestValue = data.value;

            chrome.storage.local.set({ latestValue });

            chrome.runtime.sendMessage({ type: "value-update", value: latestValue });
        }
    } catch (e) {
        console.error("Error al parsear mensaje:", e);
    }
};

socket.onerror = (err) => {
    console.error("WebSocket error:", err);
};
