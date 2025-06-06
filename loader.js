function loadScriptFromURL(url) {
  const script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  script.onload = () => {
    console.log(`Script loaded from ${url}`);
  };
  script.onerror = () => {
    console.error(`Failed to load script from ${url}`);
  };
  document.head.appendChild(script);
}

loadScriptFromURL('https://raw.githubusercontent.com/proplayer929/webtools/refs/heads/main/webtools.js');