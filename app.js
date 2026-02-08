// Updated Dashboard Logic for Cloud Sync
async function updateDashboard() {
    try {
        const response = await fetch('./status.json?t=' + Date.now());
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        // Main Text Fields
        document.getElementById('current-op').textContent = data.status;
        document.getElementById('task-text').textContent = data.current_task;
        document.getElementById('fund-val').textContent = data.balance.toFixed(2);
        document.getElementById('efficiency-val').textContent = Math.floor(data.efficiency);
        
        // System Sidebar
        document.getElementById('host-os').textContent = data.host_stats ? data.host_stats.os : 'RENDER-CLOUD';
        document.getElementById('ram-val').textContent = data.host_stats ? data.host_stats.ram_free : '512MB';
        document.getElementById('latency-val').textContent = data.latency;

        // Progress Bar
        document.getElementById('main-progress').style.width = data.progress + '%';
        
        // Update Milestones
        const milestoneList = document.getElementById('milestone-list');
        if (milestoneList && data.milestones) {
            milestoneList.innerHTML = '';
            data.milestones.forEach(m => {
                const div = document.createElement('div');
                div.className = `milestone-item ${m.status === 'done' ? 'done' : ''}`;
                div.innerHTML = `<div class="dot"></div><span>${m.name.toUpperCase()}</span>`;
                milestoneList.appendChild(div);
            });
        }

        // Update Logs
        const logList = document.getElementById('log-list');
        if (logList && data.recent_logs) {
            logList.innerHTML = '';
            data.recent_logs.slice().reverse().forEach((log, index) => {
                const li = document.createElement('li');
                li.textContent = `[ECHO::SYS] ${log}`;
                logList.appendChild(li);
            });
        }

        document.getElementById('sync-timer').textContent = `LAST SYNC: ${new Date().toLocaleTimeString()}`;

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Fixed Navigation Logic
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const activeItem = document.querySelector('.nav-item.active');
        if (activeItem) activeItem.classList.remove('active');
        item.classList.add('active');
        const section = item.querySelector('.text').textContent;
        console.log(`Navigating to: ${section}`);
        
        // Simple View Switching logic
        if (section === 'DASHBOARD') {
            document.querySelector('.main-content').style.opacity = '1';
        } else {
            // Placeholder for other views
            alert(`${section} module coming soon in Midnight Build!`);
        }
    });
});

setInterval(updateDashboard, 5000); // 5s for cloud stability
updateDashboard();