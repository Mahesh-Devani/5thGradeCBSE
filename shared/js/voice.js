/**
 * 5th Grade CBSE — Native Web Speech & Voice I/O Controller
 * ========================================================
 * Zero External Dependencies | Pure Vanilla ES6+ Web Speech API
 *
 * Provides:
 * - TTS via window.speechSynthesis:
 *     speak(text, lang) => Promise<boolean>
 *     replay() => Promise<boolean>
 *     stopSpeaking() => void
 * - STT via SpeechRecognition / webkitSpeechRecognition:
 *     listen({ lang, maxMs, onInterim }) => Promise<{ transcript: string, isFinal: boolean, error?: string }>
 *     stopListening() => void
 * - Feature detection: isSupported(), getStatus()
 */

(function(root) {
  'use strict';

  const hasTTS = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const SpeechRecognitionClass = typeof window !== 'undefined'
    ? (window.SpeechRecognition || window.webkitSpeechRecognition || null)
    : null;
  const hasSTT = SpeechRecognitionClass !== null;

  let activeRecognition = null;
  let activeUtterance = null;
  let lastSpokenText = '';
  let lastSpokenLang = 'en-IN';
  let cachedVoices = [];
  let isListeningState = false;

  function loadVoices() {
    if (!hasTTS) return;
    try {
      cachedVoices = window.speechSynthesis.getVoices() || [];
    } catch (e) {
      cachedVoices = [];
    }
  }

  if (hasTTS) {
    loadVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  /**
   * Selects best available voice prioritizing Indian English / Hindi, falling back to English.
   */
  function pickBestVoice(lang = 'en-IN') {
    if (!cachedVoices || cachedVoices.length === 0) {
      loadVoices();
    }
    const target = (lang || 'en-IN').toLowerCase();
    const prefix = target.split('-')[0];

    // 1. Exact match (e.g. 'en-IN' or 'hi-IN')
    let match = cachedVoices.find(v => (v.lang || '').toLowerCase() === target);
    if (match) return match;

    // 2. Local Indian English voice names
    if (prefix === 'en') {
      match = cachedVoices.find(v => /india|indian|rishi|veena|kavya/i.test(v.name || ''));
      if (match) return match;
    }

    // 3. Language prefix match (e.g. 'en-GB', 'en-US')
    match = cachedVoices.find(v => (v.lang || '').toLowerCase().startsWith(prefix));
    if (match) return match;

    return null;
  }

  /**
   * Cancel any active spoken speech cleanly.
   */
  function stopSpeaking() {
    if (!hasTTS) return;
    try {
      window.speechSynthesis.cancel();
      activeUtterance = null;
    } catch (e) {}
  }

  /**
   * Speak text aloud using SpeechSynthesis.
   * Returns a Promise resolving to true on completion, or false on cancel/error.
   */
  function speak(text, lang = 'en-IN') {
    return new Promise(resolve => {
      if (!hasTTS || !text) {
        resolve(false);
        return;
      }

      stopSpeaking();

      lastSpokenText = text;
      lastSpokenLang = lang || 'en-IN';

      try {
        const cleanText = text
          .replace(/<[^>]+>/g, ' ')
          .replace(/_{2,}/g, ' blank ')
          .replace(/&nbsp;/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (!cleanText) {
          resolve(false);
          return;
        }

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = lastSpokenLang;
        utterance.rate = 0.90; // Slightly measured cadence for Class 5 students
        utterance.pitch = 1.0;

        const voice = pickBestVoice(lastSpokenLang);
        if (voice) {
          utterance.voice = voice;
        }

        utterance.onend = () => {
          activeUtterance = null;
          resolve(true);
        };

        utterance.onerror = (err) => {
          // Cancelled speech is common during fast navigation
          activeUtterance = null;
          resolve(false);
        };

        activeUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        activeUtterance = null;
        resolve(false);
      }
    });
  }

  /**
   * Replay the last spoken text.
   */
  function replay() {
    if (!lastSpokenText) return Promise.resolve(false);
    return speak(lastSpokenText, lastSpokenLang);
  }

  /**
   * Stop any active SpeechRecognition session.
   */
  function stopListening() {
    if (activeRecognition) {
      try {
        activeRecognition.stop();
      } catch (e) {
        try { activeRecognition.abort(); } catch (err) {}
      }
      activeRecognition = null;
    }
    isListeningState = false;
  }

  /**
   * Start listening for voice input via SpeechRecognition.
   * Must only be triggered by an explicit user gesture (click/tap).
   *
   * @param {Object} options
   * @param {string} [options.lang='en-IN'] - Language code
   * @param {number} [options.maxMs=8000] - Auto-timeout in ms
   * @param {Function} [options.onInterim] - Callback for interim transcripts
   * @returns {Promise<{ transcript: string, isFinal: boolean, error?: string }>}
   */
  function listen(options = {}) {
    return new Promise(resolve => {
      if (!hasSTT) {
        resolve({
          transcript: '',
          isFinal: false,
          error: 'speech_recognition_unsupported'
        });
        return;
      }

      // Stop any prior recognition or TTS
      stopListening();
      stopSpeaking();

      const lang = options.lang || 'en-IN';
      const maxMs = options.maxMs || 8000;
      let finalTranscript = '';
      let timer = null;
      let resolved = false;

      function done(result) {
        if (resolved) return;
        resolved = true;
        if (timer) clearTimeout(timer);
        stopListening();
        resolve(result);
      }

      try {
        const recognition = new SpeechRecognitionClass();
        recognition.lang = lang;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 3;

        activeRecognition = recognition;
        isListeningState = true;

        timer = setTimeout(() => {
          if (finalTranscript) {
            done({ transcript: finalTranscript, isFinal: true });
          } else {
            done({ transcript: '', isFinal: false, error: 'no-speech' });
          }
        }, maxMs);

        recognition.onresult = (event) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const piece = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += piece + ' ';
            } else {
              interimTranscript += piece;
            }
          }

          if (typeof options.onInterim === 'function') {
            options.onInterim(interimTranscript || finalTranscript);
          }
        };

        recognition.onerror = (event) => {
          const errCode = event.error || 'unknown_error';
          done({
            transcript: finalTranscript.trim(),
            isFinal: false,
            error: errCode
          });
        };

        recognition.onend = () => {
          done({
            transcript: finalTranscript.trim(),
            isFinal: true
          });
        };

        recognition.start();
      } catch (e) {
        done({
          transcript: '',
          isFinal: false,
          error: e.message || 'recognition_start_failed'
        });
      }
    });
  }

  /**
   * Check browser capability status
   */
  function getStatus() {
    return {
      ttsSupported: hasTTS,
      sttSupported: hasSTT,
      isAvailable: hasTTS && hasSTT
    };
  }

  const VoiceIO = {
    isSupported: () => hasTTS && hasSTT,
    hasTTS: () => hasTTS,
    hasSTT: () => hasSTT,
    getStatus,
    speak,
    replay,
    stopSpeaking,
    listen,
    stopListening,
    isListening: () => isListeningState
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = VoiceIO;
  }
  root.VoiceIO = VoiceIO;

})(typeof window !== 'undefined' ? window : this);
