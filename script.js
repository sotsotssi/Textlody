// --- 다국어 (i18n) 설정 ---
const i18n = {
    ko: {
        pageTitle: "Textlody - 텍스트로 멜로디 만들기",
        tagline: "마음에 드는 멜로디는 #Textlody 해시태그로 공유해주세요!",
        desc: "텍스트로 멜로디 만들기",
        scaleLabel: "전체 음계:",
        scaleOpt_major_pentatonic: "메이저 펜타토닉",
        scaleOpt_minor_pentatonic: "마이너 펜타토닉",
        scaleOpt_major: "메이저 스케일",
        scaleOpt_minor: "마이너 스케일",
        rhythmLabel: "리듬/변속:",
        rhythmOpt_straight: "기본 (정박)",
        rhythmOpt_swing: "스윙 (바운스)",
        rhythmOpt_waltz: "왈츠 (강-약-약)",
        rhythmOpt_random: "랜덤",
        meterLabel: "박자(강약):",
        meterOpt_0: "없음 (일정하게)",
        meterOpt_4: "4/4박자",
        meterOpt_3: "3/4박자",
        speedLabel: "기본 템포:",
        engToggle: "영단어 동시 재생",
        simultaneousToggle: "문자 동시 재생",
        ignoreToggle: "공백/기호 무시",
        addVoice: "텍스트 추가 (최대 2개)",
        displayTitle: "▶ 텍스트 디스플레이",
        playAll: "▶ 전체 재생",
        stopAll: "■ 정지",
        displayPlaceholder: "재생할 텍스트를 체크하고 재생을 누르면 이곳에 표시됩니다...",
        start: "시작",
        end: "끝",
        ctaTitle: "Textlody 후원 버전을 만나보세요!",
        ctaDesc: "WAV 음원 추출, 5개 트랙 지원, 커스텀 오디오 매핑 등 다양한 추가 기능을 지원합니다.",
        ctaBtn: "▶ 포스타입 보러 가기",
        ctaUrl: "https://posty.pe/ovr5cm",
        toastMax: "최대 2개까지만 추가할 수 있습니다.",
        toastNoText: "재생할 텍스트가 없습니다.",
        textTitle: "텍스트",
        indivPlay: "▶ 개별 재생",
        voicePlaceholder: "연주할 텍스트를 입력하세요...",
        synthLabel: "음색:",
        synthOpt_musicbox: "오르골",
        synthOpt_basic: "전자음",
        synthOpt_8bit: "8-bit",
        chordLabel: "화음:",
        chordOpt_single: "단음",
        chordOpt_third: "3도 위",
        chordOpt_fifth: "5도 위",
        sustainLabel: "장음",
        echoLabel: "에코 효과",
        freeLabel: "Free",
        charUnit: "자",
        maxLimit: "텍스트 추가 제한 도달 (최대 2개)"
    },
    ja: {
        pageTitle: "Textlody - テキストでメロディを作成",
        tagline: "お気に入りのメロディは #Textlody ハッシュタグでシェアしてください！",
        desc: "テキストでメロディを作成",
        scaleLabel: "全体の音階:",
        scaleOpt_major_pentatonic: "メジャーペンタトニック",
        scaleOpt_minor_pentatonic: "マイナーペンタトニック",
        scaleOpt_major: "メジャースケール",
        scaleOpt_minor: "マイナースケール",
        rhythmLabel: "リズム/変化:",
        rhythmOpt_straight: "基本 (ストレート)",
        rhythmOpt_swing: "スイング (バウンス)",
        rhythmOpt_waltz: "ワルツ (強-弱-弱)",
        rhythmOpt_random: "ランダム",
        meterLabel: "拍子(強弱):",
        meterOpt_0: "なし (一定に)",
        meterOpt_4: "4/4拍子",
        meterOpt_3: "3/4拍子",
        speedLabel: "基本テンポ:",
        engToggle: "英単語の同時再生",
        simultaneousToggle: "ハングルの同時再生",
        ignoreToggle: "空白/記号を無視",
        addVoice: "テキストを追加 (最大2個)",
        displayTitle: "▶ テキストディスプレイ",
        playAll: "▶ 全て再生",
        stopAll: "■ 停止",
        displayPlaceholder: "再生するテキストにチェックを入れて再生を押すと、ここに表示されます...",
        start: "開始",
        end: "終了",
        ctaTitle: "Textlody Plus版をぜひご覧ください！",
        ctaDesc: "WAV音源抽出、5トラック対応、カスタムオーディオマッピングなど様々な追加機能をサポートします。",
        ctaBtn: "▶ BOOTHを見に行く",
        ctaUrl: "https://bb-uu-t.booth.pm/items/8163355",
        toastMax: "最大2個まで追加できます。",
        toastNoText: "再生するテキストがありません。",
        textTitle: "テキスト",
        indivPlay: "▶ 個別再生",
        voicePlaceholder: "演奏するテキストを入力してください...",
        synthLabel: "音色:",
        synthOpt_musicbox: "オルゴール",
        synthOpt_basic: "電子音",
        synthOpt_8bit: "8-bit",
        chordLabel: "和音:",
        chordOpt_single: "単音",
        chordOpt_third: "3度上",
        chordOpt_fifth: "5度上",
        sustainLabel: "長音",
        echoLabel: "エコー効果",
        freeLabel: "Free",
        charUnit: "文字",
        maxLimit: "追加制限に到達 (最大2個)"
    }
};

