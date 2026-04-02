
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toastMessage');
    const toastText = document.getElementById('toastText');
    toastText.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const JUNG = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
const JONG = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

const charToKey = {
    'q':'q', 'ㅂ':'q', 'ㅃ':'q', 'w':'w', 'ㅈ':'w', 'ㅉ':'w', 'e':'e', 'ㄷ':'e', 'ㄸ':'e',
    'r':'r', 'ㄱ':'r', 'ㄲ':'r', 't':'t', 'ㅅ':'t', 'ㅆ':'t', 'y':'y', 'ㅛ':'y', 'u':'u', 'ㅕ':'u',
    'i':'i', 'ㅑ':'i', 'o':'o', 'ㅐ':'o', 'ㅒ':'o', 'p':'p', 'ㅔ':'p', 'ㅖ':'p', 'a':'a', 'ㅁ':'a',
    's':'s', 'ㄴ':'s', 'd':'d', 'ㅇ':'d', 'f':'f', 'ㄹ':'f', 'g':'g', 'ㅎ':'g', 'h':'h', 'ㅗ':'h',
    'j':'j', 'ㅓ':'j', 'k':'k', 'ㅏ':'k', 'l':'l', 'ㅣ':'l', 'z':'z', 'ㅋ':'z', 'x':'x', 'ㅌ':'x',
    'c':'c', 'ㅊ':'c', 'v':'v', 'ㅍ':'v', 'b':'b', 'ㅠ':'b', 'n':'n', 'ㅜ':'n', 'm':'m', 'ㅡ':'m'
};

function splitJung(jung) {
    const map = { 'ㅘ':['ㅗ','ㅏ'], 'ㅙ':['ㅗ','ㅐ'], 'ㅚ':['ㅗ','ㅣ'], 'ㅝ':['ㅜ','ㅓ'], 'ㅞ':['ㅜ','ㅔ'], 'ㅟ':['ㅜ','ㅣ'], 'ㅢ':['ㅡ','ㅣ'] };
    return map[jung] || [jung];
}
function splitJong(jong) {
    const map = { 'ㄳ':['ㄱ','ㅅ'], 'ㄵ':['ㄴ','ㅈ'], 'ㄶ':['ㄴ','ㅎ'], 'ㄺ':['ㄹ','ㄱ'], 'ㄻ':['ㄹ','ㅁ'], 'ㄼ':['ㄹ','ㄽ'], 'ㄽ':['ㄹ','ㅅ'], 'ㄾ':['ㄹ','ㅌ'], 'ㄿ':['ㄹ','ㅍ'], 'ㅀ':['ㄹ','ㅎ'], 'ㅄ':['ㅂ','ㅅ'] };
    return map[jong] || [jong];
}

function decomposeText(text, ignoreSymbols = false, simultaneous = false, engWordSimultaneous = false) {
    const sequence = [];
    const mapping = []; 
    let engBuffer = [];
    let engMapBuffer = [];

    const flushEngBuffer = () => {
        if (engBuffer.length > 0) {
            if (engWordSimultaneous) {
                sequence.push([...engBuffer]);
                mapping.push([...engMapBuffer]);
            } else {
                engBuffer.forEach((char, idx) => {
                    sequence.push([char]);
                    mapping.push(engMapBuffer[idx]);
                });
            }
            engBuffer = [];
            engMapBuffer = [];
        }
    };

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        if (ignoreSymbols && !(/[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/.test(char))) {
            flushEngBuffer();
            continue;
        }

        if (/[a-zA-Z]/.test(char)) {
            engBuffer.push(char.toLowerCase());
            engMapBuffer.push(i);
            continue;
        } else {
            flushEngBuffer();
        }

        const code = char.charCodeAt(0);
        if (code >= 0xAC00 && code <= 0xD7A3) { 
            const offset = code - 0xAC00;
            const jongIdx = offset % 28;
            const jungIdx = Math.floor((offset - jongIdx) / 28) % 21;
            const choIdx = Math.floor(Math.floor((offset - jongIdx) / 28) / 21);

            const cho = CHO[choIdx];
            const splitJ = splitJung(JUNG[jungIdx]);
            const splitJo = jongIdx > 0 ? splitJong(JONG[jongIdx]) : [];

            if (simultaneous) {
                sequence.push([cho, ...splitJ, ...splitJo]);
                mapping.push(i);
            } else {
                sequence.push([cho]); mapping.push(i);
                splitJ.forEach(j => { sequence.push([j]); mapping.push(i); });
                splitJo.forEach(jo => { sequence.push([jo]); mapping.push(i); });
            }
        } else {
            sequence.push([char]); mapping.push(i);
        }
    }
    flushEngBuffer();
    return { sequence, mapping };
}

