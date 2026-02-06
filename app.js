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
        document.getElementById('host-os').textContent = data.host_stats ? data.host_stats.os : 'WIN-PC';
        document.getElementById('ram-val').textContent = data.host_stats ? data.host_stats.ram_free : '--';
        document.getElementById('latency-val').textContent = data.latency;

        // Progress Bar
        document.getElementById('main-progress').style.width = data.progress + '%';
        
        // Update Milestones
        const milestoneList = document.getElementById('milestone-list');
        milestoneList.innerHTML = '';
        data.milestones.forEach(m => {
            const div = document.createElement('div');
            div.className = `milestone-item ${m.status === 'done' ? 'done' : ''}`;
            div.innerHTML = `<div class="dot"></div><span>${m.name.toUpperCase()}</span>`;
            milestoneList.appendChild(div);
        });

        // Update Logs
        const logList = document.getElementById('log-list');
        logList.innerHTML = '';
        data.recent_logs.slice().reverse().forEach((log, index) => {
            const li = document.createElement('li');
            li.textContent = `[ECHO::SYS] ${log}`;
            logList.appendChild(li);
        });

        document.getElementById('sync-timer').textContent = `LAST SYNC: ${new Date().toLocaleTimeString()}`;

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Navigation logic (simple placeholder)
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.nav-item.active').classList.remove('active');
        item.classList.add('active');
        console.log(`Navigating to: ${item.querySelector('.text').textContent}`);
    });
});

setInterval(updateDashboard, 3000);
updateDashboard();