let currentLang = 'ko';

function updateLanguage(lang) {
    currentLang = lang;
    const texts = i18n[lang];
    
    document.title = texts.pageTitle;
    
    // 텍스트 교체
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) el.textContent = texts[key];
    });
    
    // Placeholder 교체
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (texts[key]) el.placeholder = texts[key];
    });
    
    // 보이스 트랙 내부 텍스트 교체 (동적 생성 요소 대응)
    document.querySelectorAll('.voice-title').forEach(el => { el.textContent = texts.textTitle; });
    document.querySelectorAll('.char-count').forEach(el => {
        const textarea = el.parentElement.querySelector('.voice-text');
        if(textarea) el.textContent = `${textarea.value.length} / 140 ${texts.charUnit}`;
    });
    updateAddButtonState();

    const ctaLink = document.querySelector('a[data-i18n="ctaBtn"]');
    if (ctaLink && texts.ctaUrl) {
        ctaLink.href = texts.ctaUrl;
    }

    // 키보드 레이아웃 토글
    if (lang === 'ko') {
        document.getElementById('kb-ko').classList.remove('hidden');
        document.getElementById('kb-ja').classList.add('hidden');
    } else {
        document.getElementById('kb-ko').classList.add('hidden');
        document.getElementById('kb-ja').classList.remove('hidden');
    }

    // 언어가 변경될 때마다 해당 언어의 키 매핑 및 음계 재생성
    const scaleSelect = document.getElementById('scaleSelect');
    if (scaleSelect) {
        applyScale(scaleSelect.value);
    }
}

document.getElementById('langSelect').addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