const chordMultipliers = {
    'single': [1],
    'third': [1, 1.25],             
    'fifth': [1, 1.5],              
    'octave': [1, 2],               
    'major': [1, 1.25, 1.5],        
    'minor': [1, 1.189, 1.5]        
};

function getAccentMultiplier(index, meter) {
    if (meter === 0) return 1.0;
    const beat = index % meter;
    if (beat === 0) return 1.3; 
    if (meter === 4 && beat === 2) return 1.1; 
    return 0.85; 
}

let audioCtx = null;
let masterGain = null;
let echoSend = null; 
let delayNode = null;
let feedbackGain = null;

const scaleIntervals = {
    'major_pentatonic': [0, 2, 4, 7, 9],
    'minor_pentatonic': [0, 3, 5, 7, 10],
    'major': [0, 2, 4, 5, 7, 9, 11],
    'minor': [0, 2, 3, 5, 7, 8, 10]
};

function generateScale(intervals, startMidiNote, count) {
    const freqs = [];
    let intervalIdx = 0;
    let octaveOffset = 0;
    for (let i = 0; i < count; i++) {
        const noteInOctave = intervals[intervalIdx];
        const midiNote = startMidiNote + octaveOffset * 12 + noteInOctave;
        const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
        freqs.push(freq);
        
        intervalIdx++;
        if (intervalIdx >= intervals.length) {
            intervalIdx = 0;
            octaveOffset++;
        }
    }
    return freqs;
}

let defaultNotes = {};
const qwertyOrder = "qwertyuiopasdfghjklzxcvbnm".split('');

function applyScale(scaleName) {
    const intervals = scaleIntervals[scaleName] || scaleIntervals['major_pentatonic'];
    const freqs = generateScale(intervals, 48, 26); 
    defaultNotes = {};
    qwertyOrder.forEach((key, index) => {
        defaultNotes[key] = freqs[index];
    });
}

applyScale('major_pentatonic');

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.8;
        echoSend = audioCtx.createGain();
        echoSend.gain.value = 1; 
        delayNode = audioCtx.createDelay();
        delayNode.delayTime.value = 0.35;
        feedbackGain = audioCtx.createGain();
        feedbackGain.gain.value = 0.4;
        
        masterGain.connect(audioCtx.destination);
        echoSend.connect(delayNode);
        delayNode.connect(feedbackGain);
        feedbackGain.connect(delayNode);
        delayNode.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function getDynamicDelay(baseDelay, index, totalLength, mode) {
    if (mode === 'swing') {
        return (index % 2 === 0) ? baseDelay * 1.33 : baseDelay * 0.67;
    } else if (mode === 'waltz') {
        const pos = index % 3;
        return pos === 0 ? baseDelay * 1.2 : baseDelay * 0.9;
    } else if (mode === 'random') {
        return baseDelay * (0.7 + Math.random() * 0.6);
    }
    return baseDelay;
}

const MAX_VOICES = 2;
let voiceCounter = 0;
const voicesContainer = document.getElementById('voicesContainer');
const addVoiceBtn = document.getElementById('addVoiceBtn');

