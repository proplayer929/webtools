(function () {
    const response = fetch("https://raw.githubusercontent.com/proplayer929/webtools/main/webtools.js").then(res => {
        if (!res.ok) throw new Error("Failed to load webtools.js");
        return res.text();
    });
    response.then(scriptContent => {
        const script = document.createElement("script");
        script.textContent = scriptContent;
        document.body.appendChild(script);
    })
})()