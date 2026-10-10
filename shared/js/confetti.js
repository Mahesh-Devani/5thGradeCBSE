/**
 * 5th Grade CBSE — Celebratory Canvas Confetti
 * Zero External Dependencies | Pure HTML5 Canvas & RequestAnimationFrame
 */

(function(global) {
  'use strict';

  let canvas = null;
  let ctx = null;
  let particles = [];
  let animId = null;

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

  function getCanvas() {
    if (!canvas) {
      canvas = document.getElementById('confetti-canvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'confetti-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);
      }
      ctx = canvas.getContext('2d');
      resize();
      window.addEventListener('resize', resize);
    }
    return canvas;
  }

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles(count = 80) {
    particles = [];
    const w = canvas.width;
    const h = canvas.height;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: w / 2 + (Math.random() - 0.5) * (w * 0.5),
        y: h * 0.45 + (Math.random() - 0.5) * (h * 0.2),
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 18 - 4,
        size: Math.random() * 8 + 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        alpha: 1
      });
    }
  }

  function loop() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45; // gravity
      p.rotation += p.vRot;
      p.alpha -= 0.012;
      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    }
    if (alive) {
      animId = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  const AppConfetti = {
    fire: (count = 80) => {
      getCanvas();
      resize();
      createParticles(count);
      if (animId) cancelAnimationFrame(animId);
      loop();
    }
  };

  // Attach global singleton & backward-compatible aliases
  global.AppConfetti = AppConfetti;
  if (!global.launchConfetti) global.launchConfetti = AppConfetti.fire;
})(typeof window !== 'undefined' ? window : this);