function createVoiceCard() {
    if (voiceCounter >= MAX_VOICES) {
        showToast(`최대 ${MAX_VOICES}개의 텍스트만 추가할 수 있습니다.`);
        return;
    }
    voiceCounter++;
    const voiceId = `voice-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const card = document.createElement('div');
    card.className = 'voice-card bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm relative transition-all';
    card.dataset.id = voiceId;
    
    card.innerHTML = `
        <div class="flex flex-wrap justify-between items-center mb-3 gap-2">
            <label class="flex items-center gap-2 font-bold text-slate-700 cursor-pointer select-none">
                <input type="checkbox" class="voice-chk w-5 h-5 accent-blue-600 rounded" checked>
                텍스트 ${voiceCounter}
            </label>
            <div class="flex items-center gap-2">
                <button class="indiv-play-btn bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-bold py-1.5 px-3 rounded transition-colors">▶ 개별 재생</button>
                <button class="delete-voice-btn text-slate-400 hover:text-red-500 ml-2 p-1 transition-colors" title="텍스트 삭제"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
            </div>
        </div>
        
        <div class="relative">
            <textarea class="voice-text w-full p-3 pb-7 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm" rows="2" maxlength="140" placeholder="연주할 텍스트를 입력하세요..."></textarea>
            <span class="char-count absolute bottom-2 right-3 text-[10px] text-slate-400 font-mono pointer-events-none">0 / 140 자</span>
        </div>
        
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4 pt-3 border-t border-slate-100 bg-slate-50 p-2 rounded-lg">
            <div class="flex items-center gap-2">
                <label class="text-xs font-medium text-slate-600">음색:</label>
                <select class="voice-synth p-1 text-xs border border-slate-300 rounded outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer bg-white">
                    <option value="musicbox">오르골</option>
                    <option value="basic">전자음</option>
                    <option value="8bit">8-bit</option>
                </select>
            </div>
            <div class="flex items-center gap-2">
                <label class="text-xs font-medium text-slate-600">화음:</label>
                <select class="voice-chord p-1 text-xs border border-slate-300 rounded outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer bg-white">
                    <option value="single">단음 (Single)</option>
                    <option value="third">3도 위</option>
                    <option value="fifth">5도 위</option>
                </select>
            </div>
            <div class="flex items-center gap-2">
                <label class="flex items-center gap-1.5 text-xs font-medium text-slate-600 cursor-pointer">
                    <input type="checkbox" class="voice-sustain-chk w-3.5 h-3.5 accent-blue-600 rounded cursor-pointer"> 장음
                </label>
                <input type="range" class="voice-sustain-val w-16 md:w-20 h-1.5 cursor-pointer disabled:opacity-50 accent-blue-500" min="0.1" max="1.5" step="0.1" value="0.5" disabled>
            </div>
            <div class="flex items-center gap-2">
                <label class="flex items-center gap-1.5 text-xs font-medium text-slate-600 cursor-pointer">
                    <input type="checkbox" class="voice-echo-chk w-3.5 h-3.5 accent-blue-600 rounded cursor-pointer"> 에코 효과
                </label>
            </div>
        </div>
    `;
    voicesContainer.appendChild(card);
    updateAddButtonState();

    const susChk = card.querySelector('.voice-sustain-chk');
    const susVal = card.querySelector('.voice-sustain-val');
    susChk.addEventListener('change', (e) => susVal.disabled = !e.target.checked);

    const txtArea = card.querySelector('.voice-text');
    const charCount = card.querySelector('.char-count');
    
    txtArea.addEventListener('input', (e) => {
        stopPlayback();
        charCount.textContent = `${e.target.value.length} / 140 자`;
    });

    card.querySelector('.delete-voice-btn').addEventListener('click', () => {
        card.remove();
        voiceCounter--;
        updateAddButtonState();
        stopPlayback();
    });

    card.querySelector('.indiv-play-btn').addEventListener('click', () => startPlayback([getVoiceData(card)]));
}

function updateAddButtonState() {
    if (voiceCounter >= MAX_VOICES) {
        addVoiceBtn.classList.add('opacity-50', 'cursor-not-allowed');
        addVoiceBtn.classList.remove('hover:bg-slate-50');
        addVoiceBtn.innerHTML = `텍스트 추가 제한 도달 (최대 ${MAX_VOICES}개)`;
    } else {
        addVoiceBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        addVoiceBtn.classList.add('hover:bg-slate-50');
        addVoiceBtn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> 텍스트 추가 (최대 ${MAX_VOICES}개)`;
    }
}

