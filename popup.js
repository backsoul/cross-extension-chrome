const valueEl = document.getElementById("value");

chrome.storage.local.get("latestValue", (data) => {
    valueEl.textContent = data.latestValue ?? "Sin datos";
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "value-update") {
        valueEl.textContent = message.value;
    }
});