// --- 기본 유틸리티 및 오디오 설정 ---
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
    'c':'c', 'ㅊ':'c', 'v':'v', 'ㅍ':'v', 'b':'b', 'ㅠ':'b', 'n':'n', 'ㅜ':'n', 'm':'m', 'ㅡ':'m',
    
    '1':'1', '2':'2', '3':'3', '4':'4', '5':'5', '6':'6', '7':'7', '8':'8', '9':'9', '0':'0',
    '-':'minus', '^':'caret', '¥':'yen', '@':'at', '[':'bracketleft', ';':'semicolon', ':':'colon', ']':'bracketright', ',':'comma', '.':'period', '/':'slash', '\\':'backslash', 'ー':'yen',
    
    'あ':'3', 'ア':'3', 'ぁ':'3', 'ァ':'3', 'い':'e', 'イ':'e', 'ぃ':'e', 'ィ':'e', 'う':'4', 'ウ':'4', 'ぅ':'4', 'ゥ':'4',
    'え':'5', 'エ':'5', 'ぇ':'5', 'ェ':'5', 'お':'6', 'オ':'6', 'ぉ':'6', 'ォ':'6', 'か':'t', 'カ':'t', 'が':'t', 'ガ':'t',
    'き':'g', 'キ':'g', 'ぎ':'g', 'ギ':'g', 'く':'h', 'ク':'h', 'ぐ':'h', 'グ':'h', 'け':'colon', 'ケ':'colon', 'げ':'colon', 'ゲ':'colon',
    'こ':'b', 'コ':'b', 'ご':'b', 'ゴ':'b', 'さ':'x', 'サ':'x', 'ざ':'x', 'ザ':'x', 'し':'d', 'シ':'d', 'じ':'d', 'ジ':'d',
    'す':'r', 'ス':'r', 'ず':'r', 'ズ':'r', 'せ':'p', 'セ':'p', 'ぜ':'p', 'ゼ':'p', 'そ':'c', 'ソ':'c', 'ぞ':'c', 'ゾ':'c',
    'た':'q', 'タ':'q', 'だ':'q', 'ダ':'q', 'ち':'a', 'チ':'a', 'ぢ':'a', 'ヂ':'a', 'つ':'z', 'ツ':'z', 'っ':'z', 'ッ':'z', 'づ':'z', 'ヅ':'z',
    'て':'w', 'テ':'w', 'で':'w', 'デ':'w', 'と':'s', 'ト':'s', 'ど':'s', 'ド':'s', 'な':'u', 'ナ':'u', 'に':'i', 'ニ':'i', 'ぬ':'1', 'ヌ':'1',
    'ね':'comma', 'ネ':'comma', 'の':'k', 'ノ':'k', 'は':'f', 'ハ':'f', 'ば':'f', 'バ':'f', 'ぱ':'f', 'パ':'f',
    'ひ':'v', 'ヒ':'v', 'び':'v', 'ビ':'v', 'ぴ':'v', 'ピ':'v', 'ふ':'2', 'フ':'2', 'ぶ':'2', 'ブ':'2', 'ぷ':'2', 'プ':'2',
    'へ':'caret', 'ヘ':'caret', 'べ':'caret', 'ベ':'caret', 'ぺ':'caret', 'ペ':'caret', 'ほ':'minus', 'ホ':'minus', 'ぼ':'minus', 'ボ':'minus', 'ぽ':'minus', 'ポ':'minus',
    'ま':'j', 'マ':'j', 'み':'n', 'ミ':'n', 'む':'bracketright', 'ム':'bracketright', 'め':'slash', 'メ':'slash', 'も':'m', 'モ':'m',
    'や':'7', 'ヤ':'7', 'ゃ':'7', 'ャ':'7', 'ゆ':'8', 'ユ':'8', 'ゅ':'8', 'ュ':'8', 'よ':'9', 'ヨ':'9', 'ょ':'9', 'ョ':'9',
    'ら':'o', 'ラ':'o', 'り':'l', 'リ':'l', 'る':'period', 'ル':'period', 'れ':'semicolon', 'レ':'semicolon', 'ろ':'backslash', 'ロ':'backslash',
    'わ':'0', 'ワ':'0', 'を':'0', 'ヲ':'0', 'ん':'y', 'ン':'y', '゛':'at', '゜':'bracketleft'
};

// 언어에 따라 다른 자판 배열 사용
const qwertyOrderKO = "qwertyuiopasdfghjklzxcvbnm".split('');
const qwertyOrderJA = ['1','2','3','4','5','6','7','8','9','0','minus','caret','yen','q','w','e','r','t','y','u','i','o','p','at','bracketleft','a','s','d','f','g','h','j','k','l','semicolon','colon','bracketright','z','x','c','v','b','n','m','comma','period','slash','backslash'];
let activeQwertyOrder = qwertyOrderKO;