function getVoiceData(card) {
    return {
        id: card.dataset.id,
        isActive: card.querySelector('.voice-chk').checked,
        text: card.querySelector('.voice-text').value.trim(),
        synthType: card.querySelector('.voice-synth').value,
        chordType: card.querySelector('.voice-chord').value,
        useSustain: card.querySelector('.voice-sustain-chk').checked,
        noteLength: parseFloat(card.querySelector('.voice-sustain-val').value),
        useEcho: card.querySelector('.voice-echo-chk').checked,
        cardElement: card
    };
}

let isPlaying = false;
let activeVoices = [];
let maxSequenceLength = 0;
let globalCurrentIndex = 0;
let playbackTimeout = null;
let previousSynthGains = {}; 

function highlightKey(keyChar) {
    const keyElement = document.getElementById(`key-${keyChar}`);
    if (keyElement) {
        keyElement.classList.add('active');
        setTimeout(() => keyElement.classList.remove('active'), 100);
    }
}

function playVoiceTones(voice, frequencies, currentDelaySec, accentMultiplier = 1.0) {
    if (!audioCtx || !frequencies || frequencies.length === 0) return;
    
    const defaultNoteLength = Math.min(0.15, currentDelaySec * 0.85);
    const noteLength = voice.useSustain ? voice.noteLength : defaultNoteLength;
    
    const t = audioCtx.currentTime;
    const synthType = voice.synthType;
    const prevGainKey = `${voice.id}-${synthType}`;

    if ((synthType === 'basic' || synthType === '8bit') && previousSynthGains[prevGainKey]) {
        try {
            const prev = previousSynthGains[prevGainKey];
            if (prev.time < t) {
                prev.gain.cancelScheduledValues(t);
                prev.gain.setTargetAtTime(0, t, 0.015);
            }
        } catch (e) {}
    }

    const multipliers = chordMultipliers[voice.chordType] || [1];
    const totalOscillators = frequencies.length * multipliers.length;
    const volumeScale = accentMultiplier / Math.sqrt(totalOscillators);

    const noteMasterGain = audioCtx.createGain();
    noteMasterGain.gain.value = volumeScale;
    noteMasterGain.connect(masterGain);
    if (voice.useEcho) noteMasterGain.connect(echoSend);

    frequencies.forEach(frequency => {
        multipliers.forEach(mult => {
            const f = frequency * mult;
            if (synthType === 'musicbox') {
                const osc1 = audioCtx.createOscillator(); const osc2 = audioCtx.createOscillator();
                osc1.type = 'sine'; osc1.frequency.setValueAtTime(f * 2, t);
                osc2.type = 'triangle'; osc2.frequency.setValueAtTime(f * 4.5, t);
                const localGain = audioCtx.createGain();
                localGain.gain.setValueAtTime(0, t);
                localGain.gain.linearRampToValueAtTime(0.4, t + 0.01);
                localGain.gain.exponentialRampToValueAtTime(0.001, t + noteLength + 0.5);
                osc1.connect(localGain); osc2.connect(localGain);
                localGain.connect(noteMasterGain);
                osc1.start(t); osc2.start(t); osc1.stop(t + noteLength + 0.6); osc2.stop(t + noteLength + 0.6);
            } else if (synthType === '8bit') {
                const osc = audioCtx.createOscillator();
                osc.type = 'square'; osc.frequency.setValueAtTime(f, t);
                const localGain = audioCtx.createGain();
                localGain.gain.setValueAtTime(0, t);
                localGain.gain.setValueAtTime(0.1, t + 0.01); 
                localGain.gain.setValueAtTime(0.1, t + noteLength * 0.8);
                localGain.gain.linearRampToValueAtTime(0, t + noteLength);
                osc.connect(localGain); localGain.connect(noteMasterGain);
                osc.start(t); osc.stop(t + noteLength + 0.05);
            } else {
                const osc = audioCtx.createOscillator();
                osc.type = 'sine'; osc.frequency.setValueAtTime(f, t);
                const localGain = audioCtx.createGain();
                localGain.gain.setValueAtTime(0, t);
                localGain.gain.linearRampToValueAtTime(0.2, t + 0.02);
                localGain.gain.exponentialRampToValueAtTime(0.001, t + noteLength);
                osc.connect(localGain); localGain.connect(noteMasterGain);
                osc.start(t); osc.stop(t + noteLength + 0.05);
            }
        });
    });

    if (synthType === 'basic' || synthType === '8bit') {
        previousSynthGains[prevGainKey] = { gain: noteMasterGain, time: t };
    }
}

