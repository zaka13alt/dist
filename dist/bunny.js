
console.log("Desmos Pull Zone Initialized.");

        const subjects = [
            'math', 'science', 'biology', 'chemistry', 'ap-studies',
            'physics', 'history', 'algebra', 'calculus', 'geometry',
            'literature', 'psychology', 'economics', 'statistics',
            'world-religions', 'technonyte-is-the-best', 'thinking', 
            'ixl-learning', 'computer-science', 'coding-club',
            'digital-literacy', 'stem-education', 'robotics'
        ];

        function getRandomLargeNumber() {
            let result = '';
 const length = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < length; i++) {
                result += Math.floor(Math.random() * 10);
            }
            return result;
        }

        function generateSingleName() {
            const subject = subjects[Math.floor(Math.random() * subjects.length)];
            const num = getRandomLargeNumber();
            const generatedName = subject + '-' + num;
            console.log(`Generated random name: ${generatedName}`);
            return generatedName;
        }

        function randomizeName() {
            const newName = generateSingleName();
            document.getElementById('zoneName').value = newName;
        }

        window.onload = () => {
            console.log("Window loaded. Setting initial random name.");
            randomizeName();
        };

        function setStatus(msg, type) {
            const el = document.getElementById('status');
            el.textContent = msg;
            el.className = 'block text-center mt-3 p-2 text-xs rounded ';
            if (type === 'danger') {
                console.error(`Status Error: ${msg}`);
                el.classList.add('bg-red-50', 'text-red-600');
            } else if (type === 'success') {
                console.log(`Status Success: ${msg}`);
                el.classList.add('bg-green-50', 'text-green-600');
            } else {
                console.info(`Status Info: ${msg}`);
 el.classList.add('bg-blue-50', 'text-blue-600');
            }
        }

        async function createMultipleZones() {
            const apiKey = document.getElementById('apiKey').value.trim();
            const origin = document.getElementById('originUrl').value.trim();
            const baseName = document.getElementById('zoneName').value.trim();
            const quantity = parseInt(document.getElementById('quantity').value) || 1;
            const btn = document.getElementById('createBtn');
            const list = document.getElementById('resultsList');
            const emptyState = document.getElementById('emptyState');

            console.group("Execution Trace");
            console.log("Parameters:", { apiKey: '***', origin, baseName, quantity });

            if (!apiKey || !origin || !baseName) {
                setStatus('Parameters incomplete', 'danger');
                console.groupEnd();
                return;
            }

            console.log("Clearing previous results...");
            const cards = list.querySelectorAll('.dc-card');
            cards.forEach(card => card.remove());
            emptyState.classList.remove('hidden');

            btn.disabled = true;
            btn.textContent = 'Calculating...';
            setStatus(`Processing ${quantity} pull zones...`, 'info');

            const tasks = [];
            for (let i = 0; i < quantity; i++) {
                const currentName = i === 0 ? baseName : generateSingleName();
                console.log(`Queueing request for zone: ${currentName}`);
                
                const task = fetch('https://api.bunny.net/pullzone', {
                method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json', 
                        'AccessKey': '544fc74a-8a65-4c26-b391-fad836cfbb0879e03e4d-5bcd-4d32-8d31-f71742c03fda',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ 
                        Name: currentName, 
                        OriginUrl: origin, 
                        Type: 0,
                        EnableGeoZoneUS: true,
                        EnableGeoZoneEU: true,
                        EnableGeoZoneASIA: true,
                        EnableGeoZoneSA: true,
                        EnableGeoZoneAF: true
                    })
                })
                .then(async res => {
                    if (res.ok) {
                        const data = await res.json();
                        console.log(` Success for ${currentName}:`, data);
                        return data;
                    } else {
                        const errText = await res.text();
                        console.warn(` Failed for ${currentName}. Status: ${res.status}. Error: ${errText}`);
                        return null;
                    }
                })
                .catch(err => {
                    console.error(` Network Error for ${currentName}:`, err);
                    return null;
                });
                tasks.push(task);
            }

            const results = await Promise.all(tasks);
 const validResults = results.filter(r => r !== null);
            
            if (validResults.length > 0) {
                emptyState.classList.add('hidden');
                validResults.forEach((res, idx) => {
                    const hostname = `${res.Name}.b-cdn.net`;
                    const card = document.createElement('div');
                    card.className = 'dc-card';
                    card.innerHTML = `
                        <div class="dc-card-badge">idx: ${idx + 1}</div>
                        <div class="text-[10px] font-bold text-blue-500 uppercase mb-1 tracking-wider">Pull Zone Object</div>
                        <div class="font-bold text-gray-800 text-sm mb-1">${res.Name}</div>
                        <div class="link-text font-mono text-xs text-gray-500 break-all">https://${hostname}/</div>
                    `;
                    list.appendChild(card);
                });
                setStatus(`Success: ${validResults.length} objects plotted`, 'success');
            } else {
                setStatus('Computation error. Verify API key.', 'danger');
            }
            
            btn.disabled = false;
            btn.textContent = 'Execute Function';
            console.groupEnd();
        }

        function copyAll() {
            const links = Array.from(document.querySelectorAll('.link-text')).map(el => el.textContent).join('\n');
            const btn = document.getElementById('copyAllBtn');
            if(!links) return;

            const textArea = document.createElement("textarea");
            textArea.value = links;
       document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Copied Successfully';
            setTimeout(() => btn.innerHTML = originalText, 2000);
        }
 