function getMappedKey(c) {
    if (!c) return null;
    if (charToKey[c]) return charToKey[c];
    const code = c.charCodeAt(0);
    // 한자일 경우 현재 활성화된 키보드 길이에 맞춰 매핑
    if (code >= 0x4E00 && code <= 0x9FFF) {
        return activeQwertyOrder[code % activeQwertyOrder.length];
    }
    return null;
}

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
            engBuffer = []; engMapBuffer = [];
        }
    };

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        // 허용된 문자가 아닌 공백/기호 무시 처리
        if (ignoreSymbols && !(/[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣぁ-んァ-ン一-龥]/.test(char))) {
            flushEngBuffer(); continue;
        }

        if (/[a-zA-Z]/.test(char)) {
            engBuffer.push(char.toLowerCase()); engMapBuffer.push(i); continue;
        } else { flushEngBuffer(); }

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
                sequence.push([cho, ...splitJ, ...splitJo]); mapping.push(i);
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

const chordMultipliers = { 'single': [1], 'third': [1, 1.25], 'fifth': [1, 1.5], 'octave': [1, 2], 'major': [1, 1.25, 1.5], 'minor': [1, 1.189, 1.5] };

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
    'major_pentatonic': [0, 2, 4, 7, 9], 'minor_pentatonic': [0, 3, 5, 7, 10], 'major': [0, 2, 4, 5, 7, 9, 11],
    'minor': [0, 2, 3, 5, 7, 8, 10]
};

