let isMetric = true, isNight = false, activeData = {};
const SUN = { rise: 6, set: 19 }; // Will vary by season later

function getSeasonData() {
    const m = new Date().getMonth();
    if ([5, 6, 7, 8].includes(m)) return { 
        name: 'monsoon', bg: 'bg-monsoon', cond: 'Moderate Monsoon', icon: '10d', temp: 24, rain: true, humidity: 84, uv: 3, 
        alert: { t: 'RED ALERT', m: 'High-intensity monsoon core active. Flooding risk high.', i: '🌧️', c: 'bg-red-600/90' },
        icons: ['10d', '09d', '10d', '11d', '09d'], rise: 6, set: 19
    };
    if ([9, 10].includes(m)) return { 
        name: 'post', bg: 'bg-post', cond: 'Overcast Skies', icon: '04d', temp: 27, rain: false, humidity: 65, uv: 5,
        alert: { t: 'HAZE WARNING', m: 'Post-monsoon humidity causing low visibility in mornings.', i: '☁️', c: 'bg-teal-700/90' },
        icons: ['04d', '03d', '02d', '04d', '03d'], rise: 6.5, set: 18
    };
    if ([11, 0, 1].includes(m)) return { 
        name: 'winter', bg: 'bg-winter', cond: 'Clear Winter Sky', icon: '01d', temp: 18, rain: false, humidity: 40, uv: 4,
        alert: { t: 'COLD WAVE', m: 'Unusually low temperatures expected tonight. Wrap up.', i: '❄️', c: 'bg-indigo-800/90' },
        icons: ['01d', '01d', '02d', '01d', '02d'], rise: 7, set: 17.5
    };
    return { 
        name: 'summer', bg: 'bg-summer', cond: 'Severe Heat', icon: '01d', temp: 36, rain: false, humidity: 25, uv: 9,
        alert: { t: 'HEAT ALERT', m: 'UV Index at peak. Avoid outdoor activity between 12-4 PM.', i: '☀️', c: 'bg-orange-800/90' },
        icons: ['01d', '01d', '01d', '02d', '01d'], rise: 5.5, set: 19.5
    };
}

function calculateMoon() {
    const day = new Date().getDate();
    const phases = [
        { i: '🌑', n: 'New Moon' }, { i: '🌒', n: 'Waxing Crescent' },
        { i: '🌓', n: 'First Quarter' }, { i: '🌔', n: 'Waxing Gibbous' },
        { i: '🌕', n: 'Full Moon' }, { i: '🌖', n: 'Waning Gibbous' },
        { i: '🌗', n: 'Last Quarter' }, { i: '🌘', n: 'Waning Crescent' }
    ];
    const idx = Math.floor((day % 30) / 3.75);
    document.getElementById('moonIcon').innerText = phases[idx].i;
    document.getElementById('moonLabel').innerText = phases[idx].n;
}

function animateTemp(id, target) {
    const el = document.getElementById(id);
    let current = 0;
    const timer = setInterval(() => {
        current += Math.ceil(target/25);
        if (current >= target) { clearInterval(timer); el.innerText = target; }
        else el.innerText = current;
    }, 35);
}

function init() {
    activeData = getSeasonData();
    const now = new Date();
    
    document.body.classList.add(activeData.bg);
    if(activeData.rain) {
        document.body.classList.add('is-raining');
        const r = document.getElementById('rainLayer');
        for(let i=0; i<65; i++) {
            let d = document.createElement('div'); d.className='drop';
            d.style.left = Math.random()*100+'%'; d.style.animationDuration = (Math.random()*0.5+0.5)+'s';
            r.appendChild(d);
        }
    }

    document.getElementById('heroDate').innerText = `Pune • ${now.toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric'})}`;
    document.getElementById('condText').innerText = activeData.cond;
    document.getElementById('mainIcon').src = `https://openweathermap.org/img/wn/${activeData.icon}@4x.png`;
    
    const b = document.getElementById('alertBanner');
    b.classList.add(activeData.alert.c);
    document.getElementById('alertTitle').innerText = activeData.alert.t;
    document.getElementById('alertMsg').innerText = activeData.alert.m;
    document.getElementById('alertIcon').innerText = activeData.alert.i;

    document.getElementById('riseLabel').innerText = `Sunrise 0${activeData.rise}:00`;
    document.getElementById('setLabel').innerText = `Sunset ${activeData.set}:00`;

    calculateMoon();
    updateDisplay(true);
    updateSolarArc();
    setInterval(updateSolarArc, 60000);
}

function updateDisplay(isLoad) {
    const t = isMetric ? activeData.temp : Math.round(activeData.temp * 1.8 + 32);
    const f = isMetric ? activeData.temp + 2 : Math.round((activeData.temp + 2) * 1.8 + 32);
    const v = isMetric ? 6 : 3.7;
    
    if(isLoad) {
        animateTemp('mainTemp', t);
        animateTemp('feelsLikeVal', f);
        setTimeout(() => {
            document.getElementById('humFill').style.width = activeData.humidity + '%';
            document.getElementById('humVal').innerText = activeData.humidity + '%';
            document.getElementById('uvFill').style.width = (activeData.uv * 10) + '%';
            document.getElementById('uvVal').innerText = activeData.uv;
            document.getElementById('aqiFill').style.width = '42%';
            document.getElementById('aqiVal').innerText = '42';
        }, 600);
    } else {
        document.getElementById('mainTemp').innerText = t;
        document.getElementById('feelsLikeVal').innerText = f;
    }
    
    document.getElementById('visVal').innerText = v;
    document.getElementById('visUnit').innerText = isMetric ? 'km' : 'mi';

    renderHourly();
    renderFiveDay();
    renderChart();
}

