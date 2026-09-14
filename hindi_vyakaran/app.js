/* ============================================
   Hindi Vyakaran — Chitra Varnan (चित्र वर्णन)
   Class 5 CBSE — Interactive Engine
   ============================================ */

// --- Audio Synthesizer (Native Web Audio API) ---
class SoundSynth {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  playBeep(freq, duration = 0.12, type = 'sine') {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }
  tap() { this.playBeep(520, 0.08, 'triangle'); }
  success() {
    this.playBeep(587.33, 0.1, 'sine');
    setTimeout(() => this.playBeep(880, 0.2, 'sine'), 100);
  }
  error() {
    this.playBeep(240, 0.15, 'sawtooth');
  }
  fanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playBeep(freq, 0.22, 'triangle'), idx * 110);
    });
  }
}
const synth = new SoundSynth();

// --- Confetti Particle System ---
class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  burst(count = 60) {
    if (!this.canvas || !this.ctx) return;
    const colors = ['#f59e0b', '#10b981', '#06b6d4', '#ec4899', '#8b5cf6', '#fbbf24'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height * 0.45,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.9) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }
    if (!this.animId) {
      this.animate();
    }
  }
  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // gravity
      p.rotation += p.vr;
      p.opacity -= 0.012;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();

      if (p.opacity <= 0 || p.y > this.canvas.height) {
        this.particles.splice(idx, 1);
      }
    });

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.animate());
    } else {
      this.animId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// --- SCENE DATABASE: 6 Rich CBSE Class 5 Scenarios ---
const SCENE_DATA = [
  {
    id: 'park',
    realImage: 'images/scene_park_real.jpg',
    hotspotsReal: [{"id":1,"x":39,"y":55},{"id":2,"x":73,"y":47},{"id":3,"x":57,"y":64},{"id":4,"x":18,"y":22},{"id":5,"x":23,"y":78},{"id":6,"x":88,"y":15}],
    title: 'बगीचा / बाल उद्यान',
    titleEn: 'Children Park & Playground',
    subtitle: 'हरे-भरे पेड़, झूले, फिसलपट्टी और खेलते हुए बच्चे',
    icon: '🌳',
    svg: `
      <svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyPark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="60%" stop-color="#bae6fd"/>
            <stop offset="100%" stop-color="#fef08a"/>
          </linearGradient>
          <linearGradient id="grassPark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#84cc16"/>
            <stop offset="100%" stop-color="#4d7c0f"/>
          </linearGradient>
          <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="100%" stop-color="#f59e0b"/>
          </linearGradient>
        </defs>
        <!-- Sky -->
        <rect width="800" height="280" fill="url(#skyPark)" />
        <!-- Sun -->
        <circle cx="700" cy="80" r="45" fill="url(#sunGrad)" opacity="0.9" />
        <!-- Clouds -->
        <path d="M 120 70 q 20 -25 45 -10 q 25 -30 55 -10 q 30 -15 50 15 q 20 15 0 30 l -140 0 z" fill="#ffffff" opacity="0.85" />
        <path d="M 460 90 q 15 -20 35 -8 q 20 -20 45 -8 q 25 -10 40 12 q 15 12 0 24 l -110 0 z" fill="#ffffff" opacity="0.8" />
        <!-- Distant hills -->
        <path d="M 0 240 Q 200 160 400 230 T 800 220 L 800 280 L 0 280 Z" fill="#65a30d" opacity="0.5" />
        <!-- Ground / Grass -->
        <rect y="260" width="800" height="220" fill="url(#grassPark)" />
        <!-- Winding pathway -->
        <path d="M 320 480 C 350 400 380 340 450 280 L 510 280 C 440 340 420 400 400 480 Z" fill="#fde047" opacity="0.5" />
        <!-- Big Tree Left -->
        <rect x="75" y="180" width="30" height="130" rx="6" fill="#78350f" />
        <circle cx="90" cy="160" r="65" fill="#15803d" />
        <circle cx="60" cy="140" r="50" fill="#16a34a" />
        <circle cx="120" cy="145" r="50" fill="#22c55e" />
        <!-- Flower bed right -->
        <circle cx="680" cy="380" r="8" fill="#ef4444" />
        <circle cx="700" cy="390" r="7" fill="#ec4899" />
        <circle cx="720" cy="375" r="8" fill="#a855f7" />
        <circle cx="740" cy="390" r="8" fill="#f59e0b" />
        <path d="M 660 400 Q 710 370 760 400" stroke="#15803d" stroke-width="4" fill="none" />
        <!-- Swing (झूला) in middle-left -->
        <line x1="210" y1="210" x2="250" y2="350" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
        <line x1="290" y1="210" x2="250" y2="350" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
        <line x1="320" y1="210" x2="360" y2="350" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
        <line x1="200" y1="210" x2="370" y2="210" stroke="#0284c7" stroke-width="8" stroke-linecap="round" />
        <!-- Swing rope & plank -->
        <line x1="260" y1="210" x2="260" y2="290" stroke="#f59e0b" stroke-width="3" />
        <line x1="290" y1="210" x2="290" y2="290" stroke="#f59e0b" stroke-width="3" />
        <rect x="250" y="290" width="50" height="8" rx="3" fill="#b45309" />
        <!-- Kid on swing -->
        <circle cx="275" cy="265" r="12" fill="#fed7aa" />
        <rect x="268" y="277" width="14" height="20" rx="4" fill="#ef4444" />
        <!-- Slide (फिसलपट्टी) on middle-right -->
        <line x1="560" y1="220" x2="560" y2="360" stroke="#64748b" stroke-width="5" />
        <line x1="575" y1="220" x2="575" y2="360" stroke="#64748b" stroke-width="5" />
        <!-- Ladder steps -->
        <line x1="560" y1="260" x2="575" y2="260" stroke="#64748b" stroke-width="3" />
        <line x1="560" y1="290" x2="575" y2="290" stroke="#64748b" stroke-width="3" />
        <line x1="560" y1="320" x2="575" y2="320" stroke="#64748b" stroke-width="3" />
        <!-- Slide slope -->
        <path d="M 575 220 Q 610 240 660 360" stroke="#e11d48" stroke-width="12" stroke-linecap="round" fill="none" />
        <!-- Kid sliding -->
        <circle cx="620" cy="275" r="10" fill="#fed7aa" />
        <rect x="614" y="285" width="12" height="16" rx="3" fill="#3b82f6" />
        <!-- Park Bench (बेंच) in bottom-left -->
        <rect x="120" y="380" width="90" height="12" rx="3" fill="#92400e" />
        <line x1="130" y1="392" x2="130" y2="425" stroke="#334155" stroke-width="5" />
        <line x1="200" y1="392" x2="200" y2="425" stroke="#334155" stroke-width="5" />
        <rect x="120" y="360" width="90" height="14" rx="2" fill="#b45309" />
        <!-- Football & Playing Kid in foreground center -->
        <circle cx="460" cy="410" r="14" fill="#ffffff" stroke="#000000" stroke-width="3" />
        <circle cx="460" cy="410" r="5" fill="#000000" />
        <circle cx="420" cy="380" r="12" fill="#fed7aa" />
        <rect x="413" y="392" width="14" height="22" rx="4" fill="#10b981" />
        <!-- Flying birds in sky -->
        <path d="M 330 90 q 10 -8 18 0 q 10 -8 18 0" stroke="#334155" stroke-width="2" fill="none" />
        <path d="M 380 75 q 8 -6 15 0 q 8 -6 15 0" stroke="#334155" stroke-width="2" fill="none" />
      </svg>
    `,
    hotspots: [
      {
        id: 1,
        x: 35,
        y: 57,
        title: 'झूला (Swing)',
        translit: 'Jhoola',
        meaningEn: 'Swing',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'एक बच्चा आनंद से झूले पर झूल रहा है।',
        sentenceEn: 'A child is joyfully swinging on the swing.'
      },
      {
        id: 2,
        x: 77,
        y: 60,
        title: 'फिसलपट्टी (Slide)',
        translit: 'Phisal-patti',
        meaningEn: 'Slide',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'बच्चे फिसलपट्टी से नीचे फिसलने का मज़ा ले रहे हैं।',
        sentenceEn: 'Children are enjoying sliding down the slide.'
      },
      {
        id: 3,
        x: 58,
        y: 84,
        title: 'फुटबॉल (Football)',
        translit: 'Football',
        meaningEn: 'Football / Ball',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'मैदान पर लड़का फुटबॉल से खेल रहा है।',
        sentenceEn: 'A boy is playing with a football on the ground.'
      },
      {
        id: 4,
        x: 12,
        y: 35,
        title: 'हरा-भरा पेड़ (Green Tree)',
        translit: 'Hara-bhara Ped',
        meaningEn: 'Lush Green Tree',
        type: 'विशेषण + संज्ञा',
        sentenceHi: 'बगीचे में छायादार और हरे-भरे पेड़ लगे हैं।',
        sentenceEn: 'There are shady and lush green trees planted in the garden.'
      },
      {
        id: 5,
        x: 20,
        y: 80,
        title: 'बेंच (Park Bench)',
        translit: 'Bench',
        meaningEn: 'Wooden Bench',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'रास्ते के किनारे बैठने के लिए लकड़ी की बेंच रखी है।',
        sentenceEn: 'A wooden bench is placed by the pathway for sitting.'
      },
      {
        id: 6,
        x: 88,
        y: 18,
        title: 'चमकता सूरज (Bright Sun)',
        translit: 'Chamakta Suraj',
        meaningEn: 'Bright Sun',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'आसमान में चमकदार सूरज चमक रहा है और मौसम सुहावना है।',
        sentenceEn: 'The bright sun is shining in the sky and the weather is pleasant.'
      }
    ],
    vocabulary: [
      { hi: 'बगीचा', en: 'Garden / Park', translit: 'Bageecha', category: 'noun' },
      { hi: 'झूला', en: 'Swing', translit: 'Jhoola', category: 'noun' },
      { hi: 'फिसलपट्टी', en: 'Slide', translit: 'Phisalpatti', category: 'noun' },
      { hi: 'गेंद / फुटबॉल', en: 'Ball / Football', translit: 'Gend / Football', category: 'noun' },
      { hi: 'पेड़-पौधे', en: 'Trees and plants', translit: 'Ped-paudhe', category: 'noun' },
      { hi: 'फूल', en: 'Flowers', translit: 'Phool', category: 'noun' },
      { hi: 'झूलना', en: 'To swing', translit: 'Jhoolna', category: 'verb' },
      { hi: 'खेलना', en: 'To play', translit: 'Khelna', category: 'verb' },
      { hi: 'फिसलना', en: 'To slide', translit: 'Phisalna', category: 'verb' },
      { hi: 'दौड़ना', en: 'To run', translit: 'Daudna', category: 'verb' },
      { hi: 'हरा-भरा', en: 'Lush green', translit: 'Hara-bhara', category: 'adj' },
      { hi: 'सुहावना', en: 'Pleasant', translit: 'Suhaavana', category: 'adj' },
      { hi: 'प्रसन्न / खुश', en: 'Happy / Joyful', translit: 'Prasann / Khush', category: 'adj' },
      { hi: 'के ऊपर / पर', en: 'On / Above', translit: 'Ke oopar / Par', category: 'position' },
      { hi: 'चारों ओर', en: 'All around', translit: 'Chaaron aur', category: 'position' },
      { hi: 'और / तथा', en: 'And / As well as', translit: 'Aur / Tatha', category: 'connector' }
    ],
    puzzles: [
      {
        step: 1,
        promptHi: 'वाक्य 1: चित्र किस स्थान का है? (स्थान का परिचय दें)',
        promptEn: 'Sentence 1: Introduce the place (This picture is of a beautiful park)',
        correctWords: ['यह', 'चित्र', 'एक', 'सुंदर', 'बगीचे', 'का', 'है।'],
        scrambledWords: [
          { hi: 'बगीचे', en: 'garden' },
          { hi: 'यह', en: 'this' },
          { hi: 'है।', en: 'is.' },
          { hi: 'एक', en: 'a' },
          { hi: 'चित्र', en: 'picture' },
          { hi: 'का', en: 'of' },
          { hi: 'सुंदर', en: 'beautiful' }
        ],
        fullSentenceHi: 'यह चित्र एक सुंदर बगीचे का है।',
        fullSentenceEn: 'This picture is of a beautiful garden.'
      },
      {
        step: 2,
        promptHi: 'वाक्य 2: मौसम और हरियाली कैसी है? (वातावरण)',
        promptEn: 'Sentence 2: Describe the environment (The park has lush green trees and fresh air)',
        correctWords: ['बगीचे', 'में', 'चारों', 'ओर', 'हरी', 'घास', 'और', 'पेड़', 'हैं।'],
        scrambledWords: [
          { hi: 'हरी', en: 'green' },
          { hi: 'बगीचे', en: 'garden' },
          { hi: 'पेड़', en: 'trees' },
          { hi: 'में', en: 'in' },
          { hi: 'चारों', en: 'four' },
          { hi: 'हैं।', en: 'are.' },
          { hi: 'ओर', en: 'sides' },
          { hi: 'और', en: 'and' },
          { hi: 'घास', en: 'grass' }
        ],
        fullSentenceHi: 'बगीचे में चारों ओर हरी घास और पेड़ हैं।',
        fullSentenceEn: 'There is green grass and trees all around in the garden.'
      },
      {
        step: 3,
        promptHi: 'वाक्य 3: बच्चे क्या कर रहे हैं? (मुख्य क्रिया)',
        promptEn: 'Sentence 3: Describe the main action (Children are playing on swings and slides)',
        correctWords: ['बच्चे', 'झूले', 'और', 'फिसलपट्टी', 'पर', 'खेल', 'रहे', 'हैं।'],
        scrambledWords: [
          { hi: 'फिसलपट्टी', en: 'slide' },
          { hi: 'खेल', en: 'play' },
          { hi: 'झूले', en: 'swings' },
          { hi: 'हैं।', en: 'are.' },
          { hi: 'बच्चे', en: 'children' },
          { hi: 'पर', en: 'on' },
          { hi: 'रहे', en: 'ing' },
          { hi: 'और', en: 'and' }
        ],
        fullSentenceHi: 'बच्चे झूले और फिसलपट्टी पर खेल रहे हैं।',
        fullSentenceEn: 'Children are playing on the swings and the slide.'
      },
      {
        step: 4,
        promptHi: 'वाक्य 4: बारीक विवरण (रंग-बिरंगे फूल व फुटबॉल)',
        promptEn: 'Sentence 4: Specific details (Lawn has colorful flowers and a football)',
        correctWords: ['मैदान', 'में', 'रंग-बिरंगे', 'फूल', 'खिले', 'हुए', 'हैं।'],
        scrambledWords: [
          { hi: 'खिले', en: 'bloomed' },
          { hi: 'में', en: 'in' },
          { hi: 'फूल', en: 'flowers' },
          { hi: 'मैदान', en: 'ground' },
          { hi: 'हैं।', en: 'are.' },
          { hi: 'रंग-बिरंगे', en: 'colorful' },
          { hi: 'हुए', en: 'been' }
        ],
        fullSentenceHi: 'मैदान में रंग-बिरंगे फूल खिले हुए हैं।',
        fullSentenceEn: 'Colorful flowers are blooming in the park ground.'
      },
      {
        step: 5,
        promptHi: 'वाक्य 5: निष्कर्ष / मूड (सभी बहुत खुश हैं)',
        promptEn: 'Sentence 5: Conclusion & mood (Everyone looks very joyful and happy)',
        correctWords: ['सभी', 'बच्चे', 'बहुत', 'प्रसन्न', 'और', 'उत्साहित', 'दिखाई', 'दे', 'रहे', 'हैं।'],
        scrambledWords: [
          { hi: 'बहुत', en: 'very' },
          { hi: 'सभी', en: 'all' },
          { hi: 'दिखाई', en: 'looking' },
          { hi: 'प्रसन्न', en: 'happy' },
          { hi: 'रहे', en: 'ing' },
          { hi: 'बच्चे', en: 'children' },
          { hi: 'हैं।', en: 'are.' },
          { hi: 'और', en: 'and' },
          { hi: 'दे', en: 'give' },
          { hi: 'उत्साहित', en: 'excited' }
        ],
        fullSentenceHi: 'सभी बच्चे बहुत प्रसन्न और उत्साहित दिखाई दे रहे हैं।',
        fullSentenceEn: 'All the children look very happy and excited.'
      }
    ],
    modelAnswer: {
      steps: [
        { num: 1, role: 'स्थान परिचय', hi: 'यह दृश्य एक सुंदर और हरे-भरे बगीचे का है।', en: 'This scene is of a beautiful and lush green garden.' },
        { num: 2, role: 'वातावरण', hi: 'बगीचे में चारों ओर हरी घास, रंग-बिरंगे फूल और छायादार पेड़ हैं।', en: 'There is green grass, colorful flowers, and shady trees all around the park.' },
        { num: 3, role: 'मुख्य क्रिया', hi: 'यहाँ कई बच्चे तरह-तरह के खेलों का आनंद ले रहे हैं।', en: 'Several children here are enjoying different kinds of games.' },
        { num: 4, role: 'बारीक विवरण', hi: 'एक बच्चा झूले पर झूल रहा है तथा अन्य बच्चे फिसलपट्टी पर फिसल रहे हैं।', en: 'One child is swinging on a swing while other children are sliding on the slide.' },
        { num: 5, role: 'निष्कर्ष', hi: 'बगीचे का वातावरण अत्यंत शांत, मनोरंजक और आनंददायक है।', en: 'The atmosphere of the park is extremely peaceful, entertaining, and delightful.' }
      ],
      fullParagraphHi: 'यह दृश्य एक सुंदर और हरे-भरे बगीचे का है। बगीचे में चारों ओर हरी घास, रंग-बिरंगे फूल और छायादार पेड़ हैं। यहाँ कई बच्चे तरह-तरह के खेलों का आनंद ले रहे हैं। एक बच्चा झूले पर झूल रहा है तथा अन्य बच्चे फिसलपट्टी पर फिसल रहे हैं। मैदान में एक लड़का फुटबॉल से भी खेल रहा है। बगीचे का वातावरण अत्यंत शांत, मनोरंजक और आनंददायक है। सभी बच्चे बहुत खुश दिखाई दे रहे हैं।',
      fullParagraphEn: 'This scene depicts a beautiful and lush green garden. There is fresh green grass, colorful flowers, and shady trees all around the park. Several children are enjoying various games here. One child is swinging on a swing while other children are sliding down the slide. In the ground, a boy is also playing with a football. The atmosphere of the park is very peaceful, entertaining, and delightful. All the children appear to be very happy.',
      tips: [
        'चित्र वर्णन हमेशा वर्तमान काल (Present Tense जैसे है, हैं, रहा है) में लिखें।',
        'वाक्य छोटे, सरल और व्याकरण की दृष्टि से शुद्ध होने चाहिए।',
        'संज्ञा और विशेषण शब्दों (जैसे हरा-भरा, सुंदर, रंग-बिरंगा) का प्रयोग करने से पूरे अंक मिलते हैं।'
      ]
    }
  },
  {
    id: 'rainy',
    realImage: 'images/scene_rainy_real.jpg',
    hotspotsReal: [{"id":1,"x":34,"y":32},{"id":2,"x":51,"y":86},{"id":3,"x":65,"y":62},{"id":4,"x":32,"y":12},{"id":5,"x":20,"y":68},{"id":6,"x":88,"y":38}],
    title: 'वर्षा ऋतु / बारिश का दिन',
    titleEn: 'A Rainy Day Scene',
    subtitle: 'काले बादल, छतरियाँ, कागज़ की नाव और पानी की बूँदें',
    icon: '🌧️',
    svg: `
      <svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyRain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#475569"/>
            <stop offset="60%" stop-color="#64748b"/>
            <stop offset="100%" stop-color="#94a3b8"/>
          </linearGradient>
          <linearGradient id="puddleGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#0284c7"/>
          </linearGradient>
        </defs>
        <!-- Dark Monsoon Sky -->
        <rect width="800" height="300" fill="url(#skyRain)" />
        <!-- Big Rain Clouds -->
        <path d="M 80 80 q 40 -40 90 -20 q 50 -40 110 -10 q 50 -30 90 20 q 40 30 0 60 l -290 0 z" fill="#334155" opacity="0.95" />
        <path d="M 400 90 q 40 -35 80 -15 q 60 -45 120 -10 q 50 -20 80 25 q 30 30 -10 60 l -270 0 z" fill="#1e293b" opacity="0.9" />
        <!-- Lightning streak -->
        <polygon points="350,110 330,160 345,160 320,210 370,150 350,150" fill="#facc15" opacity="0.9" />
        <!-- Ground / Street -->
        <rect y="280" width="800" height="200" fill="#334155" />
        <!-- Rain puddles (पानी के गड्ढे) -->
        <ellipse cx="280" cy="410" rx="140" ry="35" fill="url(#puddleGrad)" opacity="0.8" />
        <ellipse cx="640" cy="390" rx="90" ry="25" fill="url(#puddleGrad)" opacity="0.75" />
        <!-- Rain Drops (slanting lines) -->
        <g stroke="#93c5fd" stroke-width="2" stroke-linecap="round" opacity="0.65">
          <line x1="80" y1="140" x2="50" y2="200" /><line x1="160" y1="130" x2="130" y2="190" /><line x1="240" y1="150" x2="210" y2="210" />
          <line x1="420" y1="140" x2="390" y2="200" /><line x1="500" y1="120" x2="470" y2="180" /><line x1="680" y1="150" x2="650" y2="210" />
          <line x1="110" y1="230" x2="80" y2="290" /><line x1="320" y1="240" x2="290" y2="300" /><line x1="560" y1="230" x2="530" y2="290" />
          <line x1="220" y1="340" x2="190" y2="400" /><line x1="460" y1="340" x2="430" y2="400" /><line x1="720" y1="330" x2="690" y2="390" />
        </g>
        <!-- Girl with Umbrella on left -->
        <!-- Umbrella (छतरी) -->
        <path d="M 120 280 A 55 55 0 0 1 230 280 Z" fill="#ec4899" stroke="#db2777" stroke-width="3" />
        <line x1="175" y1="280" x2="175" y2="360" stroke="#475569" stroke-width="4" />
        <path d="M 175 360 q 0 12 -12 12" stroke="#475569" stroke-width="4" fill="none" />
        <!-- Child -->
        <circle cx="175" cy="300" r="12" fill="#fed7aa" />
        <path d="M 160 315 L 190 315 L 182 375 L 168 375 Z" fill="#fbbf24" /><!-- Yellow raincoat -->
        <!-- Boy in Raincoat releasing Paper Boat (कागज़ की नाव) -->
        <circle cx="380" cy="345" r="12" fill="#fed7aa" />
        <path d="M 368 358 L 395 358 L 390 405 L 372 405 Z" fill="#10b981" />
        <!-- Paper Boat 1 in puddle -->
        <polygon points="250,410 310,410 295,425 265,425" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
        <polygon points="280,390 280,410 300,410" fill="#f87171" />
        <!-- Paper Boat 2 -->
        <polygon points="320,405 360,405 350,418 330,418" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <!-- Peacock / Bird dancing on wall -->
        <rect x="680" y="270" width="100" height="90" fill="#475569" rx="4" />
        <ellipse cx="730" cy="255" rx="14" ry="18" fill="#0284c7" />
        <path d="M 725 240 Q 770 210 775 265 Q 755 270 725 255 Z" fill="#059669" />
        <!-- Dancing Frog in puddle -->
        <ellipse cx="190" cy="425" rx="10" ry="8" fill="#84cc16" />
        <circle cx="186" cy="420" r="2.5" fill="#000" />
      </svg>
    `,
    hotspots: [
      {
        id: 1,
        x: 23,
        y: 54,
        title: 'रंग-बिरंगी छतरी (Umbrella)',
        translit: 'Rang-birangi Chhatri',
        meaningEn: 'Colorful Umbrella',
        type: 'विशेषण + संज्ञा',
        sentenceHi: 'लड़की ने बारिश से बचने के लिए गुलाबी छतरी पकड़ी है।',
        sentenceEn: 'The girl is holding a pink umbrella to protect herself from rain.'
      },
      {
        id: 2,
        x: 35,
        y: 84,
        title: 'कागज़ की नाव (Paper Boat)',
        translit: 'Kaagaz ki Naav',
        meaningEn: 'Paper Boat',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'बच्चा पानी के गड्ढे में कागज़ की नाव तैरा रहा है।',
        sentenceEn: 'The child is floating a paper boat in the water puddle.'
      },
      {
        id: 3,
        x: 48,
        y: 74,
        title: 'रेनकोट (Raincoat)',
        translit: 'Raincoat / Barsati',
        meaningEn: 'Raincoat',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'लड़के ने भीगने से बचने के लिए हरा रेनकोट पहना है।',
        sentenceEn: 'The boy is wearing a green raincoat to avoid getting drenched.'
      },
      {
        id: 4,
        x: 28,
        y: 18,
        title: 'काले बादल (Dark Clouds)',
        translit: 'Kaale Baadal',
        meaningEn: 'Dark Clouds',
        type: 'विशेषण + संज्ञा',
        sentenceHi: 'आसमान में घने काले बादल छाए हुए हैं।',
        sentenceEn: 'Dense dark clouds have covered the sky.'
      },
      {
        id: 5,
        x: 42,
        y: 35,
        title: 'बिजली की चमक (Lightning)',
        translit: 'Bijli ki Chamak',
        meaningEn: 'Flash of Lightning',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'बादलों के बीच तेज़ बिजली चमक रही है।',
        sentenceEn: 'Bright lightning is flashing between the clouds.'
      },
      {
        id: 6,
        x: 92,
        y: 52,
        title: 'मयूर / मोर (Peacock)',
        translit: 'Mor / Mayoor',
        meaningEn: 'Peacock',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'दीवार पर बैठा मोर वर्षा देखकर पंख फैलाकर खुश हो रहा है।',
        sentenceEn: 'The peacock sitting on the wall is joyful spreading feathers upon seeing rain.'
      }
    ],
    vocabulary: [
      { hi: 'वर्षा / बारिश', en: 'Rain', translit: 'Varsha / Baarish', category: 'noun' },
      { hi: 'बादल', en: 'Clouds', translit: 'Baadal', category: 'noun' },
      { hi: 'छतरी / छाता', en: 'Umbrella', translit: 'Chhatri / Chhaata', category: 'noun' },
      { hi: 'नाव', en: 'Boat', translit: 'Naav', category: 'noun' },
      { hi: 'रेनकोट', en: 'Raincoat', translit: 'Raincoat', category: 'noun' },
      { hi: 'बिजली', en: 'Lightning', translit: 'Bijli', category: 'noun' },
      { hi: 'बरसना', en: 'To rain / pour', translit: 'Barasna', category: 'verb' },
      { hi: 'तैरना / तैराना', en: 'To float / swim', translit: 'Tairaana', category: 'verb' },
      { hi: 'भीगना', en: 'To get wet', translit: 'Bheegna', category: 'verb' },
      { hi: 'चमकना', en: 'To flash / shine', translit: 'Chamakna', category: 'verb' },
      { hi: 'काले / घने', en: 'Dark / Dense', translit: 'Kaale / Ghane', category: 'adj' },
      { hi: 'मूसलाधार', en: 'Torrential / Heavy', translit: 'Moosladhaar', category: 'adj' },
      { hi: 'प्रसन्नचित्त', en: 'Delighted', translit: 'Prasannachitta', category: 'adj' },
      { hi: 'के नीचे', en: 'Under / Beneath', translit: 'Ke neeche', category: 'position' },
      { hi: 'आसपास', en: 'Nearby', translit: 'Aas-paas', category: 'position' },
      { hi: 'क्योंकि', en: 'Because', translit: 'Kyonki', category: 'connector' }
    ],
    puzzles: [
      {
        step: 1,
        promptHi: 'वाक्य 1: चित्र किस ऋतु या दृश्य का है?',
        promptEn: 'Sentence 1: Describe the scene (This is a scene of a rainy day)',
        correctWords: ['यह', 'चित्र', 'वर्षा', 'ऋतु', 'का', 'है।'],
        scrambledWords: [
          { hi: 'का', en: 'of' },
          { hi: 'चित्र', en: 'picture' },
          { hi: 'यह', en: 'this' },
          { hi: 'वर्षा', en: 'rain' },
          { hi: 'है।', en: 'is.' },
          { hi: 'ऋतु', en: 'season' }
        ],
        fullSentenceHi: 'यह चित्र वर्षा ऋतु का है।',
        fullSentenceEn: 'This picture is of the rainy season.'
      },
      {
        step: 2,
        promptHi: 'वाक्य 2: आसमान में क्या हो रहा है?',
        promptEn: 'Sentence 2: Describe sky & clouds (Dark clouds are gathered in the sky and rain is falling)',
        correctWords: ['आसमान', 'में', 'काले', 'बादल', 'छाए', 'हैं', 'और', 'बारिश', 'हो', 'रही', 'है।'],
        scrambledWords: [
          { hi: 'काले', en: 'dark' },
          { hi: 'आसमान', en: 'sky' },
          { hi: 'हो', en: 'happening' },
          { hi: 'हैं', en: 'are' },
          { hi: 'छाए', en: 'covered' },
          { hi: 'बादल', en: 'clouds' },
          { hi: 'में', en: 'in' },
          { hi: 'बारिश', en: 'rain' },
          { hi: 'रही', en: 'ing' },
          { hi: 'और', en: 'and' },
          { hi: 'है।', en: 'is.' }
        ],
        fullSentenceHi: 'आसमान में काले बादल छाए हैं और बारिश हो रही है।',
        fullSentenceEn: 'Dark clouds have gathered in the sky and it is raining.'
      },
      {
        step: 3,
        promptHi: 'वाक्य 3: बच्चों का रेनकोट व छतरी',
        promptEn: 'Sentence 3: Umbrella & raincoat (Children are holding umbrellas and wearing raincoats)',
        correctWords: ['बच्चों', 'ने', 'रंग-बिरंगी', 'छतरियाँ', 'ली', 'हुई', 'हैं।'],
        scrambledWords: [
          { hi: 'छतरियाँ', en: 'umbrellas' },
          { hi: 'हुई', en: 'been' },
          { hi: 'बच्चों', en: 'children' },
          { hi: 'रंग-बिरंगी', en: 'colorful' },
          { hi: 'हैं।', en: 'are.' },
          { hi: 'ने', en: 'by' },
          { hi: 'ली', en: 'taken' }
        ],
        fullSentenceHi: 'बच्चों ने रंग-बिरंगी छतरियाँ ली हुई हैं।',
        fullSentenceEn: 'The children are holding colorful umbrellas.'
      },
      {
        step: 4,
        promptHi: 'वाक्य 4: कागज़ की नाव तैराना',
        promptEn: 'Sentence 4: Floating paper boats (A boy is floating a paper boat in water)',
        correctWords: ['एक', 'लड़का', 'पानी', 'में', 'कागज़', 'की', 'नाव', 'तैरा', 'रहा', 'है।'],
        scrambledWords: [
          { hi: 'कागज़', en: 'paper' },
          { hi: 'लड़का', en: 'boy' },
          { hi: 'पानी', en: 'water' },
          { hi: 'है।', en: 'is.' },
          { hi: 'नाव', en: 'boat' },
          { hi: 'एक', en: 'a' },
          { hi: 'में', en: 'in' },
          { hi: 'तैरा', en: 'floating' },
          { hi: 'की', en: 'of' },
          { hi: 'रहा', en: 'ing' }
        ],
        fullSentenceHi: 'एक लड़का पानी में कागज़ की नाव तैरा रहा है।',
        fullSentenceEn: 'A boy is floating a paper boat in the water.'
      },
      {
        step: 5,
        promptHi: 'वाक्य 5: बारिश का आनंद / निष्कर्ष',
        promptEn: 'Sentence 5: Conclusion (All children are enjoying the rain very much)',
        correctWords: ['सभी', 'लोग', 'वर्षा', 'का', 'भरपूर', 'आनंद', 'उठा', 'रहे', 'हैं।'],
        scrambledWords: [
          { hi: 'भरपूर', en: 'full' },
          { hi: 'लोग', en: 'people' },
          { hi: 'आनंद', en: 'joy' },
          { hi: 'वर्षा', en: 'rain' },
          { hi: 'रहे', en: 'ing' },
          { hi: 'सभी', en: 'all' },
          { hi: 'हैं।', en: 'are.' },
          { hi: 'का', en: 'of' },
          { hi: 'उठा', en: 'taking' }
        ],
        fullSentenceHi: 'सभी लोग वर्षा का भरपूर आनंद उठा रहे हैं।',
        fullSentenceEn: 'Everyone is thoroughly enjoying the rain.'
      }
    ],
    modelAnswer: {
      steps: [
        { num: 1, role: 'स्थान परिचय', hi: 'यह चित्र वर्षा ऋतु के एक सुहावने दिन का है।', en: 'This picture represents a pleasant day of the rainy season.' },
        { num: 2, role: 'वातावरण', hi: 'आसमान में काले-घने बादल छाए हैं और तेज़ी से बारिश हो रही है।', en: 'Dark dense clouds cover the sky and rain is pouring rapidly.' },
        { num: 3, role: 'मुख्य क्रिया', hi: 'सड़क पर पानी भरा है और बच्चे पानी में मस्ती कर रहे हैं।', en: 'Water is accumulated on the street and kids are having fun in the water.' },
        { num: 4, role: 'बारीक विवरण', hi: 'लड़की ने गुलाबी छतरी पकड़ी है और एक लड़का कागज़ की नाव चला रहा है।', en: 'A girl is holding a pink umbrella and a boy is sailing a paper boat.' },
        { num: 5, role: 'निष्कर्ष', hi: 'बारिश होने से मौसम ठंडा और अत्यंत मनमोहक बन गया है।', en: 'Due to rain, the weather has become cool and extremely pleasant.' }
      ],
      fullParagraphHi: 'यह चित्र वर्षा ऋतु के एक सुहावने दिन का है। आसमान में काले-घने बादल छाए हैं और मूसलाधार बारिश हो रही है। बादलों के बीच बिजली भी चमक रही है। सड़क पर पानी के छोटे-छोटे गड्ढे बन गए हैं। एक लड़की रंग-बिरंगी छतरी लेकर खड़ी है, जबकि एक लड़का कागज़ की नाव पानी में तैरा रहा है। दूर दीवार पर बैठा मोर वर्षा देखकर खुश हो रहा है। सभी बच्चे बारिश के इस मौसम का खूब आनंद ले रहे हैं।',
      fullParagraphEn: 'This picture depicts a pleasant day during the rainy season. Dark dense clouds have gathered in the sky and torrential rain is pouring down. Lightning is also flashing between the clouds. Small puddles of water have formed on the road. A girl is standing with a colorful umbrella, while a boy is floating a paper boat in the water. A peacock sitting on a distant wall looks delighted watching the rain. All the children are thoroughly enjoying this rainy weather.',
      tips: [
        'प्राकृतिक घटनाओं (जैसे बिजली, बादल, वर्षा) के लिए उचित विशेषणों का प्रयोग करें।',
        'कारक चिह्नों (ने, को, से, में, पर) का सही उपयोग वाक्य को सशक्त बनाता है।'
      ]
    }
  },
  {
    id: 'school',
    realImage: 'images/scene_school_real.jpg',
    hotspotsReal: [{"id":1,"x":23,"y":25},{"id":2,"x":52,"y":11},{"id":3,"x":54,"y":60},{"id":4,"x":91,"y":56},{"id":5,"x":37,"y":38},{"id":6,"x":35,"y":84}],
    title: 'विद्यालय का खेल मैदान',
    titleEn: 'School Playground & Sports Day',
    subtitle: 'स्कूल की इमारत, दौड़ते हुए विद्यार्थी, तिरंगा झंडा और खेलकूद',
    icon: '🏫',
    svg: `
      <svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skySchool" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#60a5fa"/>
            <stop offset="100%" stop-color="#dbeafe"/>
          </linearGradient>
        </defs>
        <!-- Sky -->
        <rect width="800" height="240" fill="url(#skySchool)" />
        <!-- School Building -->
        <rect x="220" y="70" width="360" height="150" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3" rx="4" />
        <polygon points="400,20 330,70 470,70" fill="#dc2626" />
        <circle cx="400" cy="50" r="12" fill="#ffffff" stroke="#991b1b" stroke-width="2" />
        <!-- School Windows & Doors -->
        <rect x="250" y="90" width="40" height="35" rx="3" fill="#38bdf8" />
        <rect x="310" y="90" width="40" height="35" rx="3" fill="#38bdf8" />
        <rect x="450" y="90" width="40" height="35" rx="3" fill="#38bdf8" />
        <rect x="510" y="90" width="40" height="35" rx="3" fill="#38bdf8" />
        <rect x="380" y="145" width="40" height="75" fill="#78350f" rx="3" />
        <!-- Flag pole & Indian Flag -->
        <line x1="140" y1="80" x2="140" y2="240" stroke="#94a3b8" stroke-width="5" />
        <rect x="140" y="80" width="55" height="11" fill="#f97316" />
        <rect x="140" y="91" width="55" height="11" fill="#ffffff" />
        <circle cx="167" cy="96" r="4.5" fill="#1e3a8a" />
        <rect x="140" y="102" width="55" height="11" fill="#15803d" />
        <!-- Playground Green Grass -->
        <rect y="220" width="800" height="260" fill="#65a30d" />
        <!-- Running Track (Oval) -->
        <path d="M 100 370 C 100 290 700 290 700 370 C 700 450 100 450 100 370 Z" stroke="#fbbf24" stroke-width="16" fill="none" opacity="0.6" stroke-dasharray="16,8" />
        <!-- Running Student 1 (Boy in Red Uniform) -->
        <circle cx="280" cy="330" r="12" fill="#fed7aa" />
        <rect x="272" y="342" width="16" height="25" rx="4" fill="#ef4444" />
        <line x1="272" y1="367" x2="260" y2="390" stroke="#1e293b" stroke-width="4" />
        <line x1="288" y1="367" x2="305" y2="385" stroke="#1e293b" stroke-width="4" />
        <!-- Running Student 2 (Girl in Blue Uniform) -->
        <circle cx="370" cy="325" r="12" fill="#fed7aa" />
        <rect x="362" y="337" width="16" height="25" rx="4" fill="#2563eb" />
        <line x1="362" y1="362" x2="350" y2="385" stroke="#1e293b" stroke-width="4" />
        <line x1="378" y1="362" x2="395" y2="380" stroke="#1e293b" stroke-width="4" />
        <!-- Teacher with Whistle / Clipboard -->
        <circle cx="560" cy="310" r="14" fill="#fed7aa" />
        <rect x="550" y="324" width="20" height="38" rx="4" fill="#047857" />
        <rect x="540" y="332" width="12" height="16" rx="2" fill="#f8fafc" stroke="#475569" stroke-width="1" />
        <!-- Cheer banner / Students cheering -->
        <rect x="630" y="340" width="110" height="25" fill="#f59e0b" rx="4" />
        <text x="685" y="357" font-family="'Outfit', sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">SPORTS DAY</text>
      </svg>
    `,
    hotspots: [
      {
        id: 1,
        x: 50,
        y: 28,
        title: 'विद्यालय की इमारत (School Building)',
        translit: 'Vidyalay ki Imaarat',
        meaningEn: 'School Building',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'पीछे विद्यालय की भव्य और विशाल इमारत दिखाई दे रही है।',
        sentenceEn: 'The grand and spacious school building is visible in the background.'
      },
      {
        id: 2,
        x: 19,
        y: 24,
        title: 'तिरंगा झंडा (National Flag)',
        translit: 'Tiranga Jhanda',
        meaningEn: 'Tricolor Flag',
        type: 'विशेषण + संज्ञा',
        sentenceHi: 'मैदान के पास ऊँचे खंभे पर हमारा प्यारा तिरंगा लहरा रहा है।',
        sentenceEn: 'Our beloved tricolor flag is fluttering on a high pole near the field.'
      },
      {
        id: 3,
        x: 37,
        y: 74,
        title: 'दौड़ प्रतियोगिता (Running Race)',
        translit: 'Daud Pratiyogita',
        meaningEn: 'Running Race',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'विद्यार्थी ट्रैक पर दौड़ प्रतियोगिता में उत्साह से भाग ले रहे हैं।',
        sentenceEn: 'Students are enthusiastically taking part in the race on the track.'
      },
      {
        id: 4,
        x: 70,
        y: 72,
        title: 'खेल शिक्षक (Sports Teacher)',
        translit: 'Khel Shikshak',
        meaningEn: 'Sports Teacher / Coach',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'खेल शिक्षक सीटी बजाकर दौड़ का संचालन कर रहे हैं।',
        sentenceEn: 'The sports teacher is conducting the race by blowing a whistle.'
      },
      {
        id: 5,
        x: 85,
        y: 75,
        title: 'खेल दिवस का बैनर (Sports Banner)',
        translit: 'Khel Divas Banner',
        meaningEn: 'Sports Day Banner',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'मैदान में खेल दिवस का बड़ा बैनर लगा हुआ है।',
        sentenceEn: 'A big Sports Day banner is put up in the ground.'
      },
      {
        id: 6,
        x: 52,
        y: 86,
        title: 'दौड़ ट्रैक (Running Track)',
        translit: 'Daud Track',
        meaningEn: 'Running Track',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'मैदान में चूने से सफेद रेखाओं वाला ट्रैक बनाया गया है।',
        sentenceEn: 'A running track with white chalk lines is drawn on the ground.'
      }
    ],
    vocabulary: [
      { hi: 'विद्यालय / स्कूल', en: 'School', translit: 'Vidyalay / School', category: 'noun' },
      { hi: 'खेल का मैदान', en: 'Playground', translit: 'Khel ka Maidan', category: 'noun' },
      { hi: 'विद्यार्थी / छात्र', en: 'Students', translit: 'Vidyarthi / Chhaatra', category: 'noun' },
      { hi: 'प्रतियोगिता', en: 'Competition / Race', translit: 'Pratiyogita', category: 'noun' },
      { hi: 'शिक्षक / अध्यापिका', en: 'Teacher', translit: 'Shikshak', category: 'noun' },
      { hi: 'दौड़ना', en: 'To run', translit: 'Daudna', category: 'verb' },
      { hi: 'भाग लेना', en: 'To participate', translit: 'Bhaag lena', category: 'verb' },
      { hi: 'प्रोत्साहन देना', en: 'To encourage / cheer', translit: 'Protsahan dena', category: 'verb' },
      { hi: 'सीटी बजाना', en: 'To whistle', translit: 'Seeti bajaana', category: 'verb' },
      { hi: 'उत्साही / फुर्तीले', en: 'Enthusiastic / Agile', translit: 'Utsaahi / Phurteele', category: 'adj' },
      { hi: 'भव्य / विशाल', en: 'Grand / Spacious', translit: 'Bhavya / Vishaal', category: 'adj' },
      { hi: 'अनुशासित', en: 'Disciplined', translit: 'Anushaasit', category: 'adj' },
      { hi: 'के सामने', en: 'In front of', translit: 'Ke saamne', category: 'position' },
      { hi: 'के बीच', en: 'Between / Among', translit: 'Ke beech', category: 'position' },
      { hi: 'तथापि / लेकिन', en: 'However / But', translit: 'Tathaapi / Lekin', category: 'connector' }
    ],
    puzzles: [
      {
        step: 1,
        promptHi: 'वाक्य 1: यह चित्र किस विद्यालय का है?',
        promptEn: 'Sentence 1: Introduce the school scene (This picture is of a school playground)',
        correctWords: ['यह', 'चित्र', 'विद्यालय', 'के', 'खेल', 'मैदान', 'का', 'है।'],
        scrambledWords: [
          { hi: 'खेल', en: 'play' },
          { hi: 'यह', en: 'this' },
          { hi: 'विद्यालय', en: 'school' },
          { hi: 'का', en: 'of' },
          { hi: 'मैदान', en: 'ground' },
          { hi: 'चित्र', en: 'picture' },
          { hi: 'है।', en: 'is.' },
          { hi: 'के', en: 'of' }
        ],
        fullSentenceHi: 'यह चित्र विद्यालय के खेल मैदान का है।',
        fullSentenceEn: 'This picture is of the school playground.'
      },
      {
        step: 2,
        promptHi: 'वाक्य 2: आज विद्यालय में क्या हो रहा है?',
        promptEn: 'Sentence 2: Mention event (Annual sports competition is organized today)',
        correctWords: ['आज', 'विद्यालय', 'में', 'वार्षिक', 'खेल', 'दिवस', 'मनाया', 'जा', 'रहा', 'है।'],
        scrambledWords: [
          { hi: 'दिवस', en: 'day' },
          { hi: 'वार्षिक', en: 'annual' },
          { hi: 'आज', en: 'today' },
          { hi: 'मनाया', en: 'celebrated' },
          { hi: 'में', en: 'in' },
          { hi: 'विद्यालय', en: 'school' },
          { hi: 'जा', en: 'going' },
          { hi: 'खेल', en: 'sports' },
          { hi: 'रहा', en: 'ing' },
          { hi: 'है।', en: 'is.' }
        ],
        fullSentenceHi: 'आज विद्यालय में वार्षिक खेल दिवस मनाया जा रहा है।',
        fullSentenceEn: 'Annual Sports Day is being celebrated at school today.'
      },
      {
        step: 3,
        promptHi: 'वाक्य 3: छात्र क्या कर रहे हैं?',
        promptEn: 'Sentence 3: Running competition (Students are participating in running race)',
        correctWords: ['छात्र', 'ट्रैक', 'पर', 'दौड़', 'प्रतियोगिता', 'में', 'दौड़', 'रहे', 'हैं।'],
        scrambledWords: [
          { hi: 'दौड़', en: 'running' },
          { hi: 'प्रतियोगिता', en: 'contest' },
          { hi: 'छात्र', en: 'students' },
          { hi: 'ट्रैक', en: 'track' },
          { hi: 'में', en: 'in' },
          { hi: 'रहे', en: 'ing' },
          { hi: 'पर', en: 'on' },
          { hi: 'दौड़', en: 'run' },
          { hi: 'हैं।', en: 'are.' }
        ],
        fullSentenceHi: 'छात्र ट्रैक पर दौड़ प्रतियोगिता में दौड़ रहे हैं।',
        fullSentenceEn: 'Students are running in the race competition on the track.'
      },
      {
        step: 4,
        promptHi: 'वाक्य 4: शिक्षक व दर्शक',
        promptEn: 'Sentence 4: Teacher & cheers (Teacher is blowing whistle and students are cheering)',
        correctWords: ['खेल', 'शिक्षक', 'सीटी', 'बजाकर', 'छात्रों', 'का', 'उत्साह', 'बढ़ा', 'रहे', 'हैं।'],
        scrambledWords: [
          { hi: 'सीटी', en: 'whistle' },
          { hi: 'शिक्षक', en: 'teacher' },
          { hi: 'बढ़ा', en: 'raising' },
          { hi: 'खेल', en: 'sports' },
          { hi: 'बजाकर', en: 'blowing' },
          { hi: 'का', en: 'of' },
          { hi: 'छात्रों', en: 'students' },
          { hi: 'रहे', en: 'ing' },
          { hi: 'उत्साह', en: 'cheer' },
          { hi: 'हैं।', en: 'are.' }
        ],
        fullSentenceHi: 'खेल शिक्षक सीटी बजाकर छात्रों का उत्साह बढ़ा रहे हैं।',
        fullSentenceEn: 'The sports teacher is encouraging students by blowing the whistle.'
      },
      {
        step: 5,
        promptHi: 'वाक्य 5: वातावरण व खेल भावना',
        promptEn: 'Sentence 5: Conclusion (The entire field is filled with zeal and sportsmanship)',
        correctWords: ['पूरा', 'मैदान', 'जोश', 'और', 'खेल', 'भावना', 'से', 'गूंज', 'रहा', 'है।'],
        scrambledWords: [
          { hi: 'जोश', en: 'enthusiasm' },
          { hi: 'पूरा', en: 'whole' },
          { hi: 'भावना', en: 'spirit' },
          { hi: 'मैदान', en: 'ground' },
          { hi: 'से', en: 'with' },
          { hi: 'गूंज', en: 'echoing' },
          { hi: 'और', en: 'and' },
          { hi: 'खेल', en: 'sports' },
          { hi: 'रहा', en: 'ing' },
          { hi: 'है।', en: 'is.' }
        ],
        fullSentenceHi: 'पूरा मैदान जोश और खेल भावना से गूंज रहा है।',
        fullSentenceEn: 'The entire field is resonating with energy and sportsmanship.'
      }
    ],
    modelAnswer: {
      steps: [
        { num: 1, role: 'स्थान परिचय', hi: 'यह दृश्य एक विद्यालय के विशाल खेल मैदान का है।', en: 'This scene is of the large playground of a school.' },
        { num: 2, role: 'अवसर व वातावरण', hi: 'विद्यालय में आज खेल दिवस (Sports Day) का भव्य आयोजन किया गया है।', en: 'A grand Sports Day has been organized at the school today.' },
        { num: 3, role: 'मुख्य गतिविधि', hi: 'मैदान के दौड़-ट्रैक पर कई विद्यार्थी उत्साहपूर्वक दौड़ रहे हैं।', en: 'Several students are enthusiastically running on the running track.' },
        { num: 4, role: 'बारीक विवरण', hi: 'खेल शिक्षक सीटी बजाकर दौड़ का संचालन कर रहे हैं तथा दर्शक तालियाँ बजा रहे हैं।', en: 'The sports teacher is conducting the race by blowing a whistle and spectators are clapping.' },
        { num: 5, role: 'निष्कर्ष', hi: 'सभी बच्चे खेल भावना और अनुशासन का सुंदर परिचय दे रहे हैं।', en: 'All the children are displaying a fine example of sportsmanship and discipline.' }
      ],
      fullParagraphHi: 'यह दृश्य एक विद्यालय के विशाल खेल मैदान का है। पृष्ठभूमि में विद्यालय की भव्य इमारत और लहराता हुआ तिरंगा झंडा दिखाई दे रहा है। विद्यालय में आज खेल दिवस का आयोजन किया गया है। मैदान पर बने ट्रैक पर छात्र दौड़ प्रतियोगिता में भाग ले रहे हैं। खेल शिक्षक हाथ में सीटी लेकर दौड़ का संचालन कर रहे हैं। अन्य विद्यार्थी ताली बजाकर अपने मित्रों का उत्साहवर्धन कर रहे हैं। चारों ओर उत्साह, अनुशासन और खेल भावना का सुंदर वातावरण है।',
      fullParagraphEn: 'This scene depicts the vast playground of a school. In the background, the grand school building and the fluttering national flag are visible. Today, Sports Day is being organized at the school. On the ground track, students are participating in a running race. The sports teacher is managing the race with a whistle in hand. Other students are clapping and cheering for their friends. All around, there is a wonderful atmosphere of enthusiasm, discipline, and sportsmanship.',
      tips: [
        'विद्यालय संबंधी शब्दों (जैसे अनुशासन, खेल भावना, शिक्षक, विद्यार्थी) का प्रयोग करें।',
        'वाक्यों को क्रमबद्ध रखें: स्थान → अवसर → मुख्य क्रिया → दर्शक/शिक्षक → निष्कर्ष।'
      ]
    }
  },
  {
    id: 'birthday',
    realImage: 'images/scene_birthday_real.jpg',
    hotspotsReal: [{"id":1,"x":55,"y":79},{"id":2,"x":54,"y":55},{"id":3,"x":24,"y":14},{"id":4,"x":13,"y":54},{"id":5,"x":33,"y":55},{"id":6,"x":54,"y":24}],
    title: 'जन्मदिन की पार्टी',
    titleEn: 'Birthday Celebration Party',
    subtitle: 'केक, मोमबत्तियाँ, रंग-बिरंगे गुब्बारे, उपहार और खुश बच्चे',
    icon: '🎂',
    svg: `
      <svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wallParty" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#4c1d95"/>
            <stop offset="100%" stop-color="#831843"/>
          </linearGradient>
        </defs>
        <!-- Room Wall -->
        <rect width="800" height="480" fill="url(#wallParty)" />
        <!-- Bunting / Flags (झालर) -->
        <polygon points="50,40 100,40 75,90" fill="#f59e0b" />
        <polygon points="110,40 160,40 135,90" fill="#10b981" />
        <polygon points="170,40 220,40 195,90" fill="#3b82f6" />
        <polygon points="230,40 280,40 255,90" fill="#ec4899" />
        <polygon points="290,40 340,40 315,90" fill="#8b5cf6" />
        <polygon points="460,40 510,40 485,90" fill="#f59e0b" />
        <polygon points="520,40 570,40 545,90" fill="#10b981" />
        <polygon points="580,40 630,40 605,90" fill="#3b82f6" />
        <polygon points="640,40 690,40 665,90" fill="#ec4899" />
        <polygon points="700,40 750,40 725,90" fill="#8b5cf6" />
        <path d="M 40 40 Q 400 70 760 40" stroke="#fcd34d" stroke-width="2" fill="none" />
        <!-- Balloons (गुब्बारे) -->
        <circle cx="80" cy="160" r="28" fill="#ef4444" />
        <line x1="80" y1="188" x2="90" y2="240" stroke="#cbd5e1" stroke-width="1.5" />
        <circle cx="125" cy="140" r="28" fill="#f59e0b" />
        <line x1="125" y1="168" x2="115" y2="240" stroke="#cbd5e1" stroke-width="1.5" />
        <circle cx="680" cy="150" r="28" fill="#3b82f6" />
        <line x1="680" y1="178" x2="670" y2="240" stroke="#cbd5e1" stroke-width="1.5" />
        <circle cx="720" cy="170" r="28" fill="#10b981" />
        <line x1="720" y1="198" x2="710" y2="240" stroke="#cbd5e1" stroke-width="1.5" />
        <!-- Table (मेज़) -->
        <rect x="220" y="270" width="360" height="24" rx="4" fill="#92400e" />
        <rect x="230" y="294" width="340" height="150" fill="#b45309" />
        <polygon points="210,270 590,270 570,300 230,300" fill="#fef08a" opacity="0.9" /><!-- Tablecloth -->
        <!-- Big Birthday Cake (केक) -->
        <rect x="340" y="225" width="120" height="45" rx="6" fill="#f43f5e" />
        <rect x="355" y="190" width="90" height="35" rx="5" fill="#fbcfe8" />
        <!-- Candles (मोमबत्तियाँ) -->
        <rect x="375" y="170" width="6" height="20" fill="#38bdf8" />
        <ellipse cx="378" cy="166" rx="4" ry="7" fill="#f59e0b" />
        <rect x="400" y="170" width="6" height="20" fill="#facc15" />
        <ellipse cx="403" cy="166" rx="4" ry="7" fill="#f59e0b" />
        <rect x="420" y="170" width="6" height="20" fill="#4ade80" />
        <ellipse cx="423" cy="166" rx="4" ry="7" fill="#f59e0b" />
        <!-- Birthday Boy in Middle with Party Cap -->
        <circle cx="400" cy="115" r="18" fill="#fed7aa" />
        <polygon points="388,102 412,102 400,65" fill="#e11d48" />
        <rect x="385" y="133" width="30" height="40" rx="5" fill="#0284c7" />
        <!-- Friend Left (Clapping) -->
        <circle cx="270" cy="160" r="16" fill="#fed7aa" />
        <polygon points="260,148 280,148 270,120" fill="#10b981" />
        <rect x="256" y="176" width="28" height="36" rx="4" fill="#ec4899" />
        <!-- Friend Right (Clapping) -->
        <circle cx="530" cy="160" r="16" fill="#fed7aa" />
        <polygon points="520,148 540,148 530,120" fill="#f59e0b" />
        <rect x="516" y="176" width="28" height="36" rx="4" fill="#8b5cf6" />
        <!-- Gift Boxes on Floor / Table -->
        <rect x="130" y="360" width="65" height="55" rx="4" fill="#3b82f6" />
        <rect x="157" y="360" width="10" height="55" fill="#facc15" />
        <rect x="130" y="382" width="65" height="10" fill="#facc15" />
        <rect x="610" y="370" width="55" height="48" rx="4" fill="#10b981" />
        <rect x="633" y="370" width="8" height="48" fill="#f43f5e" />
      </svg>
    `,
    hotspots: [
      {
        id: 1,
        x: 50,
        y: 47,
        title: 'स्वादिष्ट केक (Delicious Cake)',
        translit: 'Swaadisht Cake',
        meaningEn: 'Delicious Birthday Cake',
        type: 'विशेषण + संज्ञा',
        sentenceHi: 'मेज़ पर मोमबत्तियों से सजा दो मंज़िला स्वादिष्ट केक रखा है।',
        sentenceEn: 'A two-tiered delicious cake decorated with candles is placed on the table.'
      },
      {
        id: 2,
        x: 50,
        y: 22,
        title: 'जन्मदिन वाला बच्चा (Birthday Boy)',
        translit: 'Janamdin ka Bachha',
        meaningEn: 'Birthday Boy with Party Cap',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'जन्मदिन वाले लड़के ने सिर पर रंग-बिरंगी टोपी पहनी है।',
        sentenceEn: 'The birthday boy is wearing a colorful party cap on his head.'
      },
      {
        id: 3,
        x: 13,
        y: 32,
        title: 'गुब्बारे (Balloons)',
        translit: 'Gubbaare',
        meaningEn: 'Balloons',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'कमरे को सजाने के लिए रंग-बिरंगे गुब्बारे लगाए गए हैं।',
        sentenceEn: 'Colorful balloons have been hung to decorate the room.'
      },
      {
        id: 4,
        x: 20,
        y: 80,
        title: 'उपहार / तोहफ़े (Gifts)',
        translit: 'Upahaar / Tohfe',
        meaningEn: 'Gifts & Presents',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'मित्रों ने सुंदर रिबन से बंधे उपहार भेंट किए हैं।',
        sentenceEn: 'Friends have presented gifts wrapped with pretty ribbons.'
      },
      {
        id: 5,
        x: 34,
        y: 38,
        title: 'ताली बजाते मित्र (Clapping Friends)',
        translit: 'Taali Bajaate Mitra',
        meaningEn: 'Friends Clapping & Cheering',
        type: 'संज्ञा + क्रिया',
        sentenceHi: 'सभी दोस्त ताली बजाकर जन्मदिन की बधाई गा रहे हैं।',
        sentenceEn: 'All friends are clapping and singing the birthday greeting.'
      },
      {
        id: 6,
        x: 50,
        y: 9,
        title: 'सजावट की झालर (Festive Bunting)',
        translit: 'Sajaawat ki Jhaalar',
        meaningEn: 'Festive Bunting Flags',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'दीवार पर रंग-बिरंगी पताकाएँ और झालरें लगाई गई हैं।',
        sentenceEn: 'Colorful flags and buntings are hung on the wall.'
      }
    ],
    vocabulary: [
      { hi: 'जन्मदिन', en: 'Birthday', translit: 'Janamdin', category: 'noun' },
      { hi: 'केक', en: 'Cake', translit: 'Cake', category: 'noun' },
      { hi: 'मोमबत्ती', en: 'Candle', translit: 'Mombatti', category: 'noun' },
      { hi: 'उपहार / भेंट', en: 'Gift / Present', translit: 'Upahaar / Bhent', category: 'noun' },
      { hi: 'गुब्बारा', en: 'Balloon', translit: 'Gubbaara', category: 'noun' },
      { hi: 'टोपी', en: 'Cap / Hat', translit: 'Topi', category: 'noun' },
      { hi: 'काटना', en: 'To cut', translit: 'Kaatna', category: 'verb' },
      { hi: 'बधाई देना', en: 'To congratulate / wish', translit: 'Badhaai dena', category: 'verb' },
      { hi: 'ताली बजाना', en: 'To clap', translit: 'Taali bajaana', category: 'verb' },
      { hi: 'सजाना', en: 'To decorate', translit: 'Sajaana', category: 'verb' },
      { hi: 'स्वादिष्ट', en: 'Delicious', translit: 'Swaadisht', category: 'adj' },
      { hi: 'रंग-बिरंगा', en: 'Colorful', translit: 'Rang-biranga', category: 'adj' },
      { hi: 'उत्साहित', en: 'Excited', translit: 'Utsaahit', category: 'adj' },
      { hi: 'के चारों ओर', en: 'Around', translit: 'Ke chaaron aur', category: 'position' },
      { hi: 'के पास', en: 'Near / Next to', translit: 'Ke paas', category: 'position' },
      { hi: 'साथ ही', en: 'Along with', translit: 'Saath hi', category: 'connector' }
    ],
    puzzles: [
      {
        step: 1,
        promptHi: 'वाक्य 1: यह चित्र किस उत्सव का है?',
        promptEn: 'Sentence 1: Describe the event (This picture is of a birthday party celebration)',
        correctWords: ['यह', 'चित्र', 'जन्मदिन', 'की', 'पार्टी', 'का', 'है।'],
        scrambledWords: [
          { hi: 'पार्टी', en: 'party' },
          { hi: 'यह', en: 'this' },
          { hi: 'की', en: 'of' },
          { hi: 'जन्मदिन', en: 'birthday' },
          { hi: 'चित्र', en: 'picture' },
          { hi: 'है।', en: 'is.' },
          { hi: 'का', en: 'of' }
        ],
        fullSentenceHi: 'यह चित्र जन्मदिन की पार्टी का है।',
        fullSentenceEn: 'This picture is of a birthday party.'
      },
      {
        step: 2,
        promptHi: 'वाक्य 2: कमरे की सजावट कैसी है?',
        promptEn: 'Sentence 2: Room decoration (The room is decorated with colorful balloons and buntings)',
        correctWords: ['कमरे', 'को', 'रंग-बिरंगे', 'गुब्बारों', 'और', 'झालरों', 'से', 'सजाया', 'गया', 'है।'],
        scrambledWords: [
          { hi: 'सजाया', en: 'decorated' },
          { hi: 'कमरे', en: 'room' },
          { hi: 'गुब्बारों', en: 'balloons' },
          { hi: 'से', en: 'with' },
          { hi: 'रंग-बिरंगे', en: 'colorful' },
          { hi: 'गया', en: 'been' },
          { hi: 'को', en: 'to' },
          { hi: 'झालरों', en: 'buntings' },
          { hi: 'और', en: 'and' },
          { hi: 'है।', en: 'is.' }
        ],
        fullSentenceHi: 'कमरे को रंग-बिरंगे गुब्बारों और झालरों से सजाया गया है।',
        fullSentenceEn: 'The room has been decorated with colorful balloons and buntings.'
      },
      {
        step: 3,
        promptHi: 'वाक्य 3: केक और मेज़',
        promptEn: 'Sentence 3: The cake (A delicious cake with candles is placed on the table)',
        correctWords: ['मेज़', 'पर', 'मोमबत्तियों', 'से', 'सजा', 'एक', 'सुंदर', 'केक', 'रखा', 'है।'],
        scrambledWords: [
          { hi: 'केक', en: 'cake' },
          { hi: 'मेज़', en: 'table' },
          { hi: 'सजा', en: 'decorated' },
          { hi: 'सुंदर', en: 'pretty' },
          { hi: 'पर', en: 'on' },
          { hi: 'मोमबत्तियों', en: 'candles' },
          { hi: 'एक', en: 'a' },
          { hi: 'से', en: 'with' },
          { hi: 'रखा', en: 'kept' },
          { hi: 'है।', en: 'is.' }
        ],
        fullSentenceHi: 'मेज़ पर मोमबत्तियों से सजा एक सुंदर केक रखा है।',
        fullSentenceEn: 'A beautiful cake decorated with candles is placed on the table.'
      },
      {
        step: 4,
        promptHi: 'वाक्य 4: मित्रों द्वारा बधाई व तालियाँ',
        promptEn: 'Sentence 4: Friends clapping and gifting (Friends are clapping and giving gifts to the boy)',
        correctWords: ['मित्र', 'ताली', 'बजाकर', 'जन्मदिन', 'की', 'बधाई', 'दे', 'रहे', 'हैं।'],
        scrambledWords: [
          { hi: 'बधाई', en: 'congratulations' },
          { hi: 'ताली', en: 'clapping' },
          { hi: 'मित्र', en: 'friends' },
          { hi: 'रहे', en: 'ing' },
          { hi: 'जन्मदिन', en: 'birthday' },
          { hi: 'बजाकर', en: 'beating' },
          { hi: 'दे', en: 'giving' },
          { hi: 'की', en: 'of' },
          { hi: 'हैं।', en: 'are.' }
        ],
        fullSentenceHi: 'मित्र ताली बजाकर जन्मदिन की बधाई दे रहे हैं।',
        fullSentenceEn: 'Friends are clapping and wishing a happy birthday.'
      },
      {
        step: 5,
        promptHi: 'वाक्य 5: खुशी का माहौल / निष्कर्ष',
        promptEn: 'Sentence 5: Conclusion (The entire house is filled with happiness and celebration)',
        correctWords: ['चारों', 'तरफ', 'हर्ष', 'और', 'उल्लास', 'का', 'माहौल', 'है।'],
        scrambledWords: [
          { hi: 'माहौल', en: 'atmosphere' },
          { hi: 'तरफ', en: 'side' },
          { hi: 'उल्लास', en: 'joy' },
          { hi: 'चारों', en: 'four' },
          { hi: 'हर्ष', en: 'delight' },
          { hi: 'है।', en: 'is.' },
          { hi: 'और', en: 'and' },
          { hi: 'का', en: 'of' }
        ],
        fullSentenceHi: 'चारों तरफ हर्ष और उल्लास का माहौल है।',
        fullSentenceEn: 'There is an atmosphere of joy and celebration all around.'
      }
    ],
    modelAnswer: {
      steps: [
        { num: 1, role: 'स्थान परिचय', hi: 'यह दृश्य एक घर में आयोजित जन्मदिन की पार्टी का है।', en: 'This scene is of a birthday party organized at a home.' },
        { num: 2, role: 'सजावट', hi: 'कमरे को रंग-बिरंगे गुब्बारों, झालरों और मोमबत्तियों से सजाया गया है।', en: 'The room is adorned with colorful balloons, buntings, and candles.' },
        { num: 3, role: 'मुख्य क्रिया', hi: 'मेज़ पर एक सुंदर केक रखा है जिसे जन्मदिन वाला बालक काटने जा रहा है।', en: 'A beautiful cake is kept on the table which the birthday boy is about to cut.' },
        { num: 4, role: 'मित्र व उपहार', hi: 'सभी मित्रों ने पार्टी टोपियाँ पहनी हैं और वे ताली बजाकर बधाई दे रहे हैं।', en: 'All the friends are wearing party hats and clapping to wish him.' },
        { num: 5, role: 'निष्कर्ष', hi: 'कमरे में बहुत सारे उपहार रखे हैं और चारों ओर खुशी का वातावरण है।', en: 'Many gifts are kept in the room and there is a joyous atmosphere all around.' }
      ],
      fullParagraphHi: 'यह दृश्य एक घर में आयोजित जन्मदिन की पार्टी का है। कमरे को सुंदर रंग-बिरंगे गुब्बारों और झालरों से बहुत आकर्षक सजाया गया है। बीच में रखी मेज़ पर मोमबत्तियों से सजा एक स्वादिष्ट केक रखा है। जन्मदिन वाले बालक ने सुंदर पार्टी टोपी पहनी है। उसके चारों ओर खड़े मित्र ताली बजाते हुए गीत गा रहे हैं। मेज़ के पास कई सुंदर उपहार रखे हुए हैं। सभी बच्चे अत्यंत प्रसन्न और प्रफुल्लित दिखाई दे रहे हैं।',
      fullParagraphEn: 'This scene depicts a birthday party organized at home. The room is attractively decorated with vibrant balloons and buntings. A delicious cake decorated with candles is placed on the table in the center. The birthday boy is wearing a lovely party hat. Friends standing around him are singing songs while clapping. Several beautiful gifts are kept near the table. All the children appear extremely joyful and cheerful.',
      tips: [
        'समारोह से जुड़े शब्दों (जैसे उपहार, बधाई, मोमबत्तियाँ, उल्लास) का सटीक प्रयोग करें।',
        'अतिशयोक्ति से बचें, चित्र में जो दिखाई दे रहा है उसी का वर्णन करें।'
      ]
    }
  },
  {
    id: 'village',
    realImage: 'images/scene_village_real.jpg',
    hotspotsReal: [{"id":1,"x":33,"y":40},{"id":2,"x":82,"y":46},{"id":3,"x":79,"y":72},{"id":4,"x":38,"y":68},{"id":5,"x":23,"y":72},{"id":6,"x":16,"y":30}],
    title: 'गाँव का प्रातःकाल',
    titleEn: 'A Village Morning Scene',
    subtitle: 'उगता सूरज, कच्चे घर, कुआँ, बैलगाड़ी और खेत',
    icon: '🌾',
    svg: `
      <svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyVillage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fdba74"/>
            <stop offset="40%" stop-color="#fef08a"/>
            <stop offset="100%" stop-color="#bfdbfe"/>
          </linearGradient>
          <linearGradient id="hutWall" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#d97706"/>
            <stop offset="100%" stop-color="#92400e"/>
          </linearGradient>
        </defs>
        <!-- Golden Morning Sky -->
        <rect width="800" height="260" fill="url(#skyVillage)" />
        <!-- Rising Sun between Hills -->
        <path d="M 0 220 Q 200 130 400 200 T 800 190 L 800 260 L 0 260 Z" fill="#4d7c0f" opacity="0.6" />
        <circle cx="340" cy="160" r="42" fill="#f59e0b" opacity="0.95" />
        <!-- Flying birds in V-formation -->
        <path d="M 280 80 q 8 -6 16 0 q 8 -6 16 0" stroke="#78350f" stroke-width="2" fill="none" />
        <path d="M 330 65 q 7 -5 14 0 q 7 -5 14 0" stroke="#78350f" stroke-width="2" fill="none" />
        <path d="M 370 85 q 6 -5 12 0 q 6 -5 12 0" stroke="#78350f" stroke-width="2" fill="none" />
        <!-- Ground / Field -->
        <rect y="240" width="800" height="240" fill="#ca8a04" opacity="0.85" />
        <!-- Mud Hut 1 (झोपड़ी) on left -->
        <rect x="80" y="230" width="140" height="110" fill="url(#hutWall)" rx="4" />
        <polygon points="60,230 150,150 240,230" fill="#78350f" stroke="#451a03" stroke-width="2" />
        <rect x="130" y="275" width="40" height="65" fill="#451a03" rx="3" />
        <!-- Neem / Banyan Tree -->
        <rect x="250" y="160" width="26" height="140" fill="#78350f" rx="4" />
        <circle cx="263" cy="130" r="55" fill="#15803d" />
        <circle cx="290" cy="115" r="45" fill="#16a34a" />
        <!-- Well (कुआँ) in middle-right -->
        <ellipse cx="480" cy="360" rx="45" ry="20" fill="#64748b" />
        <ellipse cx="480" cy="355" rx="36" ry="14" fill="#0284c7" />
        <line x1="450" y1="360" x2="450" y2="300" stroke="#475569" stroke-width="4" />
        <line x1="510" y1="360" x2="510" y2="300" stroke="#475569" stroke-width="4" />
        <line x1="440" y1="300" x2="520" y2="300" stroke="#475569" stroke-width="4" />
        <circle cx="480" cy="305" r="6" fill="#f59e0b" stroke="#b45309" stroke-width="2" /><!-- Pulley -->
        <!-- Woman with Pitcher (घड़ा) near well -->
        <circle cx="420" cy="320" r="12" fill="#fed7aa" />
        <path d="M 410 334 L 430 334 L 425 390 L 415 390 Z" fill="#dc2626" />
        <ellipse cx="420" cy="305" rx="8" ry="9" fill="#d97706" stroke="#92400e" stroke-width="1.5" /><!-- Earthen Pot -->
        <!-- Farmer going to fields with Bullocks (किसान व बैल) -->
        <circle cx="680" cy="325" r="13" fill="#fed7aa" />
        <polygon points="670,314 690,314 680,298" fill="#ffffff" /><!-- Turban -->
        <rect x="672" y="338" width="16" height="32" rx="3" fill="#2563eb" />
        <line x1="690" y1="335" x2="710" y2="315" stroke="#78350f" stroke-width="3" /><!-- Plough handle -->
        <!-- Bullocks / Cow (गाय/बैल) -->
        <ellipse cx="610" cy="355" rx="32" ry="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
        <circle cx="585" cy="345" r="12" fill="#f8fafc" />
        <line x1="595" y1="375" x2="595" y2="405" stroke="#94a3b8" stroke-width="4" />
        <line x1="625" y1="375" x2="625" y2="405" stroke="#94a3b8" stroke-width="4" />
      </svg>
    `,
    hotspots: [
      {
        id: 1,
        x: 43,
        y: 33,
        title: 'उगता सूरज (Rising Sun)',
        translit: 'Ugta Suraj',
        meaningEn: 'Rising Sun / Dawn',
        type: 'विशेषण + संज्ञा',
        sentenceHi: 'पहाड़ियों के पीछे से सुनहरा सूरज निकल रहा है।',
        sentenceEn: 'The golden sun is rising from behind the hills.'
      },
      {
        id: 2,
        x: 19,
        y: 53,
        title: 'मिट्टी की झोपड़ी (Mud Hut)',
        translit: 'Mitti ki Jhopdi',
        meaningEn: 'Thatched Mud Hut',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'गाँव में फूस की छत वाली कच्ची झोपड़ियाँ बनी हैं।',
        sentenceEn: 'Mud huts with thatched roofs are built in the village.'
      },
      {
        id: 3,
        x: 59,
        y: 74,
        title: 'गाँव का कुआँ (Village Well)',
        translit: 'Kuan',
        meaningEn: 'Village Water Well',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'महिलाएँ कुएँ से पीने का स्वच्छ पानी भर रही हैं।',
        sentenceEn: 'Women are drawing clean drinking water from the well.'
      },
      {
        id: 4,
        x: 84,
        y: 69,
        title: 'किसान (Farmer with Plough)',
        translit: 'Kisaan',
        meaningEn: 'Hardworking Farmer',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'किसान हल लेकर अपने खेतों की ओर जा रहा है।',
        sentenceEn: 'The farmer is heading towards his fields carrying a plough.'
      },
      {
        id: 5,
        x: 75,
        y: 77,
        title: 'बैल (Bullock / Cattle)',
        translit: 'Bail / Gaay',
        meaningEn: 'Bullock / Farm Animal',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'खेत जोतने के लिए किसान के साथ सफेद बैल चल रहा है।',
        sentenceEn: 'A white bullock is walking along with the farmer to plough the field.'
      },
      {
        id: 6,
        x: 41,
        y: 16,
        title: 'उड़ते पक्षी (Flying Birds)',
        translit: 'Udte Pakshi',
        meaningEn: 'Flock of Flying Birds',
        type: 'विशेषण + संज्ञा',
        sentenceHi: 'सुबह होते ही पक्षियों का झुंड चहचहाते हुए आसमान में उड़ रहा है।',
        sentenceEn: 'At dawn, a flock of birds is flying in the sky chirping.'
      }
    ],
    vocabulary: [
      { hi: 'प्रातःकाल / सवेरा', en: 'Morning / Dawn', translit: 'Praatahkaal / Saveraa', category: 'noun' },
      { hi: 'गाँव / ग्राम', en: 'Village', translit: 'Gaanv / Graam', category: 'noun' },
      { hi: 'किसान', en: 'Farmer', translit: 'Kisaan', category: 'noun' },
      { hi: 'हल', en: 'Plough', translit: 'Hal', category: 'noun' },
      { hi: 'कुआँ', en: 'Well', translit: 'Kuan', category: 'noun' },
      { hi: 'झोपड़ी', en: 'Hut', translit: 'Jhopdi', category: 'noun' },
      { hi: 'उगना', en: 'To rise / sprout', translit: 'Ugana', category: 'verb' },
      { hi: 'जोतना', en: 'To plough', translit: 'Jotna', category: 'verb' },
      { hi: 'पानी भरना', en: 'To fetch water', translit: 'Paani bharna', category: 'verb' },
      { hi: 'चहचहाना', en: 'To chirp', translit: 'Chahchahaana', category: 'verb' },
      { hi: 'सुनहरा', en: 'Golden', translit: 'Sunhara', category: 'adj' },
      { hi: 'परिश्रमी / मेहनती', en: 'Hardworking', translit: 'Parishrami / Mehnati', category: 'adj' },
      { hi: 'शांत व निर्मल', en: 'Peaceful & Pure', translit: 'Shaant va Nirmal', category: 'adj' },
      { hi: 'की ओर', en: 'Towards', translit: 'Ki aur', category: 'position' },
      { hi: 'के पीछे', en: 'Behind', translit: 'Ke peeche', category: 'position' },
      { hi: 'जबकि / वहीं', en: 'Whereas / Meanwhile', translit: 'Jabki / Waheen', category: 'connector' }
    ],
    puzzles: [
      {
        step: 1,
        promptHi: 'वाक्य 1: यह किस जगह का प्रातःकाल है?',
        promptEn: 'Sentence 1: Scene of village morning (This picture is of a village morning)',
        correctWords: ['यह', 'चित्र', 'भारतीय', 'गाँव', 'के', 'प्रातःकाल', 'का', 'है।'],
        scrambledWords: [
          { hi: 'गाँव', en: 'village' },
          { hi: 'यह', en: 'this' },
          { hi: 'का', en: 'of' },
          { hi: 'भारतीय', en: 'Indian' },
          { hi: 'चित्र', en: 'picture' },
          { hi: 'प्रातःकाल', en: 'morning' },
          { hi: 'के', en: 'of' },
          { hi: 'है।', en: 'is.' }
        ],
        fullSentenceHi: 'यह चित्र भारतीय गाँव के प्रातःकाल का है।',
        fullSentenceEn: 'This picture is of an Indian village morning.'
      },
      {
        step: 2,
        promptHi: 'वाक्य 2: सूर्योदय और प्रकृति',
        promptEn: 'Sentence 2: Sunrise (Golden sun is rising behind hills and birds are flying)',
        correctWords: ['पूरब', 'में', 'सुनहरा', 'सूरज', 'निकल', 'रहा', 'है।'],
        scrambledWords: [
          { hi: 'सूरज', en: 'sun' },
          { hi: 'पूरब', en: 'east' },
          { hi: 'रहा', en: 'ing' },
          { hi: 'में', en: 'in' },
          { hi: 'सुनहरा', en: 'golden' },
          { hi: 'है।', en: 'is.' },
          { hi: 'निकल', en: 'rising' }
        ],
        fullSentenceHi: 'पूरब में सुनहरा सूरज निकल रहा है।',
        fullSentenceEn: 'The golden sun is rising in the east.'
      },
      {
        step: 3,
        promptHi: 'वाक्य 3: किसान का खेत जाना',
        promptEn: 'Sentence 3: Farmer heading to fields (Farmer is going to his fields with bullocks)',
        correctWords: ['किसान', 'बैल', 'लेकर', 'खेतों', 'की', 'ओर', 'जा', 'रहा', 'है।'],
        scrambledWords: [
          { hi: 'खेतों', en: 'fields' },
          { hi: 'बैल', en: 'bull' },
          { hi: 'किसान', en: 'farmer' },
          { hi: 'जा', en: 'go' },
          { hi: 'ओर', en: 'towards' },
          { hi: 'की', en: 'of' },
          { hi: 'लेकर', en: 'taking' },
          { hi: 'रहा', en: 'ing' },
          { hi: 'है।', en: 'is.' }
        ],
        fullSentenceHi: 'किसान बैल लेकर खेतों की ओर जा रहा है।',
        fullSentenceEn: 'The farmer is heading towards the fields with bullocks.'
      },
      {
        step: 4,
        promptHi: 'वाक्य 4: कुएँ से पानी भरना',
        promptEn: 'Sentence 4: Women fetching water (A woman is drawing water from the well)',
        correctWords: ['एक', 'महिला', 'कुएँ', 'से', 'घड़े', 'में', 'पानी', 'भर', 'रही', 'है।'],
        scrambledWords: [
          { hi: 'घड़े', en: 'pot' },
          { hi: 'कुएँ', en: 'well' },
          { hi: 'महिला', en: 'woman' },
          { hi: 'में', en: 'in' },
          { hi: 'पानी', en: 'water' },
          { hi: 'एक', en: 'a' },
          { hi: 'से', en: 'from' },
          { hi: 'रही', en: 'ing' },
          { hi: 'भर', en: 'fill' },
          { hi: 'है।', en: 'is.' }
        ],
        fullSentenceHi: 'एक महिला कुएँ से घड़े में पानी भर रही है।',
        fullSentenceEn: 'A woman is fetching water in an earthen pot from the well.'
      },
      {
        step: 5,
        promptHi: 'वाक्य 5: गाँव का शांत वातावरण',
        promptEn: 'Sentence 5: Conclusion (The morning atmosphere of the village is calm and pollution-free)',
        correctWords: ['गाँव', 'का', 'वातावरण', 'अत्यंत', 'शांत', 'और', 'प्रदूषण-मुक्त', 'है।'],
        scrambledWords: [
          { hi: 'शांत', en: 'calm' },
          { hi: 'वातावरण', en: 'environment' },
          { hi: 'प्रदूषण-मुक्त', en: 'pollution-free' },
          { hi: 'गाँव', en: 'village' },
          { hi: 'है।', en: 'is.' },
          { hi: 'का', en: 'of' },
          { hi: 'अत्यंत', en: 'extremely' },
          { hi: 'और', en: 'and' }
        ],
        fullSentenceHi: 'गाँव का वातावरण अत्यंत शांत और प्रदूषण-मुक्त है।',
        fullSentenceEn: 'The village environment is very peaceful and pollution-free.'
      }
    ],
    modelAnswer: {
      steps: [
        { num: 1, role: 'स्थान परिचय', hi: 'यह चित्र एक भारतीय गाँव के सुंदर प्रातःकाल का है।', en: 'This picture depicts a beautiful morning in an Indian village.' },
        { num: 2, role: 'वातावरण', hi: 'पहाड़ों के पीछे से सूर्य उदय हो रहा है और आसमान में पक्षी उड़ रहे हैं।', en: 'The sun is rising from behind the mountains and birds are flying in the sky.' },
        { num: 3, role: 'किसान की क्रिया', hi: 'परिश्रमी किसान अपने बैलों के साथ खेतों में काम करने जा रहा है।', en: 'The hardworking farmer is heading to work in the fields with his bullocks.' },
        { num: 4, role: 'अन्य विवरण', hi: 'मिट्टी की झोपड़ियों के पास स्थित कुएँ से एक महिला घड़े में पानी भर रही है।', en: 'Near the mud huts, a woman is drawing water into a pitcher from the well.' },
        { num: 5, role: 'निष्कर्ष', hi: 'गाँव की सुबह बहुत ही शांत, स्वच्छ और प्राकृतिक सुंदरता से भरपूर है।', en: 'The morning in the village is very peaceful, clean, and full of natural beauty.' }
      ],
      fullParagraphHi: 'यह चित्र एक भारतीय गाँव के सुंदर प्रातःकाल का है। पहाड़ों के पीछे से लाल-सुनहरा सूरज उदय हो रहा है। खुले नीले आकाश में पक्षियों का झुंड चहचहाते हुए उड़ रहा है। गाँव में मिट्टी और घास-फूस की बनी झोपड़ियाँ दिखाई दे रही हैं। एक परिश्रमी किसान हल और बैल लेकर अपने खेत की ओर जा रहा है। कुएँ के पास एक ग्रामीण महिला घड़े में पानी भर रही है। गाँव का वातावरण प्रदूषण-मुक्त, शांत और मनमोहक है।',
      fullParagraphEn: 'This picture is of a beautiful morning in an Indian village. The reddish-golden sun is rising behind the mountains. A flock of chirping birds is flying in the open blue sky. Mud and thatched huts are visible in the village. A hardworking farmer is going towards his field with his plough and bullock. Near the well, a village woman is fetching water in an earthen pot. The village environment is pollution-free, tranquil, and enchanting.',
      tips: [
        'ग्रामीण परिवेश के शब्दों (जैसे हल, बैल, झोपड़ी, कुआँ, प्रातःकाल) का प्रयोग करें।',
        'प्रदूषण-मुक्त वातावरण और शांति की तुलना शहर से करने पर अतिरिक्त प्रभाव पड़ता है।'
      ]
    }
  },
  {
    id: 'zoo',
    realImage: 'images/scene_zoo_real.jpg',
    hotspotsReal: [{"id":1,"x":38,"y":41},{"id":2,"x":67,"y":35},{"id":3,"x":74,"y":47},{"id":4,"x":52,"y":68},{"id":5,"x":35,"y":70},{"id":6,"x":14,"y":48}],
    title: 'चिड़ियाघर की सैर',
    titleEn: 'A Visit to the Zoo',
    subtitle: 'जंगली जानवर, बाड़े, दर्शक, बंदर और जिराफ',
    icon: '🦁',
    svg: `
      <svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyZoo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#e0f2fe"/>
          </linearGradient>
        </defs>
        <!-- Sky -->
        <rect width="800" height="260" fill="url(#skyZoo)" />
        <!-- Trees in background -->
        <circle cx="80" cy="180" r="70" fill="#15803d" />
        <circle cx="720" cy="180" r="75" fill="#16a34a" />
        <!-- Zoo Ground -->
        <rect y="240" width="800" height="240" fill="#84cc16" />
        <!-- Pathway for Visitors -->
        <rect y="380" width="800" height="100" fill="#d97706" opacity="0.3" />
        <!-- Protective Fence (सुरक्षा बाड़ा) -->
        <g stroke="#334155" stroke-width="4">
          <line x1="100" y1="360" x2="700" y2="360" />
          <line x1="100" y1="380" x2="700" y2="380" />
          <line x1="120" y1="350" x2="120" y2="400" /><line x1="200" y1="350" x2="200" y2="400" />
          <line x1="280" y1="350" x2="280" y2="400" /><line x1="360" y1="350" x2="360" y2="400" />
          <line x1="440" y1="350" x2="440" y2="400" /><line x1="520" y1="350" x2="520" y2="400" />
          <line x1="600" y1="350" x2="600" y2="400" /><line x1="680" y1="350" x2="680" y2="400" />
        </g>
        <!-- Lion on rock (गुफा / चट्टान पर शेर) -->
        <polygon points="120,350 260,350 240,260 140,260" fill="#78716c" />
        <ellipse cx="190" cy="245" rx="35" ry="22" fill="#d97706" />
        <circle cx="160" cy="235" r="18" fill="#b45309" stroke="#78350f" stroke-width="6" /><!-- Mane -->
        <circle cx="160" cy="235" r="12" fill="#f59e0b" />
        <!-- Giraffe (जिराफ) on right -->
        <rect x="580" y="160" width="20" height="130" fill="#eab308" rx="4" />
        <ellipse cx="610" cy="290" rx="45" ry="26" fill="#eab308" />
        <ellipse cx="590" cy="150" rx="14" ry="10" fill="#eab308" />
        <circle cx="585" cy="200" r="4" fill="#854d0e" /><circle cx="595" cy="240" r="5" fill="#854d0e" />
        <circle cx="620" cy="285" r="6" fill="#854d0e" /><circle cx="640" cy="295" r="5" fill="#854d0e" />
        <line x1="585" y1="316" x2="585" y2="370" stroke="#ca8a04" stroke-width="6" />
        <line x1="635" y1="316" x2="635" y2="370" stroke="#ca8a04" stroke-width="6" />
        <!-- Monkey on Tree Branch (पेड़ पर बंदर) -->
        <ellipse cx="280" cy="180" rx="14" ry="18" fill="#78350f" />
        <circle cx="280" cy="160" r="10" fill="#a16207" />
        <path d="M 285 195 Q 310 210 300 230" stroke="#78350f" stroke-width="4" fill="none" /><!-- Tail -->
        <!-- Visitors (Family / Children) outside fence in bottom -->
        <circle cx="360" cy="415" r="13" fill="#fed7aa" />
        <rect x="350" y="428" width="20" height="35" rx="4" fill="#0284c7" />
        <circle cx="410" cy="425" r="11" fill="#fed7aa" />
        <rect x="402" y="436" width="16" height="30" rx="3" fill="#ec4899" />
        <!-- Signboard (चिड़ियाघर सूचना पट्ट) -->
        <rect x="40" y="270" width="70" height="35" rx="3" fill="#f8fafc" stroke="#334155" stroke-width="2" />
        <text x="75" y="292" font-family="'Outfit', sans-serif" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">ZOO PARK</text>
        <line x1="75" y1="305" x2="75" y2="350" stroke="#334155" stroke-width="4" />
      </svg>
    `,
    hotspots: [
      {
        id: 1,
        x: 24,
        y: 50,
        title: 'जंगल का राजा शेर (Lion on Rock)',
        translit: 'Jungle ka Raja Sher',
        meaningEn: 'Lion on the Rock',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'चट्टान पर बैठा शेर दहाड़ रहा है और सबका ध्यान खींच रहा है।',
        sentenceEn: 'The lion sitting on the rock is roaring and attracting attention.'
      },
      {
        id: 2,
        x: 77,
        y: 45,
        title: 'लंबी गर्दन वाला जिराफ (Giraffe)',
        translit: 'Lambi Gardan waala Giraffe',
        meaningEn: 'Tall Long-necked Giraffe',
        type: 'विशेषण + संज्ञा',
        sentenceHi: 'जिराफ अपनी लंबी गर्दन से पेड़ के ऊँचे पत्ते खा रहा है।',
        sentenceEn: 'The giraffe is eating high leaves of the tree with its long neck.'
      },
      {
        id: 3,
        x: 35,
        y: 38,
        title: 'नटखट बंदर (Naughty Monkey)',
        translit: 'Natkhat Bandar',
        meaningEn: 'Playful Monkey',
        type: 'विशेषण + संज्ञा',
        sentenceHi: 'पेड़ की डाल पर बैठा बंदर उछल-कूद कर रहा है।',
        sentenceEn: 'The monkey sitting on the tree branch is hopping around.'
      },
      {
        id: 4,
        x: 48,
        y: 89,
        title: 'दर्शक व बच्चे (Visitors & Kids)',
        translit: 'Darshak va Bachhe',
        meaningEn: 'Visitors and Children',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'बच्चे अपने माता-पिता के साथ जानवरों को देखकर खुश हो रहे हैं।',
        sentenceEn: 'Children are overjoyed seeing the animals with their parents.'
      },
      {
        id: 5,
        x: 50,
        y: 76,
        title: 'सुरक्षा बाड़ा (Safety Fence)',
        translit: 'Suraksha Baada',
        meaningEn: 'Protective Railing / Fence',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'जानवरों और दर्शकों की सुरक्षा के लिए लोहे का बाड़ा बना है।',
        sentenceEn: 'An iron fence is built for the safety of animals and visitors.'
      },
      {
        id: 6,
        x: 9,
        y: 63,
        title: 'सूचना पट्ट (Signboard)',
        translit: 'Soochna Patt',
        meaningEn: 'Zoo Information Board',
        type: 'संज्ञा (Noun)',
        sentenceHi: 'रास्ते के किनारे जानवरों के नाम वाला बोर्ड लगा है।',
        sentenceEn: 'A board with animals names is placed along the walkway.'
      }
    ],
    vocabulary: [
      { hi: 'चिड़ियाघर', en: 'Zoo', translit: 'Chidiyaaghar', category: 'noun' },
      { hi: 'शेर / सिंह', en: 'Lion', translit: 'Sher / Singh', category: 'noun' },
      { hi: 'जिराफ', en: 'Giraffe', translit: 'Giraffe', category: 'noun' },
      { hi: 'बंदर', en: 'Monkey', translit: 'Bandar', category: 'noun' },
      { hi: 'बाड़ा / पिंजरा', en: 'Enclosure / Cage', translit: 'Baada / Pinjra', category: 'noun' },
      { hi: 'दर्शक', en: 'Spectators / Visitors', translit: 'Darshak', category: 'noun' },
      { hi: 'दहाड़ना', en: 'To roar', translit: 'Dahaadna', category: 'verb' },
      { hi: 'उछल-कूद करना', en: 'To hop / jump around', translit: 'Uchhal-kood karna', category: 'verb' },
      { hi: 'देखना', en: 'To watch / observe', translit: 'Dekhna', category: 'verb' },
      { hi: 'सैर करना', en: 'To tour / visit', translit: 'Sair karna', category: 'verb' },
      { hi: 'जंगली', en: 'Wild', translit: 'Jangli', category: 'adj' },
      { hi: 'विशालकाय', en: 'Gigantic', translit: 'Vishaal-kaay', category: 'adj' },
      { hi: 'रोमांचक', en: 'Thrilling / Exciting', translit: 'Romaanchak', category: 'adj' },
      { hi: 'के अंदर', en: 'Inside', translit: 'Ke andar', category: 'position' },
      { hi: 'के बाहर', en: 'Outside', translit: 'Ke baahar', category: 'position' },
      { hi: 'जिससे कि', en: 'So that', translit: 'Jisse ki', category: 'connector' }
    ],
    puzzles: [
      {
        step: 1,
        promptHi: 'वाक्य 1: यह किस जगह का दृश्य है?',
        promptEn: 'Sentence 1: Zoo scene (This picture shows a scene of a visit to the zoo)',
        correctWords: ['यह', 'चित्र', 'चिड़ियाघर', 'की', 'सैर', 'का', 'है।'],
        scrambledWords: [
          { hi: 'सैर', en: 'tour' },
          { hi: 'यह', en: 'this' },
          { hi: 'की', en: 'of' },
          { hi: 'चित्र', en: 'picture' },
          { hi: 'है।', en: 'is.' },
          { hi: 'चिड़ियाघर', en: 'zoo' },
          { hi: 'का', en: 'of' }
        ],
        fullSentenceHi: 'यह चित्र चिड़ियाघर की सैर का है।',
        fullSentenceEn: 'This picture is of a visit to the zoo.'
      },
      {
        step: 2,
        promptHi: 'वाक्य 2: यहाँ कौन-कौन से जानवर हैं?',
        promptEn: 'Sentence 2: Variety of animals (There are different wild animals in the zoo)',
        correctWords: ['यहाँ', 'कई', 'तरह', 'के', 'जंगली', 'जानवर', 'दिखाई', 'दे', 'रहे', 'हैं।'],
        scrambledWords: [
          { hi: 'जानवर', en: 'animals' },
          { hi: 'यहाँ', en: 'here' },
          { hi: 'रहे', en: 'ing' },
          { hi: 'जंगली', en: 'wild' },
          { hi: 'दिखाई', en: 'visible' },
          { hi: 'हैं।', en: 'are.' },
          { hi: 'तरह', en: 'types' },
          { hi: 'दे', en: 'give' },
          { hi: 'कई', en: 'many' },
          { hi: 'के', en: 'of' }
        ],
        fullSentenceHi: 'यहाँ कई तरह के जंगली जानवर दिखाई दे रहे हैं।',
        fullSentenceEn: 'Several kinds of wild animals are visible here.'
      },
      {
        step: 3,
        promptHi: 'वाक्य 3: शेर और जिराफ की गतिविधि',
        promptEn: 'Sentence 3: Actions of lion and giraffe (The lion is sitting on rock and giraffe is eating leaves)',
        correctWords: ['शेर', 'चट्टान', 'पर', 'बैठा', 'है', 'और', 'जिराफ', 'पत्ते', 'खा', 'रहा', 'है।'],
        scrambledWords: [
          { hi: 'बैठा', en: 'sitting' },
          { hi: 'शेर', en: 'lion' },
          { hi: 'पत्ते', en: 'leaves' },
          { hi: 'जिराफ', en: 'giraffe' },
          { hi: 'पर', en: 'on' },
          { hi: 'है', en: 'is' },
          { hi: 'खा', en: 'eating' },
          { hi: 'चट्टान', en: 'rock' },
          { hi: 'और', en: 'and' },
          { hi: 'रहा', en: 'ing' },
          { hi: 'है।', en: 'is.' }
        ],
        fullSentenceHi: 'शेर चट्टान पर बैठा है और जिराफ पत्ते खा रहा है।',
        fullSentenceEn: 'The lion is sitting on the rock and the giraffe is eating leaves.'
      },
      {
        step: 4,
        promptHi: 'वाक्य 4: दर्शकों और बच्चों का कौतूहल',
        promptEn: 'Sentence 4: Children observing (Children are watching the animals with wonder)',
        correctWords: ['बच्चे', 'हैरानी', 'और', 'खुशी', 'से', 'जानवरों', 'को', 'देख', 'रहे', 'हैं।'],
        scrambledWords: [
          { hi: 'जानवरों', en: 'animals' },
          { hi: 'बच्चे', en: 'children' },
          { hi: 'देख', en: 'watch' },
          { hi: 'हैरानी', en: 'wonder' },
          { hi: 'को', en: 'to' },
          { hi: 'रहे', en: 'ing' },
          { hi: 'खुशी', en: 'joy' },
          { hi: 'से', en: 'with' },
          { hi: 'और', en: 'and' },
          { hi: 'हैं।', en: 'are.' }
        ],
        fullSentenceHi: 'बच्चे हैरानी और खुशी से जानवरों को देख रहे हैं।',
        fullSentenceEn: 'Children are watching the animals with wonder and happiness.'
      },
      {
        step: 5,
        promptHi: 'वाक्य 5: चिड़ियाघर की सैर का अनुभव',
        promptEn: 'Sentence 5: Conclusion (A visit to the zoo is educational and full of thrills)',
        correctWords: ['चिड़ियाघर', 'की', 'सैर', 'ज्ञानवर्धक', 'और', 'रोमांचक', 'होती', 'है।'],
        scrambledWords: [
          { hi: 'ज्ञानवर्धक', en: 'educational' },
          { hi: 'सैर', en: 'tour' },
          { hi: 'रोमांचक', en: 'thrilling' },
          { hi: 'चिड़ियाघर', en: 'zoo' },
          { hi: 'है।', en: 'is.' },
          { hi: 'होती', en: 'happens' },
          { hi: 'की', en: 'of' },
          { hi: 'और', en: 'and' }
        ],
        fullSentenceHi: 'चिड़ियाघर की सैर ज्ञानवर्धक और रोमांचक होती है।',
        fullSentenceEn: 'A visit to the zoo is informative and thrilling.'
      }
    ],
    modelAnswer: {
      steps: [
        { num: 1, role: 'स्थान परिचय', hi: 'यह दृश्य एक बड़े और सुंदर चिड़ियाघर का है।', en: 'This scene is of a large and beautiful zoo.' },
        { num: 2, role: 'वातावरण व व्यवस्था', hi: 'जानवरों के लिए सुरक्षित बाड़े बने हैं तथा चारों ओर हरियाली है।', en: 'Safe enclosures are built for animals and there is greenery all around.' },
        { num: 3, role: 'जानवरों की हरकतें', hi: 'चट्टान पर बैठा शेर दहाड़ रहा है तथा लंबी गर्दन वाला जिराफ पत्ते खा रहा है।', en: 'The lion sitting on the rock is roaring and the tall-necked giraffe is eating leaves.' },
        { num: 4, role: 'दर्शकों का व्यवहार', hi: 'कई लोग और छोटे बच्चे रेलिंग के बाहर खड़े होकर जानवरों को निहार रहे हैं।', en: 'Many people and small kids are standing outside the railing watching the animals.' },
        { num: 5, role: 'निष्कर्ष', hi: 'चिड़ियाघर में घूमना बच्चों के लिए अत्यंत ज्ञानवर्धक और आनंददायक होता है।', en: 'Touring a zoo is very educational and enjoyable for children.' }
      ],
      fullParagraphHi: 'यह दृश्य एक बड़े और प्रसिद्ध चिड़ियाघर का है। यहाँ तरह-तरह के जंगली जीव-जंतुओं के लिए खुले और सुरक्षित बाड़े बनाए गए हैं। एक ऊँची चट्टान पर बैठा शेर बड़े गर्व से बैठा है। पास ही एक लंबी गर्दन वाला जिराफ पेड़ की ऊँची टहनियों से हरी पत्तियाँ खा रहा है। पेड़ की शाखा पर बैठा बंदर उछल-कूद कर रहा है। बाड़े के बाहर खड़े दर्शक व बच्चे इन जीवों को देखकर बेहद रोमांचित और प्रसन्न हैं। चिड़ियाघर की सैर बच्चों के लिए ज्ञानवर्धक और मनोरंजक दोनों है।',
      fullParagraphEn: 'This scene depicts a large and famous zoo. Spacious and secure enclosures have been made here for a variety of wild creatures. A lion is sitting proudly on a high rock. Nearby, a long-necked giraffe is nibbling green leaves from tall tree branches. A monkey is playfully hopping on a tree branch. Visitors and children standing outside the fence are thrilled and overjoyed seeing these animals. A visit to the zoo is both educational and entertaining for kids.',
      tips: [
        'जानवरों के नाम और उनकी विशेषताओं (जैसे लंबी गर्दन, भारी शरीर, दहाड़ना) को जोड़कर वाक्य बनाएं।',
        'चिड़ियाघर के नियमों (जैसे जानवरों को न छेड़ना) का भी एक वाक्य में उल्लेख कर सकते हैं।'
      ]
    }
  }
];

// ============================================
// VAKYANSH DATA (वाक्यांश के लिए एक शब्द — 12 शब्द)
// ============================================
const VAKYANSH_DATA = [
  {
    id: 1,
    phraseHi: 'जो कभी न मरे',
    phraseEn: 'One who never dies / Immortal',
    wordHi: 'अमर',
    wordEn: 'Immortal',
    translit: 'Amar',
    category: 'nature',
    formula: 'अ (नहीं / बिना) + मर (मरना) = अमर (जो न मरे)',
    clue: 'देवलोक के देवता और देश के लिए प्राण न्योछावर करने वाले वीर हमेशा के लिए अमर कहलाते हैं।',
    exampleHi: 'शहीद भगत सिंह देश के लिए अपना सर्वोच्च बलिदान देकर अमर हो गए।',
    exampleEn: 'Martyr Bhagat Singh became immortal by sacrificing his life for the nation.',
    oppositeHi: 'नश्वर / मर्त्य (Mortal)',
    oppositeEn: 'Mortal'
  },
  {
    id: 2,
    phraseHi: 'जो दूसरों की भलाई करते हैं',
    phraseEn: 'One who does good to others / Benevolent',
    wordHi: 'परोपकारी',
    wordEn: 'Benevolent / Altruistic',
    translit: 'Paropkaari',
    category: 'behavior',
    formula: 'पर (दूसरा) + उपकार (भलाई) = परोपकार करने वाला',
    clue: 'प्रकृति सबसे बड़ी परोपकारी है—पेड़ अपने फल और नदियाँ अपना जल दूसरों की भलाई के लिए देती हैं।',
    exampleHi: 'परोपकारी मनुष्य सदैव असहाय और निर्धन लोगों की सेवा में लगा रहता है।',
    exampleEn: 'A benevolent person is always engaged in helping helpless and poor people.',
    oppositeHi: 'स्वार्थी (Selfish)',
    oppositeEn: 'Selfish'
  },
  {
    id: 3,
    phraseHi: 'जो कम बोलता है',
    phraseEn: 'One who speaks very little / Reserved',
    wordHi: 'मितभाषी',
    wordEn: 'Soft-spoken / Reserved',
    translit: 'Mitbhaashi',
    category: 'behavior',
    formula: 'मित (कम / नपा-तुला) + भाषी (बोलने वाला) = मितभाषी',
    clue: "'मित' का अर्थ होता है कम। मितभाषी व्यर्थ बातें नहीं करता, पर जो बोलता है वह बहुत ज्ञानवर्धक होता है।",
    exampleHi: 'रोहन बहुत शांत और मितभाषी बालक है, वह केवल आवश्यकता पड़ने पर ही बोलता है।',
    exampleEn: 'Rohan is a very calm and reserved boy, he speaks only when necessary.',
    oppositeHi: 'वाचाल (Talkative)',
    oppositeEn: 'Talkative'
  },
  {
    id: 4,
    phraseHi: 'जो अधिक बोलता है',
    phraseEn: 'One who talks excessively / Talkative',
    wordHi: 'वाचाल',
    wordEn: 'Talkative / Loquacious',
    translit: 'Vaachaal',
    category: 'behavior',
    formula: 'वाच् (वाणी / बोलना) → वाचाल (बहुत ज़्यादा बोलने वाला / बड़बोला)',
    clue: 'जो बिना रुके लगातार बोलता ही रहे—यह मितभाषी का ठीक विलोम (उल्टा) शब्द है।',
    exampleHi: 'कक्षा में शिक्षक के पढ़ाते समय वाचाल नहीं बनना चाहिए, बल्कि ध्यान से सुनना चाहिए।',
    exampleEn: 'One should not be talkative while the teacher is teaching in class.',
    oppositeHi: 'मितभाषी (Soft-spoken)',
    oppositeEn: 'Soft-spoken'
  },
  {
    id: 5,
    phraseHi: 'जो सत्य बोलता है',
    phraseEn: 'One who always speaks the truth / Truthful',
    wordHi: 'सत्यवादी',
    wordEn: 'Truthful',
    translit: 'Satyavaadi',
    category: 'behavior',
    formula: 'सत्य (सच) + वादी (कहने वाला / बोलने वाला) = सत्यवादी',
    clue: 'महाराजा हरिश्चंद्र और राष्ट्रपिता महात्मा गांधी ने आजीवन सत्य बोला, इसलिए वे सत्यवादी कहलाए।',
    exampleHi: 'सत्यवादी मनुष्य का समाज में हमेशा मान-सम्मान और आदर होता है।',
    exampleEn: 'A truthful person is always respected and honored in society.',
    oppositeHi: 'झूठा / असत्यवादी (Liar)',
    oppositeEn: 'Liar'
  },
  {
    id: 6,
    phraseHi: 'जो ईश्वर में विश्वास रखता है',
    phraseEn: 'One who believes in God / Theist',
    wordHi: 'आस्तिक',
    wordEn: 'Theist / Believer',
    translit: 'Aastik',
    category: 'behavior',
    formula: 'अस्ति (है — ईश्वर का अस्तित्व है) मानने वाला = आस्तिक',
    clue: 'जो मानता है कि परमात्मा की सत्ता है = आस्तिक। (जो ईश्वर को नहीं मानता = नास्तिक)',
    exampleHi: 'दादीजी प्रतिदिन ईश्वर की आराधना और पूजा करती हैं, वे बहुत आस्तिक हैं।',
    exampleEn: 'Grandmother worships God everyday, she is a devout believer.',
    oppositeHi: 'नास्तिक (Atheist)',
    oppositeEn: 'Atheist'
  },
  {
    id: 7,
    phraseHi: 'जो पढ़ा-लिखा न हो',
    phraseEn: 'One who cannot read or write / Illiterate',
    wordHi: 'अनपढ़',
    wordEn: 'Illiterate',
    translit: 'Anpadh',
    category: 'action',
    formula: 'अन् (बिना / रहित) + पढ़ (पढ़ा हुआ) = जिसे अक्षरों व पुस्तकों का ज्ञान न हो',
    clue: 'जिसने कभी विद्यालय जाकर पढ़ाई न की हो। (इसका विलोम साक्षर या पढ़ा-लिखा होता है)',
    exampleHi: 'सरकार अनपढ़ लोगों को साक्षर बनाने के लिए प्रौढ़ शिक्षा केंद्र चला रही है।',
    exampleEn: 'The government is running adult education centers to make illiterate people literate.',
    oppositeHi: 'पढ़ा-लिखा / साक्षर (Literate)',
    oppositeEn: 'Literate'
  },
  {
    id: 8,
    phraseHi: 'जो कठिन परिश्रम करता है',
    phraseEn: 'One who works very hard / Hardworking',
    wordHi: 'परिश्रमी',
    wordEn: 'Hardworking / Diligent',
    translit: 'Parishrami',
    category: 'action',
    formula: 'परिश्रम (मेहनत) + ई (करने वाला) = परिश्रमी (मेहनती)',
    clue: 'चींटी दिन-रात दाना जुटाती है, किसान कड़ी धूप में खेत जोतता है—वे अत्यंत परिश्रमी जीव हैं।',
    exampleHi: 'परिश्रमी छात्र अपनी लगन और कठिन मेहनत से परीक्षा में सदा प्रथम आते हैं।',
    exampleEn: 'Hardworking students always top the examinations through dedication and effort.',
    oppositeHi: 'आलसी / कामचोर (Lazy)',
    oppositeEn: 'Lazy'
  },
  {
    id: 9,
    phraseHi: 'जो क्षमा करने योग्य हो',
    phraseEn: 'That which can be forgiven / Pardonable',
    wordHi: 'क्षम्य',
    wordEn: 'Pardonable / Forgivable',
    translit: 'Kshamya',
    category: 'behavior',
    formula: 'क्षमा (माफी) + य (योग्य) = क्षम्य (माफ करने लायक)',
    clue: 'अनजाने में हुई छोटी-मोटी भूल क्षमा करने योग्य यानी क्षम्य होती है। (उल्टा: अक्षम्य)',
    exampleHi: 'रवि ने अपनी गलती स्वीकार कर ली, इसलिए उसकी भूल क्षम्य मानी गई।',
    exampleEn: 'Ravi admitted his mistake, so his error was considered pardonable.',
    oppositeHi: 'अक्षम्य (Unpardonable)',
    oppositeEn: 'Unpardonable'
  },
  {
    id: 10,
    phraseHi: 'जो आसानी से प्राप्त हो जाए',
    phraseEn: 'That which is easily available / Accessible',
    wordHi: 'सुलभ',
    wordEn: 'Easily Available / Accessible',
    translit: 'Sulabh',
    category: 'nature',
    formula: 'सु (सरल / आसान) + लभ (प्राप्त होना) = सुलभ',
    clue: 'जो चीज़ बिना ज्यादा भागदौड़ या कठिनाई के मिल जाए। (दुर् + लभ = दुर्लभ, जो मुश्किल से मिले)',
    exampleHi: 'प्रातःकाल बगीचे में ताज़ी और शुद्ध हवा सुलभ रूप से उपलब्ध होती है।',
    exampleEn: 'Fresh and clean air is easily available in the garden in the morning.',
    oppositeHi: 'दुर्लभ (Rare / Hard to find)',
    oppositeEn: 'Rare'
  },
  {
    id: 11,
    phraseHi: 'जो बहुत धन खर्च करता है',
    phraseEn: 'One who spends money lavishly / Spendthrift',
    wordHi: 'अपव्ययी',
    wordEn: 'Spendthrift / Extravagant',
    translit: 'Apavyayi',
    category: 'action',
    formula: 'अप (अनुचित / बुरा / व्यर्थ) + व्यय (खर्च) करने वाला = अपव्ययी',
    clue: 'जो बिना सोचे-समझे फ़िज़ूलखर्ची में पैसे उड़ाता है। (मितव्ययी = सोच-समझकर बचत करने वाला)',
    exampleHi: 'अपव्ययी व्यक्ति धन का महत्व नहीं समझता और संकट के समय परेशान होता है।',
    exampleEn: 'A spendthrift person does not realize the value of money and suffers during crises.',
    oppositeHi: 'मितव्ययी (Frugal / Economical)',
    oppositeEn: 'Frugal'
  },
  {
    id: 12,
    phraseHi: 'जो दूसरों से ईर्ष्या करता है',
    phraseEn: 'One who is jealous of others / Envious',
    wordHi: 'ईर्ष्यालु',
    wordEn: 'Envious / Jealous',
    translit: 'Eershyaalu',
    category: 'behavior',
    formula: 'ईर्ष्या (जलन) + आलु (स्वभाव रखने वाला) = ईर्ष्यालु',
    clue: 'जो दूसरों की सफलता, तरक्की या खुशी देखकर मन ही मन जलता है।',
    exampleHi: 'हमें किसी की तरक्की देखकर ईर्ष्यालु नहीं होना चाहिए, बल्कि स्वयं मेहनत करनी चाहिए।',
    exampleEn: 'We should not feel envious seeing someone\'s progress, but rather work hard ourselves.',
    oppositeHi: 'उदार / सहृदय (Generous / Broad-minded)',
    oppositeEn: 'Generous'
  }
];

// Practice Quiz Questions Pool for Vakyansh
const VAKYANSH_QUIZ_POOL = [
  {
    qHi: '‘जो कभी न मरे’, उसके लिए एक शब्द क्या होगा?',
    qEn: 'What is the one word for "One who never dies"?',
    options: ['अमर', 'परोपकारी', 'सत्यवादी', 'सुलभ'],
    correct: 0,
    exp: '‘अमर’ का अर्थ है जो कभी न मरे (अ + मर)। ‘परोपकारी’ दूसरों की भलाई करने वाला होता है और ‘सत्यवादी’ सच बोलने वाला।'
  },
  {
    qHi: '‘जो दूसरों की भलाई करते हैं’, उन्हें क्या कहा जाता है?',
    qEn: 'What are those called who do good to others?',
    options: ['स्वार्थी', 'परोपकारी', 'मितभाषी', 'अनपढ़'],
    correct: 1,
    exp: '‘पर (दूसरा) + उपकार (भलाई)’ करने वाला ‘परोपकारी’ कहलाता है। ‘स्वार्थी’ केवल अपना भला सोचता है।'
  },
  {
    qHi: '‘जो कम बोलता है’, उसके लिए सबसे सही शब्द चुनिए:',
    qEn: 'Choose the most appropriate word for "One who speaks very little":',
    options: ['वाचाल', 'मितभाषी', 'परिश्रमी', 'ईर्ष्यालु'],
    correct: 1,
    exp: '‘मित (कम) + भाषी (बोलने वाला)’ = ‘मितभाषी’। इसके विपरीत जो बहुत अधिक बोलता है उसे ‘वाचाल’ कहते हैं।'
  },
  {
    qHi: '‘वाचाल’ शब्द का सही अर्थ क्या है?',
    qEn: 'What is the correct meaning of the word "Vaachaal"?',
    options: ['जो अधिक बोलता है', 'जो सच बोलता है', 'जो कम बोलता है', 'जो पढ़ा-लिखा न हो'],
    correct: 0,
    exp: '‘वाचाल’ का अर्थ है जो बहुत अधिक बोलता हो (बड़बोला)। कम बोलने वाले को ‘मितभाषी’ कहा जाता है।'
  },
  {
    qHi: '‘सदा सत्य बोलने वाले’ व्यक्ति को क्या कहते हैं?',
    qEn: 'What is a person who always speaks the truth called?',
    options: ['सत्यवादी', 'आस्तिक', 'अमर', 'अपव्ययी'],
    correct: 0,
    exp: '‘सत्य (सच) + वादी (कहने वाला)’ = ‘सत्यवादी’। जैसे राजा हरिश्चंद्र और महात्मा गांधी सत्यवादी थे।'
  },
  {
    qHi: '‘जो ईश्वर में विश्वास रखता है’, उसे क्या कहा जाता है?',
    qEn: 'What is one who believes in God called?',
    options: ['नास्तिक', 'आस्तिक', 'परोपकारी', 'अनपढ़'],
    correct: 1,
    exp: 'जो ईश्वर की सत्ता मानता है उसे ‘आस्तिक’ कहते हैं। जो ईश्वर में विश्वास नहीं रखता उसे ‘नास्तिक’ कहते हैं।'
  },
  {
    qHi: '‘जो पढ़ा-लिखा न हो’, उसके लिए एक शब्द है:',
    qEn: 'One word for "One who cannot read or write":',
    options: ['साक्षर', 'अनपढ़', 'विद्वान', 'वाचाल'],
    correct: 1,
    exp: '‘अन् (बिना) + पढ़ (पढ़ा हुआ)’ = ‘अनपढ़’। पढ़े-लिखे व्यक्ति को ‘साक्षर’ कहा जाता है।'
  },
  {
    qHi: '‘जो कठिन परिश्रम करता है’, उसे क्या कहते हैं?',
    qEn: 'What is one who works very hard called?',
    options: ['परिश्रमी', 'आलसी', 'अपव्ययी', 'सुलभ'],
    correct: 0,
    exp: '‘परिश्रम (कड़ी मेहनत)’ करने वाले को ‘परिश्रमी’ कहते हैं। जो काम से जी चुराए उसे ‘आलसी’ कहते हैं।'
  },
  {
    qHi: '‘जो क्षमा करने योग्य हो’, उसके लिए एक शब्द क्या होगा?',
    qEn: 'What is the word for "That which can be forgiven"?',
    options: ['अक्षम्य', 'क्षम्य', 'ईर्ष्यालु', 'मितभाषी'],
    correct: 1,
    exp: '‘क्षमा + य (योग्य)’ = ‘क्षम्य’। जिस भूल को क्षमा न किया जा सके उसे ‘अक्षम्य’ कहते हैं।'
  },
  {
    qHi: '‘जो वस्तु आसानी से प्राप्त हो जाए’, उसे क्या कहते हैं?',
    qEn: 'What is that which is easily available called?',
    options: ['दुर्लभ', 'सुलभ', 'अमर', 'परोपकारी'],
    correct: 1,
    exp: '‘सु (सरल) + लभ (मिलना)’ = ‘सुलभ’। जो कठिनाई से मिले उसे ‘दुर्लभ’ कहते हैं।'
  },
  {
    qHi: '‘जो बहुत धन व्यर्थ खर्च करता है’, उसे क्या कहते हैं?',
    qEn: 'What is one who spends money lavishly called?',
    options: ['मितव्ययी', 'अपव्ययी', 'परिश्रमी', 'सत्यवादी'],
    correct: 1,
    exp: '‘अप (बुरा/व्यर्थ) + व्ययी (खर्च करने वाला)’ = ‘अपव्ययी’। जो सोच-समझकर बचत करता है उसे ‘मितव्ययी’ कहते हैं।'
  },
  {
    qHi: '‘जो दूसरों से ईर्ष्या या जलन करता है’, उसे कहते हैं:',
    qEn: 'What is one who is jealous of others called?',
    options: ['ईर्ष्यालु', 'परोपकारी', 'आस्तिक', 'सुलभ'],
    correct: 0,
    exp: '‘ईर्ष्या (जलन) + आलु’ = ‘ईर्ष्यालु’। जो दूसरों का भला चाहे वह ‘परोपकारी’ होता है।'
  }
];

// ============================================
// SANGYA (संज्ञा व 5 भेद) — DATA CONSTANTS
// ============================================
const SANGYA_TYPES_DATA = [
  {
    id: 'proper',
    num: 1,
    nameHi: 'व्यक्तिवाचक संज्ञा',
    nameEn: 'Proper Noun',
    icon: '👑',
    themeClass: 'card-proper',
    defHi: 'जिस संज्ञा शब्द से किसी <strong>विशेष व्यक्ति, विशेष स्थान या विशेष वस्तु</strong> के नाम का बोध होता है, उसे व्यक्तिवाचक संज्ञा कहते हैं।',
    defEn: 'A Proper Noun is the specific name of a particular person, place, or thing.',
    clueHi: 'यह संसार में अपने प्रकार का <strong>केवल एक (Unique)</strong> होता है। इसका सामान्यतः बहुवचन नहीं बनता।',
    clueEn: 'Refers to a single unique entity. Generally cannot be pluralized.',
    examples: ['भारत', 'गंगा', 'हिमालय', 'महात्मा गांधी', 'रामायण', 'दिल्ली', 'सोमवार', 'ताजमहल'],
    trapHi: '⚠️ <strong>परीक्षा सावधानी:</strong> ‘नदी’ जातिवाचक है, किंतु ‘गंगा’ व्यक्तिवाचक है। ‘पुस्तक’ जातिवाचक है, किंतु ‘रामायण’ व्यक्तिवाचक है।',
    trapEn: "'River' is a Common Noun, but 'Ganga' is a Proper Noun."
  },
  {
    id: 'common',
    num: 2,
    nameHi: 'जातिवाचक संज्ञा',
    nameEn: 'Common Noun',
    icon: '🌳',
    themeClass: 'card-common',
    defHi: 'जिस संज्ञा शब्द से किसी <strong>संपूर्ण जाति, वर्ग या श्रेणी</strong> के सभी प्राणियों, स्थानों या वस्तुओं का बोध होता है, उसे जातिवाचक संज्ञा कहते हैं।',
    defEn: 'A Common Noun represents the entire class or category of persons, animals, places, or things.',
    clueHi: 'यह एक पूरी जाति को दर्शाता है। इसका <strong>बहुवचन आसानी से बन सकता है</strong> (जैसे: नदी ➔ नदियाँ, लड़का ➔ लड़के)।',
    clueEn: 'Applies to an entire category and can easily be pluralized.',
    examples: ['नदी', 'पर्वत', 'लड़का', 'देश', 'पुस्तक', 'पेड़', 'पक्षी', 'विद्यालय', 'डॉक्टर', 'शहर'],
    trapHi: '⚠️ <strong>परीक्षा सावधानी:</strong> जब किसी विशेष नाम के बदले सामान्य श्रेणी की बात हो (जैसे ‘शहर’, ‘खिलाड़ी’), तो वह जातिवाचक संज्ञा होगी।',
    trapEn: "Generic categories ('city', 'player') are Common Nouns."
  },
  {
    id: 'abstract',
    num: 3,
    nameHi: 'भाववाचक संज्ञा',
    nameEn: 'Abstract Noun',
    icon: '💖',
    themeClass: 'card-abstract',
    defHi: 'जिस संज्ञा शब्द से किसी व्यक्ति, वस्तु या स्थान के <strong>गुण, दोष, दशा, अवस्था या भाव</strong> का बोध होता है, उसे भाववाचक संज्ञा कहते हैं।',
    defEn: 'An Abstract Noun refers to qualities, emotions, states, or concepts that cannot be seen or touched.',
    clueHi: 'इन्हें न तो आँखों से देखा जा सकता है और न ही हाथों से छुआ जा सकता है; इन्हें <strong>केवल अनुभव (Feel)</strong> किया जा सकता है।',
    clueEn: 'Intangible qualities or emotions. You can only feel or perceive them.',
    examples: ['बचपन', 'मिठास', 'ईमानदारी', 'वीरता', 'बुढ़ापा', 'थकावट', 'सुंदरता', 'खुशी', 'हरियाली', 'क्रोध'],
    trapHi: '⚠️ <strong>परीक्षा सावधानी:</strong> ‘मीठा’ विशेषण है, किंतु ‘मिठास’ भाववाचक संज्ञा है! ‘मित्र’ जातिवाचक है, किंतु ‘मित्रता’ भाववाचक संज्ञा है।',
    trapEn: "'Sweet' is an adjective, but 'Sweetness' is an Abstract Noun!"
  },
  {
    id: 'material',
    num: 4,
    nameHi: 'द्रव्यवाचक संज्ञा',
    nameEn: 'Material Noun',
    icon: '🪙',
    themeClass: 'card-material',
    defHi: 'जिस संज्ञा शब्द से किसी <strong>धातु, खनिज, तरल, ठोस या पदार्थ</strong> का बोध होता है जिससे अन्य वस्तुएं बनाई जाती हैं, उसे द्रव्यवाचक संज्ञा कहते हैं।',
    defEn: 'A Material Noun denotes substances, liquids, metals, or raw materials from which other things are made.',
    clueHi: 'इन्हें <strong>मापा या तौला (Weighed/Measured)</strong> जाता है, गिना (Counted) नहीं जाता। ये अगणनीय (Uncountable) होते हैं।',
    clueEn: 'Measured or weighed, not counted as individual units.',
    examples: ['सोना', 'चाँदी', 'लोहा', 'दूध', 'पानी', 'तेल', 'घी', 'गेहूँ', 'चावल', 'मिट्टी'],
    trapHi: '⚠️ <strong>परीक्षा सावधानी:</strong> ‘दूध’ द्रव्यवाचक है (मापा जाता है), किंतु ‘बोतल’ जातिवाचक है (गिनी जाती है)।',
    trapEn: "'Milk' is a Material Noun, while 'Bottle' is a Common Noun."
  },
  {
    id: 'collective',
    num: 5,
    nameHi: 'समुदायवाचक संज्ञा',
    nameEn: 'Collective Noun',
    icon: '👥',
    themeClass: 'card-collective',
    defHi: 'जिस संज्ञा शब्द से व्यक्तियों, प्राणियों या वस्तुओं के <strong>पूरे समूह, झुंड या सभा</strong> का बोध होता है, उसे समुदायवाचक या समूहवाचक संज्ञा कहते हैं।',
    defEn: 'A Collective Noun refers to a group, collection, or gathering of individuals or things taken as a single unit.',
    clueHi: 'यह शब्द एकवचन जैसा दिखता है, किंतु इसके अंदर <strong>अनेक सदस्यों का समूह</strong> समाहित होता है।',
    clueEn: 'Singular in grammatical form, but represents a gathering or collection of members.',
    examples: ['सेना', 'कक्षा', 'भीड़', 'परिवार', 'सभा', 'गुच्छा', 'झुंड', 'गुलदस्ता', 'जुलूस', 'टोली'],
    trapHi: '⚠️ <strong>परीक्षा सावधानी:</strong> ‘छात्र’ जातिवाचक है, किंतु छात्रों का समूह ‘कक्षा’ समुदायवाचक संज्ञा है!',
    trapEn: "'Student' is a Common Noun, but 'Class' is a Collective Noun!"
  }
];

const BHAVVACHAK_NIRMAN_DATA = [
  // 1. जातिवाचक संज्ञा से
  {
    origin: 'jati',
    base: 'मित्र',
    suffix: 'ता',
    result: 'मित्रता',
    en: 'Friend ➔ Friendship',
    sentence: 'सच्ची <strong>मित्रता</strong> संकट के समय काम आती है।'
  },
  {
    origin: 'jati',
    base: 'बच्चा',
    suffix: 'पन',
    result: 'बचपन',
    en: 'Child ➔ Childhood',
    sentence: '<strong>बचपन</strong> के दिन बहुत सुहावने होते हैं।'
  },
  {
    origin: 'jati',
    base: 'मानव',
    suffix: 'ता',
    result: 'मानवता',
    en: 'Human ➔ Humanity',
    sentence: 'दीन-दुखियों की सेवा करना ही सच्ची <strong>मानवता</strong> है।'
  },
  {
    origin: 'jati',
    base: 'पशु',
    suffix: 'ता',
    result: 'पशुता',
    en: 'Animal ➔ Brutality',
    sentence: 'किसी को सताना <strong>पशुता</strong> की निशानी है।'
  },
  {
    origin: 'jati',
    base: 'दास',
    suffix: 'ता',
    result: 'दासता',
    en: 'Slave ➔ Slavery',
    sentence: 'स्वतंत्रता संग्राम ने देश को <strong>दासता</strong> से मुक्त कराया।'
  },

  // 2. विशेषण से
  {
    origin: 'visheshan',
    base: 'मीठा',
    suffix: 'आस',
    result: 'मिठास',
    en: 'Sweet ➔ Sweetness',
    sentence: 'आम की <strong>मिठास</strong> सभी को आकर्षित करती है।'
  },
  {
    origin: 'visheshan',
    base: 'सुंदर',
    suffix: 'ता',
    result: 'सुंदरता',
    en: 'Beautiful ➔ Beauty',
    sentence: 'प्रकृति की <strong>सुंदरता</strong> देखकर मन प्रसन्न हो गया।'
  },
  {
    origin: 'visheshan',
    base: 'वीर',
    suffix: 'ता',
    result: 'वीरता',
    en: 'Brave ➔ Bravery',
    sentence: 'सैनिकों ने युद्ध में अद्भुत <strong>वीरता</strong> दिखाई।'
  },
  {
    origin: 'visheshan',
    base: 'गरम',
    suffix: 'ई',
    result: 'गरमी',
    en: 'Hot ➔ Heat / Summer',
    sentence: 'मई के महीने में भीषण <strong>गरमी</strong> पड़ती है।'
  },
  {
    origin: 'visheshan',
    base: 'चालाक',
    suffix: 'ई',
    result: 'चालाकी',
    en: 'Cunning ➔ Cunningness',
    sentence: 'लोमड़ी अपनी <strong>चालाकी</strong> से बच निकली।'
  },

  // 3. क्रिया से
  {
    origin: 'kriya',
    base: 'पढ़ना',
    suffix: 'आई',
    result: 'पढ़ाई',
    en: 'To study ➔ Studies',
    sentence: 'परीक्षा के दिनों में मन लगाकर <strong>पढ़ाई</strong> करनी चाहिए।'
  },
  {
    origin: 'kriya',
    base: 'लिखना',
    suffix: 'आई',
    result: 'लिखाई',
    en: 'To write ➔ Handwriting',
    sentence: 'रोहन की <strong>लिखाई</strong> बहुत सुंदर और साफ है।'
  },
  {
    origin: 'kriya',
    base: 'थकना',
    suffix: 'आवट',
    result: 'थकावट',
    en: 'To tire ➔ Fatigue',
    sentence: 'दिनभर की यात्रा के बाद बहुत <strong>थकावट</strong> हो गई।'
  },
  {
    origin: 'kriya',
    base: 'दौड़ना',
    suffix: '—',
    result: 'दौड़',
    en: 'To run ➔ Race / Run',
    sentence: 'आज विद्यालय में 100 मीटर की <strong>दौड़</strong> प्रतियोगिता है।'
  },
  {
    origin: 'kriya',
    base: 'हंसना',
    suffix: 'ई',
    result: 'हंसी',
    en: 'To laugh ➔ Laughter',
    sentence: 'बच्चों की मासूम <strong>हंसी</strong> देखकर सारा दुख भूल जाते हैं।'
  }
];

const SANGYA_COMPARISON_DATA = [
  {
    wordA: 'नदी',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'गंगा',
    typeB: 'व्यक्तिवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘नदी’ संसार की किसी भी नदी का बोध कराती है (पूरी जाति), जबकि ‘गंगा’ एक विशेष पवित्र नदी का नाम है (व्यक्तिवाचक)।'
  },
  {
    wordA: 'पर्वत',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'हिमालय',
    typeB: 'व्यक्तिवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘पर्वत’ समस्त पहाड़ों की सामान्य श्रेणी है, जबकि ‘हिमालय’ एक विशिष्ट पर्वत श्रृंखला का नाम है।'
  },
  {
    wordA: 'शहर',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'दिल्ली',
    typeB: 'व्यक्तिवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘शहर’ कोई भी नगर हो सकता है, जबकि ‘दिल्ली’ भारत की एक निश्चित और विशेष राजधानी का नाम है।'
  },
  {
    wordA: 'पुस्तक',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'रामायण',
    typeB: 'व्यक्तिवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘पुस्तक’ कोई भी साधारण किताब हो सकती है, जबकि ‘रामायण’ एक विशेष धार्मिक महाकाव्य का नाम है।'
  },
  {
    wordA: 'खिलाड़ी',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'सचिन तेंदुलकर',
    typeB: 'व्यक्तिवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘खिलाड़ी’ खेल खेलने वाले किसी भी व्यक्ति को कहते हैं, जबकि ‘सचिन तेंदुलकर’ एक प्रसिद्ध विशिष्ट व्यक्ति का नाम है।'
  },
  {
    wordA: 'दूध',
    typeA: 'द्रव्यवाचक संज्ञा',
    tagA: 'tag-material',
    wordB: 'बोतल',
    typeB: 'जातिवाचक संज्ञा',
    tagB: 'tag-common',
    reason: '‘दूध’ तरल पदार्थ है जिसे लीटर में मापा जाता है (द्रव्यवाचक), जबकि ‘बोतल’ वह पात्र है जिसे 1, 2, 3 करके गिना जा सकता है (जातिवाचक)।'
  },
  {
    wordA: 'छात्र',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'कक्षा',
    typeB: 'समुदायवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘छात्र’ एक व्यक्ति की सामान्य जाति है, जबकि अनेक छात्रों का संगठित समूह मिलकर ‘कक्षा’ (Class) समुदायवाचक संज्ञा बनाता है।'
  },
  {
    wordA: 'सैनिक',
    typeA: 'जातिवाचक संज्ञा',
    tagA: 'tag-common',
    wordB: 'सेना',
    typeB: 'समुदायवाचक संज्ञा',
    tagB: 'tag-proper',
    reason: '‘सैनिक’ अकेला सिपाही है (जातिवाचक), जबकि देश की रक्षा करने वाले सैनिकों का पूरा दल ‘सेना’ (Army) समुदायवाचक संज्ञा है।'
  }
];

const SANGYA_SORT_ITEMS = [
  { word: 'हिमालय', en: 'Himalayas', type: 'proper', sentence: '<strong>हिमालय</strong> भारत के उत्तर में स्थित प्रहरी है।' },
  { word: 'नदी', en: 'River', type: 'common', sentence: 'पहाड़ों से कलकल करती <strong>नदी</strong> बहती है।' },
  { word: 'मिठास', en: 'Sweetness', type: 'abstract', sentence: 'रसगुल्ले की <strong>मिठास</strong> सबको बहुत पसंद है।' },
  { word: 'सोना', en: 'Gold', type: 'material', sentence: '<strong>सोना</strong> एक अत्यंत बहुमूल्य पीली धातु है।' },
  { word: 'सेना', en: 'Army', type: 'collective', sentence: 'भारतीय <strong>सेना</strong> सीमाओं की दिन-रात रक्षा करती है।' },
  { word: 'ताजमहल', en: 'Taj Mahal', type: 'proper', sentence: 'आगरा का <strong>ताजमहल</strong> विश्वप्रसिद्ध स्मारक है।' },
  { word: 'पेड़', en: 'Tree', type: 'common', sentence: 'बगीचे में एक छायादार <strong>पेड़</strong> लगा है।' },
  { word: 'ईमानदारी', en: 'Honesty', type: 'abstract', sentence: '<strong>ईमानदारी</strong> सबसे अच्छा और सच्चा गुण है।' },
  { word: 'दूध', en: 'Milk', type: 'material', sentence: 'स्वास्थ्य के लिए प्रतिदिन ताजा <strong>दूध</strong> पिएं।' },
  { word: 'भीड़', en: 'Crowd', type: 'collective', sentence: 'बाज़ार में त्योहार के कारण भारी <strong>भीड़</strong> थी।' },
  { word: 'सचिन तेंदुलकर', en: 'Sachin Tendulkar', type: 'proper', sentence: '<strong>सचिन तेंदुलकर</strong> ने क्रिकेट में अनेक कीर्तिमान बनाए।' },
  { word: 'विद्यालय', en: 'School', type: 'common', sentence: 'सभी बच्चे सुबह तैयार होकर <strong>विद्यालय</strong> जाते हैं।' },
  { word: 'बचपन', en: 'Childhood', type: 'abstract', sentence: '<strong>बचपन</strong> में हम सब खूब खेलकूद और मस्ती करते थे।' },
  { word: 'लोहा', en: 'Iron', type: 'material', sentence: 'पुल और रेल की पटरियाँ मजबूत <strong>लोहा</strong> से बनती हैं।' },
  { word: 'चाबियों का गुच्छा', en: 'Bunch of keys', type: 'collective', sentence: 'दादाजी ने <strong>चाबियों का गुच्छा</strong> खूंटी पर टांग दिया।' },
  { word: 'रामायण', en: 'Ramayana', type: 'proper', sentence: 'दादीजी प्रतिदिन <strong>रामायण</strong> का पाठ करती हैं।' },
  { word: 'डॉक्टर', en: 'Doctor', type: 'common', sentence: 'अस्पताल में <strong>डॉक्टर</strong> रोगियों का उपचार करते हैं।' },
  { word: 'वीरता', en: 'Bravery', type: 'abstract', sentence: 'रानी लक्ष्मीबाई ने अंग्रेजों के सामने अद्भुत <strong>वीरता</strong> दिखाई।' },
  { word: 'घी', en: 'Clarified Butter', type: 'material', sentence: 'हलवे में शुद्ध देसी <strong>घी</strong> की खुशबू आ रही है।' },
  { word: 'कक्षा', en: 'Classroom / Class', type: 'collective', sentence: '<strong>कक्षा</strong> पाँच के विद्यार्थी चुपचाप पढ़ाई कर रहे हैं।' }
];

const SANGYA_QUIZ_POOL = [
  {
    qHi: 'किसी व्यक्ति, वस्तु, स्थान, प्राणी या भाव के नाम को क्या कहते हैं?',
    qEn: 'What is the name of a person, place, thing, animal, or emotion called?',
    options: ['सर्वनाम (Pronoun)', 'संज्ञा (Noun)', 'विशेषण (Adjective)', 'क्रिया (Verb)'],
    correct: 1,
    exp: 'किसी भी व्यक्ति, वस्तु, स्थान, प्राणी या भाव के नाम को ‘संज्ञा’ (Noun) कहते हैं। जैसे: राम, दिल्ली, पुस्तक, मिठास।'
  },
  {
    qHi: '‘गंगा भारत की सबसे पवित्र और लंबी नदी है।’ इस वाक्य में व्यक्तिवाचक संज्ञा शब्द कौन-सा है?',
    qEn: 'In "Ganga is the holiest and longest river of India", which word is a Proper Noun?',
    options: ['नदी', 'लंबी', 'गंगा', 'पवित्र'],
    correct: 2,
    exp: '‘गंगा’ एक विशेष नदी का नाम है, इसलिए यह व्यक्तिवाचक संज्ञा है। ‘नदी’ शब्द जातिवाचक संज्ञा है।'
  },
  {
    qHi: 'निम्न में से कौन-सा शब्द ‘जातिवाचक संज्ञा’ (Common Noun) का उदाहरण है?',
    qEn: 'Which of the following is an example of a Common Noun?',
    options: ['हिमालय', 'पर्वत', 'दिल्ली', 'रामायण'],
    correct: 1,
    exp: '‘पर्वत’ समस्त पर्वतों की संपूर्ण जाति का बोध कराता है, इसलिए यह जातिवाचक संज्ञा है। हिमालय विशेष पर्वत का नाम है।'
  },
  {
    qHi: '‘सैनिकों ने युद्ध में अद्भुत वीरता दिखाई।’ रेखांकित शब्द ‘वीरता’ किस संज्ञा का उदाहरण है?',
    qEn: 'In "Soldiers showed immense bravery in war", the word "Bravery" is which type of noun?',
    options: ['भाववाचक संज्ञा', 'जातिवाचक संज्ञा', 'द्रव्यवाचक संज्ञा', 'व्यक्तिवाचक संज्ञा'],
    correct: 0,
    exp: '‘वीरता’ एक आंतरिक गुण और भाव है जिसे देखा या छुआ नहीं जा सकता, केवल अनुभव किया जा सकता है। अतः यह भाववाचक संज्ञा है।'
  },
  {
    qHi: '‘सोना, चाँदी, दूध, तेल, पानी’ — ये सभी शब्द किस संज्ञा भेद के अंतर्गत आते हैं?',
    qEn: 'Gold, silver, milk, oil, water — these words belong to which category of noun?',
    options: ['व्यक्तिवाचक संज्ञा', 'द्रव्यवाचक संज्ञा', 'समुदायवाचक संज्ञा', 'जातिवाचक संज्ञा'],
    correct: 1,
    exp: 'धातुओं, खनिजों और तरल पदार्थों के नाम जिन्हें मापा या तौला जाता है, ‘द्रव्यवाचक संज्ञा’ (Material Noun) कहलाते हैं।'
  },
  {
    qHi: '‘चाबियों का गुच्छा’, ‘सैनिकों की सेना’ व ‘छात्रों की कक्षा’ — ये शब्द किस संज्ञा भेद के उदाहरण हैं?',
    qEn: 'Bunch of keys, Army of soldiers, Class of students — which noun type are these?',
    options: ['समुदायवाचक / समूहवाचक संज्ञा', 'भाववाचक संज्ञा', 'द्रव्यवाचक संज्ञा', 'व्यक्तिवाचक संज्ञा'],
    correct: 0,
    exp: 'जो संज्ञा शब्द किसी व्यक्ति या वस्तु के पूरे समूह या झुंड का बोध कराते हैं, उन्हें ‘समुदायवाचक संज्ञा’ (Collective Noun) कहते हैं।'
  },
  {
    qHi: '‘मीठा’ विशेषण शब्द से बनने वाली सही भाववाचक संज्ञा चुनिए:',
    qEn: 'Select the correct Abstract Noun formed from the adjective "Meetha" (Sweet):',
    options: ['मिठाई', 'मिठास', 'मीठे', 'मीठी'],
    correct: 1,
    exp: '‘मीठा’ विशेषण में ‘आस’ प्रत्यय जुड़ने से ‘मिठास’ भाववाचक संज्ञा बनती है। ‘मिठाई’ तो एक खाद्य वस्तु (जातिवाचक) है!'
  },
  {
    qHi: '‘मित्र’ जातिवाचक संज्ञा से बनने वाली सही भाववाचक संज्ञा क्या होगी?',
    qEn: 'What is the correct Abstract Noun formed from Common Noun "Mitra" (Friend)?',
    options: ['मित्रता', 'मित्रगण', 'दोस्त', 'मैत्रीपूर्ण'],
    correct: 0,
    exp: '‘मित्र’ में ‘ता’ प्रत्यय जोड़कर ‘मित्रता’ (Friendship) भाववाचक संज्ञा बनाई जाती है।'
  },
  {
    qHi: 'इनमें से कौन-सा शब्द अन्य तीन से भिन्न (व्यक्तिवाचक संज्ञा) है?',
    qEn: 'Which of the following words is different from the other three (Proper Noun)?',
    options: ['नदी', 'शहर', 'ताजमहल', 'पुस्तक'],
    correct: 2,
    exp: '‘ताजमहल’ एक विशिष्ट ऐतिहासिक इमारत का नाम (व्यक्तिवाचक) है, जबकि नदी, शहर और पुस्तक तीनों जातिवाचक संज्ञाएँ हैं।'
  },
  {
    qHi: 'द्रव्यवाचक संज्ञा (Material Noun) की सबसे मुख्य पहचान क्या है?',
    qEn: 'What is the most important identifying feature of a Material Noun?',
    options: ['इन्हें गिना जाता है (Counted)', 'इन्हें मापा या तौला जाता है (Measured/Weighed)', 'इनमें भावनाएं होती हैं', 'इनका कभी बहुवचन नहीं बनता'],
    correct: 1,
    exp: 'द्रव्यवाचक संज्ञा की प्रमुख पहचान है कि इसे मापा या तौला (जैसे: 1 लीटर दूध, 10 ग्राम सोना) जाता है, 1-2 करके गिना नहीं जाता।'
  },
  {
    qHi: '‘लिखना’ क्रिया से बनने वाला सही भाववाचक संज्ञा शब्द कौन-सा है?',
    qEn: 'Which is the correct Abstract Noun formed from the verb "Likhna" (To write)?',
    options: ['लेखक', 'लिखाई', 'लिखित', 'लिखकर'],
    correct: 1,
    exp: '‘लिखना’ क्रिया से ‘आई’ प्रत्यय लगकर ‘लिखाई’ भाववाचक संज्ञा बनती है (जैसे: रोहन की लिखाई सुंदर है)। ‘लेखक’ जातिवाचक संज्ञा है।'
  },
  {
    qHi: '‘बचपन के दिन बहुत सुहावने और आनंददायक होते हैं।’ इस वाक्य में भाववाचक संज्ञा शब्द है:',
    qEn: 'In "Days of childhood are pleasant and joyful", the Abstract Noun is:',
    options: ['दिन', 'बचपन', 'सुहावने', 'होते'],
    correct: 1,
    exp: '‘बचपन’ (Childhood) जीवन की एक अवस्था और भाव है जिसे अनुभव किया जाता है, अतः यह भाववाचक संज्ञा है।'
  },
  {
    qHi: '‘डॉ. एपीजे अब्दुल कलाम भारत के महान वैज्ञानिक थे।’ इस वाक्य में ‘वैज्ञानिक’ शब्द किस संज्ञा का है?',
    qEn: 'In "Dr. APJ Abdul Kalam was a great scientist of India", the word "Scientist" is which noun?',
    options: ['व्यक्तिवाचक संज्ञा', 'जातिवाचक संज्ञा', 'भाववाचक संज्ञा', 'द्रव्यवाचक संज्ञा'],
    correct: 1,
    exp: '‘वैज्ञानिक’ शब्द संपूर्ण वैज्ञानिक वर्ग/जाति का बोध कराता है, अतः यह जातिवाचक संज्ञा है। ‘डॉ. कलाम’ व्यक्तिवाचक संज्ञा है।'
  },
  {
    qHi: 'हाथियों अथवा हिरणों के समूह को हिंदी व्याकरण में क्या कहा जाता है?',
    qEn: 'What is a group of elephants or deer called in Hindi grammar?',
    options: ['गुच्छा', 'झुंड', 'कक्षा', 'भीड़'],
    correct: 1,
    exp: 'पशुओं (हाथी, हिरण आदि) के समूह को ‘झुंड’ (Herd) कहा जाता है। चाबियों/अंगूरों के लिए ‘गुच्छा’ प्रयुक्त होता है।'
  },
  {
    qHi: 'कक्षा 5 CBSE पाठ्यक्रम के अनुसार संज्ञा के कुल कितने भेद विस्तार से पढ़ाए जाते हैं?',
    qEn: 'According to CBSE Class 5 curriculum, how many types of noun are taught?',
    options: ['तीन (3)', 'चार (4)', 'पाँच (5)', 'सात (7)'],
    correct: 2,
    exp: 'CBSE कक्षा 5 में संज्ञा के 5 भेद पढ़ाए जाते हैं: व्यक्तिवाचक, जातिवाचक, भाववाचक, द्रव्यवाचक और समुदायवाचक।'
  }
];

const SANGYA_CHALLENGE_POOL = [
  {
    word: 'हिमालय',
    en: 'Himalayas',
    question: '‘हिमालय’ किस प्रकार की संज्ञा है?',
    options: ['व्यक्तिवाचक', 'जातिवाचक', 'भाववाचक', 'द्रव्यवाचक'],
    correct: 0,
    exp: 'हिमालय एक विशेष पर्वत का नाम है ➔ व्यक्तिवाचक संज्ञा।'
  },
  {
    word: 'मिठास',
    en: 'Sweetness',
    question: '‘मिठास’ किस प्रकार की संज्ञा है?',
    options: ['जातिवाचक', 'भाववाचक', 'द्रव्यवाचक', 'समुदायवाचक'],
    correct: 1,
    exp: 'मिठास को केवल अनुभव किया जा सकता है ➔ भाववाचक संज्ञा।'
  },
  {
    word: 'सेना',
    en: 'Army',
    question: '‘सेना’ किस प्रकार की संज्ञा है?',
    options: ['व्यक्तिवाचक', 'समुदायवाचक', 'द्रव्यवाचक', 'भाववाचक'],
    correct: 1,
    exp: 'सैनिकों का समूह ➔ समुदायवाचक संज्ञा।'
  },
  {
    word: 'दूध',
    en: 'Milk',
    question: '‘दूध’ किस प्रकार की संज्ञा है?',
    options: ['द्रव्यवाचक', 'जातिवाचक', 'व्यक्तिवाचक', 'भाववाचक'],
    correct: 0,
    exp: 'दूध एक तरल पदार्थ है जिसे मापा जाता है ➔ द्रव्यवाचक संज्ञा।'
  },
  {
    word: 'नदी',
    en: 'River',
    question: '‘नदी’ किस प्रकार की संज्ञा है?',
    options: ['व्यक्तिवाचक', 'जातिवाचक', 'द्रव्यवाचक', 'भाववाचक'],
    correct: 1,
    exp: 'नदी समस्त नदियों की जाति को दर्शाती है ➔ जातिवाचक संज्ञा।'
  },
  {
    word: 'सचिन तेंदुलकर',
    en: 'Sachin Tendulkar',
    question: '‘सचिन तेंदुलकर’ किस प्रकार की संज्ञा है?',
    options: ['व्यक्तिवाचक', 'जातिवाचक', 'समुदायवाचक', 'भाववाचक'],
    correct: 0,
    exp: 'एक विशिष्ट व्यक्ति का नाम ➔ व्यक्तिवाचक संज्ञा।'
  },
  {
    word: 'बचपन',
    en: 'Childhood',
    question: '‘बचपन’ किस प्रकार की संज्ञा है?',
    options: ['द्रव्यवाचक', 'भाववाचक', 'जातिवाचक', 'व्यक्तिवाचक'],
    correct: 1,
    exp: 'जीवन की अवस्था व भाव ➔ भाववाचक संज्ञा।'
  },
  {
    word: 'सोना',
    en: 'Gold',
    question: '‘सोना’ (धातु) किस प्रकार की संज्ञा है?',
    options: ['जातिवाचक', 'द्रव्यवाचक', 'व्यक्तिवाचक', 'समुदायवाचक'],
    correct: 1,
    exp: 'बहुमूल्य धातु जिसे तौला जाता है ➔ द्रव्यवाचक संज्ञा।'
  },
  {
    word: 'भीड़',
    en: 'Crowd',
    question: '‘भीड़’ किस प्रकार की संज्ञा है?',
    options: ['समुदायवाचक', 'जातिवाचक', 'व्यक्तिवाचक', 'द्रव्यवाचक'],
    correct: 0,
    exp: 'व्यक्तियों का बड़ा समूह ➔ समुदायवाचक संज्ञा।'
  },
  {
    word: 'विद्यालय',
    en: 'School',
    question: '‘विद्यालय’ किस प्रकार की संज्ञा है?',
    options: ['व्यक्तिवाचक', 'जातिवाचक', 'भाववाचक', 'द्रव्यवाचक'],
    correct: 1,
    exp: 'सामान्य स्थान वर्ग ➔ जातिवाचक संज्ञा।'
  },
  {
    word: 'मित्रता',
    en: 'Friendship',
    question: '‘मित्रता’ किस प्रकार की संज्ञा है?',
    options: ['जातिवाचक', 'व्यक्तिवाचक', 'भाववाचक', 'समुदायवाचक'],
    correct: 2,
    exp: 'मित्रता एक भाव व संबंध है ➔ भाववाचक संज्ञा।'
  },
  {
    word: 'चाबियों का गुच्छा',
    en: 'Bunch of keys',
    question: '‘गुच्छा’ किस प्रकार की संज्ञा है?',
    options: ['द्रव्यवाचक', 'समुदायवाचक', 'जातिवाचक', 'व्यक्तिवाचक'],
    correct: 1,
    exp: 'चाबियों का समूह ➔ समुदायवाचक संज्ञा।'
  },
  {
    word: 'तेल',
    en: 'Oil',
    question: '‘तेल’ किस प्रकार की संज्ञा है?',
    options: ['द्रव्यवाचक', 'जातिवाचक', 'भाववाचक', 'व्यक्तिवाचक'],
    correct: 0,
    exp: 'तरल पदार्थ जिसे लीटर में मापते हैं ➔ द्रव्यवाचक संज्ञा।'
  },
  {
    word: 'रामायण',
    en: 'Ramayana',
    question: '‘रामायण’ किस प्रकार की संज्ञा है?',
    options: ['व्यक्तिवाचक', 'जातिवाचक', 'भाववाचक', 'समुदायवाचक'],
    correct: 0,
    exp: 'एक विशेष पवित्र ग्रंथ का नाम ➔ व्यक्तिवाचक संज्ञा।'
  },
  {
    word: 'वीरता',
    en: 'Bravery',
    question: '‘वीरता’ किस प्रकार की संज्ञा है?',
    options: ['जातिवाचक', 'द्रव्यवाचक', 'भाववाचक', 'व्यक्तिवाचक'],
    correct: 2,
    exp: 'साहस का आंतरिक गुण व भाव ➔ भाववाचक संज्ञा।'
  }
];

// --- APP CONTROLLER CLASS ---
class HindiLearningApp {
  constructor() {
    this.confetti = new ConfettiEngine('confetti-canvas');
    this.state = {
      activeModule: 'vakyansh', // 'vakyansh' (Default) | 'chitra'
      currentSceneId: 'park',
      imageViewMode: 'real', // 'real' (Default Exam Photo) | 'cartoon'
      isBWMode: false, // Default is Color picture (User can toggle B&W print)
      chitraMode: 'explore', // 'explore' | 'vocab' | 'puzzle' | 'write'
      vakyanshMode: 'learn', // 'learn' | 'match' | 'quiz' | 'challenge'
      showEnglish: true,
      activeHotspotId: null,
      vocabFilter: 'all',
      vakyanshFilter: 'all',
      stars: this.loadStars(),
      vakyanshStars: this.loadVakyanshStars(),
      sangyaStars: this.loadSangyaStars(),
      sangyaMode: 'learn', // 'learn' | 'sort' | 'quiz' | 'challenge'
      sangyaSubtab: 'types', // 'types' | 'mirror' | 'lab'
      sangyaLabFilter: 'all', // 'all' | 'jati' | 'visheshan' | 'kriya'
      sangyaSortState: {
        items: [],
        currentIndex: 0,
        score: 0,
        streak: 0,
        answered: false
      },
      sangyaQuizState: {
        qIndex: 0,
        score: { correct: 0, wrong: 0 },
        answered: false,
        selectedOption: null
      },
      sangyaChallengeState: {
        timer: 60,
        timerInterval: null,
        qIndex: 0,
        score: 0,
        streak: 0,
        answered: false
      },
      puzzleProgress: {
        stepIdx: 0,
        selectedWords: [],
        isCompleted: false
      },
      matchState: {
        cards: [],
        firstCard: null,
        matchedPairIds: [],
        moves: 0
      },
      quizState: {
        qIndex: 0,
        score: { correct: 0, wrong: 0 },
        answered: false,
        selectedOption: null
      },
      challengeState: {
        timer: 60,
        timerInterval: null,
        qIndex: 0,
        score: 0,
        answered: false
      },
      chitraDrafts: {}
    };

    this.initElements();
    this.loadAppState();
    this.bindEvents();
    this.updateCurriculumNavUI();
    this.renderSidebarTopics();
    this.updateProgressUI();
    this.updateTranslateButtonUI();
    if (this.state.isBWMode) {
      if (this.pictureIllustrationWrapper) this.pictureIllustrationWrapper.classList.add('bw-exam-mode');
      if (this.btnToggleBw) this.btnToggleBw.classList.add('active');
      if (this.bwToggleLabel) this.bwToggleLabel.textContent = 'B&W प्रिंट (ON)';
    }
    if (this.state.imageViewMode === 'cartoon') {
      if (this.btnViewReal) this.btnViewReal.classList.remove('active');
      if (this.btnViewCartoon) this.btnViewCartoon.classList.add('active');
    }
    this.switchModule(this.state.activeModule, false);
  }

  loadAppState() {
    try {
      const saved = localStorage.getItem('cbse5_hindi_active_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (['vakyansh', 'sangya', 'chitra'].includes(parsed.activeModule)) {
          this.state.activeModule = parsed.activeModule;
        }
        if (parsed.currentSceneId && SCENE_DATA.some(s => s.id === parsed.currentSceneId)) {
          this.state.currentSceneId = parsed.currentSceneId;
        }
        if (['explore', 'vocab', 'puzzle', 'write'].includes(parsed.chitraMode)) {
          this.state.chitraMode = parsed.chitraMode;
        }
        if (['learn', 'match', 'quiz', 'challenge'].includes(parsed.vakyanshMode)) {
          this.state.vakyanshMode = parsed.vakyanshMode;
        }
        if (['learn', 'sort', 'quiz', 'challenge'].includes(parsed.sangyaMode)) {
          this.state.sangyaMode = parsed.sangyaMode;
        }
        if (['types', 'mirror', 'lab'].includes(parsed.sangyaSubtab)) {
          this.state.sangyaSubtab = parsed.sangyaSubtab;
        }
        if (['all', 'jati', 'visheshan', 'kriya'].includes(parsed.sangyaLabFilter)) {
          this.state.sangyaLabFilter = parsed.sangyaLabFilter;
        }
        if (['all', 'behavior', 'action', 'nature'].includes(parsed.vakyanshFilter)) {
          this.state.vakyanshFilter = parsed.vakyanshFilter;
        }
        if (typeof parsed.showEnglish === 'boolean') {
          this.state.showEnglish = parsed.showEnglish;
        }
        if (['real', 'cartoon'].includes(parsed.imageViewMode)) {
          this.state.imageViewMode = parsed.imageViewMode;
        }
        if (typeof parsed.isBWMode === 'boolean') {
          this.state.isBWMode = parsed.isBWMode;
        }
        if (parsed.vakyanshQuizSession && typeof parsed.vakyanshQuizSession === 'object') {
          this.state.quizState = {
            qIndex: parsed.vakyanshQuizSession.qIndex || 0,
            score: parsed.vakyanshQuizSession.score || { correct: 0, wrong: 0 },
            answered: !!parsed.vakyanshQuizSession.answered,
            selectedOption: parsed.vakyanshQuizSession.selectedOption !== undefined ? parsed.vakyanshQuizSession.selectedOption : null
          };
        }
        if (parsed.sangyaQuizSession && typeof parsed.sangyaQuizSession === 'object') {
          this.state.sangyaQuizState = {
            qIndex: parsed.sangyaQuizSession.qIndex || 0,
            score: parsed.sangyaQuizSession.score || { correct: 0, wrong: 0 },
            answered: !!parsed.sangyaQuizSession.answered,
            selectedOption: parsed.sangyaQuizSession.selectedOption !== undefined ? parsed.sangyaQuizSession.selectedOption : null
          };
        }
        if (parsed.chitraDrafts && typeof parsed.chitraDrafts === 'object') {
          this.state.chitraDrafts = parsed.chitraDrafts;
        }
      }
    } catch (e) {
      console.warn('Failed to load active state:', e);
    }
  }

  saveAppState() {
    try {
      const toSave = {
        activeModule: this.state.activeModule,
        currentSceneId: this.state.currentSceneId,
        chitraMode: this.state.chitraMode,
        vakyanshMode: this.state.vakyanshMode,
        sangyaMode: this.state.sangyaMode,
        sangyaSubtab: this.state.sangyaSubtab,
        sangyaLabFilter: this.state.sangyaLabFilter,
        vakyanshFilter: this.state.vakyanshFilter,
        showEnglish: this.state.showEnglish,
        imageViewMode: this.state.imageViewMode,
        isBWMode: this.state.isBWMode,
        chitraDrafts: this.state.chitraDrafts || {}
      };
      if (this.state.quizState && (this.state.quizState.qIndex > 0 || this.state.quizState.score.correct > 0 || this.state.quizState.score.wrong > 0 || this.state.quizState.answered)) {
        toSave.vakyanshQuizSession = {
          qIndex: this.state.quizState.qIndex,
          score: this.state.quizState.score,
          answered: this.state.quizState.answered,
          selectedOption: this.state.quizState.selectedOption !== undefined ? this.state.quizState.selectedOption : null
        };
      }
      if (this.state.sangyaQuizState && (this.state.sangyaQuizState.qIndex > 0 || this.state.sangyaQuizState.score.correct > 0 || this.state.sangyaQuizState.score.wrong > 0 || this.state.sangyaQuizState.answered)) {
        toSave.sangyaQuizSession = {
          qIndex: this.state.sangyaQuizState.qIndex,
          score: this.state.sangyaQuizState.score,
          answered: this.state.sangyaQuizState.answered,
          selectedOption: this.state.sangyaQuizState.selectedOption !== undefined ? this.state.sangyaQuizState.selectedOption : null
        };
      }
      localStorage.setItem('cbse5_hindi_active_state', JSON.stringify(toSave));
    } catch (e) {
      console.warn('Failed to save active state:', e);
    }
  }

  loadStars() {
    try {
      const saved = localStorage.getItem('cbse5_chitra_varnan_stars');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  saveStars() {
    try {
      localStorage.setItem('cbse5_chitra_varnan_stars', JSON.stringify(this.state.stars));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  loadVakyanshStars() {
    try {
      const saved = localStorage.getItem('cbse5_hindi_vakyansh_stars');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  }

  saveVakyanshStars(stars) {
    this.state.vakyanshStars = Math.max(this.state.vakyanshStars, stars);
    try {
      localStorage.setItem('cbse5_hindi_vakyansh_stars', String(this.state.vakyanshStars));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  loadSangyaStars() {
    try {
      const saved = localStorage.getItem('cbse5_hindi_sangya_stars');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  }

  saveSangyaStars(stars) {
    this.state.sangyaStars = Math.max(this.state.sangyaStars, stars);
    try {
      localStorage.setItem('cbse5_hindi_sangya_stars', String(this.state.sangyaStars));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  initElements() {
    // Sidebar Navigation Elements
    this.sidebar = document.getElementById('sidebar');
    this.sidebarBackdrop = document.getElementById('sidebar-backdrop');
    this.sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    this.navItemVakyansh = document.getElementById('nav-item-vakyansh');
    this.navItemSangya = document.getElementById('nav-item-sangya');
    this.navItemChitra = document.getElementById('nav-item-chitra');
    this.starsNavVakyansh = document.getElementById('stars-nav-vakyansh');
    this.starsNavSangya = document.getElementById('stars-nav-sangya');
    this.starsNavChitra = document.getElementById('stars-nav-chitra');
    this.sidebarScenesContainer = document.getElementById('sidebar-scenes-container');
    this.sidebarTopics = document.getElementById('sidebar-topics');
    this.progressFill = document.getElementById('progress-fill');
    this.progressLabel = document.getElementById('progress-label');

    // Top Bar Elements
    this.menuToggleBtn = document.getElementById('menu-toggle-btn');
    this.topBarTitle = document.getElementById('top-bar-title');
    this.topBarSubtitle = document.getElementById('top-bar-subtitle');
    this.btnTranslateToggle = document.getElementById('btn-translate-toggle');
    this.transToggleLabel = document.getElementById('trans-toggle-label');
    this.btnReset = document.getElementById('btn-reset');
    this.modeTabs = document.getElementById('mode-tabs');

    // Workspaces
    this.welcomeScreen = document.getElementById('welcome-screen');
    this.welcomeStartBtn = document.getElementById('welcome-start-btn');
    this.sceneArea = document.getElementById('scene-area');
    this.vakyanshArea = document.getElementById('vakyansh-area');
    this.vakyanshWorkspace = document.getElementById('vakyansh-workspace');
    this.vakyanshEarnedStars = document.getElementById('vakyansh-earned-stars');
    this.sangyaArea = document.getElementById('sangya-area');
    this.sangyaWorkspace = document.getElementById('sangya-workspace');
    this.sangyaEarnedStars = document.getElementById('sangya-earned-stars');

    // Picture components (Chitra Varnan)
    this.pictureHeading = document.getElementById('picture-heading');
    this.pictureHint = document.getElementById('picture-hint');
    this.pictureIllustrationWrapper = document.getElementById('picture-illustration-wrapper');
    this.hotspotCounter = document.getElementById('hotspot-counter');
    this.illustrationCanvas = document.getElementById('illustration-canvas');
    this.hotspotDetailBox = document.getElementById('hotspot-detail-box');
    this.modePanel = document.getElementById('mode-panel');
    this.btnViewReal = document.getElementById('btn-view-real');
    this.btnViewCartoon = document.getElementById('btn-view-cartoon');
    this.btnToggleBw = document.getElementById('btn-toggle-bw');
    this.bwToggleLabel = document.getElementById('bw-toggle-label');

    // Feedback Flash
    this.feedbackFlash = document.getElementById('feedback-flash');

    // Modal
    this.resultsModal = document.getElementById('results-modal');
    this.btnNextScene = document.getElementById('btn-next-scene');
    this.btnCloseModal = document.getElementById('btn-close-modal');
    this.resultStars = document.getElementById('result-stars');
    this.resultScore = document.getElementById('result-score');
    this.resultStarsCount = document.getElementById('result-stars-count');
  }

  bindEvents() {
    // Sidebar Drawer Toggle
    this.menuToggleBtn.addEventListener('click', () => this.toggleSidebar(true));
    this.sidebarCloseBtn.addEventListener('click', () => this.toggleSidebar(false));
    this.sidebarBackdrop.addEventListener('click', () => this.toggleSidebar(false));

    // Curriculum Topic Selectors
    this.navItemVakyansh.addEventListener('click', () => {
      this.switchModule('vakyansh');
      if (window.innerWidth <= 860) this.toggleSidebar(false);
    });
    if (this.navItemSangya) {
      this.navItemSangya.addEventListener('click', () => {
        this.switchModule('sangya');
        if (window.innerWidth <= 860) this.toggleSidebar(false);
      });
    }
    this.navItemChitra.addEventListener('click', () => {
      this.switchModule('chitra');
      if (window.innerWidth <= 860) this.toggleSidebar(false);
    });

    // Image View Mode Toggle (Real Exam Photo ↔ Vector Cartoon)
    if (this.btnViewReal && this.btnViewCartoon) {
      this.btnViewReal.addEventListener('click', () => {
        synth.tap();
        this.setImageMode('real');
      });
      this.btnViewCartoon.addEventListener('click', () => {
        synth.tap();
        this.setImageMode('cartoon');
      });
    }

    // B&W Exam Paper Print Toggle
    if (this.btnToggleBw) {
      this.btnToggleBw.addEventListener('click', () => {
        synth.tap();
        this.toggleBWMode();
      });
    }

    // Welcome start
    this.welcomeStartBtn.addEventListener('click', () => {
      synth.tap();
      this.welcomeScreen.style.display = 'none';
      this.sceneArea.style.display = 'flex';
      this.loadScene(this.state.currentSceneId);
    });

    // Translation Toggle
    this.btnTranslateToggle.addEventListener('click', () => {
      synth.tap();
      this.state.showEnglish = !this.state.showEnglish;
      this.updateTranslateButtonUI();
      this.saveAppState();
      if (this.state.activeModule === 'chitra') {
        this.renderCurrentMode();
        this.renderHotspotDetail(this.state.activeHotspotId);
      } else if (this.state.activeModule === 'vakyansh') {
        this.renderVakyanshWorkspace();
      } else if (this.state.activeModule === 'sangya') {
        this.renderSangyaWorkspace();
      }
    });

    // Reset button
    this.btnReset.addEventListener('click', () => {
      synth.tap();
      if (this.state.activeModule === 'chitra') {
        this.state.puzzleProgress = { stepIdx: 0, selectedWords: [], isCompleted: false };
        this.state.activeHotspotId = null;
        this.loadScene(this.state.currentSceneId);
        this.flash('चित्र और अभ्यास रीसेट किए गए (Reset done)', 'info');
      } else if (this.state.activeModule === 'vakyansh') {
        this.resetVakyanshMode();
        this.flash('वाक्यांश अभ्यास रीसेट किया गया (Reset done)', 'info');
      } else if (this.state.activeModule === 'sangya') {
        this.resetSangyaMode();
        this.flash('संज्ञा अभ्यास रीसेट किया गया (Reset done)', 'info');
      }
    });

    // Mode Tabs Click Delegation
    this.modeTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.mode-tab');
      if (!tab) return;
      synth.tap();
      const mode = tab.dataset.mode;
      if (this.state.activeModule === 'chitra') {
        this.state.chitraMode = mode;
        this.updateModeTabsUI();
        this.renderCurrentMode();
      } else if (this.state.activeModule === 'vakyansh') {
        this.state.vakyanshMode = mode;
        this.updateModeTabsUI();
        this.renderVakyanshWorkspace();
      } else if (this.state.activeModule === 'sangya') {
        this.state.sangyaMode = mode;
        this.updateModeTabsUI();
        this.renderSangyaWorkspace();
      }
      this.saveAppState();
    });

    // Results Modal actions
    this.btnCloseModal.addEventListener('click', () => {
      this.resultsModal.classList.remove('open');
    });
    this.btnNextScene.addEventListener('click', () => {
      this.resultsModal.classList.remove('open');
      if (this.state.activeModule === 'chitra') {
        const curIdx = SCENE_DATA.findIndex(s => s.id === this.state.currentSceneId);
        const nextIdx = (curIdx + 1) % SCENE_DATA.length;
        this.loadScene(SCENE_DATA[nextIdx].id);
      } else if (this.state.activeModule === 'vakyansh') {
        this.state.vakyanshMode = 'learn';
        this.updateModeTabsUI();
        this.renderVakyanshWorkspace();
      } else if (this.state.activeModule === 'sangya') {
        this.state.sangyaMode = 'learn';
        this.updateModeTabsUI();
        this.renderSangyaWorkspace();
      }
    });
  }

  toggleSidebar(open) {
    synth.tap();
    if (open) {
      this.sidebar.classList.add('open');
      this.sidebarBackdrop.classList.add('active');
    } else {
      this.sidebar.classList.remove('open');
      this.sidebarBackdrop.classList.remove('active');
    }
  }

  updateTranslateButtonUI() {
    if (this.state.showEnglish) {
      this.btnTranslateToggle.classList.add('active');
      this.transToggleLabel.textContent = 'English: ON';
    } else {
      this.btnTranslateToggle.classList.remove('active');
      this.transToggleLabel.textContent = 'English: OFF';
    }
  }

  flash(msg, type = 'success') {
    this.feedbackFlash.textContent = msg;
    this.feedbackFlash.className = `feedback-flash ${type} show`;
    setTimeout(() => {
      this.feedbackFlash.classList.remove('show');
    }, 2400);
  }

  updateCurriculumNavUI() {
    this.navItemChitra.classList.toggle('active', this.state.activeModule === 'chitra');
    this.navItemVakyansh.classList.toggle('active', this.state.activeModule === 'vakyansh');
    if (this.navItemSangya) {
      this.navItemSangya.classList.toggle('active', this.state.activeModule === 'sangya');
    }

    // Chitra stars
    let chitraStars = 0;
    Object.values(this.state.stars).forEach(s => chitraStars += s);
    this.starsNavChitra.textContent = `${chitraStars}⭐`;

    // Vakyansh stars
    const vStars = this.state.vakyanshStars || 0;
    this.starsNavVakyansh.textContent = '⭐'.repeat(vStars) || '☆☆☆';
    if (this.vakyanshEarnedStars) {
      this.vakyanshEarnedStars.textContent = `${vStars} / 3`;
    }

    // Sangya stars
    const sStars = this.state.sangyaStars || 0;
    if (this.starsNavSangya) {
      this.starsNavSangya.textContent = '⭐'.repeat(sStars) || '☆☆☆';
    }
    if (this.sangyaEarnedStars) {
      this.sangyaEarnedStars.textContent = `${sStars} / 3`;
    }
  }

  updateProgressUI() {
    this.updateCurriculumNavUI();
    const chitraTotal = SCENE_DATA.length * 3;
    let earnedChitra = 0;
    Object.values(this.state.stars).forEach(s => earnedChitra += s);

    const totalPossible = chitraTotal + 3 + 3; // 18 + 3 (Vakyansh) + 3 (Sangya) = 24
    const totalEarned = earnedChitra + this.state.vakyanshStars + this.state.sangyaStars;
    const pct = Math.round((totalEarned / totalPossible) * 100);

    this.progressFill.style.width = `${pct}%`;
    this.progressLabel.textContent = `${totalEarned} / ${totalPossible} सितारे (${pct}%)`;
  }

  // ============================================
  // MODULE SWITCHER (Chitra Varnan ↔ Vakyansh ↔ Sangya)
  // ============================================
  switchModule(moduleName, playSound = true) {
    if (playSound) synth.tap();
    this.state.activeModule = moduleName;
    this.welcomeScreen.style.display = 'none';
    this.updateCurriculumNavUI();
    this.updateModeTabsUI();

    if (moduleName === 'chitra') {
      this.sidebarScenesContainer.style.display = 'block';
      this.vakyanshArea.style.display = 'none';
      if (this.sangyaArea) this.sangyaArea.style.display = 'none';
      this.sceneArea.style.display = 'flex';
      this.loadScene(this.state.currentSceneId);
    } else if (moduleName === 'vakyansh') {
      this.sidebarScenesContainer.style.display = 'none';
      this.sceneArea.style.display = 'none';
      if (this.sangyaArea) this.sangyaArea.style.display = 'none';
      this.vakyanshArea.style.display = 'flex';

      this.topBarTitle.textContent = 'वाक्यांश के लिए एक शब्द';
      this.topBarSubtitle.textContent = this.state.showEnglish
        ? 'One Word Substitution — Understand, learn & practice with memory clues'
        : '12 महत्वपूर्ण वाक्यांश — अर्थ, सूत्र, युक्ति व अभ्यास';

      this.renderVakyanshWorkspace();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (moduleName === 'sangya') {
      this.sidebarScenesContainer.style.display = 'none';
      this.sceneArea.style.display = 'none';
      this.vakyanshArea.style.display = 'none';
      if (this.sangyaArea) this.sangyaArea.style.display = 'flex';

      this.topBarTitle.textContent = 'संज्ञा व संज्ञा के पाँच भेद';
      this.topBarSubtitle.textContent = this.state.showEnglish
        ? 'Nouns & 5 Types (Proper, Common, Abstract, Material, Collective)'
        : 'संज्ञा की परिभाषा, 5 मुख्य भेद, पहचान सूत्र, प्रयोगशाला व अभ्यास';

      this.renderSangyaWorkspace();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.saveAppState();
  }

  updateModeTabsUI() {
    this.modeTabs.innerHTML = '';
    if (this.state.activeModule === 'chitra') {
      const tabs = [
        { mode: 'explore', label: '🔍 चित्र अवलोकन' },
        { mode: 'vocab', label: '🔤 शब्द भंडार' },
        { mode: 'puzzle', label: '🧩 वाक्य खेल' },
        { mode: 'write', label: '✍️ 5-वाक्य रचना' }
      ];
      tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `mode-tab ${this.state.chitraMode === t.mode ? 'active' : ''}`;
        btn.dataset.mode = t.mode;
        btn.textContent = t.label;
        this.modeTabs.appendChild(btn);
      });
    } else if (this.state.activeModule === 'vakyansh') {
      const tabs = [
        { mode: 'learn', label: '📖 सीखें व समझें' },
        { mode: 'match', label: '🃏 मिलान खेल' },
        { mode: 'quiz', label: '❓ अभ्यास क्विज़' },
        { mode: 'challenge', label: '🎯 60s चैलेंज' }
      ];
      tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `mode-tab ${this.state.vakyanshMode === t.mode ? 'active' : ''}`;
        btn.dataset.mode = t.mode;
        btn.textContent = t.label;
        this.modeTabs.appendChild(btn);
      });
    } else if (this.state.activeModule === 'sangya') {
      const tabs = [
        { mode: 'learn', label: '📖 सीखें व समझें' },
        { mode: 'sort', label: '🏷️ भेद पहचानो (खेल)' },
        { mode: 'quiz', label: '❓ अभ्यास क्विज़' },
        { mode: 'challenge', label: '⚡ 60s स्पीड चैलेंज' }
      ];
      tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `mode-tab ${this.state.sangyaMode === t.mode ? 'active' : ''}`;
        btn.dataset.mode = t.mode;
        btn.textContent = t.label;
        this.modeTabs.appendChild(btn);
      });
    }
  }

  // ============================================
  // VAKYANSH WORKSPACE ENGINE
  // ============================================
  renderVakyanshWorkspace() {
    if (this.state.challengeState.timerInterval) {
      clearInterval(this.state.challengeState.timerInterval);
      this.state.challengeState.timerInterval = null;
    }

    switch (this.state.vakyanshMode) {
      case 'learn':
        this.renderVakyanshLearnMode();
        break;
      case 'match':
        this.renderVakyanshMatchMode();
        break;
      case 'quiz':
        this.renderVakyanshQuizMode();
        break;
      case 'challenge':
        this.renderVakyanshChallengeMode();
        break;
    }
  }

  resetVakyanshMode() {
    if (this.state.vakyanshMode === 'match') {
      this.initMatchGame();
    } else if (this.state.vakyanshMode === 'quiz') {
      this.state.quizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false };
      this.renderVakyanshQuizMode();
    } else if (this.state.vakyanshMode === 'challenge') {
      this.startVakyanshChallenge();
    } else {
      this.state.vakyanshFilter = 'all';
      this.renderVakyanshLearnMode();
    }
  }

  // --- VAKYANSH MODE 1: LEARN CARDS ---
  renderVakyanshLearnMode() {
    const filter = this.state.vakyanshFilter;
    const filteredList = filter === 'all'
      ? VAKYANSH_DATA
      : VAKYANSH_DATA.filter(item => item.category === filter);

    this.vakyanshWorkspace.innerHTML = `
      <div class="vakyansh-learn-panel">
        <div class="vakyansh-controls-bar">
          <div class="vocab-filters">
            <button class="vocab-filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">सभी 12 शब्द</button>
            <button class="vocab-filter-btn ${filter === 'behavior' ? 'active' : ''}" data-filter="behavior">स्वभाव व आचरण</button>
            <button class="vocab-filter-btn ${filter === 'action' ? 'active' : ''}" data-filter="action">कर्म व परिश्रम</button>
            <button class="vocab-filter-btn ${filter === 'nature' ? 'active' : ''}" data-filter="nature">जीवन व प्रकृति</button>
          </div>
          <input
            type="text"
            class="vakyansh-search-input"
            id="vakyansh-search-input"
            placeholder="🔍 शब्द या वाक्यांश खोजें (Search)...">
        </div>

        <div class="vakyansh-cards-grid" id="vakyansh-cards-grid">
          ${filteredList.map(item => this.getVakyanshCardHtml(item)).join('')}
        </div>
      </div>
    `;

    // Category filter click
    this.vakyanshWorkspace.querySelectorAll('.vocab-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        synth.tap();
        this.state.vakyanshFilter = btn.dataset.filter;
        this.saveAppState();
        this.renderVakyanshLearnMode();
      });
    });

    // Live search
    const searchInput = this.vakyanshWorkspace.querySelector('#vakyansh-search-input');
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      const cards = this.vakyanshWorkspace.querySelectorAll('.vakyansh-card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });
  }

  getVakyanshCardHtml(item) {
    const enPhrase = this.state.showEnglish ? `<div class="vakyansh-phrase-en">${item.phraseEn}</div>` : '';
    const enWord = this.state.showEnglish ? `<span class="vakyansh-word-en">${item.wordEn} (${item.translit})</span>` : '';
    const enExample = this.state.showEnglish ? `<div class="vakyansh-example-en">🌐 ${item.exampleEn}</div>` : '';
    const oppositeTag = item.oppositeHi ? `<div class="vakyansh-opposite-tag">🔄 विलोम: ${item.oppositeHi}</div>` : '';

    return `
      <div class="vakyansh-card" data-id="${item.id}">
        <div class="vakyansh-card-header">
          <div class="vakyansh-num-badge">${item.id}</div>
          <div class="vakyansh-phrase-group">
            <div class="vakyansh-phrase-title">${item.phraseHi}</div>
            ${enPhrase}
          </div>
          <div class="vakyansh-word-badge">
            <span class="vakyansh-word-hi">${item.wordHi}</span>
            ${enWord}
          </div>
        </div>

        <div class="vakyansh-formula-box">
          <div class="vakyansh-formula-label">💡 समझने का सूत्र (Root Breakdown):</div>
          <div class="vakyansh-formula-code">${item.formula}</div>
        </div>

        <div class="vakyansh-clue-box">
          <strong>🧠 याद रखने की युक्ति:</strong> ${item.clue}
        </div>

        <div class="vakyansh-example-box">
          <div class="vakyansh-example-hi">📝 <strong>वाक्य प्रयोग:</strong> ${item.exampleHi}</div>
          ${enExample}
        </div>

        ${oppositeTag}
      </div>
    `;
  }

  // --- VAKYANSH MODE 2: MATCH CARDS GAME ---
  renderVakyanshMatchMode() {
    if (!this.state.matchState.cards || this.state.matchState.cards.length === 0) {
      this.initMatchGame();
      return;
    }

    const ms = this.state.matchState;
    const totalPairs = ms.cards.length / 2;
    const matchedCount = ms.matchedPairIds.length;
    const isCompleted = matchedCount === totalPairs;

    this.vakyanshWorkspace.innerHTML = `
      <div class="match-game-container">
        <div class="match-status-bar">
          <span class="match-score-pill">जोड़ियाँ: ${matchedCount} / ${totalPairs} मिलाईं</span>
          <span class="match-score-pill">कुल चालें: ${ms.moves}</span>
          <span class="match-instruction">वाक्यांश और उसके सही एक शब्द पर टैप करके जोड़ी बनाएं</span>
          <button class="btn" id="btn-restart-match" style="min-height:36px; padding:4px 12px;">🔄 नया खेल (Shuffle)</button>
        </div>

        ${isCompleted ? `
          <div style="text-align:center; padding: 24px; background: rgba(16,185,129,0.12); border-radius: var(--radius-lg); border: 1px solid rgba(16,185,129,0.4);">
            <div style="font-size:3rem; margin-bottom:8px;">🎉</div>
            <h3 style="color:#6ee7b7; font-size:1.35rem; margin-bottom:6px;">शाबाश! आपने सभी ${totalPairs} जोड़ियाँ सफलतापूर्वक मिला लीं!</h3>
            <p style="color:var(--text-secondary); margin-bottom:16px;">आपने कुल ${ms.moves} चालों में यह खेल पूरा किया।</p>
            <button class="btn btn-primary" id="btn-play-next-round">🚀 अगला राउंड खेलें →</button>
          </div>
        ` : `
          <div class="match-board" id="match-board">
            ${ms.cards.map((card, idx) => {
              const isMatched = ms.matchedPairIds.includes(card.pairId);
              const isSelected = ms.firstCard && ms.firstCard.idx === idx;
              return `
                <button
                  class="match-card ${card.type === 'phrase' ? 'type-phrase' : 'type-word'} ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}"
                  data-idx="${idx}"
                  data-pair-id="${card.pairId}"
                  ${isMatched ? 'disabled' : ''}>
                  <div class="match-card-hi">${card.textHi}</div>
                  ${this.state.showEnglish ? `<div class="match-card-en">${card.textEn}</div>` : ''}
                </button>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;

    // Restart button
    this.vakyanshWorkspace.querySelector('#btn-restart-match')?.addEventListener('click', () => {
      synth.tap();
      this.initMatchGame();
    });
    this.vakyanshWorkspace.querySelector('#btn-play-next-round')?.addEventListener('click', () => {
      synth.tap();
      this.initMatchGame();
    });

    // Card Click Binding
    if (!isCompleted) {
      this.vakyanshWorkspace.querySelectorAll('.match-card:not(.matched)').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx, 10);
          this.handleMatchCardClick(idx);
        });
      });
    }
  }

  initMatchGame() {
    // Pick 6 random items from the 12 phrases
    const shuffledItems = [...VAKYANSH_DATA].sort(() => 0.5 - Math.random()).slice(0, 6);
    const cards = [];

    shuffledItems.forEach(item => {
      cards.push({
        pairId: item.id,
        type: 'phrase',
        textHi: item.phraseHi,
        textEn: item.phraseEn
      });
      cards.push({
        pairId: item.id,
        type: 'word',
        textHi: item.wordHi,
        textEn: `${item.wordEn} (${item.translit})`
      });
    });

    // Shuffle the 12 cards
    cards.sort(() => 0.5 - Math.random());

    this.state.matchState = {
      cards,
      firstCard: null,
      matchedPairIds: [],
      moves: 0
    };

    this.renderVakyanshMatchMode();
  }

  handleMatchCardClick(idx) {
    const ms = this.state.matchState;
    const clickedCard = ms.cards[idx];

    // Don't allow clicking an already matched card or re-clicking the same card
    if (ms.matchedPairIds.includes(clickedCard.pairId)) return;
    if (ms.firstCard && ms.firstCard.idx === idx) return;

    synth.tap();

    if (!ms.firstCard) {
      // First card chosen
      ms.firstCard = { idx, ...clickedCard };
      this.renderVakyanshMatchMode();
    } else {
      // Second card chosen
      ms.moves++;
      const first = ms.firstCard;
      const isMatch = first.pairId === clickedCard.pairId && first.type !== clickedCard.type;

      if (isMatch) {
        synth.success();
        ms.matchedPairIds.push(first.pairId);
        ms.firstCard = null;

        if (ms.matchedPairIds.length === ms.cards.length / 2) {
          synth.fanfare();
          this.confetti.burst(50);
        }
        this.renderVakyanshMatchMode();
      } else {
        synth.error();
        // Highlight wrong pair
        const board = this.vakyanshWorkspace.querySelector('#match-board');
        if (board) {
          const btn1 = board.querySelector(`[data-idx="${first.idx}"]`);
          const btn2 = board.querySelector(`[data-idx="${idx}"]`);
          if (btn1) btn1.classList.add('wrong');
          if (btn2) btn2.classList.add('wrong');
        }

        setTimeout(() => {
          ms.firstCard = null;
          this.renderVakyanshMatchMode();
        }, 700);
      }
    }
  }

  // --- VAKYANSH MODE 3: PRACTICE QUIZ ---
  renderVakyanshQuizMode() {
    const qs = this.state.quizState;
    const questions = VAKYANSH_QUIZ_POOL;
    const totalQ = questions.length;
    if (qs.qIndex >= totalQ) qs.qIndex = 0;
    const q = questions[qs.qIndex];

    const letters = ['क', 'ख', 'ग', 'घ'];

    this.vakyanshWorkspace.innerHTML = `
      <div class="vakyansh-quiz-panel">
        <!-- Score Bar & Restart Button -->
        <div class="score-bar" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; background:rgba(0,0,0,0.3); padding:10px 14px; border-radius:var(--radius-md); border:var(--border-glass);">
          <div style="display:flex; gap:16px; align-items:center;">
            <div class="score-item" style="text-align:center;">
              <div class="score-value" style="font-size:1.3rem; font-weight:800; color:var(--accent-green);">${qs.score.correct}</div>
              <div class="score-label" style="font-size:0.7rem; color:var(--text-muted);">सही (Correct)</div>
            </div>
            <div class="score-item" style="text-align:center;">
              <div class="score-value" style="font-size:1.3rem; font-weight:800; color:var(--accent-red);">${qs.score.wrong}</div>
              <div class="score-label" style="font-size:0.7rem; color:var(--text-muted);">गलत (Wrong)</div>
            </div>
            <div class="score-item" style="text-align:center;">
              <div class="score-value" style="font-size:1.3rem; font-weight:800; color:var(--accent-saffron-light);">${Math.max(0, totalQ - qs.qIndex)}</div>
              <div class="score-label" style="font-size:0.7rem; color:var(--text-muted);">शेष (Remaining)</div>
            </div>
          </div>
          <button class="btn btn-restart-quiz" id="btn-restart-vakyansh-quiz" style="padding:6px 12px; font-size:0.78rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.18); color:var(--text-secondary); border-radius:var(--radius-sm); cursor:pointer;">
            🔄 पुनः आरंभ (Restart)
          </button>
        </div>

        <!-- Question Card -->
        <div class="vakyansh-quiz-card">
          <div class="quiz-q-num">प्रश्न ${qs.qIndex + 1} / ${totalQ}</div>
          <div class="quiz-q-prompt">${q.qHi}</div>
          ${this.state.showEnglish ? `<div class="quiz-q-prompt-en">🌐 ${q.qEn}</div>` : ''}

          <!-- Options Grid -->
          <div class="quiz-options-grid" id="quiz-options-grid">
            ${q.options.map((opt, i) => `
              <button class="quiz-opt-btn" data-opt-idx="${i}">
                <span class="quiz-opt-letter">${letters[i]}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>

          <!-- Explanation Box -->
          <div class="quiz-explanation-box" id="quiz-exp-box" style="display:none;"></div>

          <!-- Next Button -->
          <div style="display:flex; justify-content:flex-end; margin-top:8px;">
            <button class="btn btn-primary" id="btn-quiz-next" style="display:none;">
              ${qs.qIndex < totalQ - 1 ? 'अगला प्रश्न →' : 'परिणाम देखें 🏆'}
            </button>
          </div>
        </div>
      </div>
    `;

    const optBtns = this.vakyanshWorkspace.querySelectorAll('#quiz-options-grid .quiz-opt-btn');
    const expBox = this.vakyanshWorkspace.querySelector('#quiz-exp-box');
    const nextBtn = this.vakyanshWorkspace.querySelector('#btn-quiz-next');

    // Restart button handler
    this.vakyanshWorkspace.querySelector('#btn-restart-vakyansh-quiz')?.addEventListener('click', () => {
      synth.tap();
      this.state.quizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false, selectedOption: null };
      this.saveAppState();
      this.renderVakyanshQuizMode();
    });

    // If restored in already answered state
    if (qs.answered && qs.selectedOption !== null && qs.selectedOption !== undefined) {
      optBtns.forEach(b => b.setAttribute('disabled', 'true'));
      const chosenIdx = qs.selectedOption;
      if (chosenIdx === q.correct) {
        if (optBtns[chosenIdx]) optBtns[chosenIdx].classList.add('correct');
        expBox.innerHTML = `<strong>🎉 बिल्कुल सही उत्तर!</strong><br>${q.exp}`;
      } else {
        if (optBtns[chosenIdx]) optBtns[chosenIdx].classList.add('wrong');
        if (optBtns[q.correct]) optBtns[q.correct].classList.add('correct');
        expBox.innerHTML = `<strong>❌ सही उत्तर ‘${q.options[q.correct]}’ है:</strong><br>${q.exp}`;
      }
      expBox.style.display = 'block';
      nextBtn.style.display = 'inline-flex';
    }

    // Bind Option clicks
    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (qs.answered) return;
        qs.answered = true;
        const chosenIdx = parseInt(btn.dataset.optIdx, 10);
        qs.selectedOption = chosenIdx;

        optBtns.forEach(b => b.setAttribute('disabled', 'true'));

        if (chosenIdx === q.correct) {
          synth.success();
          btn.classList.add('correct');
          qs.score.correct++;
          expBox.innerHTML = `<strong>🎉 बिल्कुल सही उत्तर!</strong><br>${q.exp}`;
        } else {
          synth.error();
          btn.classList.add('wrong');
          qs.score.wrong++;
          // Highlight correct one
          const correctBtn = this.vakyanshWorkspace.querySelector(`[data-opt-idx="${q.correct}"]`);
          if (correctBtn) correctBtn.classList.add('correct');
          expBox.innerHTML = `<strong>❌ सही उत्तर ‘${q.options[q.correct]}’ है:</strong><br>${q.exp}`;
        }

        expBox.style.display = 'block';
        nextBtn.style.display = 'inline-flex';
        this.saveAppState();
      });
    });

    // Next Question Button
    nextBtn?.addEventListener('click', () => {
      synth.tap();
      if (qs.qIndex < totalQ - 1) {
        qs.qIndex++;
        qs.answered = false;
        qs.selectedOption = null;
        this.saveAppState();
        this.renderVakyanshQuizMode();
      } else {
        // Quiz complete modal
        const pct = Math.round((qs.score.correct / totalQ) * 100);
        const starsEarned = pct >= 80 ? 3 : (pct >= 50 ? 2 : 1);

        this.saveVakyanshStars(starsEarned);
        this.updateProgressUI();

        if (starsEarned === 3) {
          synth.fanfare();
          this.confetti.burst(60);
        }

        this.resultStars.textContent = '⭐'.repeat(starsEarned);
        this.resultScore.textContent = `${pct}%`;
        this.resultStarsCount.textContent = String(starsEarned);
        this.resultsModal.classList.add('open');

        // Reset quiz session on completion
        this.state.quizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false, selectedOption: null };
        this.saveAppState();
      }
    });
  }

  // --- VAKYANSH MODE 4: 60s TIMED CHALLENGE ---
  renderVakyanshChallengeMode() {
    this.startVakyanshChallenge();
  }

  startVakyanshChallenge() {
    if (this.state.challengeState.timerInterval) {
      clearInterval(this.state.challengeState.timerInterval);
    }

    // Pick 10 randomized questions
    const pool = [...VAKYANSH_QUIZ_POOL].sort(() => 0.5 - Math.random()).slice(0, 10);

    this.state.challengeState = {
      timer: 60,
      timerInterval: null,
      qIndex: 0,
      score: 0,
      answered: false,
      questions: pool
    };

    this.renderChallengeQuestion();

    // Start timer interval
    this.state.challengeState.timerInterval = setInterval(() => {
      const cs = this.state.challengeState;
      cs.timer--;
      const timerFill = document.getElementById('challenge-timer-fill');
      const timerText = document.getElementById('challenge-timer-text');

      if (timerFill) {
        const pct = (cs.timer / 60) * 100;
        timerFill.style.width = `${pct}%`;
        if (cs.timer <= 15) timerFill.classList.add('urgent');
      }
      if (timerText) {
        timerText.textContent = `⏱️ समय शेष: ${cs.timer}s`;
      }

      if (cs.timer <= 0) {
        clearInterval(cs.timerInterval);
        cs.timerInterval = null;
        this.finishChallenge();
      }
    }, 1000);
  }

  renderChallengeQuestion() {
    const cs = this.state.challengeState;
    const totalQ = cs.questions.length;

    if (cs.qIndex >= totalQ) {
      if (cs.timerInterval) clearInterval(cs.timerInterval);
      this.finishChallenge();
      return;
    }

    const q = cs.questions[cs.qIndex];
    const letters = ['क', 'ख', 'ग', 'घ'];

    this.vakyanshWorkspace.innerHTML = `
      <div class="challenge-panel">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <span style="font-size:0.9rem; font-weight:700; color:var(--accent-saffron-light);">
            ⚡ 60-सेकंड चैलेंज — प्रश्न ${cs.qIndex + 1} / ${totalQ}
          </span>
          <span id="challenge-timer-text" style="font-size:0.92rem; font-weight:800; color:var(--text-primary);">
            ⏱️ समय शेष: ${cs.timer}s
          </span>
          <span style="font-size:0.9rem; font-weight:700; color:var(--accent-green);">
            स्कोर: ${cs.score}
          </span>
        </div>

        <!-- Timer bar -->
        <div class="challenge-timer-bar">
          <div class="challenge-timer-fill ${cs.timer <= 15 ? 'urgent' : ''}" id="challenge-timer-fill" style="width:${(cs.timer/60)*100}%;"></div>
        </div>

        <!-- Question Card -->
        <div class="vakyansh-quiz-card">
          <div class="quiz-q-prompt">${q.qHi}</div>
          ${this.state.showEnglish ? `<div class="quiz-q-prompt-en">🌐 ${q.qEn}</div>` : ''}

          <div class="quiz-options-grid" id="challenge-options-grid">
            ${q.options.map((opt, i) => `
              <button class="quiz-opt-btn" data-opt-idx="${i}">
                <span class="quiz-opt-letter">${letters[i]}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Fast-paced Option Click
    this.vakyanshWorkspace.querySelectorAll('#challenge-options-grid .quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (cs.answered) return;
        cs.answered = true;
        const chosenIdx = parseInt(btn.dataset.optIdx, 10);

        if (chosenIdx === q.correct) {
          synth.success();
          btn.classList.add('correct');
          cs.score++;
        } else {
          synth.error();
          btn.classList.add('wrong');
        }

        setTimeout(() => {
          cs.qIndex++;
          cs.answered = false;
          this.renderChallengeQuestion();
        }, 600);
      });
    });
  }

  finishChallenge() {
    const cs = this.state.challengeState;
    const totalQ = cs.questions.length;
    const pct = Math.round((cs.score / totalQ) * 100);
    const starsEarned = cs.score >= 8 ? 3 : (cs.score >= 5 ? 2 : 1);

    this.saveVakyanshStars(starsEarned);
    this.updateProgressUI();

    if (starsEarned === 3) {
      synth.fanfare();
      this.confetti.burst(70);
    } else {
      synth.success();
    }

    this.resultStars.textContent = '⭐'.repeat(starsEarned);
    this.resultScore.textContent = `${pct}% (${cs.score}/${totalQ})`;
    this.resultStarsCount.textContent = String(starsEarned);
    this.resultsModal.classList.add('open');

    this.vakyanshWorkspace.innerHTML = `
      <div style="text-align:center; padding:32px 16px; background:var(--bg-card); border-radius:var(--radius-xl); border:var(--border-glass);">
        <div style="font-size:3.5rem; margin-bottom:12px;">🏆</div>
        <h3 style="font-size:1.5rem; color:var(--accent-saffron-light); margin-bottom:6px;">चैलेंज पूरा हुआ! (Challenge Complete!)</h3>
        <p style="color:var(--text-secondary); margin-bottom:18px;">आपने 60 सेकंड में ${cs.score} / ${totalQ} अंक प्राप्त किए और ${starsEarned} सितारे अर्जित किए!</p>
        <button class="btn btn-primary" id="btn-challenge-retry">🚀 दोबारा खेलें (Try Again)</button>
      </div>
    `;

    this.vakyanshWorkspace.querySelector('#btn-challenge-retry').addEventListener('click', () => {
      synth.tap();
      this.startVakyanshChallenge();
    });
  }

  // ============================================
  // SANGYA WORKSPACE ENGINE (संज्ञा व 5 भेद)
  // ============================================
  renderSangyaWorkspace() {
    if (this.state.sangyaChallengeState && this.state.sangyaChallengeState.timerInterval) {
      clearInterval(this.state.sangyaChallengeState.timerInterval);
      this.state.sangyaChallengeState.timerInterval = null;
    }

    switch (this.state.sangyaMode) {
      case 'learn':
        this.renderSangyaLearnMode();
        break;
      case 'sort':
        this.renderSangyaSortMode();
        break;
      case 'quiz':
        this.renderSangyaQuizMode();
        break;
      case 'challenge':
        this.renderSangyaChallengeMode();
        break;
    }
  }

  resetSangyaMode() {
    if (this.state.sangyaMode === 'sort') {
      this.initSangyaSortGame();
    } else if (this.state.sangyaMode === 'quiz') {
      this.state.sangyaQuizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false };
      this.renderSangyaQuizMode();
    } else if (this.state.sangyaMode === 'challenge') {
      this.startSangyaChallenge();
    } else {
      this.state.sangyaSubtab = 'types';
      this.state.sangyaLabFilter = 'all';
      this.renderSangyaLearnMode();
    }
  }

  // --- SANGYA MODE 1: LEARN & EXPLORE ---
  renderSangyaLearnMode() {
    const subtab = this.state.sangyaSubtab || 'types';

    let subtabHtml = '';
    if (subtab === 'types') {
      subtabHtml = `
        <div class="sangya-type-cards-grid">
          ${SANGYA_TYPES_DATA.map(t => this.getSangyaTypeCardHtml(t)).join('')}
        </div>
      `;
    } else if (subtab === 'mirror') {
      subtabHtml = `
        <div class="sangya-mirror-section">
          <div class="mirror-intro-card">
            💡 <strong>तुलना दर्पण (Comparison Mirror):</strong> परीक्षा में विद्यार्थी अक्सर व्यक्तिवाचक और जातिवाचक संज्ञा में भ्रमित हो जाते हैं। नीचे दिए गए तुलना युग्मों को ध्यानपूर्वक समझें:
          </div>
          <div class="mirror-cards-grid">
            ${SANGYA_COMPARISON_DATA.map(pair => `
              <div class="mirror-pair-card">
                <div class="mirror-vs-row">
                  <div class="mirror-side side-a">
                    <div class="mirror-side-word">${pair.wordA}</div>
                    <span class="mirror-side-tag ${pair.tagA}">${pair.typeA}</span>
                  </div>
                  <div class="mirror-vs-circle">VS</div>
                  <div class="mirror-side side-b">
                    <div class="mirror-side-word">${pair.wordB}</div>
                    <span class="mirror-side-tag ${pair.tagB}">${pair.typeB}</span>
                  </div>
                </div>
                <div class="mirror-reason-box">
                  🔍 <strong>कारण:</strong> ${pair.reason}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (subtab === 'lab') {
      const filter = this.state.sangyaLabFilter || 'all';
      const filteredLab = filter === 'all'
        ? BHAVVACHAK_NIRMAN_DATA
        : BHAVVACHAK_NIRMAN_DATA.filter(item => item.origin === filter);

      subtabHtml = `
        <div class="sangya-lab-section">
          <div class="lab-origin-filters">
            <button class="lab-origin-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">सभी 15 शब्द</button>
            <button class="lab-origin-btn ${filter === 'jati' ? 'active' : ''}" data-filter="jati">1. जातिवाचक संज्ञा से</button>
            <button class="lab-origin-btn ${filter === 'visheshan' ? 'active' : ''}" data-filter="visheshan">2. विशेषण से</button>
            <button class="lab-origin-btn ${filter === 'kriya' ? 'active' : ''}" data-filter="kriya">3. क्रिया से</button>
          </div>
          <div class="lab-cards-grid">
            ${filteredLab.map(item => `
              <div class="lab-card">
                <div class="lab-formula-row">
                  <span class="lab-base-word">${item.base}</span>
                  <span class="lab-plus-sign">+</span>
                  <span class="lab-suffix-word">${item.suffix}</span>
                  <span class="lab-arrow-sign">➔</span>
                  <span class="lab-result-word">${item.result}</span>
                </div>
                ${this.state.showEnglish ? `<div style="font-size:0.75rem; color:var(--text-muted);">🌐 ${item.en}</div>` : ''}
                <div class="lab-sentence-box">
                  💬 ${item.sentence}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    this.sangyaWorkspace.innerHTML = `
      <div class="sangya-learn-panel">
        <!-- Grand Definition Card -->
        <div class="sangya-def-card">
          <div class="sangya-def-header">
            <div class="sangya-def-icon">📖</div>
            <div>
              <div class="sangya-def-title">संज्ञा की परिभाषा (Definition of Noun)</div>
              ${this.state.showEnglish ? `<div class="sangya-def-title-en">Noun: The naming word for person, place, thing, creature, or emotion</div>` : ''}
            </div>
          </div>
          <div class="sangya-def-body">
            किसी <strong>व्यक्ति, वस्तु, स्थान, प्राणी या भाव</strong> के नाम को <strong>संज्ञा</strong> कहते हैं। संसार में प्रत्येक वस्तु की अपनी पहचान उसका नाम ही होता है।
          </div>
          <div class="sangya-pillars-grid">
            <div class="sangya-pillar-item">
              <div class="sangya-pillar-title">👤 व्यक्ति (Person)</div>
              <div class="sangya-pillar-examples">सचिन, भगत सिंह, मीरा, रोहन</div>
            </div>
            <div class="sangya-pillar-item">
              <div class="sangya-pillar-title">📦 वस्तु (Thing)</div>
              <div class="sangya-pillar-examples">पुस्तक, कलम, घड़ी, मेज, पंखा</div>
            </div>
            <div class="sangya-pillar-item">
              <div class="sangya-pillar-title">🏛️ स्थान (Place)</div>
              <div class="sangya-pillar-examples">दिल्ली, विद्यालय, भारत, आगरा</div>
            </div>
            <div class="sangya-pillar-item">
              <div class="sangya-pillar-title">🐘 प्राणी (Creature)</div>
              <div class="sangya-pillar-examples">हाथी, गाय, शेर, मोर, तोता</div>
            </div>
            <div class="sangya-pillar-item">
              <div class="sangya-pillar-title">💖 भाव (Emotion/State)</div>
              <div class="sangya-pillar-examples">मिठास, बचपन, ईमानदारी, खुशी</div>
            </div>
          </div>
        </div>

        <!-- Subnav Bar -->
        <div class="sangya-subnav-bar">
          <button class="sangya-subnav-btn ${subtab === 'types' ? 'active' : ''}" data-subtab="types">
            ⭐ 1. संज्ञा के पाँच भेद (5 Types)
          </button>
          <button class="sangya-subnav-btn ${subtab === 'mirror' ? 'active' : ''}" data-subtab="mirror">
            🪞 2. तुलना दर्पण (Traps & Contrasts)
          </button>
          <button class="sangya-subnav-btn ${subtab === 'lab' ? 'active' : ''}" data-subtab="lab">
            🧪 3. भाववाचक निर्माण प्रयोगशाला (Lab)
          </button>
        </div>

        <!-- Active Subtab Container -->
        <div class="sangya-subtab-content">
          ${subtabHtml}
        </div>
      </div>
    `;

    // Subtab click listeners
    this.sangyaWorkspace.querySelectorAll('.sangya-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        synth.tap();
        this.state.sangyaSubtab = btn.dataset.subtab;
        this.saveAppState();
        this.renderSangyaLearnMode();
      });
    });

    // Formation lab filter listeners
    this.sangyaWorkspace.querySelectorAll('.lab-origin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        synth.tap();
        this.state.sangyaLabFilter = btn.dataset.filter;
        this.saveAppState();
        this.renderSangyaLearnMode();
      });
    });
  }

  getSangyaTypeCardHtml(t) {
    return `
      <div class="sangya-type-card ${t.themeClass}">
        <div class="sangya-card-top">
          <div class="type-badge-group">
            <div class="type-badge-icon">${t.icon}</div>
            <div class="type-badge-texts">
              <h4>${t.nameHi}</h4>
              ${this.state.showEnglish ? `<span>${t.nameEn}</span>` : ''}
            </div>
          </div>
          <span class="type-num-badge">भेद #${t.num}</span>
        </div>

        <div class="sangya-card-def">
          ${t.defHi}
          ${this.state.showEnglish ? `<div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">🌐 ${t.defEn}</div>` : ''}
        </div>

        <div class="sangya-clue-box">
          💡 <strong>पहचान सूत्र:</strong> ${t.clueHi}
          ${this.state.showEnglish ? `<div style="font-size:0.75rem; color:#fef08a; margin-top:3px;">🌐 Clue: ${t.clueEn}</div>` : ''}
        </div>

        <div class="sangya-examples-wrap">
          <div class="sangya-examples-label">📌 प्रमुख उदाहरण (Examples):</div>
          <div class="sangya-chips-cloud">
            ${t.examples.map(ex => `<span class="sangya-chip">${ex}</span>`).join('')}
          </div>
        </div>

        <div class="sangya-trap-box">
          ${t.trapHi}
          ${this.state.showEnglish ? `<div style="font-size:0.75rem; margin-top:2px;">🌐 Trap: ${t.trapEn}</div>` : ''}
        </div>
      </div>
    `;
  }

  // --- SANGYA MODE 2: 5-BUCKET CLASSIFIER GAME ---
  initSangyaSortGame() {
    const shuffled = [...SANGYA_SORT_ITEMS].sort(() => 0.5 - Math.random());
    this.state.sangyaSortState = {
      items: shuffled,
      currentIndex: 0,
      score: 0,
      streak: 0,
      answered: false
    };
    this.renderSangyaSortMode();
  }

  renderSangyaSortMode() {
    if (!this.state.sangyaSortState.items || this.state.sangyaSortState.items.length === 0) {
      this.initSangyaSortGame();
      return;
    }

    const st = this.state.sangyaSortState;
    const totalItems = st.items.length;

    // Victory state when all sorted
    if (st.currentIndex >= totalItems) {
      const pct = Math.round((st.score / totalItems) * 100);
      let starsEarned = 1;
      if (pct >= 90) starsEarned = 3;
      else if (pct >= 70) starsEarned = 2;

      this.saveSangyaStars(starsEarned);

      this.sangyaWorkspace.innerHTML = `
        <div class="sangya-sort-panel">
          <div class="sort-complete-card">
            <div class="sort-complete-icon">🏆</div>
            <h3>शानदार! वर्गीकरण खेल पूर्ण हुआ!</h3>
            <div style="font-size:1.8rem; margin:6px 0;">${'⭐'.repeat(starsEarned)}</div>
            <p>आपने ${totalItems} शब्दों में से <strong>${st.score}</strong> शब्द बिल्कुल सही वर्गीकृत किए (${pct}% सटीकता)!</p>
            <div style="display:flex; gap:12px; margin-top:8px;">
              <button class="btn btn-primary" id="btn-sort-restart">🔄 दोबारा खेलें (Play Again)</button>
              <button class="btn" id="btn-sort-goto-quiz">❓ अभ्यास क्विज़ हल करें →</button>
            </div>
          </div>
        </div>
      `;

      this.sangyaWorkspace.querySelector('#btn-sort-restart').addEventListener('click', () => {
        synth.tap();
        this.initSangyaSortGame();
      });
      this.sangyaWorkspace.querySelector('#btn-sort-goto-quiz').addEventListener('click', () => {
        synth.tap();
        this.state.sangyaMode = 'quiz';
        this.updateModeTabsUI();
        this.renderSangyaWorkspace();
      });
      return;
    }

    const curItem = st.items[st.currentIndex];

    this.sangyaWorkspace.innerHTML = `
      <div class="sangya-sort-panel">
        <div class="sort-header-row">
          <div>
            <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-primary);">🏷️ भेद पहचानो: 5-घड़े वर्गीकरण खेल</h3>
            <p style="font-size:0.82rem; color:var(--text-secondary);">शब्द को पढ़कर सही संज्ञा भेद वाले घड़े (Bucket) पर टैप करें:</p>
          </div>
          <div class="sort-stats-wrap">
            <div class="sort-stat-pill">शेष: <span>${totalItems - st.currentIndex} / ${totalItems}</span></div>
            <div class="sort-stat-pill">स्कोर: <span>${st.score}</span></div>
            <div class="sort-stat-pill">🔥 स्ट्रीक: <span>${st.streak}</span></div>
          </div>
        </div>

        <!-- Active Target Word Card -->
        <div class="sort-active-card-container">
          <div class="sort-target-word">${curItem.word}</div>
          ${this.state.showEnglish ? `<div class="sort-target-en">🌐 ${curItem.en}</div>` : ''}
          <div class="sort-target-sentence">💬 वाक्य प्रयोग: ${curItem.sentence}</div>
        </div>

        <!-- Feedback Notification -->
        <div class="sort-feedback-card" id="sort-feedback-card"></div>

        <!-- 5 Bucket Choice Buttons -->
        <div class="sort-buckets-grid">
          <button class="sort-bucket-btn bucket-proper" data-type="proper">
            <span class="bucket-icon">👑</span>
            <span class="bucket-title-hi">व्यक्तिवाचक</span>
            ${this.state.showEnglish ? `<span class="bucket-title-en">Proper Noun</span>` : ''}
          </button>
          <button class="sort-bucket-btn bucket-common" data-type="common">
            <span class="bucket-icon">🌳</span>
            <span class="bucket-title-hi">जातिवाचक</span>
            ${this.state.showEnglish ? `<span class="bucket-title-en">Common Noun</span>` : ''}
          </button>
          <button class="sort-bucket-btn bucket-abstract" data-type="abstract">
            <span class="bucket-icon">💖</span>
            <span class="bucket-title-hi">भाववाचक</span>
            ${this.state.showEnglish ? `<span class="bucket-title-en">Abstract Noun</span>` : ''}
          </button>
          <button class="sort-bucket-btn bucket-material" data-type="material">
            <span class="bucket-icon">🪙</span>
            <span class="bucket-title-hi">द्रव्यवाचक</span>
            ${this.state.showEnglish ? `<span class="bucket-title-en">Material Noun</span>` : ''}
          </button>
          <button class="sort-bucket-btn bucket-collective" data-type="collective">
            <span class="bucket-icon">👥</span>
            <span class="bucket-title-hi">समुदायवाचक</span>
            ${this.state.showEnglish ? `<span class="bucket-title-en">Collective Noun</span>` : ''}
          </button>
        </div>
      </div>
    `;

    // Bucket Click Event Listeners
    this.sangyaWorkspace.querySelectorAll('.sort-bucket-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (st.answered) return;
        this.handleSangyaBucketClick(btn.dataset.type, curItem);
      });
    });
  }

  handleSangyaBucketClick(chosenType, curItem) {
    const st = this.state.sangyaSortState;
    st.answered = true;
    const feedbackEl = this.sangyaWorkspace.querySelector('#sort-feedback-card');

    const typeNames = {
      proper: 'व्यक्तिवाचक संज्ञा (Proper Noun)',
      common: 'जातिवाचक संज्ञा (Common Noun)',
      abstract: 'भाववाचक संज्ञा (Abstract Noun)',
      material: 'द्रव्यवाचक संज्ञा (Material Noun)',
      collective: 'समुदायवाचक संज्ञा (Collective Noun)'
    };

    if (chosenType === curItem.type) {
      synth.success();
      st.score++;
      st.streak++;
      feedbackEl.className = 'sort-feedback-card correct';
      feedbackEl.innerHTML = `✅ <strong>शाबाश!</strong> ‘${curItem.word}’ बिल्कुल सही <strong>${typeNames[curItem.type]}</strong> है!`;
    } else {
      synth.error();
      st.streak = 0;
      feedbackEl.className = 'sort-feedback-card wrong';
      feedbackEl.innerHTML = `❌ <strong>गलत!</strong> ‘${curItem.word}’ वास्तव में <strong>${typeNames[curItem.type]}</strong> है।`;
    }

    setTimeout(() => {
      st.currentIndex++;
      st.answered = false;
      this.renderSangyaSortMode();
    }, 1200);
  }

  // --- SANGYA MODE 3: PRACTICE QUIZ (15 CBSE MCQs) ---
  renderSangyaQuizMode() {
    const questions = SANGYA_QUIZ_POOL;
    const qs = this.state.sangyaQuizState;

    if (qs.qIndex >= questions.length) {
      // Quiz complete
      const totalQ = questions.length;
      const score = qs.score.correct;
      const pct = Math.round((score / totalQ) * 100);

      let starsEarned = 1;
      if (pct >= 90) starsEarned = 3;
      else if (pct >= 70) starsEarned = 2;

      this.saveSangyaStars(starsEarned);
      this.confetti.burst(80);
      synth.fanfare();

      this.resultStars.textContent = '⭐'.repeat(starsEarned);
      this.resultScore.textContent = `${pct}% (${score}/${totalQ})`;
      this.resultStarsCount.textContent = String(starsEarned);
      this.resultsModal.classList.add('open');

      this.sangyaWorkspace.innerHTML = `
        <div class="sangya-quiz-panel" style="text-align:center; padding:36px 20px; background:var(--bg-card); border-radius:var(--radius-xl); border:var(--border-glass);">
          <div style="font-size:3.5rem;">🎉</div>
          <h3 style="font-size:1.6rem; color:var(--accent-saffron-light); margin-top:8px;">संज्ञा क्विज़ पूर्ण हुआ!</h3>
          <div style="font-size:2rem; margin:8px 0;">${'⭐'.repeat(starsEarned)}</div>
          <p style="color:var(--text-secondary); margin-bottom:20px;">
            आपने 15 में से <strong>${score}</strong> प्रश्नों के सही उत्तर दिए (${pct}% सटीकता)!
          </p>
          <div style="display:flex; justify-content:center; gap:12px;">
            <button class="btn btn-primary" id="btn-quiz-retry">🔄 क्विज़ दोबारा दें (Retry Quiz)</button>
            <button class="btn" id="btn-quiz-challenge">⚡ 60s स्पीड चैलेंज खेलें →</button>
          </div>
        </div>
      `;

      // Reset quiz session on complete
      this.state.sangyaQuizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false, selectedOption: null };
      this.saveAppState();

      this.sangyaWorkspace.querySelector('#btn-quiz-retry').addEventListener('click', () => {
        synth.tap();
        this.state.sangyaQuizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false, selectedOption: null };
        this.saveAppState();
        this.renderSangyaQuizMode();
      });
      this.sangyaWorkspace.querySelector('#btn-quiz-challenge').addEventListener('click', () => {
        synth.tap();
        this.state.sangyaMode = 'challenge';
        this.updateModeTabsUI();
        this.renderSangyaWorkspace();
      });
      return;
    }

    const curQ = questions[qs.qIndex];
    const progressPct = Math.round((qs.qIndex / questions.length) * 100);

    this.sangyaWorkspace.innerHTML = `
      <div class="vakyansh-quiz-panel">
        <div class="quiz-header-row" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div>
            <span class="quiz-badge">प्रश्न ${qs.qIndex + 1} / ${questions.length}</span>
            <div class="quiz-progress-track" style="margin-top:6px; width:160px; height:6px; background:rgba(255,255,255,0.1); border-radius:10px; overflow:hidden;">
              <div style="width:${progressPct}%; height:100%; background:var(--gradient-saffron); transition:width 0.3s;"></div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:12px;">
            <div class="quiz-score-badge">
              स्कोर: <strong style="color:var(--accent-saffron-light);">${qs.score.correct}</strong> / ${qs.qIndex}
            </div>
            <button class="btn btn-restart-quiz" id="btn-restart-sangya-quiz" style="padding:4px 10px; font-size:0.75rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.18); color:var(--text-secondary); border-radius:var(--radius-sm); cursor:pointer;">
              🔄 पुनः आरंभ (Restart)
            </button>
          </div>
        </div>

        <div class="vakyansh-quiz-card">
          <div class="quiz-question-text">${curQ.qHi}</div>
          ${this.state.showEnglish ? `<div class="quiz-question-en">🌐 ${curQ.qEn}</div>` : ''}

          <div class="quiz-options-grid" id="quiz-options-grid">
            ${curQ.options.map((opt, idx) => `
              <button class="quiz-option-btn" data-idx="${idx}">
                <span class="quiz-opt-letter">${String.fromCharCode(65 + idx)}</span>
                <span class="quiz-opt-text">${opt}</span>
              </button>
            `).join('')}
          </div>

          <div class="quiz-explanation-box" id="quiz-explanation-box" style="display:none; margin-top:16px;">
            💡 <strong>व्याख्या (Explanation):</strong> ${curQ.exp}
          </div>

          <div style="display:flex; justify-content:flex-end; margin-top:16px;">
            <button class="btn btn-primary" id="btn-quiz-next" style="display:none;">अगला प्रश्न →</button>
          </div>
        </div>
      </div>
    `;

    const optBtns = this.sangyaWorkspace.querySelectorAll('.quiz-option-btn');
    const expBox = this.sangyaWorkspace.querySelector('#quiz-explanation-box');
    const nextBtn = this.sangyaWorkspace.querySelector('#btn-quiz-next');

    // Restart button handler
    this.sangyaWorkspace.querySelector('#btn-restart-sangya-quiz')?.addEventListener('click', () => {
      synth.tap();
      this.state.sangyaQuizState = { qIndex: 0, score: { correct: 0, wrong: 0 }, answered: false, selectedOption: null };
      this.saveAppState();
      this.renderSangyaQuizMode();
    });

    // If restored in already answered state
    if (qs.answered && qs.selectedOption !== null && qs.selectedOption !== undefined) {
      optBtns.forEach(b => b.setAttribute('disabled', 'true'));
      const chosen = qs.selectedOption;
      if (chosen === curQ.correct) {
        if (optBtns[chosen]) optBtns[chosen].classList.add('correct');
      } else {
        if (optBtns[chosen]) optBtns[chosen].classList.add('wrong');
        if (optBtns[curQ.correct]) optBtns[curQ.correct].classList.add('correct');
      }
      expBox.style.display = 'block';
      nextBtn.style.display = 'inline-flex';
    }

    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (qs.answered) return;
        qs.answered = true;
        const chosen = parseInt(btn.dataset.idx, 10);
        qs.selectedOption = chosen;

        optBtns.forEach(b => b.setAttribute('disabled', 'true'));

        if (chosen === curQ.correct) {
          synth.success();
          btn.classList.add('correct');
          qs.score.correct++;
        } else {
          synth.error();
          btn.classList.add('wrong');
          if (optBtns[curQ.correct]) optBtns[curQ.correct].classList.add('correct');
          qs.score.wrong++;
        }

        expBox.style.display = 'block';
        nextBtn.style.display = 'inline-flex';
        this.saveAppState();
      });
    });

    nextBtn.addEventListener('click', () => {
      synth.tap();
      qs.qIndex++;
      qs.answered = false;
      qs.selectedOption = null;
      this.saveAppState();
      this.renderSangyaQuizMode();
    });
  }

  // --- SANGYA MODE 4: 60s TIMED CHALLENGE ---
  renderSangyaChallengeMode() {
    this.sangyaWorkspace.innerHTML = `
      <div class="challenge-panel" style="text-align:center; padding:32px 18px;">
        <div style="font-size:3.5rem;">⚡</div>
        <h3 style="font-size:1.55rem; color:var(--accent-saffron-light); margin-top:6px;">संज्ञा: 60 सेकंड स्पीड चैलेंज!</h3>
        <p style="color:var(--text-secondary); max-width:500px; margin:8px auto 20px; line-height:1.6;">
          घड़ी की सुई टिक-टिक कर रही है! 60 सेकंड में अधिक से अधिक शब्दों के सही संज्ञा भेद पहचानें और 3 सितारे ⭐⭐⭐ जीतें!
        </p>
        <div>
          <button class="btn btn-primary" id="btn-start-sangya-challenge" style="font-size:1.05rem; padding:12px 28px;">
            🚀 चैलेंज शुरू करें (Start 60s Challenge)
          </button>
        </div>
      </div>
    `;

    this.sangyaWorkspace.querySelector('#btn-start-sangya-challenge').addEventListener('click', () => {
      synth.tap();
      this.startSangyaChallenge();
    });
  }

  startSangyaChallenge() {
    const pool = [...SANGYA_CHALLENGE_POOL].sort(() => 0.5 - Math.random());
    this.state.sangyaChallengeState = {
      timer: 60,
      timerInterval: null,
      pool,
      qIndex: 0,
      score: 0,
      streak: 0,
      answered: false
    };

    const cs = this.state.sangyaChallengeState;

    cs.timerInterval = setInterval(() => {
      cs.timer--;
      const timerFill = this.sangyaWorkspace.querySelector('#challenge-timer-fill');
      const timerNum = this.sangyaWorkspace.querySelector('#challenge-timer-num');
      if (timerFill) {
        const pct = (cs.timer / 60) * 100;
        timerFill.style.width = `${pct}%`;
        if (cs.timer <= 10) timerFill.classList.add('urgent');
      }
      if (timerNum) {
        timerNum.textContent = `${cs.timer}s`;
      }

      if (cs.timer <= 0) {
        clearInterval(cs.timerInterval);
        cs.timerInterval = null;
        this.finishSangyaChallenge();
      }
    }, 1000);

    this.renderNextSangyaChallengeQuestion();
  }

  renderNextSangyaChallengeQuestion() {
    const cs = this.state.sangyaChallengeState;
    if (cs.timer <= 0) return;

    if (cs.qIndex >= cs.pool.length) {
      cs.pool = [...SANGYA_CHALLENGE_POOL].sort(() => 0.5 - Math.random());
      cs.qIndex = 0;
    }

    const item = cs.pool[cs.qIndex];
    cs.answered = false;

    this.sangyaWorkspace.innerHTML = `
      <div class="challenge-panel">
        <div class="challenge-header-row" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div style="font-size:1.1rem; font-weight:800; color:var(--accent-saffron-light);">
            ⚡ 60s स्पीड चैलेंज — स्कोर: <strong>${cs.score}</strong> | 🔥 स्ट्रीक: <strong>${cs.streak}</strong>
          </div>
          <div style="font-size:1.2rem; font-weight:800; color:#fff;" id="challenge-timer-num">${cs.timer}s</div>
        </div>

        <div class="challenge-timer-bar">
          <div class="challenge-timer-fill ${cs.timer <= 10 ? 'urgent' : ''}" id="challenge-timer-fill" style="width:${(cs.timer / 60) * 100}%;"></div>
        </div>

        <div class="vakyansh-quiz-card" style="margin-top:12px;">
          <div style="font-size:1.6rem; font-weight:800; text-align:center; color:#fff; margin-bottom:4px;">
            ‘${item.word}’
          </div>
          ${this.state.showEnglish ? `<div style="text-align:center; font-size:0.9rem; color:var(--text-muted); margin-bottom:12px;">🌐 ${item.en}</div>` : ''}
          <div class="quiz-question-text" style="text-align:center; font-size:1.1rem; margin-bottom:16px;">
            ${item.question}
          </div>

          <div class="quiz-options-grid">
            ${item.options.map((opt, idx) => `
              <button class="quiz-option-btn challenge-opt-btn" data-idx="${idx}">
                <span class="quiz-opt-letter">${idx + 1}</span>
                <span class="quiz-opt-text">${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    const optBtns = this.sangyaWorkspace.querySelectorAll('.challenge-opt-btn');
    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (cs.answered) return;
        cs.answered = true;
        const chosen = parseInt(btn.dataset.idx, 10);

        if (chosen === item.correct) {
          synth.success();
          btn.classList.add('correct');
          cs.score++;
          cs.streak++;
        } else {
          synth.error();
          btn.classList.add('wrong');
          optBtns[item.correct].classList.add('correct');
          cs.streak = 0;
        }

        setTimeout(() => {
          cs.qIndex++;
          this.renderNextSangyaChallengeQuestion();
        }, 450);
      });
    });
  }

  finishSangyaChallenge() {
    const cs = this.state.sangyaChallengeState;
    synth.fanfare();
    this.confetti.burst(80);

    let starsEarned = 1;
    if (cs.score >= 12) starsEarned = 3;
    else if (cs.score >= 8) starsEarned = 2;

    this.saveSangyaStars(starsEarned);

    this.resultStars.textContent = '⭐'.repeat(starsEarned);
    this.resultScore.textContent = `${cs.score} सही उत्तर`;
    this.resultStarsCount.textContent = String(starsEarned);
    this.resultsModal.classList.add('open');

    this.sangyaWorkspace.innerHTML = `
      <div style="text-align:center; padding:32px 16px; background:var(--bg-card); border-radius:var(--radius-xl); border:var(--border-glass);">
        <div style="font-size:3.5rem; margin-bottom:12px;">🏆</div>
        <h3 style="font-size:1.5rem; color:var(--accent-saffron-light); margin-bottom:6px;">समय समाप्त! (Time Up!)</h3>
        <p style="color:var(--text-secondary); margin-bottom:18px;">
          आपने 60 सेकंड में <strong>${cs.score}</strong> सही उत्तर दिए और <strong>${starsEarned}</strong> सितारे ⭐ अर्जित किए!
        </p>
        <button class="btn btn-primary" id="btn-sangya-challenge-retry">🚀 दोबारा खेलें (Try Again)</button>
      </div>
    `;

    this.sangyaWorkspace.querySelector('#btn-sangya-challenge-retry').addEventListener('click', () => {
      synth.tap();
      this.startSangyaChallenge();
    });
  }

  // ============================================
  // CHITRA VARNAN METHODS (Original Engine Preserved)
  // ============================================
  renderSidebarTopics() {
    this.sidebarTopics.innerHTML = '';
    SCENE_DATA.forEach((scene) => {
      const btn = document.createElement('button');
      btn.className = `topic-nav-item ${scene.id === this.state.currentSceneId ? 'active' : ''}`;
      btn.dataset.id = scene.id;

      const stars = this.state.stars[scene.id] || 0;
      const starsDisplay = '⭐'.repeat(stars) || '☆☆☆';

      btn.innerHTML = `
        <div class="topic-nav-icon">${scene.icon}</div>
        <div class="topic-nav-info">
          <div class="topic-nav-title">${scene.title}</div>
          <div class="topic-nav-subtitle">${scene.titleEn}</div>
        </div>
        <div class="topic-nav-stars">${starsDisplay}</div>
      `;

      btn.addEventListener('click', () => {
        synth.tap();
        this.welcomeScreen.style.display = 'none';
        this.sceneArea.style.display = 'flex';
        this.loadScene(scene.id);
        if (window.innerWidth <= 860) {
          this.toggleSidebar(false);
        }
      });

      this.sidebarTopics.appendChild(btn);
    });
  }

  loadScene(sceneId) {
    this.state.currentSceneId = sceneId;
    this.state.activeHotspotId = null;
    this.state.puzzleProgress = { stepIdx: 0, selectedWords: [], isCompleted: false };

    const scene = SCENE_DATA.find(s => s.id === sceneId);
    if (!scene) return;

    // Update Top Bar
    this.topBarTitle.textContent = scene.title;
    this.topBarSubtitle.textContent = this.state.showEnglish ? `${scene.titleEn} — ${scene.subtitle}` : scene.subtitle;
    this.pictureHeading.textContent = `${scene.icon} ${scene.title}`;
    this.pictureHint.textContent = this.state.showEnglish ? 'Tap numbered hotspots on the picture to inspect vocabulary' : 'चित्र पर बने नंबरों (हॉटस्पॉट) पर टैप करके शब्द और वाक्य देखें';
    this.hotspotCounter.textContent = `हॉटस्पॉट: 6 कुल`;

    // Update image toggle buttons
    if (this.btnViewReal) this.btnViewReal.classList.toggle('active', this.state.imageViewMode === 'real');
    if (this.btnViewCartoon) this.btnViewCartoon.classList.toggle('active', this.state.imageViewMode === 'cartoon');

    // Render Real Photo / SVG Canvas & Hotspots
    this.renderIllustration(scene);

    // Render Default Hotspot Bar
    this.renderHotspotDetail(null);

    // Render Mode Panel
    this.renderCurrentMode();

    // Highlight active topic in sidebar
    document.querySelectorAll('.topic-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === sceneId);
    });

    this.saveAppState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setImageMode(mode) {
    this.state.imageViewMode = mode;
    this.saveAppState();
    if (this.btnViewReal) this.btnViewReal.classList.toggle('active', mode === 'real');
    if (this.btnViewCartoon) this.btnViewCartoon.classList.toggle('active', mode === 'cartoon');
    const scene = SCENE_DATA.find(s => s.id === this.state.currentSceneId);
    if (scene) {
      this.renderIllustration(scene);
      this.flash(mode === 'real' ? '📷 वास्तविक परीक्षा चित्र चालू (Real Photo)' : '🎨 कार्टून रेखाचित्र चालू (Cartoon Illustration)', 'info');
    }
  }

  toggleBWMode() {
    this.state.isBWMode = !this.state.isBWMode;
    this.saveAppState();
    this.updateBWModeUI();
    this.flash(
      this.state.isBWMode
        ? '🖨️ प्रश्न-पत्र प्रारूप (B&W Print): वास्तविक परीक्षा जैसा श्वेत-श्याम दृश्य'
        : '🌈 स्वाभाविक रंगीन दृश्य (Color View) पुनः चालू',
      'info'
    );
  }

  updateBWModeUI() {
    const isBW = this.state.isBWMode;
    if (this.btnToggleBw) {
      this.btnToggleBw.classList.toggle('active', isBW);
      this.btnToggleBw.setAttribute('aria-pressed', String(isBW));
    }
    if (this.bwToggleLabel) {
      this.bwToggleLabel.textContent = isBW ? 'B&W प्रिंट (ON)' : 'B&W प्रिंट';
    }
    if (this.pictureIllustrationWrapper) {
      this.pictureIllustrationWrapper.classList.toggle('bw-exam-mode', isBW);
    }
    const badge = this.illustrationCanvas ? this.illustrationCanvas.querySelector('.scene-image-badge') : null;
    if (badge) {
      if (isBW) {
        badge.textContent = '🖨️ प्रश्न-पत्र प्रारूप — श्वेत-श्याम (B&W Exam Print)';
        badge.classList.add('bw-badge');
      } else {
        badge.textContent = this.state.imageViewMode === 'real'
          ? '📷 परीक्षा प्रारूप — वास्तविक चित्र (Exam Photo)'
          : '🎨 रेखाचित्र (Cartoon Illustration)';
        badge.classList.remove('bw-badge');
      }
    }
  }

  getSceneHotspots(scene) {
    const isReal = this.state.imageViewMode === 'real';
    if (isReal && scene.hotspotsReal) {
      return scene.hotspots.map(hs => {
        const override = scene.hotspotsReal.find(r => r.id === hs.id);
        return override ? { ...hs, x: override.x, y: override.y } : hs;
      });
    }
    return scene.hotspots;
  }

  renderIllustration(scene) {
    this.illustrationCanvas.innerHTML = '';
    const isReal = this.state.imageViewMode === 'real';

    if (isReal && scene.realImage) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'scene-image-wrapper';
      imgWrap.innerHTML = `
        <img src="${scene.realImage}" alt="${scene.title}" class="scene-real-photo" loading="eager" />
        <div class="scene-image-badge">📷 परीक्षा प्रारूप — वास्तविक चित्र (Exam Photo)</div>
      `;
      this.illustrationCanvas.appendChild(imgWrap);
    } else {
      const svgWrap = document.createElement('div');
      svgWrap.className = 'scene-svg-wrapper';
      svgWrap.innerHTML = scene.svg;
      const cartoonBadge = document.createElement('div');
      cartoonBadge.className = 'scene-image-badge cartoon-badge';
      cartoonBadge.textContent = '🎨 रेखाचित्र (Cartoon Illustration)';
      svgWrap.appendChild(cartoonBadge);
      this.illustrationCanvas.appendChild(svgWrap);
    }

    // Inject Hotspots based on current view mode
    const hotspots = this.getSceneHotspots(scene);

    hotspots.forEach(hs => {
      const btn = document.createElement('button');
      btn.className = `hotspot-btn ${this.state.activeHotspotId === hs.id ? 'active' : ''}`;
      btn.style.left = `${hs.x}%`;
      btn.style.top = `${hs.y}%`;
      btn.textContent = hs.id;
      btn.title = `${hs.title} (${hs.meaningEn})`;
      btn.setAttribute('aria-label', `Hotspot ${hs.id}: ${hs.title}`);

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        synth.tap();
        this.selectHotspot(hs.id);
      });

      this.illustrationCanvas.appendChild(btn);
    });

    // Update B&W Mode visual styling on wrapper and badge
    this.updateBWModeUI();
  }

  selectHotspot(hsId) {
    this.state.activeHotspotId = hsId;

    // Update buttons in illustration
    document.querySelectorAll('.hotspot-btn').forEach(el => {
      el.classList.toggle('active', el.textContent.trim() === String(hsId));
    });

    // Update explore mode cards if currently active
    document.querySelectorAll('.explore-card').forEach(el => {
      el.classList.toggle('active', el.dataset.id === String(hsId));
    });

    this.renderHotspotDetail(hsId);
  }

  renderHotspotDetail(hsId) {
    const scene = SCENE_DATA.find(s => s.id === this.state.currentSceneId);
    if (!scene) return;

    if (!hsId) {
      this.hotspotDetailBox.innerHTML = `
        <div class="hs-empty">💡 चित्र पर किसी भी नंबर 🔵 पर टैप करके शब्द और वाक्य सीखें! (Tap numbered hotspots to inspect)</div>
      `;
      return;
    }

    const hs = scene.hotspots.find(h => h.id === hsId);
    if (!hs) return;

    const translitHtml = this.state.showEnglish ? `<span class="hs-translit">(${hs.translit})</span>` : '';
    const enWordHtml = this.state.showEnglish ? `<span class="hs-english-word">${hs.meaningEn}</span>` : '';
    const enSentenceHtml = this.state.showEnglish ? `<div class="hs-sentence-english">🌐 ${hs.sentenceEn}</div>` : '';

    this.hotspotDetailBox.innerHTML = `
      <div class="hs-content">
        <div class="hs-header-row">
          <div class="hs-word-group">
            <span class="hs-hindi-word">${hs.title}</span>
            ${translitHtml}
            ${enWordHtml}
          </div>
          <span class="hs-tag">${hs.type}</span>
        </div>
        <div class="hs-sentence-row">
          <div class="hs-sentence-hindi">✍️ ${hs.sentenceHi}</div>
          ${enSentenceHtml}
        </div>
      </div>
    `;
  }

  renderCurrentMode() {
    const scene = SCENE_DATA.find(s => s.id === this.state.currentSceneId);
    if (!scene) return;

    switch (this.state.chitraMode) {
      case 'explore':
        this.renderExploreMode(scene);
        break;
      case 'vocab':
        this.renderVocabMode(scene);
        break;
      case 'puzzle':
        this.renderPuzzleMode(scene);
        break;
      case 'write':
        this.renderWriteMode(scene);
        break;
    }
  }

  renderExploreMode(scene) {
    this.modePanel.innerHTML = `
      <div class="explore-panel">
        <div class="explore-grid">
          ${scene.hotspots.map(hs => `
            <div class="explore-card ${this.state.activeHotspotId === hs.id ? 'active' : ''}" data-id="${hs.id}">
              <div class="explore-badge">${hs.id}</div>
              <div class="explore-info">
                <h5>${hs.title} ${this.state.showEnglish ? `<small style="font-weight:normal; color:var(--text-secondary);">(${hs.meaningEn})</small>` : ''}</h5>
                <p>${hs.sentenceHi}</p>
                ${this.state.showEnglish ? `<p style="font-size:0.75rem; color:var(--text-muted);">${hs.sentenceEn}</p>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.modePanel.querySelectorAll('.explore-card').forEach(card => {
      card.addEventListener('click', () => {
        synth.tap();
        const id = parseInt(card.dataset.id, 10);
        this.selectHotspot(id);
      });
    });
  }

  renderVocabMode(scene) {
    const filter = this.state.vocabFilter;
    const filteredVocab = filter === 'all'
      ? scene.vocabulary
      : scene.vocabulary.filter(v => v.category === filter);

    const typeLabels = {
      noun: 'संज्ञा (Noun)',
      verb: 'क्रिया (Verb)',
      adj: 'विशेषण (Adjective)',
      position: 'दिशा / स्थिति',
      connector: 'योजक शब्द (Connector)'
    };

    this.modePanel.innerHTML = `
      <div class="vocab-panel">
        <div class="vocab-header">
          <h3>🔤 शब्द भंडार (Vocabulary Bank)</h3>
          <div class="vocab-filters">
            <button class="vocab-filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">सभी (${scene.vocabulary.length})</button>
            <button class="vocab-filter-btn ${filter === 'noun' ? 'active' : ''}" data-filter="noun">संज्ञा (Nouns)</button>
            <button class="vocab-filter-btn ${filter === 'verb' ? 'active' : ''}" data-filter="verb">क्रिया (Verbs)</button>
            <button class="vocab-filter-btn ${filter === 'adj' ? 'active' : ''}" data-filter="adj">विशेषण (Adjectives)</button>
            <button class="vocab-filter-btn ${filter === 'position' ? 'active' : ''}" data-filter="position">दिशा / स्थिति</button>
            <button class="vocab-filter-btn ${filter === 'connector' ? 'active' : ''}" data-filter="connector">योजक (Connectors)</button>
          </div>
        </div>

        <div class="vocab-grid">
          ${filteredVocab.map(item => `
            <div class="vocab-card">
              <div class="vocab-top">
                <span class="vocab-hindi">${item.hi}</span>
                <span class="vocab-type-badge">${typeLabels[item.category] || item.category}</span>
              </div>
              ${this.state.showEnglish ? `<span class="vocab-translit">${item.translit}</span>` : ''}
              ${this.state.showEnglish ? `<span class="vocab-english">🌐 ${item.en}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.modePanel.querySelectorAll('.vocab-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        synth.tap();
        this.state.vocabFilter = btn.dataset.filter;
        this.renderVocabMode(scene);
      });
    });
  }

  renderPuzzleMode(scene) {
    const pProg = this.state.puzzleProgress;
    const currentPuzzle = scene.puzzles[pProg.stepIdx];

    if (!currentPuzzle) {
      this.modePanel.innerHTML = `
        <div class="puzzle-panel" style="text-align: center; padding: 32px 16px;">
          <div style="font-size: 3.5rem; margin-bottom: 12px;">🎉</div>
          <h3 style="font-size: 1.5rem; color: var(--accent-saffron-light); margin-bottom: 8px;">अद्भुत! आपने सभी 5 वाक्य सही बना लिए!</h3>
          <p style="color: var(--text-secondary); margin-bottom: 24px;">आपने 5-स्टेप फॉर्मूले के अनुसार चित्र का संपूर्ण वर्णन पूरा कर लिया है।</p>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn btn-primary" id="btn-show-model-answer">✍️ आदर्श उत्तर और 5-वाक्य देखें →</button>
            <button class="btn" id="btn-replay-puzzle">🔄 दोबारा खेलें</button>
          </div>
        </div>
      `;

      this.modePanel.querySelector('#btn-show-model-answer').addEventListener('click', () => {
        synth.tap();
        this.state.chitraMode = 'write';
        this.updateModeTabsUI();
        this.renderWriteMode(scene);
      });
      this.modePanel.querySelector('#btn-replay-puzzle').addEventListener('click', () => {
        synth.tap();
        this.state.puzzleProgress = { stepIdx: 0, selectedWords: [], isCompleted: false };
        this.renderPuzzleMode(scene);
      });

      if (!this.state.stars[scene.id] || this.state.stars[scene.id] < 3) {
        this.state.stars[scene.id] = 3;
        this.saveStars();
        this.updateProgressUI();
        this.renderSidebarTopics();
        this.confetti.burst(80);
        synth.fanfare();
      }
      return;
    }

    const selectedIndices = pProg.selectedWords;
    const isSlotFilled = selectedIndices.length === currentPuzzle.correctWords.length;

    this.modePanel.innerHTML = `
      <div class="puzzle-panel">
        <div class="puzzle-header">
          <span class="puzzle-step-badge">कदम ${currentPuzzle.step} / 5 (Step ${currentPuzzle.step})</span>
          <span style="font-size: 0.84rem; color: var(--text-muted);">शब्दों पर टैप करके वाक्य जोड़ें</span>
        </div>

        <div>
          <div class="puzzle-prompt">${currentPuzzle.promptHi}</div>
          ${this.state.showEnglish ? `<div class="puzzle-prompt-english">🌐 ${currentPuzzle.promptEn}</div>` : ''}
        </div>

        <div class="puzzle-slot-area ${isSlotFilled ? 'filled' : ''}" id="puzzle-slot">
          ${selectedIndices.length === 0
            ? '<div class="puzzle-slot-placeholder">यहाँ शब्द जोड़कर वाक्य बनाएं (Tap words below to arrange sentence)</div>'
            : selectedIndices.map((origIdx, slotPos) => {
                const item = currentPuzzle.scrambledWords[origIdx];
                return `
                  <button class="puzzle-word-chip in-slot" data-slot-pos="${slotPos}">
                    <span>${item.hi}</span>
                    ${this.state.showEnglish ? `<span class="chip-en">${item.en}</span>` : ''}
                  </button>
                `;
              }).join('')
          }
        </div>

        <div>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px;">उपलब्ध शब्द (Word Bank):</div>
          <div class="puzzle-bank" id="puzzle-bank">
            ${currentPuzzle.scrambledWords.map((item, idx) => {
              const isUsed = selectedIndices.includes(idx);
              if (isUsed) return '';
              return `
                <button class="puzzle-word-chip" data-idx="${idx}">
                  <span>${item.hi}</span>
                  ${this.state.showEnglish ? `<span class="chip-en">${item.en}</span>` : ''}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="puzzle-feedback" id="puzzle-feedback"></div>

        <div class="puzzle-actions">
          <div class="puzzle-action-btns">
            <button class="btn" id="btn-undo-word" ${selectedIndices.length === 0 ? 'disabled' : ''}>↩️ अंतिम शब्द हटाएं (Undo)</button>
            <button class="btn" id="btn-reset-puzzle">🔄 रीसेट (Clear)</button>
          </div>
          <button class="btn btn-primary" id="btn-check-puzzle" ${!isSlotFilled ? 'disabled style="opacity:0.5;"' : ''}>
            ✓ वाक्य जांचें (Check Answer)
          </button>
        </div>
      </div>
    `;

    this.modePanel.querySelectorAll('#puzzle-bank .puzzle-word-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        synth.tap();
        const idx = parseInt(btn.dataset.idx, 10);
        this.state.puzzleProgress.selectedWords.push(idx);
        this.renderPuzzleMode(scene);
      });
    });

    this.modePanel.querySelectorAll('#puzzle-slot .puzzle-word-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        synth.tap();
        const slotPos = parseInt(btn.dataset.slotPos, 10);
        this.state.puzzleProgress.selectedWords.splice(slotPos, 1);
        this.renderPuzzleMode(scene);
      });
    });

    this.modePanel.querySelector('#btn-undo-word').addEventListener('click', () => {
      synth.tap();
      this.state.puzzleProgress.selectedWords.pop();
      this.renderPuzzleMode(scene);
    });

    this.modePanel.querySelector('#btn-reset-puzzle').addEventListener('click', () => {
      synth.tap();
      this.state.puzzleProgress.selectedWords = [];
      this.renderPuzzleMode(scene);
    });

    this.modePanel.querySelector('#btn-check-puzzle').addEventListener('click', () => {
      const fb = this.modePanel.querySelector('#puzzle-feedback');
      const slot = this.modePanel.querySelector('#puzzle-slot');

      const userWords = selectedIndices.map(i => currentPuzzle.scrambledWords[i].hi);
      const isCorrect = userWords.join(' ') === currentPuzzle.correctWords.join(' ');

      if (isCorrect) {
        synth.success();
        this.confetti.burst(30);
        slot.className = 'puzzle-slot-area filled correct';
        fb.className = 'puzzle-feedback show success';
        fb.innerHTML = `
          <strong>🎉 बिल्कुल सही! (Perfect!)</strong><br>
          ${currentPuzzle.fullSentenceHi}
          ${this.state.showEnglish ? `<br><small style="color:var(--text-secondary);">🌐 ${currentPuzzle.fullSentenceEn}</small>` : ''}
        `;

        setTimeout(() => {
          this.state.puzzleProgress.stepIdx++;
          this.state.puzzleProgress.selectedWords = [];
          this.renderPuzzleMode(scene);
        }, 1800);

      } else {
        synth.error();
        slot.className = 'puzzle-slot-area filled wrong';
        fb.className = 'puzzle-feedback show wrong';
        fb.innerHTML = `
          <strong>❌ थोड़ा क्रम गलत हो गया (Order is incorrect):</strong><br>
          शब्दों के सही स्थान पर ध्यान दें। पहले कर्ता, फिर कर्म व विशेषण, और अंत में क्रिया आती है।
        `;
      }
    });
  }

  renderWriteMode(scene) {
    const ans = scene.modelAnswer;

    this.modePanel.innerHTML = `
      <div class="write-panel">
        <div class="model-answer-card">
          <div class="model-header">
            <h4>🏆 आदर्श उत्तर (Complete 5-7 Sentences Model Answer)</h4>
            <span class="hotspot-counter">CBSE Class 5 परीक्षा प्रारूप</span>
          </div>

          <div class="model-paragraph-hindi">
            ${ans.fullParagraphHi}
          </div>

          ${this.state.showEnglish ? `
            <div class="model-paragraph-english">
              <strong>English Translation:</strong><br>
              ${ans.fullParagraphEn}
            </div>
          ` : ''}

          <div class="rule-summary-card" style="margin-bottom:0; background:rgba(255,255,255,0.02);">
            <h4>💡 परीक्षा में पूरे अंक पाने के टिप्स:</h4>
            <ul style="padding-left: 20px; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.8;">
              ${ans.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="steps-breakdown-list">
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">
            📋 5-स्टेप फॉर्मूला संरचना (Step-by-Step Sentence Analysis):
          </h4>
          ${ans.steps.map(s => `
            <div class="step-item-card">
              <div class="step-badge-mini">${s.num}</div>
              <div class="step-item-content">
                <div class="step-item-role">${s.role}</div>
                <div class="step-item-sentence-hi">${s.hi}</div>
                ${this.state.showEnglish ? `<div class="step-item-sentence-en">🌐 ${s.en}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="student-editor-card">
          <h4>✍️ अपना उत्तर यहाँ लिखकर अभ्यास करें (Student Practice Area):</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">
            ऊपर दिए गए 5 चरणों का पालन करते हुए चित्र देखकर 5 से 7 वाक्य स्वयं लिखें:
          </p>
          <textarea
            class="student-textarea"
            id="student-textarea"
            placeholder="1. यह चित्र ... का है।&#10;2. चित्र में ...&#10;3. बच्चे ...&#10;4. ...&#10;5. अंत में ..."></textarea>
          
          <div class="student-editor-footer">
            <div class="word-counter" id="student-word-counter">शब्द संख्या: 0 शब्द | 0 वाक्य</div>
            <div class="editor-btns">
              <button class="btn" id="btn-copy-text">📋 प्रतिलिपि (Copy)</button>
              <button class="btn btn-primary" id="btn-complete-practice">⭐ अभ्यास पूर्ण किया!</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const textarea = this.modePanel.querySelector('#student-textarea');
    const counter = this.modePanel.querySelector('#student-word-counter');

    if (this.state.chitraDrafts && this.state.chitraDrafts[scene.id]) {
      textarea.value = this.state.chitraDrafts[scene.id];
      const text = textarea.value.trim();
      const words = text ? text.split(/\s+/).length : 0;
      const sentences = text ? (text.match(/[।?!.]/g) || []).length : 0;
      counter.textContent = `शब्द संख्या: ${words} शब्द | ${sentences} वाक्य पूर्ण`;
    }

    textarea.addEventListener('input', () => {
      const text = textarea.value.trim();
      const words = text ? text.split(/\s+/).length : 0;
      const sentences = text ? (text.match(/[।?!.]/g) || []).length : 0;
      counter.textContent = `शब्द संख्या: ${words} शब्द | ${sentences} वाक्य पूर्ण`;
      if (!this.state.chitraDrafts) this.state.chitraDrafts = {};
      this.state.chitraDrafts[scene.id] = textarea.value;
      this.saveAppState();
    });

    this.modePanel.querySelector('#btn-copy-text').addEventListener('click', () => {
      synth.tap();
      if (textarea.value.trim()) {
        navigator.clipboard.writeText(textarea.value);
        this.flash('आपका उत्तर क्लिपबोर्ड पर कॉपी हो गया! (Copied)', 'success');
      } else {
        this.flash('कृपया पहले कुछ वाक्य लिखें! (Please write something)', 'info');
      }
    });

    this.modePanel.querySelector('#btn-complete-practice').addEventListener('click', () => {
      synth.fanfare();
      this.confetti.burst(60);
      this.state.stars[scene.id] = 3;
      this.saveStars();
      this.updateProgressUI();
      this.renderSidebarTopics();

      this.resultStars.textContent = '⭐⭐⭐';
      this.resultScore.textContent = '100%';
      this.resultStarsCount.textContent = '3';
      this.resultsModal.classList.add('open');
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.chitraApp = new HindiLearningApp();
});