// 한국어 버전 (무료 원본) 상향식 음계 생성 함수 (26노트)
function generateScaleKO(intervals, startMidiNote, count) {
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

// 일본어 버전 (플러스판 기반) 하향식 핑퐁 음계 생성 함수 (48노트)
function generateScaleJA(intervals, startMidiNote, count) {
    const freqs = [];
    let currentNote = startMidiNote;
    let generatedCount = 0;
    let direction = -1;
    const MIN_NOTE = 36;
    const MAX_NOTE = 96;
    while (generatedCount < count) {
        let pitchClass = ((currentNote % 12) + 12) % 12;
        if (intervals.includes(pitchClass)) {
            freqs.push(440 * Math.pow(2, (currentNote - 69) / 12));
            generatedCount++;
        }
        currentNote += direction;
        if (currentNote < MIN_NOTE) {
            direction = 1; currentNote += 2;
        } else if (currentNote > MAX_NOTE) {
            direction = -1; currentNote -= 2;
        }
    }
    return freqs;
}

let defaultNotes = {};

function applyScale(scaleName) {
    const intervals = scaleIntervals[scaleName] || scaleIntervals['major_pentatonic'];
    defaultNotes = {};
    
    // 현재 선택된 언어에 따라 다른 음계 생성 로직 및 키 배열 사용
    if (currentLang === 'ko') {
        activeQwertyOrder = qwertyOrderKO;
        const freqs = generateScaleKO(intervals, 48, 26);
        activeQwertyOrder.forEach((key, index) => {
            defaultNotes[key] = freqs[index];
        });
    } else {
        activeQwertyOrder = qwertyOrderJA;
        const freqs = generateScaleJA(intervals, 96, 48);
        activeQwertyOrder.forEach((key, index) => {
            defaultNotes[key] = freqs[index];
        });
    }
}

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.8;
        echoSend = audioCtx.createGain(); echoSend.gain.value = 1; 
        delayNode = audioCtx.createDelay(); delayNode.delayTime.value = 0.35;
        feedbackGain = audioCtx.createGain(); feedbackGain.gain.value = 0.4;
        
        masterGain.connect(audioCtx.destination);
        echoSend.connect(delayNode); delayNode.connect(feedbackGain); feedbackGain.connect(delayNode); delayNode.connect(audioCtx.destination);
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

// --- UI 및 텍스트 카드 관리 ---
const MAX_VOICES = 2;
let voiceCounter = 0;
const voicesContainer = document.getElementById('voicesContainer');
const addVoiceBtn = document.getElementById('addVoiceBtn');

function createVoiceCard() {
    if (voiceCounter >= MAX_VOICES) { showToast(i18n[currentLang].toastMax); return; }
    voiceCounter++;
    const voiceId = `voice-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const card = document.createElement('div');
    card.className = 'voice-card bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm relative transition-all'; 
    card.dataset.id = voiceId;
    
    const texts = i18n[currentLang];
    card.innerHTML = `
        <div class="flex flex-wrap justify-between items-center mb-3 gap-2">
            <label class="flex items-center gap-2 font-bold text-slate-700 cursor-pointer select-none">
                <input type="checkbox" class="voice-chk w-5 h-5 accent-blue-600 rounded" checked> <span class="voice-title">${texts.textTitle}</span> ${voiceCounter}
            </label>
            <div class="flex items-center gap-2">
                <button class="indiv-play-btn bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-bold py-1.5 px-3 rounded transition-colors" data-i18n="indivPlay">${texts.indivPlay}</button>
                <button class="delete-voice-btn text-slate-400 hover:text-red-500 ml-2 p-1 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
            </div>
        </div>
        <div class="relative">
            <textarea class="voice-text w-full p-3 pb-7 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm" rows="2" maxlength="140" data-i18n-placeholder="voicePlaceholder" placeholder="${texts.voicePlaceholder}"></textarea>
            <span class="char-count absolute bottom-2 right-3 text-[10px] text-slate-400 font-mono pointer-events-none">0 / 140 ${texts.charUnit}</span>
        </div>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4 pt-3 border-t border-slate-100 bg-slate-50 p-2 rounded-lg">
            <div class="flex items-center gap-2"><label class="text-xs font-medium text-slate-600" data-i18n="synthLabel">${texts.synthLabel}</label><select class="voice-synth p-1 text-xs border border-slate-300 rounded outline-none cursor-pointer bg-white"><option value="musicbox" data-i18n="synthOpt_musicbox">${texts.synthOpt_musicbox}</option><option value="basic" data-i18n="synthOpt_basic">${texts.synthOpt_basic}</option><option value="8bit" data-i18n="synthOpt_8bit">${texts.synthOpt_8bit}</option></select></div>
            <div class="flex items-center gap-2"><label class="text-xs font-medium text-slate-600" data-i18n="chordLabel">${texts.chordLabel}</label><select class="voice-chord p-1 text-xs border border-slate-300 rounded outline-none cursor-pointer bg-white"><option value="single" data-i18n="chordOpt_single">${texts.chordOpt_single}</option><option value="third" data-i18n="chordOpt_third">${texts.chordOpt_third}</option><option value="fifth" data-i18n="chordOpt_fifth">${texts.chordOpt_fifth}</option></select></div>
            <div class="flex items-center gap-2"><label class="flex items-center gap-1.5 text-xs font-medium text-slate-600 cursor-pointer"><input type="checkbox" class="voice-sustain-chk w-3.5 h-3.5 accent-blue-600 rounded"> <span data-i18n="sustainLabel">${texts.sustainLabel}</span></label><input type="range" class="voice-sustain-val w-16 h-1.5 cursor-pointer disabled:opacity-50 accent-blue-500" min="0.1" max="1.5" step="0.1" value="0.5" disabled></div>
            <div class="flex items-center gap-2"><label class="flex items-center gap-1.5 text-xs font-medium text-slate-600 cursor-pointer"><input type="checkbox" class="voice-echo-chk w-3.5 h-3.5 accent-blue-600 rounded"> <span data-i18n="echoLabel">${texts.echoLabel}</span></label></div>
        </div>`;
    voicesContainer.appendChild(card); updateAddButtonState();
    
    const susChk = card.querySelector('.voice-sustain-chk');
    const susVal = card.querySelector('.voice-sustain-val');
    susChk.addEventListener('change', (e) => susVal.disabled = !e.target.checked);
    
    const txtArea = card.querySelector('.voice-text');
    const charCount = card.querySelector('.char-count');
    txtArea.addEventListener('input', (e) => {
        stopPlayback();
        charCount.textContent = `${e.target.value.length} / 140 ${i18n[currentLang].charUnit}`;
    });
    
    card.querySelector('.delete-voice-btn').addEventListener('click', () => { card.remove(); voiceCounter--; updateAddButtonState(); stopPlayback(); });
    card.querySelector('.indiv-play-btn').addEventListener('click', () => startPlayback([getVoiceData(card)]));
}

function updateAddButtonState() { 
    if (voiceCounter >= MAX_VOICES) {
        addVoiceBtn.classList.add('opacity-50', 'cursor-not-allowed');
        addVoiceBtn.classList.remove('hover:bg-slate-50');
        addVoiceBtn.innerHTML = i18n[currentLang].maxLimit;
    } else {
        addVoiceBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        addVoiceBtn.classList.add('hover:bg-slate-50');
        addVoiceBtn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> <span data-i18n="addVoice">${i18n[currentLang].addVoice}</span>`;
    }
}

