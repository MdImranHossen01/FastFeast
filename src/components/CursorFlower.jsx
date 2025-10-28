'use client';

import { useEffect, useRef } from 'react';

export default function CursorFlower() {
  const followerRef = useRef(null);
  const poolRef = useRef([]);

  useEffect(() => {
    const follower = followerRef.current;

    const PETALS = 18;
    const pool = [];
    for (let i = 0; i < PETALS; i++) {
      const p = document.createElement('div');
      p.className = 'cf-petal';
      p.style.display = 'none';
      document.body.appendChild(p);
      pool.push(p);
    }
    poolRef.current = pool;

    let raf = 0;
    let targetX = 0, targetY = 0;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;

    // OPTIONAL: tiny manual nudge if you want the ring to sit a bit
    // below/right of the pointer tip (most people keep this at 0, 0).
    const FOLLOWER_OFFSET_X = 0; // e.g. -2
    const FOLLOWER_OFFSET_Y = 0; // e.g. -2

    const onMove = (e) => {
      targetX = e.clientX + FOLLOWER_OFFSET_X;
      targetY = e.clientY + FOLLOWER_OFFSET_Y;
      if (!raf) tick();
    };

    const onTouch = (e) => {
      const t = e.touches?.[0];
      if (!t) return;
      targetX = t.clientX; targetY = t.clientY;
      bloom(targetX, targetY);
    };

    const onClick = (e) => bloom(e.clientX, e.clientY);

    const tick = () => {
      // ease follower toward target
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;

      // center-anchored: set left/top; CSS handles -50%/-50%
      follower.style.left = `${x}px`;
      follower.style.top = `${y}px`;

      if (Math.hypot(targetX - x, targetY - y) > 0.2) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const bloom = (cx, cy) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const petals = poolRef.current;
      const available = petals.filter((p) => p.dataset.busy !== '1');

      const startAngle = Math.random() * Math.PI;

      available.slice(0, PETALS).forEach((el, i) => {
        el.dataset.busy = '1';
        el.style.display = 'block';
        el.style.left = `${cx}px`;
        el.style.top = `${cy}px`;

        const angle = startAngle + (i * (2 * Math.PI / PETALS));
        const radius = 32 + (i % 3) * 8;
        const tx = Math.cos(angle) * radius;
        const ty = Math.sin(angle) * radius;

        const hue = 25 + (Math.random() * 20 - 10);
        el.style.setProperty('--cf-hue', hue.toFixed(1));
        el.style.setProperty('--cf-tx', `${tx}px`);
        el.style.setProperty('--cf-ty', `${ty}px`);

        el.style.animation = 'none';
        // eslint-disable-next-line no-unused-expressions
        el.offsetHeight;
        el.style.animation = `cf-bloom 650ms cubic-bezier(.2,.8,.2,1) forwards`;

        const release = () => {
          el.style.display = 'none';
          el.dataset.busy = '0';
          el.removeEventListener('animationend', release);
        };
        el.addEventListener('animationend', release);
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('click', onClick);
    window.addEventListener('touchstart', onTouch, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchstart', onTouch);
      cancelAnimationFrame(raf);
      pool.forEach(p => p.remove());
    };
  }, []);

  return <div ref={followerRef} className="cf-follower" aria-hidden />;
}
