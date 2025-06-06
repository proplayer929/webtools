(function() {
    // Initialize pinned and recent tools
    window.pinnedTools = JSON.parse(localStorage.getItem('webtools-pinned')) || [];
    let recentTools = JSON.parse(localStorage.getItem('webtools-recent')) || [];

    // Define tools array with unique IDs
    const tools = [
        {
            id: 'calculator',
            name: 'Calculator',
            description: 'Perform arithmetic and scientific calculations.',
            content: `
                <div class="tool-card">
                    <div class="tool-header">
                        <h3 class="tool-title">Calculator</h3>
                        <button id="pin-calculator" class="pin-button" data-tooltip="Pin to sidebar"></button>
                    </div>
                    <p class="tool-description">Enter expressions (e.g., 2 + 2, sin(30)).</p>
                    <input id="calculator-input" type="text" placeholder="e.g., 2 + 2 or sin(30)" class="tool-input">
                    <div class="calc-grid">
                        <button onclick="window.appendToCalc('7')" class="calc-button">7</button>
                        <button onclick="window.appendToCalc('8')" class="calc-button">8</button>
                        <button onclick="window.appendToCalc('9')" class="calc-button">9</button>
                        <button onclick="window.appendToCalc('/')" class="calc-button">/</button>
                        <button onclick="window.appendToCalc('4')" class="calc-button">4</button>
                        <button onclick="window.appendToCalc('5')" class="calc-button">5</button>
                        <button onclick="window.appendToCalc('6')" class="calc-button">6</button>
                        <button onclick="window.appendToCalc('*')" class="calc-button">×</button>
                        <button onclick="window.appendToCalc('1')" class="calc-button">1</button>
                        <button onclick="window.appendToCalc('2')" class="calc-button">2</button>
                        <button onclick="window.appendToCalc('3')" class="calc-button">3</button>
                        <button onclick="window.appendToCalc('-')" class="calc-button">-</button>
                        <button onclick="window.appendToCalc('0')" class="calc-button">0</button>
                        <button onclick="window.appendToCalc('.')" class="calc-button">.</button>
                        <button onclick="window.calculate()" class="calc-button primary">=</button>
                        <button onclick="window.appendToCalc('+')" class="calc-button">+</button>
                        <button onclick="window.appendToCalc('sin(')" class="calc-button">sin</button>
                        <button onclick="window.appendToCalc('cos(')" class="calc-button">cos</button>
                        <button onclick="window.appendToCalc('tan(')" class="calc-button">tan</button>
                        <button onclick="window.clearCalc()" class="calc-button">C</button>
                    </div>
                </div>
            `
        },
        {
            id: 'unit-converter',
            name: 'Unit Converter',
            description: 'Convert between common units (length, weight, temperature).',
            content: `
                <div class="tool-card">
                    <div class="tool-header">
                        <h3 class="tool-title">Unit Converter</h3>
                        <button id="pin-unit-converter" class="pin-button" data-tooltip="Pin to sidebar"></button>
                    </div>
                    <p class="tool-description">Convert units for length, weight, or temperature.</p>
                    <select id="unit-type" onchange="window.updateUnitOptions()" class="tool-select">
                        <option value="length">Length</option>
                        <option value="weight">Weight</option>
                        <option value="temperature">Temperature</option>
                    </select>
                    <div class="input-group">
                        <input id="unit-input" type="number" placeholder="Value" class="tool-input">
                        <select id="unit-from" class="tool-select"></select>
                    </div>
                    <div class="input-group">
                        <input id="unit-output" type="text" readonly class="tool-input">
                        <select id="unit-to" class="tool-select"></select>
                    </div>
                    <button onclick="window.convertUnit()" class="action-button" data-tooltip="Convert units">Convert</button>
                </div>
            `
        },
        {
            id: 'text-summarizer',
            name: 'Text Summarizer',
            description: 'Summarize text for quick study notes.',
            content: `
                <div class="tool-card">
                    <div class="tool-header">
                        <h3 class="tool-title">Text Summarizer</h3>
                        <button id="pin-text-summarizer" class="pin-button" data-tooltip="Pin to sidebar"></button>
                    </div>
                    <p class="tool-description">Paste text to generate a concise summary.</p>
                    <textarea id="summarizer-input" placeholder="Paste text here" rows="5" class="tool-textarea"></textarea>
                    <button onclick="window.summarizeText()" class="action-button" data-tooltip="Generate summary">Summarize</button>
                    <textarea id="summarizer-output" readonly rows="3" class="tool-textarea"></textarea>
                </div>
            `
        },
        {
            id: 'formula-reference',
            name: 'Formula Reference',
            description: 'Quick reference for common formulas.',
            content: `
                <div class="tool-card">
                    <div class="tool-header">
                        <h3 class="tool-title">Formula Reference</h3>
                        <button id="pin-formula-reference" class="pin-button" data-tooltip="Pin to sidebar"></button>
                    </div>
                    <p class="tool-description">Common formulas for math and science.</p>
                    <select id="formula-category" onchange="window.updateFormulas()" class="tool-select">
                        <option value="math">Math</option>
                        <option value="physics">Physics</option>
                        <option value="geometry">Geometry</option>
                    </select>
                    <div id="formula-list" class="formula-list"></div>
                </div>
            `
        },
        {
            id: 'note-taker',
            name: 'Note Taker',
            description: 'Take and save quick notes.',
            content: `
                <div class="tool-card">
                    <div class="tool-header">
                        <h3 class="tool-title">Note Taker</h3>
                        <button id="pin-note-taker" class="pin-button" data-tooltip="Pin to sidebar"></button>
                    </div>
                    <p class="tool-description">Write and save notes locally.</p>
                    <textarea id="notes-input" placeholder="Write your notes here" rows="5" class="tool-textarea"></textarea>
                    <div class="button-group">
                        <button onclick="window.saveNotes()" class="action-button" data-tooltip="Save notes">Save</button>
                        <button onclick="window.clearNotes()" class="action-button" data-tooltip="Clear notes">Clear</button>
                    </div>
                </div>
            `
        },
        {
            id: 'cheat-sheet',
            name: 'Cheat Sheet',
            description: 'Store quick reference text discreetly.',
            content: `
                <div class="tool-card">
                    <div class="tool-header">
                        <h3 class="tool-title">Cheat Sheet</h3>
                        <button id="pin-cheat-sheet" class="pin-button" data-tooltip="Pin to sidebar"></button>
                    </div>
                    <p class="tool-description">Store key info for quick access (saved locally).</p>
                    <textarea id="cheatsheet-input" placeholder="Enter key info (e.g., formulas, vocab)" rows="5" class="tool-textarea"></textarea>
                    <div class="button-group">
                        <button onclick="window.saveCheatSheet()" class="action-button" data-tooltip="Save cheat sheet">Save</button>
                        <button onclick="window.clearCheatSheet()" class="action-button" data-tooltip="Clear cheat sheet">Clear</button>
                    </div>
                </div>
            `
        },
        {
            id: 'encryptor',
            name: 'Encryptor/Decryptor',
            description: 'Encrypt or decrypt text using a password.',
            content: `
                <div class="tool-card">
                    <div class="tool-header">
                        <h3 class="tool-title">Encryptor/Decryptor</h3>
                        <button id="pin-encryptor" class="pin-button" data-tooltip="Pin to sidebar"></button>
                    </div>
                    <p class="tool-description">Securely encrypt or decrypt text with a password.</p>
                    <textarea id="encryptor-input" placeholder="Enter text to encrypt/decrypt" rows="4" class="tool-textarea"></textarea>
                    <div class="input-group">
                        <input id="encryptor-password" type="password" placeholder="Password (min 6 chars)" class="tool-input">
                        <button id="toggle-password" class="toggle-button" data-tooltip="Toggle password visibility">👁️</button>
                    </div>
                    <div class="button-group">
                        <button onclick="window.encryptText()" class="action-button" data-tooltip="Encrypt text">Encrypt</button>
                        <button onclick="window.decryptText()" class="action-button" data-tooltip="Decrypt text">Decrypt</button>
                    </div>
                    <div class="output-group">
                        <textarea id="encryptor-output" readonly rows="3" class="tool-textarea"></textarea>
                        <button id="copy-output" class="toggle-button" data-tooltip="Copy to clipboard">📋</button>
                    </div>
                </div>
            `
        },
        {
            id: 'history-flooder',
            name: 'History Flooder',
            description: 'Flood browser history with the current page.',
            content: `
                <div class="tool-card">
                    <div class="tool-header">
                        <h3 class="tool-title">History Flooder</h3>
                        <button id="pin-history-flooder" class="pin-button" data-tooltip="Pin to sidebar"></button>
                    </div>
                    <p class="tool-description">Add current page to history multiple times (1-1000).</p>
                    <div class="input-group">
                        <input id="history-count" type="number" min="1" max="1000" placeholder="Number of entries (1-1000)" class="tool-input">
                    </div>
                    <button onclick="window.floodHistory()" class="action-button" data-tooltip="Flood history">Flood History</button>
                    <p id="history-status" class="tool-description"></p>
                </div>
            `
        },
        {
            id: 'tab-disguise',
            name: 'Tab Disguise',
            description: 'Make the page look like Google Drive.',
            content: `
                <div class="tool-card">
                    <div class="tool-header">
                        <h3 class="tool-title">Tab Disguise</h3>
                        <button id="pin-tab-disguise" class="pin-button" data-tooltip="Pin to sidebar"></button>
                    </div>
                    <p class="tool-description">Make the page look like Google Drive.</p>
                    <button onclick="window.disguiseTab()" class="action-button" data-tooltip="Disguise tab">Disguise tab</button>
                </div>
            `
        },
        {
            id: 'tab-opener',
            name: 'Tab Opener',
            description: 'Open multiple tabs of a URL.',
            content: `
                <div class="tool-card">
                    <div class="tool-header">
                        <h3 class="tool-title">Tab Opener</h3>
                        <button id="pin-tab-opener" class="pin-button" data-tooltip="Pin to sidebar"></button>
                    </div>
                    <p class="tool-description">Open multiple tabs (1-50) of a URL (default: current page).</p>
                    <input id="tab-url" type="text" placeholder="URL (leave blank for current page)" class="tool-input">
                    <div class="input-group">
                        <input id="tab-count" type="number" min="1" max="50" placeholder="Number of tabs (1-50)" class="tool-input">
                    </div>
                    <button onclick="window.openTabs()" class="action-button" data-tooltip="Open tabs">Open Tabs</button>
                    <p id="tab-status" class="tool-description"></p>
                </div>
            `
        },
        {
            id: 'cookie-cleaner',
            name: 'Cookie Cleaner',
            description: 'Clear all cookies for the current domain.',
            content: `
                <div class="tool-card">
                    <div class="tool-header">
                        <h3 class="tool-title">Cookie Cleaner</h3>
                        <button id="pin-cookie-cleaner" class="pin-button" data-tooltip="Pin to sidebar"></button>
                    </div>
                    <p class="tool-description">Delete all cookies for this domain (may log you out).</p>
                    <button onclick="window.clearCookies()" class="action-button" data-tooltip="Clear cookies">Clear Cookies</button>
                    <p id="cookie-status" class="tool-description"></p>
                </div>
            `
        },
        {
            id: 'cache-buster',
            name: 'Cache Buster',
            description: 'Clear browser cache for the current site.',
            content: `
                <div class="tool-card">
                    <div class="tool-header">
                        <h3 class="tool-title">Cache Buster</h3>
                        <button id="pin-cache-buster" class="pin-button" data-tooltip="Pin to sidebar"></button>
                    </div>
                    <p class="tool-description">Clear cache for this site or force a hard reload.</p>
                    <button onclick="window.clearCache()" class="action-button" data-tooltip="Clear cache">Clear Cache</button>
                    <p id="cache-status" class="tool-description"></p>
                </div>
            `
        }
    ];

    // Create container elements
    const windowEl = document.createElement('div');
    windowEl.id = 'webtools-window';
    windowEl.style.cssText = `
        position: fixed;
        top: 100px;
        left: 100px;
        width: 600px;
        min-height: 400px;
        background-color: #0f172a;
        border: 1px solid #334155;
        border-radius: 10px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        resize: both;
        overflow: auto;
        z-index: 1000;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #f1f5f9;
    `;
    
    const header = document.createElement('div');
    header.style.cssText = `
        background: #1e293b;
        padding: 10px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
        border-radius: 10px 10px 0 0;
        user-select: none;
    `;
    
    const title = document.createElement('span');
    title.textContent = 'Webtools';
    title.style.cssText = `
        font-size: 14px;
        font-weight: 600;
        color: #f1f5f9;
    `;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        gap: 6px;
        align-items: center;
    `;
    
    const minimizeBtn = document.createElement('button');
    minimizeBtn.innerHTML = '—';
    minimizeBtn.style.cssText = `
        background: none;
        border: none;
        color: #f1f5f9;
        font-size: 14px;
        cursor: pointer;
        padding: 4px 8px;
        transition: color 0.2s, transform 0.2s;
    `;
    minimizeBtn.setAttribute('data-tooltip', 'Minimize');
    minimizeBtn.onmouseover = () => minimizeBtn.style.transform = 'scale(1.1)';
    minimizeBtn.onmouseout = () => minimizeBtn.style.transform = 'scale(1)';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: #f1f5f9;
        font-size: 14px;
        cursor: pointer;
        padding: 4px 8px;
        transition: color 0.2s, transform 0.2s;
    `;
    closeBtn.setAttribute('data-tooltip', 'Close');
    closeBtn.onmouseover = () => closeBtn.style.transform = 'scale(1.1)';
    closeBtn.onmouseout = () => closeBtn.style.transform = 'scale(1)';
    
    const content = document.createElement('div');
    content.style.cssText = `
        display: flex;
        height: calc(100% - 40px);
    `;
    
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.style.cssText = `
        width: 160px;
        background-color: #1e293b;
        padding: 12px;
        border-right: 1px solid #334155;
        overflow-y: auto;
    `;
    
    const mainContent = document.createElement('div');
    mainContent.style.cssText = `
        flex: 1;
        padding: 12px;
        overflow-y: auto;
    `;
    
    // Styles (enhanced shadcn-inspired dark mode)
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        #webtools-window * { box-sizing: border-box; }
        #webtools-window button:focus, #webtools-window input:focus, #webtools-window textarea:focus, #webtools-window select:focus {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }
        #webtools-window .sidebar button {
            width: 100%;
            padding: 8px 12px;
            margin-bottom: 6px;
            background-color: #334155;
            color: #f1f5f9;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: background-color 0.2s, transform 0.2s;
            position: relative;
        }
        #webtools-window .sidebar button:hover {
            background-color: #475569;
            transform: translateX(2px);
        }
        #webtools-window .sidebar h4 {
            font-size: 12px;
            font-weight: 600;
            color: #94a3b8;
            margin: 10px 0 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        #webtools-window .tool-card {
            background-color: #1e293b;
            padding: 12px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        #webtools-window .tool-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        #webtools-window .tool-title {
            font-size: 16px;
            font-weight: 600;
            color: #f1f5f9;
        }
        #webtools-window .pin-button {
            background: none;
            border: none;
            color: #94a3b8;
            font-size: 14px;
            cursor: pointer;
            padding: 4px;
            transition: color 0.2s, transform 0.2s;
            position: relative;
        }
        #webtools-window .pin-button:hover {
            color: #f1f5f9;
            transform: scale(1.1);
        }
        #webtools-window .tool-description {
            font-size: 12px;
            color: #94a3b8;
            margin-bottom: 10px;
        }
        #webtools-window .tool-input, #webtools-window .tool-textarea, #webtools-window .tool-select {
            width: 100%;
            padding: 8px 12px;
            margin-bottom: 10px;
            background-color: #334155;
            border: 1px solid #475569;
            border-radius: 6px;
            color: #f1f5f9;
            font-size: 13px;
            transition: border-color 0.2s;
        }
        #webtools-window .tool-textarea {
            resize: vertical;
            min-height: 60px;
        }
        #webtools-window .calc-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 6px;
            margin-bottom: 10px;
        }
        #webtools-window .calc-button {
            padding: 8px;
            background-color: #334155;
            color: #f1f5f9;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            transition: background-color 0.2s, transform 0.2s;
            position: relative;
        }
        #webtools-window .calc-button:hover {
            background-color: #475569;
            transform: scale(1.05);
        }
        #webtools-window .calc-button.primary {
            background-color: #3b82f6;
        }
        #webtools-window .calc-button.primary:hover {
            background-color: #2563eb;
            transform: scale(1.05);
        }
        #webtools-window .action-button {
            width: 100%;
            padding: 8px 12px;
            background-color: #3b82f6;
            color: #f1f5f9;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: background-color 0.2s, transform 0.2s;
            position: relative;
        }
        #webtools-window .action-button:hover {
            background-color: #2563eb;
            transform: scale(1.02);
        }
        #webtools-window .toggle-button {
            padding: 8px;
            background-color: #334155;
            color: #f1f5f9;
            border: 1px solid #475569;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            transition: background-color 0.2s, transform 0.2s;
            position: relative;
        }
        #webtools-window .toggle-button:hover {
            background-color: #475569;
            transform: scale(1.05);
        }
        #webtools-window .toggle-button.copied {
            background-color: #22c55e;
            border-color: #22c55e;
        }
        #webtools-window .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
        #webtools-window .button-group .action-button {
            flex: 1;
        }
        #webtools-window .input-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
            align-items: center;
        }
        #webtools-window .input-group .tool-input, #webtools-window .input-group .tool-select {
            flex: 1;
        }
        #webtools-window .output-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
            align-items: flex-start;
        }
        #webtools-window .output-group .tool-textarea {
            flex: 1;
        }
        #webtools-window .formula-list p {
            font-size: 13px;
            color: #f1f5f9;
            margin: 6px 0;
        }
        #webtools-window .recent-tools button, #webtools-window .search-results button:not(.pin-button), #webtools-window .browse-tools button {
            width: 100%;
            padding: 8px 12px;
            background-color: #334155;
            color: #f1f5f9;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: background-color 0.2s, transform 0.2s;
        }
        #webtools-window .recent-tools button:hover, #webtools-window .search-results button:not(.pin-button):hover, #webtools-window .browse-tools button:hover {
            background-color: #475569;
            transform: scale(1.02);
        }
        #webtools-window .search-results > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
        }
        #webtools-window [data-tooltip] {
            position: relative;
        }
        #webtools-window [data-tooltip]::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(-8px);
            background-color: #1e293b;
            color: #f1f5f9;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s, transform 0.2s;
            z-index: 10;
        }
        #webtools-window [data-tooltip]:hover::after {
            opacity: 1;
            transform: translateX(-50%) translateY(-12px);
        }
        #webtools-window [data-tooltip].pin-button::after, #webtools-window [data-tooltip].toggle-button::after {
            bottom: auto;
            top: 50%;
            left: 100%;
            transform: translateX(8px) translateY(-50%);
        }
        #webtools-window [data-tooltip].pin-button:hover::after, #webtools-window [data-tooltip].toggle-button:hover::after {
            transform: translateX(12px) translateY(-50%);
        }
    `;
    document.head.appendChild(styleEl);
    
    // Build sidebar
    const updateSidebar = () => {
        sidebar.innerHTML = '';
        const buttons = [
            { name: 'Home', action: showHome },
            { name: 'Search', action: showSearch },
            { name: 'Browse', action: showBrowse }
        ];
        buttons.forEach(({ name, action }) => {
            const button = document.createElement('button');
            button.textContent = name;
            button.setAttribute('data-tooltip', name);
            button.onclick = action;
            sidebar.appendChild(button);
        });
        
        if (window.pinnedTools.length > 0) {
            const pinnedSection = document.createElement('div');
            pinnedSection.innerHTML = '<h4>Pinned</h4>';
            window.pinnedTools.forEach(toolId => {
                const tool = tools.find(t => t.id === toolId);
                if (tool) {
                    const button = document.createElement('button');
                    button.textContent = tool.name;
                    button.setAttribute('data-tooltip', tool.name);
                    button.onclick = () => loadTool(toolId);
                    pinnedSection.appendChild(button);
                }
            });
            sidebar.appendChild(pinnedSection);
        }
    };
    
    // Home view
    const showHome = () => {
        mainContent.innerHTML = `
            <div class="tool-card">
                <h3 class="header-title">Recently Used</h3>
                <div id="home-tools" class="recent-tools"></div>
            </div>
        `;
        const homeContainer = document.getElementById('home-tools');
        if (recentTools.length === 0) {
            homeContainer.innerHTML = '<p class="tool-description">No recent tools yet.</p>';
        } else {
            recentTools.slice(0, 3).forEach(toolId => {
                const tool = tools.find(t => t.id === toolId);
                if (tool) {
                    const button = document.createElement('button');
                    button.textContent = tool.name;
                    button.setAttribute('data-tooltip', tool.name);
                    button.onclick = () => loadTool(toolId);
                    homeContainer.appendChild(button);
                }
            });
        }
    };
    
    // Search view
    const showSearch = () => {
        mainContent.innerHTML = `
            <div class="tool-card">
                <h3 class="header-title">Search Tools</h3>
                <input id="search-input" type="text" placeholder="Search tools..." class="tool-input">
                <div id="search-results" class="search-results"></div>
            </div>
        `;
        const searchInput = document.getElementById('search-input');
        searchInput.focus();
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const results = tools.filter(t => t.name.toLowerCase().includes(query) || t.description.toLowerCase().includes(query));
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = '';
            if (query && results.length === 0) {
                resultsContainer.innerHTML = '<p class="tool-description">No tools found.</p>';
            } else {
                results.forEach(tool => {
                    const result = document.createElement('div');
                    result.innerHTML = `
                        <button data-tooltip="${tool.name}">${tool.name}</button>
                        <button id="data-${tool.id}" class="pin-button" data-tooltip="${window.pinnedTools.includes(tool.id) ? 'Unpin' : 'Pin'} to sidebar"></button>
                    `;
                    result.children[0].onclick = () => loadTool(tool.id);
                    result.children[1].innerHTML = window.pinnedTools.includes(tool.id) ? '📍' : '📌';
                    result.children[1].onclick = () => window.pinTool(tool.id);
                    resultsContainer.appendChild(result);
                });
            }
        });
    };
    
    // Browse view
    const showBrowse = () => {
        mainContent.innerHTML = `
            <div class="tool-card">
                <h3 class="header-title">Browse Tools</h3>
                <div id="browse-tools" class="browse-tools"></div>
            </div>
        `;
        const browseContainer = document.getElementById('browse-tools');
        tools.forEach(tool => {
            const button = document.createElement('button');
            button.textContent = tool.name;
            button.setAttribute('data-tooltip', tool.description);
            button.onclick = () => loadTool(tool.id);
            browseContainer.appendChild(button);
        });
    };
    
    // Load a tool
    const loadTool = (toolId) => {
        const tool = tools.find(t => t.id === toolId);
        if (tool) {
            mainContent.innerHTML = tool.content;
            const pinButton = document.getElementById(`pin-${tool.id}`);
            if (pinButton) {
                pinButton.innerHTML = window.pinnedTools.includes(tool.id) ? '📍' : '📌';
                pinButton.setAttribute('data-tooltip', window.pinnedTools.includes(tool.id) ? 'Unpin' : 'Pin to sidebar');
                pinButton.onclick = () => window.pinTool(tool.id);
            }
            recentTools = [toolId, ...recentTools.filter(id => id !== toolId)].slice(0, 5);
            localStorage.setItem('webtools-recent', JSON.stringify(recentTools));

            // Attach event listeners dynamically
            if (tool.id === 'calculator') {
                const calcButton = mainContent.querySelector('.calc-button.primary');
                if (calcButton) calcButton.addEventListener('click', window.calculate);
            } else if (tool.id === 'unit-converter') {
                window.updateUnitOptions();
                const convertButton = mainContent.querySelector('.action-button');
                if (convertButton) convertButton.addEventListener('click', window.convertUnit);
            } else if (tool.id === 'text-summarizer') {
                const summarizeButton = mainContent.querySelector('.action-button');
                if (summarizeButton) summarizeButton.addEventListener('click', window.summarizeText);
            } else if (tool.id === 'formula-reference') {
                window.updateFormulas();
            } else if (tool.id === 'note-taker') {
                window.loadNotes();
                const saveButton = mainContent.querySelectorAll('.action-button')[0];
                const clearButton = mainContent.querySelectorAll('.action-button')[1];
                if (saveButton) saveButton.addEventListener('click', window.saveNotes);
                if (clearButton) clearButton.addEventListener('click', window.clearNotes);
            } else if (tool.id === 'cheat-sheet') {
                window.loadCheatSheet();
                const saveButton = mainContent.querySelectorAll('.action-button')[0];
                const clearButton = mainContent.querySelectorAll('.action-button')[1];
                if (saveButton) saveButton.addEventListener('click', window.saveCheatSheet);
                if (clearButton) clearButton.addEventListener('click', window.clearCheatSheet);
            } else if (tool.id === 'encryptor') {
                window.loadEncryptor();
                const encryptButton = mainContent.querySelectorAll('.action-button')[0];
                const decryptButton = mainContent.querySelectorAll('.action-button')[1];
                if (encryptButton) encryptButton.addEventListener('click', window.encryptText);
                if (decryptButton) decryptButton.addEventListener('click', window.decryptText);
            } else if (tool.id === 'history-flooder') {
                const floodButton = mainContent.querySelector('.action-button');
                if (floodButton) floodButton.addEventListener('click', window.floodHistory);
            } else if (tool.id === 'tab-opener') {
                const openButton = mainContent.querySelector('.action-button');
                if (openButton) openButton.addEventListener('click', window.openTabs);
            } else if (tool.id === 'cookie-cleaner') {
                const clearButton = mainContent.querySelector('.action-button');
                if (clearButton) clearButton.addEventListener('click', window.clearCookies);
            } else if (tool.id === 'cache-buster') {
                const clearButton = mainContent.querySelector('.action-button');
                if (clearButton) clearButton.addEventListener('click', window.clearCache);
            }
        }
    };
    
    // Pin a tool
    window.pinTool = (toolId) => {
        if (window.pinnedTools.includes(toolId)) {
            window.pinnedTools = window.pinnedTools.filter(id => id !== toolId);
        } else if (window.pinnedTools.length < 5) {
            window.pinnedTools.push(toolId);
        } else {
            alert('Maximum 5 pinned tools. Unpin one to add another.');
            return;
        }
        localStorage.setItem('webtools-pinned', JSON.stringify(window.pinnedTools));
        updateSidebar();
        const currentTool = tools.find(t => mainContent.innerHTML.includes(`pin-${t.id}`));
        if (currentTool) loadTool(currentTool.id);
        else if (mainContent.innerHTML.includes('Recently Used')) showHome();
        else if (mainContent.innerHTML.includes('Search Tools')) showSearch();
        else if (mainContent.innerHTML.includes('Browse Tools')) showBrowse();
    };
    
    // Append elements
    buttonContainer.append(minimizeBtn, closeBtn);
    header.append(title, buttonContainer);
    content.append(sidebar, mainContent);
    windowEl.append(header, content);
    document.body.appendChild(windowEl);
    
    // Dragging functionality
    let isDragging = false;
    let currentX = 100;
    let currentY = 100;
    let initialX, initialY;
    
    header.addEventListener('mousedown', e => {
        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;
        isDragging = true;
    });
    
    document.addEventListener('mousemove', e => {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            windowEl.style.left = currentX + 'px';
            windowEl.style.top = currentY + 'px';
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Minimize functionality
    minimizeBtn.addEventListener('click', () => {
        windowEl.classList.toggle('minimized');
        content.style.display = windowEl.classList.contains('minimized') ? 'none' : 'flex';
        minimizeBtn.innerHTML = windowEl.classList.contains('minimized') ? '+' : '—';
    });
    
    // Close functionality
    closeBtn.addEventListener('click', () => {
        windowEl.style.display = 'none';
    });
    
    // Toggle window with 'H' key, excluding inputs
    document.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 'h' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
            windowEl.style.display = windowEl.style.display === 'none' ? 'block' : 'none';
        }
    });
    
    // Tool functions
    window.appendToCalc = value => {
        const input = document.getElementById('calculator-input');
        if (input) input.value += value;
    };
    
    window.clearCalc = () => {
        const input = document.getElementById('calculator-input');
        if (input) input.value = '';
    };
    
    window.calculate = () => {
        const input = document.getElementById('calculator-input');
        if (input) {
            try {
                let expr = input.value.replace('×', '*');
                expr = expr.replace(/sin\((.*?)\)/g, 'Math.sin($1 * Math.PI / 180)');
                expr = expr.replace(/cos\((.*?)\)/g, 'Math.cos($1 * Math.PI / 180)');
                expr = expr.replace(/tan\((.*?)\)/g, 'Math.tan($1 * Math.PI / 180)');
                input.value = eval(expr).toFixed(4);
            } catch (e) {
                input.value = 'Error';
            }
        }
    };
    
    window.updateUnitOptions = () => {
        const type = document.getElementById('unit-type')?.value;
        const fromSelect = document.getElementById('unit-from');
        const toSelect = document.getElementById('unit-to');
        if (!fromSelect || !toSelect) return;
        
        const units = {
            length: ['meters', 'kilometers', 'centimeters', 'feet', 'inches'],
            weight: ['kilograms', 'grams', 'pounds', 'ounces'],
            temperature: ['Celsius', 'Fahrenheit', 'Kelvin']
        };
        
        fromSelect.innerHTML = toSelect.innerHTML = units[type].map(unit => `<option value="${unit}">${unit}</option>`).join('');
    };
    
    window.convertUnit = () => {
        const input = document.getElementById('unit-input');
        const output = document.getElementById('unit-output');
        const type = document.getElementById('unit-type')?.value;
        const from = document.getElementById('unit-from')?.value;
        const to = document.getElementById('unit-to')?.value;
        if (!input || !output || !from || !to) return;
        
        const value = parseFloat(input.value);
        if (isNaN(value)) {
            output.value = 'Enter a valid number';
            return;
        }
        
        let result;
        if (type === 'length') {
            const conversions = {
                meters: 1,
                kilometers: 0.001,
                centimeters: 100,
                feet: 3.28084,
                inches: 39.3701
            };
            result = (value * conversions[from]) * conversions[to];
        } else if (type === 'weight') {
            const conversions = {
                kilograms: 1,
                grams: 1000,
                pounds: 2.20462,
                ounces: 35.274
            };
            result = (value * conversions[from]) * conversions[to];
        } else if (type === 'temperature') {
            let celsius;
            if (from === 'Celsius') celsius = value;
            else if (from === 'Fahrenheit') celsius = (value - 32) * 5/9;
            else celsius = value - 273.15;
            
            if (to === 'Celsius') result = celsius;
            else if (to === 'Fahrenheit') result = celsius * 9/5 + 32;
            else result = celsius + 273.15;
        }
        output.value = result.toFixed(4);
    };
    
    window.summarizeText = () => {
        const input = document.getElementById('summarizer-input');
        const output = document.getElementById('summarizer-output');
        if (!input || !output) return;
        
        const text = input.value.trim();
        if (!text) {
            output.value = 'Enter text to summarize';
            return;
        }
        
        const paragraphs = text.split('\n').filter(p => p.trim());
        const summary = paragraphs.map(p => {
            const sentence = p.split(/[.!?]/)[0].trim();
            return sentence ? sentence + '.' : '';
        }).filter(s => s).join(' ');
        output.value = summary || 'Unable to summarize';
    };
    
    window.updateFormulas = () => {
        const category = document.getElementById('formula-category')?.value;
        const list = document.getElementById('formula-list');
        if (!list) return;
        
        const formulas = {
            math: [
                'Quadratic Formula: x = (-b ± √(b²-4ac)) / (2a)',
                'Pythagorean Theorem: a² + b² = c²',
                'Slope: m = (y₂ - y₁) / (x₂ - x₁)'
            ],
            physics: [
                'Force: F = m * a',
                'Kinetic Energy: KE = (1/2) * m * v²',
                'Ohm\'s Law: V = I * R'
            ],
            geometry: [
                'Area of Circle: A = π * r²',
                'Volume of Sphere: V = (4/3) * π * r³',
                'Area of Triangle: A = (1/2) * b * h'
            ]
        };
        
        list.innerHTML = formulas[category].map(formula => `<p>${formula}</p>`).join('');
    };
    
    window.saveNotes = () => {
        const input = document.getElementById('notes-input');
        if (input) {
            localStorage.setItem('webtools-notes', input.value);
        }
    };
    
    window.loadNotes = () => {
        const input = document.getElementById('notes-input');
        if (input) {
            input.value = localStorage.getItem('webtools-notes') || '';
        }
    };
    
    window.clearNotes = () => {
        const input = document.getElementById('notes-input');
        if (input) {
            input.value = '';
            localStorage.removeItem('webtools-notes');
        }
    };
    
    window.saveCheatSheet = () => {
        const input = document.getElementById('cheatsheet-input');
        if (input) {
            localStorage.setItem('webtools-cheatsheet', input.value);
        }
    };
    
    window.loadCheatSheet = () => {
        const input = document.getElementById('cheatsheet-input');
        if (input) {
            input.value = localStorage.getItem('webtools-cheatsheet') || '';
        }
    };
    
    window.clearCheatSheet = () => {
        const input = document.getElementById('cheatsheet-input');
        if (input) {
            input.value = '';
            localStorage.removeItem('webtools-cheatsheet');
        }
    };
    
    // Encryptor functions
    window.loadEncryptor = () => {
        const input = document.getElementById('encryptor-input');
        const output = document.getElementById('encryptor-output');
        const password = document.getElementById('encryptor-password');
        const toggleBtn = document.getElementById('toggle-password');
        const copyBtn = document.getElementById('copy-output');
        if (input && output && password && toggleBtn && copyBtn) {
            // Load saved data
            input.value = localStorage.getItem('webtools-encryptor-input') || '';
            output.value = localStorage.getItem('webtools-encryptor-output') || '';
            password.value = localStorage.getItem('webtools-encryptor-password') || '';

            // Toggle password visibility
            toggleBtn.onclick = () => {
                const isHidden = password.getAttribute('type') === 'password';
                password.setAttribute('type', isHidden ? 'text' : 'password');
                toggleBtn.setAttribute('data-tooltip', isHidden ? 'Hide password' : 'Show password');
                toggleBtn.textContent = isHidden ? '👁️‍🗨️' : '👁️';
            };

            // Copy output to clipboard
            copyBtn.onclick = async () => {
                if (!output.value) return;
                try {
                    await navigator.clipboard.writeText(output.value);
                    copyBtn.classList.add('copied');
                    copyBtn.setAttribute('data-tooltip', 'Copied!');
                    copyBtn.textContent = '✅';
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                        copyBtn.setAttribute('data-tooltip', 'Copy to clipboard');
                        copyBtn.textContent = '📋';
                    }, 1500);
                } catch (e) {
                    output.value = 'Failed to copy to clipboard';
                }
            };

            // Save input/output/password on change
            input.addEventListener('input', () => localStorage.setItem('webtools-encryptor-input', input.value));
            output.addEventListener('input', () => localStorage.setItem('webtools-encryptor-output', output.value));
            password.addEventListener('input', () => localStorage.setItem('webtools-encryptor-password', password.value));
        }
    };
    
    async function deriveKey(password, salt) {
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(password);
        const saltBuffer = salt || crypto.getRandomValues(new Uint8Array(16));
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            passwordBuffer,
            'PBKDF2',
            false,
            ['deriveBits', 'deriveKey']
        );
        const key = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: saltBuffer,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );
        return { key, salt: saltBuffer };
    }
    
    window.encryptText = async () => {
        const input = document.getElementById('encryptor-input');
        const password = document.getElementById('encryptor-password');
        const output = document.getElementById('encryptor-output');
        if (!input || !password || !output) return;
        
        const text = input.value.trim();
        const pass = password.value.trim();
        if (!text) {
            output.value = 'Enter text to encrypt';
            return;
        }
        if (pass.length < 6) {
            output.value = 'Password must be at least 6 characters';
            return;
        }
        
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const { key, salt } = await deriveKey(pass);
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encrypted = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv },
                key,
                data
            );
            const encryptedArray = new Uint8Array(encrypted);
            const result = {
                iv: Array.from(iv),
                salt: Array.from(salt),
                data: Array.from(encryptedArray)
            };
            output.value = btoa(JSON.stringify(result));
            localStorage.setItem('webtools-encryptor-output', output.value);
        } catch (e) {
            output.value = 'Encryption failed: Invalid input or processing error';
        }
    };
    
    window.decryptText = async () => {
        const input = document.getElementById('encryptor-input');
        const password = document.getElementById('encryptor-password');
        const output = document.getElementById('encryptor-output');
        if (!input || !password || !output) return;
        
        const text = input.value.trim();
        const pass = password.value.trim();
        if (!text) {
            output.value = 'Enter encrypted text to decrypt';
            return;
        }
        if (pass.length < 6) {
            output.value = 'Password must be at least 6 characters';
            return;
        }
        
        try {
            const encryptedObj = JSON.parse(atob(text));
            if (!encryptedObj.iv || !encryptedObj.salt || !encryptedObj.data) {
                output.value = 'Invalid encrypted text format';
                return;
            }
            const iv = new Uint8Array(encryptedObj.iv);
            const salt = new Uint8Array(encryptedObj.salt);
            const data = new Uint8Array(encryptedObj.data);
            const { key } = await deriveKey(pass, salt);
            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv },
                key,
                data
            );
            const decoder = new TextDecoder();
            output.value = decoder.decode(decrypted);
            localStorage.setItem('webtools-encryptor-output', output.value);
        } catch (e) {
            output.value = 'Decryption failed: Invalid text, password, or format';
        }
    };
    
    // New tool functions
    window.floodHistory = () => {
        const countInput = document.getElementById('history-count');
        const status = document.getElementById('history-status');
        if (!countInput || !status) return;
        
        const count = parseInt(countInput.value, 10);
        if (isNaN(count) || count < 1 || count > 1000) {
            status.textContent = 'Enter a number between 1 and 1000';
            return;
        }
        
        try {
            const url = window.location.href;
            for (let i = 0; i < count; i++) {
                history.pushState(0, 0, i == count ? window.location.href : i.toString());
            }
            status.textContent = `Added ${count} entries to history`;
        } catch (e) {
            status.textContent = 'Failed to flood history';
        }
    };

    // Tab disguiser
    window.disguiseTab = () => {
        try {
            // Change title
            document.title = 'Google Drive';

            // Change favicon
            const links = document.querySelectorAll("link[rel~='icon']");
            links.forEach(link => link.remove());

            // Create new favicon link
            const newFavicon = document.createElement('link');
            newFavicon.rel = 'icon';
            newFavicon.href = 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png'
            document.head.appendChild(newFavicon);
        } catch (e) {
            status.textContent = 'Failed to disguise tab';
        }
    };
    
    window.openTabs = () => {
        const urlInput = document.getElementById('tab-url');
        const countInput = document.getElementById('tab-count');
        const status = document.getElementById('tab-status');
        if (!urlInput || !countInput || !status) return;
        
        const count = parseInt(countInput.value, 10);
        if (isNaN(count) || count < 1 || count > 50) {
            status.textContent = 'Enter a number between 1 and 50';
            return;
        }
        
        if (count > 10 && !confirm(`Opening ${count} tabs may slow your browser. Continue?`)) {
            status.textContent = 'Operation cancelled';
            return;
        }
        
        try {
            const url = urlInput.value.trim() || window.location.href;
            for (let i = 0; i < count; i++) {
                window.open(url, '_blank');
            }
            status.textContent = `Opened ${count} tabs`;
        } catch (e) {
            status.textContent = 'Failed to open tabs';
        }
    };
    
    window.clearCookies = () => {
        const status = document.getElementById('cookie-status');
        if (!status) return;
        
        if (!confirm('This will delete all cookies for this domain and may log you out. Continue?')) {
            status.textContent = 'Operation cancelled';
            return;
        }
        
        try {
            document.cookie.split(';').forEach(cookie => {
                const name = cookie.split('=')[0].trim();
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            });
            status.textContent = 'Cookies cleared successfully';
        } catch (e) {
            status.textContent = 'Failed to clear cookies';
        }
    };
    
    window.clearCache = async () => {
        const status = document.getElementById('cache-status');
        if (!status) return;
        
        try {
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
                status.textContent = 'Cache cleared successfully';
            } else {
                status.textContent = 'Cache API not supported; performing hard reload';
                window.location.reload(true);
            }
        } catch (e) {
            status.textContent = 'Failed to clear cache; try a hard reload';
        }
    };
    
    // Initialize sidebar and home
    updateSidebar();
    showHome();
})();