function getVoiceData(card) {
    return {
        id: card.dataset.id, isActive: card.querySelector('.voice-chk').checked, text: card.querySelector('.voice-text').value.trim(),
        synthType: card.querySelector('.voice-synth').value, chordType: card.querySelector('.voice-chord').value,
        useSustain: card.querySelector('.voice-sustain-chk').checked, noteLength: parseFloat(card.querySelector('.voice-sustain-val').value),
        useEcho: card.querySelector('.voice-echo-chk').checked, sequence: []
    };
}

// --- 메인 재생 로직 ---
let isPlaying = false, activeVoices = [], maxSequenceLength = 0, globalCurrentIndex = 0, playbackTimeout = null, previousSynthGains = {}; 

function highlightKey(keyChar) {
    const keyElements = document.querySelectorAll(`.key[data-key="${keyChar}"]`);
    keyElements.forEach(keyElement => {
        if (keyElement.closest('.hidden') === null) {
            keyElement.classList.add('active'); 
            setTimeout(() => keyElement.classList.remove('active'), 100);
        }
    });
}

function playVoiceTones(voice, frequencies, currentDelaySec, accentMultiplier = 1.0) {
    if (!audioCtx || !frequencies || frequencies.length === 0) return;
    const defaultNoteLength = Math.min(0.15, currentDelaySec * 0.85);
    const noteLength = voice.useSustain ? voice.noteLength : defaultNoteLength;
    const t = audioCtx.currentTime, synthType = voice.synthType, prevGainKey = `${voice.id}-${synthType}`;

    if ((synthType === 'basic' || synthType === '8bit') && previousSynthGains[prevGainKey]) {
        try { const prev = previousSynthGains[prevGainKey]; if (prev.time < t) { prev.gain.cancelScheduledValues(t); prev.gain.setTargetAtTime(0, t, 0.015); } } catch (e) {}
    }
    const multipliers = chordMultipliers[voice.chordType] || [1];
    const volumeScale = accentMultiplier / Math.sqrt(frequencies.length * multipliers.length);
    const noteMasterGain = audioCtx.createGain(); noteMasterGain.gain.value = volumeScale; noteMasterGain.connect(masterGain); if (voice.useEcho) noteMasterGain.connect(echoSend);

    frequencies.forEach(frequency => {
        multipliers.forEach(mult => {
            const f = frequency * mult;
            if (synthType === 'musicbox') {
                const osc1 = audioCtx.createOscillator(), osc2 = audioCtx.createOscillator(); osc1.type = 'sine'; osc1.frequency.setValueAtTime(f * 2, t); osc2.type = 'triangle'; osc2.frequency.setValueAtTime(f * 4.5, t);
                const localGain = audioCtx.createGain(); localGain.gain.setValueAtTime(0, t); localGain.gain.linearRampToValueAtTime(0.4, t + 0.01); localGain.gain.exponentialRampToValueAtTime(0.001, t + noteLength + 0.5);
                osc1.connect(localGain); osc2.connect(localGain); localGain.connect(noteMasterGain); osc1.start(t); osc2.start(t); osc1.stop(t + noteLength + 0.6); osc2.stop(t + noteLength + 0.6);
            } else if (synthType === '8bit') {
                const osc = audioCtx.createOscillator(); osc.type = 'square'; osc.frequency.setValueAtTime(f, t);
                const localGain = audioCtx.createGain(); localGain.gain.setValueAtTime(0, t); localGain.gain.setValueAtTime(0.1, t + 0.01); localGain.gain.setValueAtTime(0.1, t + noteLength * 0.8); localGain.gain.linearRampToValueAtTime(0, t + noteLength);
                osc.connect(localGain); localGain.connect(noteMasterGain); osc.start(t); osc.stop(t + noteLength + 0.05);
            } else {
                const osc = audioCtx.createOscillator(); osc.type = 'sine'; osc.frequency.setValueAtTime(f, t);
                const localGain = audioCtx.createGain(); localGain.gain.setValueAtTime(0, t); localGain.gain.linearRampToValueAtTime(0.2, t + 0.02); localGain.gain.exponentialRampToValueAtTime(0.001, t + noteLength);
                osc.connect(localGain); localGain.connect(noteMasterGain); osc.start(t); osc.stop(t + noteLength + 0.05);
            }
        });
    });
    if (synthType === 'basic' || synthType === '8bit') previousSynthGains[prevGainKey] = { gain: noteMasterGain, time: t };
}

