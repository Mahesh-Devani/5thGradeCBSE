/**
 * 5th Grade CBSE — Native Web Speech API Controller
 * Zero External Dependencies | Offline Pronunciation & Read-Aloud
 */

(function(global) {
  'use strict';

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let availableVoices = [];

  function loadVoices() {
    if (!isSupported) return;
    try {
      availableVoices = window.speechSynthesis.getVoices() || [];
    } catch (e) {
      availableVoices = [];
    }
  }

  if (isSupported) {
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  function getBestVoice(lang) {
    if (!availableVoices || availableVoices.length === 0) {
      loadVoices();
    }
    const targetLang = (lang || '').toLowerCase();

    // 1. Exact match (e.g. 'hi-IN')
    let match = availableVoices.find(v => (v.lang || '').toLowerCase() === targetLang);
    if (match) return match;

    // 2. Language prefix match (e.g. 'hi')
    const prefix = targetLang.split('-')[0];
    match = availableVoices.find(v => (v.lang || '').toLowerCase().startsWith(prefix));
    if (match) return match;

    // 3. Name match for Hindi
    if (prefix === 'hi') {
      match = availableVoices.find(v => /hindi|हिन्दी/i.test(v.name || ''));
      if (match) return match;
    }

    return null;
  }

  function containsDevanagari(text) {
    return /[\u0900-\u097F]/.test(text || '');
  }

  const AppSpeech = {
    isSupported: () => isSupported,

    stop: () => {
      if (!isSupported) return;
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    },

    isSpeaking: () => {
      if (!isSupported) return false;
      try {
        return window.speechSynthesis.speaking;
      } catch (e) {
        return false;
      }
    },

    speak: (text, lang = null, triggerEl = null) => {
      if (!isSupported || !text) return;

      try {
        window.speechSynthesis.cancel(); // Stop any previous speech

        // Auto-detect language if not specified
        const selectedLang = lang || (containsDevanagari(text) ? 'hi-IN' : 'en-IN');
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedLang;
        utterance.rate = 0.88; // Slightly measured rate for elementary learners
        utterance.pitch = 1.0;

        const voice = getBestVoice(selectedLang);
        if (voice) {
          utterance.voice = voice;
        }

        if (triggerEl) {
          triggerEl.classList.add('speaking');
          utterance.onend = () => triggerEl.classList.remove('speaking');
          utterance.onerror = () => triggerEl.classList.remove('speaking');
        }

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        if (triggerEl) triggerEl.classList.remove('speaking');
      }
    },

    speakHindi: (text, triggerEl = null) => {
      AppSpeech.speak(text, 'hi-IN', triggerEl);
    },

    speakEnglish: (text, triggerEl = null) => {
      AppSpeech.speak(text, 'en-IN', triggerEl);
    }
  };

  // Delegated click listener for any button with data-speak or .speech-btn
  if (typeof document !== 'undefined') {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-speak], .speech-btn');
      if (!btn) return;

      const text = btn.dataset.speak || btn.getAttribute('data-text');
      if (!text) return;

      const lang = btn.dataset.lang || null;
      AppSpeech.speak(text, lang, btn);
    });
  }

  global.AppSpeech = AppSpeech;
})(typeof window !== 'undefined' ? window : this);