function setupTypewriterDisplay(voices) {
    const display = document.getElementById('typewriterDisplay');
    display.innerHTML = '';
    if (voices.length === 0) {
        display.innerHTML = '<div class="absolute inset-0 flex items-center justify-center opacity-50 text-sm italic">재생할 텍스트가 없습니다.</div>';
        return;
    }
    voices.forEach(v => {
        const line = document.createElement('div');
        line.className = 'whitespace-nowrap';
        v.spanElements = [];
        for (let i = 0; i < v.text.length; i++) {
            const span = document.createElement('span');
            span.textContent = v.text[i];
            span.className = 'transition-colors duration-75 rounded px-[1px]';
            line.appendChild(span);
            v.spanElements.push(span);
        }
        display.appendChild(line);
    });
}

function updateTypewriterHighlights() {
    activeVoices.forEach(v => {
        if (v.currentSpans) {
            v.currentSpans.forEach(span => span.classList.remove('bg-emerald-500', 'text-slate-900', 'font-bold'));
        }
        const origIndices = v.mapping[globalCurrentIndex];
        if (origIndices !== undefined) {
            const indicesArray = Array.isArray(origIndices) ? origIndices : [origIndices];
            v.currentSpans = [];
            indicesArray.forEach(idx => {
                if (v.spanElements[idx]) {
                    const nextSpan = v.spanElements[idx];
                    nextSpan.classList.add('bg-emerald-500', 'text-slate-900', 'font-bold');
                    v.currentSpans.push(nextSpan);
                }
            });

            // 브라우저 전체 스크롤을 막고 디스플레이 내부 컨테이너만 스크롤하도록 변경
            if (v === activeVoices[0] && v.currentSpans.length > 0) {
                const displayContainer = document.getElementById('typewriterDisplay');
                const targetSpan = v.currentSpans[0];
                
                const containerRect = displayContainer.getBoundingClientRect();
                const targetRect = targetSpan.getBoundingClientRect();
                
                const scrollLeftTo = displayContainer.scrollLeft + (targetRect.left - containerRect.left) - (containerRect.width / 2) + (targetRect.width / 2);
                const scrollTopTo = displayContainer.scrollTop + (targetRect.top - containerRect.top) - (containerRect.height / 2) + (targetRect.height / 2);
                
                displayContainer.scrollTo({
                    left: scrollLeftTo,
                    top: scrollTopTo,
                    behavior: 'smooth'
                });
            }
        }
    });
}

function playLoop() {
    const progressSlider = document.getElementById('progressSlider');
    if (!isPlaying || globalCurrentIndex >= maxSequenceLength) {
        if (globalCurrentIndex >= maxSequenceLength) progressSlider.value = maxSequenceLength;
        stopPlayback();
        return;
    }

    progressSlider.value = globalCurrentIndex;
    updateTypewriterHighlights();

    const speed = parseInt(document.getElementById('speedControl').value, 10);
    const baseDelaySec = 1 / speed;
    
    const mode = document.getElementById('rhythmMode').value;
    const currentDelaySec = getDynamicDelay(baseDelaySec, globalCurrentIndex, maxSequenceLength, mode);

    const meter = parseInt(document.getElementById('meterSelect').value, 10);
    const accentMultiplier = getAccentMultiplier(globalCurrentIndex, meter);

    activeVoices.forEach(voice => {
        const chars = voice.sequence[globalCurrentIndex];
        if (chars && chars.length > 0) {
            const validChars = chars.filter(c => c !== ' ' && c !== '\n');
            if (validChars.length > 0) {
                const defaultFreqs = [];
                validChars.forEach(c => {
                    const mappedKey = charToKey[c];
                    if (mappedKey) {
                        highlightKey(mappedKey);
                        defaultFreqs.push(defaultNotes[mappedKey]);
                    }
                });

                if (defaultFreqs.length > 0) playVoiceTones(voice, defaultFreqs, currentDelaySec, accentMultiplier);
            }
        }
    });

    globalCurrentIndex++;
    playbackTimeout = setTimeout(playLoop, currentDelaySec * 1000);
}