function setupTypewriterDisplay(voices) {
    const display = document.getElementById('typewriterDisplay'); display.innerHTML = '';
    if (voices.length === 0) { display.innerHTML = `<div class="absolute inset-0 flex items-center justify-center opacity-50 text-sm italic">${i18n[currentLang].toastNoText}</div>`; return; }
    voices.forEach(v => {
        const line = document.createElement('div'); line.className = 'whitespace-nowrap'; v.spanElements = [];
        for (let i = 0; i < v.text.length; i++) { const span = document.createElement('span'); span.textContent = v.text[i]; span.className = 'transition-colors duration-75 rounded px-[1px]'; line.appendChild(span); v.spanElements.push(span); }
        display.appendChild(line);
    });
}

function updateTypewriterHighlights() {
    activeVoices.forEach(v => {
        if (v.currentSpans) v.currentSpans.forEach(span => span.classList.remove('bg-emerald-500', 'text-slate-900', 'font-bold'));
        const origIndices = v.mapping[globalCurrentIndex];
        if (origIndices !== undefined) {
            const indicesArray = Array.isArray(origIndices) ? origIndices : [origIndices]; v.currentSpans = [];
            indicesArray.forEach(idx => {
                if (v.spanElements[idx]) { const nextSpan = v.spanElements[idx]; nextSpan.classList.add('bg-emerald-500', 'text-slate-900', 'font-bold'); v.currentSpans.push(nextSpan); }
            });
            if (v === activeVoices[0] && v.currentSpans.length > 0) {
                const displayContainer = document.getElementById('typewriterDisplay'), targetSpan = v.currentSpans[0];
                const containerRect = displayContainer.getBoundingClientRect(), targetRect = targetSpan.getBoundingClientRect();
                const scrollLeftTo = displayContainer.scrollLeft + (targetRect.left - containerRect.left) - (containerRect.width / 2) + (targetRect.width / 2);
                const scrollTopTo = displayContainer.scrollTop + (targetRect.top - containerRect.top) - (containerRect.height / 2) + (targetRect.height / 2);
                displayContainer.scrollTo({ left: scrollLeftTo, top: scrollTopTo, behavior: 'smooth' });
            }
        }
    });
}

function playLoop() {
    const progressSlider = document.getElementById('progressSlider');
    if (!isPlaying || globalCurrentIndex >= maxSequenceLength) { if (globalCurrentIndex >= maxSequenceLength) progressSlider.value = maxSequenceLength; stopPlayback(); return; }
    progressSlider.value = globalCurrentIndex; updateTypewriterHighlights();

    const baseDelaySec = 1 / parseInt(document.getElementById('speedControl').value, 10);
    const currentDelaySec = getDynamicDelay(baseDelaySec, globalCurrentIndex, maxSequenceLength, document.getElementById('rhythmMode').value);
    const accentMultiplier = getAccentMultiplier(globalCurrentIndex, parseInt(document.getElementById('meterSelect').value, 10));

    activeVoices.forEach(voice => {
        const chars = voice.sequence[globalCurrentIndex];
        if (chars && chars.length > 0) {
            const validChars = chars.filter(c => c !== ' ' && c !== '\n');
            if (validChars.length > 0) {
                const defaultFreqs = [];
                validChars.forEach(c => {
                    const mappedKey = getMappedKey(c);
                    if (mappedKey && defaultNotes[mappedKey] !== undefined) {
                        highlightKey(mappedKey);
                        defaultFreqs.push(defaultNotes[mappedKey]);
                    }
                });
                if (defaultFreqs.length > 0) playVoiceTones(voice, defaultFreqs, currentDelaySec, accentMultiplier);
            }
        }
    });
    globalCurrentIndex++; playbackTimeout = setTimeout(playLoop, currentDelaySec * 1000);
}