function renderHourly() {
    const hrs = ['Now', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM'];
    const temps = [activeData.temp, activeData.temp-2, activeData.temp-1, activeData.temp+3, activeData.temp+5, activeData.temp+2];
    document.getElementById('hourlyStrip').innerHTML = hrs.map((h, i) => `
        <div class="flex flex-col items-center min-w-[110px] glass py-10 px-2 gap-4 ${i===0?'border-2 border-white/40 bg-white/10':''}">
            <span class="text-[10px] font-black opacity-40 uppercase">${h}</span>
            <img src="https://openweathermap.org/img/wn/${activeData.icon}.png" class="w-12 h-12">
            <span class="text-2xl font-black">${isMetric?temps[i]:Math.round(temps[i]*1.8+32)}°</span>
        </div>
    `).join('');
}

function renderFiveDay() {
    const names = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    document.getElementById('fiveDay').innerHTML = names.map((d, i) => `
        <div class="flex justify-between items-center group">
            <span class="text-sm font-extrabold opacity-50 group-hover:opacity-100 transition">${d}</span>
            <div class="flex items-center gap-6">
                <img src="https://openweathermap.org/img/wn/${activeData.icons[i]}.png" class="w-10 h-10">
                <span class="text-lg font-black w-14 text-right">${isMetric?activeData.temp+i:Math.round((activeData.temp+i)*1.8+32)}°</span>
            </div>
        </div>
    `).join('');
}

function renderChart() {
    const container = document.getElementById('chartContainer');
    const data = [ {d:'Mon', h:activeData.temp, l:activeData.temp-6}, {d:'Tue', h:activeData.temp+4, l:activeData.temp-2}, {d:'Wed', h:activeData.temp+2, l:activeData.temp-4}, {d:'Thu', h:activeData.temp-1, l:activeData.temp-7}, {d:'Fri', h:activeData.temp-3, l:activeData.temp-9} ];
    container.innerHTML = data.map(day => {
        const h = isMetric ? day.h : Math.round(day.h * 1.8 + 32);
        const l = isMetric ? day.l : Math.round(day.l * 1.8 + 32);
        const scale = isMetric ? 6 : 4; 
        return `
            <div class="flex-1 flex flex-col items-center group relative h-full justify-end">
                <div class="w-full bg-white/10 rounded-2xl relative transition-all group-hover:bg-sky-400/30" 
                     style="height: ${(h-l)*scale}px; bottom: ${l*(isMetric?1.2:0.5)}px;">
                    <span class="absolute -top-8 w-full text-center text-[10px] font-black">${h}°</span>
                    <span class="absolute -bottom-6 w-full text-center text-[9px] font-black opacity-30">${l}°</span>
                </div>
                <span class="text-[10px] font-black opacity-30 uppercase absolute -bottom-8">${day.d}</span>
            </div>
        `;
    }).join('');
}

function updateSolarArc() {
    const now = new Date();
    const h = now.getHours() + (now.getMinutes()/60);
    let progress = 0;
    if(h >= activeData.rise && h <= activeData.set) progress = ((h - activeData.rise)/(activeData.set - activeData.rise)) * 100;
    else if(h > activeData.set) progress = 100;

    const path = document.getElementById('sun-path');
    const dot = document.getElementById('sun-dot');
    path.style.strokeDashoffset = 285 - (285 * (progress/100));
    const t = progress / 100;
    const x = (1-t)**2 * 10 + 2*(1-t)*t * 50 + t**2 * 90;
    const y = (1-t)**2 * 35 + 2*(1-t)*t * 0 + t**2 * 35;
    dot.setAttribute('cx', x); dot.setAttribute('cy', y);
    document.getElementById('timeDisplay').innerText = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}

function toggleTheme() {
    isNight = !isNight;
    const b = document.body;
    b.classList.toggle('bg-night', isNight);
    b.classList.toggle('night-mode', isNight);
    document.getElementById('themeIcon').innerText = isNight ? '☀️' : '🌙';
}

function setUnit(u) {
    if((u==='metric' && isMetric) || (u==='imperial' && !isMetric)) return;
    isMetric = (u === 'metric');
    document.getElementById('unitC').className = isMetric ? "px-6 py-3 rounded-2xl text-xs font-black transition bg-white text-gray-900" : "px-6 py-3 rounded-2xl text-xs font-black transition text-white";
    document.getElementById('unitF').className = !isMetric ? "px-6 py-3 rounded-2xl text-xs font-black transition bg-white text-gray-900" : "px-6 py-3 rounded-2xl text-xs font-black transition text-white";
    updateDisplay(false);
}

function handleSearch(e) {
    if(e.key === 'Enter') {
        const t = document.getElementById('toast');
        document.getElementById('toastMsg').innerText = "Simulating environment for " + e.target.value;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3500);
    }
}

function dismissAlert() {
    const b = document.getElementById('alertBanner');
    b.style.maxHeight = '0px'; b.style.opacity = '0'; b.style.marginBottom = '0px';
    setTimeout(() => b.remove(), 500);
}

window.onload = init;