function startPlayback(targetVoices) {
    if (!targetVoices || targetVoices.length === 0) {
        showToast("재생할 텍스트가 선택되지 않았거나 비어있습니다.");
        return;
    }

    clearTimeout(playbackTimeout);
    initAudio();

    const ignoreSymbols = document.getElementById('ignoreSymbolsToggle').checked;
    const simultaneous = document.getElementById('simultaneousToggle').checked;
    const engWordSimultaneous = document.getElementById('engWordSimultaneousToggle').checked;

    activeVoices = targetVoices.map(v => {
        const dec = decomposeText(v.text, ignoreSymbols, simultaneous, engWordSimultaneous);
        return { ...v, sequence: dec.sequence, mapping: dec.mapping, spanElements: [], currentSpans: [] };
    });

    maxSequenceLength = Math.max(...activeVoices.map(v => v.sequence.length));
    if (maxSequenceLength === 0) return;

    setupTypewriterDisplay(activeVoices);
    
    const progressSlider = document.getElementById('progressSlider');
    if (progressSlider.max != maxSequenceLength || globalCurrentIndex >= maxSequenceLength) {
        globalCurrentIndex = 0;
        progressSlider.max = maxSequenceLength;
    }
    progressSlider.disabled = false;
    
    isPlaying = true;


    
    const globalStopBtn = document.getElementById('globalStopBtn');
    globalStopBtn.classList.remove('pointer-events-none', 'opacity-50', 'cursor-not-allowed', 'hover:bg-slate-700', 'bg-slate-800', 'text-slate-500');
    globalStopBtn.disabled = false;
    globalStopBtn.classList.add('bg-red-500', 'text-white', 'hover:bg-red-600');

    playLoop();
}

function stopPlayback() {
    isPlaying = false;
    clearTimeout(playbackTimeout);
    updateAddButtonState();
    
    const globalStopBtn = document.getElementById('globalStopBtn');
    globalStopBtn.disabled = true;
    globalStopBtn.classList.remove('bg-red-500', 'text-white', 'hover:bg-red-600');
    globalStopBtn.classList.add('bg-slate-800', 'text-slate-500', 'hover:bg-slate-700', 'cursor-not-allowed');

    activeVoices.forEach(v => {
        if (v.currentSpans) {
            v.currentSpans.forEach(span => span.classList.remove('bg-emerald-500', 'text-slate-900', 'font-bold'));
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    createVoiceCard();

    document.getElementById('scaleSelect').addEventListener('change', (e) => {
        applyScale(e.target.value);
        stopPlayback();
    });

    document.getElementById('speedControl').addEventListener('input', (e) => {
        document.getElementById('speedValue').textContent = `${e.target.value} cps`;
    });
    document.getElementById('ignoreSymbolsToggle').addEventListener('change', stopPlayback);
    document.getElementById('simultaneousToggle').addEventListener('change', stopPlayback);
    document.getElementById('engWordSimultaneousToggle').addEventListener('change', stopPlayback);
    document.getElementById('progressSlider').addEventListener('input', (e) => {
        globalCurrentIndex = parseInt(e.target.value, 10);
        updateTypewriterHighlights();
    });
    document.getElementById('globalPlayBtn').addEventListener('click', () => {
        const cards = Array.from(document.querySelectorAll('.voice-card'));
        const targets = cards.map(getVoiceData).filter(v => v.isActive && v.text);
        startPlayback(targets);
    });
    
    const globalStopBtn = document.getElementById('globalStopBtn');
    if(globalStopBtn) globalStopBtn.addEventListener('click', stopPlayback);
    
    const addVoiceBtn = document.getElementById('addVoiceBtn');
    if(addVoiceBtn) addVoiceBtn.addEventListener('click', createVoiceCard);
});
