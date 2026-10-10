/**
 * 5th Grade CBSE — Unified Web Audio Synthesizer
 * Zero External Dependencies | Offline Native Web Audio API
 */

(function(global) {
  'use strict';

  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playTone(freq, type = 'sine', duration = 0.15, gainLevel = 0.12) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio may fail safely if user hasn't tapped yet
    }
  }

  const AppAudio = {
    init: getAudioContext,
    playTone: playTone,
    tap: () => playTone(520, 'sine', 0.04, 0.08),
    click: () => playTone(520, 'sine', 0.04, 0.08),
    correct: () => {
      playTone(523.25, 'triangle', 0.1, 0.15); // C5
      setTimeout(() => playTone(659.25, 'triangle', 0.1, 0.15), 90); // E5
      setTimeout(() => playTone(783.99, 'triangle', 0.2, 0.15), 180); // G5
    },
    wrong: () => {
      playTone(180, 'sawtooth', 0.12, 0.12);
      setTimeout(() => playTone(140, 'sawtooth', 0.2, 0.12), 100);
    },
    fanfare: () => {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((note, idx) => {
        setTimeout(() => playTone(note, 'triangle', 0.24, 0.18), idx * 120);
      });
    },
    tick: () => playTone(880, 'sine', 0.03, 0.06),
    play: (type) => {
      if (AppAudio[type]) AppAudio[type]();
    }
  };

  // Attach global singleton & backward-compatible aliases
  global.AppAudio = AppAudio;
  if (!global.playClickSound) global.playClickSound = AppAudio.click;
  if (!global.playTapSound) global.playTapSound = AppAudio.tap;
  if (!global.playCorrectSound) global.playCorrectSound = AppAudio.correct;
  if (!global.playWrongSound) global.playWrongSound = AppAudio.wrong;
  if (!global.playIncorrectSound) global.playIncorrectSound = AppAudio.wrong;
  if (!global.playFanfare) global.playFanfare = AppAudio.fanfare;
})(typeof window !== 'undefined' ? window : this);