function startPlayback(targetVoices) {
    if (!targetVoices || targetVoices.length === 0) { showToast(i18n[currentLang].toastNoText); return; }
    clearTimeout(playbackTimeout); initAudio();
    const ignoreSymbols = document.getElementById('ignoreSymbolsToggle').checked, simultaneous = document.getElementById('simultaneousToggle').checked, engWordSimultaneous = document.getElementById('engWordSimultaneousToggle').checked;

    activeVoices = targetVoices.map(v => { const dec = decomposeText(v.text, ignoreSymbols, simultaneous, engWordSimultaneous); return { ...v, sequence: dec.sequence, mapping: dec.mapping, spanElements: [], currentSpans: [] }; });
    maxSequenceLength = Math.max(...activeVoices.map(v => v.sequence.length)); if (maxSequenceLength === 0) return;
    setupTypewriterDisplay(activeVoices);

    const progressSlider = document.getElementById('progressSlider');
    if (progressSlider.max != maxSequenceLength || globalCurrentIndex >= maxSequenceLength) { globalCurrentIndex = 0; progressSlider.max = maxSequenceLength; }
    progressSlider.disabled = false; isPlaying = true;
    
    document.querySelectorAll('button').forEach(b => { if(b.id !== 'langSelect') b.classList.add('pointer-events-none', 'opacity-50'); });
    const globalStopBtn = document.getElementById('globalStopBtn');
    globalStopBtn.classList.remove('pointer-events-none', 'opacity-50', 'cursor-not-allowed', 'hover:bg-slate-700', 'bg-slate-800', 'text-slate-500');
    globalStopBtn.disabled = false; globalStopBtn.classList.add('bg-red-500', 'text-white', 'hover:bg-red-600');
    
    playLoop();
}

function stopPlayback() {
    isPlaying = false; clearTimeout(playbackTimeout);
    document.querySelectorAll('button').forEach(b => b.classList.remove('pointer-events-none', 'opacity-50')); updateAddButtonState();
    const globalStopBtn = document.getElementById('globalStopBtn'); globalStopBtn.disabled = true;
    globalStopBtn.classList.remove('bg-red-500', 'text-white', 'hover:bg-red-600'); globalStopBtn.classList.add('bg-slate-800', 'text-slate-500', 'hover:bg-slate-700', 'cursor-not-allowed');
    activeVoices.forEach(v => { if (v.currentSpans) v.currentSpans.forEach(span => span.classList.remove('bg-emerald-500', 'text-slate-900', 'font-bold')); });
}

// --- 초기화 이벤트 리스너 ---
window.addEventListener('DOMContentLoaded', () => {
    updateLanguage('ko'); // 초기 언어 세팅 (applyScale 자동 호출됨)
    createVoiceCard(); 

    document.getElementById('scaleSelect').addEventListener('change', (e) => {
        applyScale(e.target.value);
        stopPlayback(); 
    });

    document.getElementById('speedControl').addEventListener('input', (e) => document.getElementById('speedValue').textContent = `${e.target.value} cps`);
    ['ignoreSymbolsToggle', 'simultaneousToggle', 'engWordSimultaneousToggle'].forEach(id => document.getElementById(id).addEventListener('change', stopPlayback));
    
    document.getElementById('progressSlider').addEventListener('input', (e) => {
        globalCurrentIndex = parseInt(e.target.value, 10); updateTypewriterHighlights();
    });

    document.getElementById('globalPlayBtn').addEventListener('click', () => startPlayback(Array.from(document.querySelectorAll('.voice-card')).map(getVoiceData).filter(v => v.isActive && v.text)));
    document.getElementById('globalStopBtn').addEventListener('click', stopPlayback);
    document.getElementById('addVoiceBtn').addEventListener('click', createVoiceCard);
});