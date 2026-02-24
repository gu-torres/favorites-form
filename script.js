// 1) You will paste your Google Apps Script "Web App" URL here:
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyBf7cAzWhwV43msN6C5_N-pD9kYlqwnwygunRH4pCrXHij_iZ1XN-GFSqUBR4Huajn/exec";


const form = document.getElementById("favoritesForm");
const statusEl = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "";
    submitBtn.disabled = true;

    try {
        if (!WEB_APP_URL || WEB_APP_URL.includes("PASTE_YOUR_WEB_APP_URL_HERE")) {
            throw new Error("Paste your Apps Script Web App URL (ending in /exec) into script.js");
        }

        const data = Object.fromEntries(new FormData(form).entries());

        // Important: no-cors avoids CORS blocks, but we cannot read the response.
        await fetch(WEB_APP_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        form.reset();
        statusEl.textContent = "✅ Submitted! Check the Google Sheet (it may take 1–3 seconds).";
    } catch (err) {
        statusEl.textContent = `❌ ${err.message}`;
    } finally {
        submitBtn.disabled = false;
    }
});