import React, { useEffect, useRef } from 'react';

/**
 * FlowerCelebration
 * Realistic blooming and popping flowers celebration effect using HTML5 Canvas & Web Audio API.
 * Spawns blossoming botanical flowers (Roses, Cherry Blossoms, Lotus, Marigolds) that burst upward,
 * unfurl their layered petals organically, emit glowing pollen sparkles, and flutter down.
 */
export function FlowerCelebration({ active = false, onComplete, score = 85 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    // Optional: Gentle harmonious bloom audio chime using Web Audio API
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const now = ctx.currentTime;
        // Ascending harmonic chime: C5, E5, G5, C6 (nature bloom chords)
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0, now + idx * 0.08);
          gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.7);
        });
      }
    } catch (e) {
      // Audio playback is optional, ignore if blocked by browser policy
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color palettes for realistic flowers
    const FLOWER_TYPES = [
      {
        name: 'Sakura / Cherry Blossom',
        layers: 2,
        petalsPerLayer: 5,
        baseColor: '#FF69B4',
        tipColor: '#FFE4E1',
        innerColor: '#FF1493',
        centerColor: '#FFD700',
        petalShape: 'cherry' // notched petal tip
      },
      {
        name: 'Crimson Rose',
        layers: 4,
        petalsPerLayer: 7,
        baseColor: '#BE123C',
        tipColor: '#FDA4AF',
        innerColor: '#881337',
        centerColor: '#F59E0B',
        petalShape: 'round'
      },
      {
        name: 'Lotus Blossom',
        layers: 3,
        petalsPerLayer: 8,
        baseColor: '#A855F7',
        tipColor: '#F5D0FE',
        innerColor: '#7E22CE',
        centerColor: '#FBBF24',
        petalShape: 'pointed'
      },
      {
        name: 'Golden Daisy',
        layers: 2,
        petalsPerLayer: 12,
        baseColor: '#F59E0B',
        tipColor: '#FEF08A',
        innerColor: '#B45309',
        centerColor: '#78350F',
        petalShape: 'slender'
      }
    ];

    // Flower particle class
    class BloomingFlower {
      constructor(originX, originY) {
        this.x = originX + (Math.random() - 0.5) * 120;
        this.y = originY;
        
        // Pop trajectory: upwards fountain with angle variation
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.9;
        const speed = 10 + Math.random() * 9;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.gravity = 0.28;
        this.friction = 0.985;
        this.rotation = Math.random() * Math.PI * 2;
        this.vRot = (Math.random() - 0.5) * 0.04;
        
        this.type = FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)];
        this.maxSize = 36 + Math.random() * 26;
        
        // Blooming progression (0 = tightly closed bud, 1 = fully blossomed)
        this.bloom = 0;
        this.bloomSpeed = 0.025 + Math.random() * 0.02;
        
        this.opacity = 1;
        this.life = 0;
        this.maxLife = 140 + Math.random() * 40;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.rotation += this.vRot;

        // Unfurl petals smoothly
        if (this.bloom < 1) {
          this.bloom = Math.min(1, this.bloom + this.bloomSpeed);
        }

        this.life++;
        if (this.life > this.maxLife - 35) {
          this.opacity = Math.max(0, (this.maxLife - this.life) / 35);
        }
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.globalAlpha = this.opacity;

        const currentRadius = this.maxSize * (0.3 + 0.7 * this.bloom);

        // Draw petals in concentric blossoming layers
        for (let l = this.type.layers - 1; l >= 0; l--) {
          const layerScale = 0.55 + (l / this.type.layers) * 0.45;
          const layerRadius = currentRadius * layerScale;
          const petalCount = this.type.petalsPerLayer + l * 2;
          const angleStep = (Math.PI * 2) / petalCount;
          const layerOffset = (l * Math.PI) / petalCount; // Stagger layers

          for (let p = 0; p < petalCount; p++) {
            const petalAngle = p * angleStep + layerOffset;
            c.save();
            c.rotate(petalAngle);

            // Petal bloom opening angle: unfolds outwards as bloom increases
            const bloomSpread = this.bloom * 1.1;
            const petalLen = layerRadius * bloomSpread;
            const petalWidth = (layerRadius * 0.45) * bloomSpread;

            // Petal gradient from inner depth to soft glowing tip
            const grad = c.createRadialGradient(0, 0, 4, 0, petalLen * 0.7, petalLen);
            grad.addColorStop(0, this.type.innerColor);
            grad.addColorStop(0.4, this.type.baseColor);
            grad.addColorStop(1, this.type.tipColor);

            c.fillStyle = grad;
            c.shadowColor = this.type.baseColor;
            c.shadowBlur = 8 * this.bloom;

            // Draw organic curved petal geometry
            c.beginPath();
            c.moveTo(0, 0);

            if (this.type.petalShape === 'cherry') {
              // Notched tip cherry blossom petal
              c.bezierCurveTo(-petalWidth, petalLen * 0.4, -petalWidth * 1.1, petalLen * 0.85, -petalWidth * 0.35, petalLen);
              c.quadraticCurveTo(0, petalLen * 0.85, petalWidth * 0.35, petalLen);
              c.bezierCurveTo(petalWidth * 1.1, petalLen * 0.85, petalWidth, petalLen * 0.4, 0, 0);
            } else if (this.type.petalShape === 'pointed') {
              // Pointed lotus / orchid petal
              c.bezierCurveTo(-petalWidth * 0.8, petalLen * 0.3, -petalWidth, petalLen * 0.7, 0, petalLen);
              c.bezierCurveTo(petalWidth, petalLen * 0.7, petalWidth * 0.8, petalLen * 0.3, 0, 0);
            } else if (this.type.petalShape === 'slender') {
              // Slender daisy petal
              c.bezierCurveTo(-petalWidth * 0.5, petalLen * 0.3, -petalWidth * 0.5, petalLen * 0.8, 0, petalLen);
              c.bezierCurveTo(petalWidth * 0.5, petalLen * 0.8, petalWidth * 0.5, petalLen * 0.3, 0, 0);
            } else {
              // Soft rounded rose petal
              c.bezierCurveTo(-petalWidth, petalLen * 0.35, -petalWidth * 0.9, petalLen * 0.95, 0, petalLen);
              c.bezierCurveTo(petalWidth * 0.9, petalLen * 0.95, petalWidth, petalLen * 0.35, 0, 0);
            }

            c.fill();
            c.restore();
          }
        }

        // Flower Center (Pistil & Stamen)
        const centerR = currentRadius * 0.22 * (0.4 + 0.6 * this.bloom);
        const centerGrad = c.createRadialGradient(0, 0, 1, 0, 0, centerR);
        centerGrad.addColorStop(0, '#FFF9C4');
        centerGrad.addColorStop(0.6, this.type.centerColor);
        centerGrad.addColorStop(1, '#B45309');

        c.beginPath();
        c.arc(0, 0, centerR, 0, Math.PI * 2);
        c.fillStyle = centerGrad;
        c.fill();

        // Golden pollen dots around the center
        if (this.bloom > 0.4) {
          c.fillStyle = '#FEF08A';
          const pollenCount = 8;
          for (let i = 0; i < pollenCount; i++) {
            const pAng = (i / pollenCount) * Math.PI * 2;
            const px = Math.cos(pAng) * (centerR * 0.85);
            const py = Math.sin(pAng) * (centerR * 0.85);
            c.beginPath();
            c.arc(px, py, 1.2, 0, Math.PI * 2);
            c.fill();
          }
        }

        c.restore();
      }
    }

    // Drifting single petal particle class
    class FlutteringPetal {
      constructor(originX, originY) {
        this.x = originX + (Math.random() - 0.5) * 300;
        this.y = originY + (Math.random() - 0.5) * 50;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = -6 - Math.random() * 8;
        this.gravity = 0.12;
        this.sway = Math.random() * Math.PI * 2;
        this.swaySpeed = 0.04 + Math.random() * 0.04;
        this.size = 10 + Math.random() * 12;
        this.rotation = Math.random() * Math.PI * 2;
        this.vRot = (Math.random() - 0.5) * 0.06;
        this.color = ['#FFB7C5', '#FDA4AF', '#F472B6', '#C084FC', '#FDE047'][Math.floor(Math.random() * 5)];
        this.opacity = 1;
        this.life = 0;
        this.maxLife = 160 + Math.random() * 40;
      }

      update() {
        this.sway += this.swaySpeed;
        this.x += this.vx + Math.sin(this.sway) * 1.5;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.98;
        this.rotation += this.vRot;

        this.life++;
        if (this.life > this.maxLife - 40) {
          this.opacity = Math.max(0, (this.maxLife - this.life) / 40);
        }
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;

        // Realistic curved petal silhouette
        c.beginPath();
        c.ellipse(0, 0, this.size * 0.5, this.size, 0, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    // Sparkle / Pollen dust
    class SparkleDust {
      constructor(originX, originY) {
        this.x = originX + (Math.random() - 0.5) * 160;
        this.y = originY + (Math.random() - 0.5) * 60;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = -4 - Math.random() * 9;
        this.size = 1.5 + Math.random() * 2.5;
        this.color = ['#FEF08A', '#FDE047', '#E879F9', '#67E8F9'][Math.floor(Math.random() * 4)];
        this.alpha = 1;
        this.life = 0;
        this.maxLife = 80 + Math.random() * 40;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.08;
        this.alpha = Math.max(0, 1 - this.life / this.maxLife);
        this.life++;
      }

      draw(c) {
        c.save();
        c.globalAlpha = this.alpha;
        c.fillStyle = this.color;
        c.shadowColor = this.color;
        c.shadowBlur = 6;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    // Spawn elements from lower-center screen
    const spawnX = width / 2;
    const spawnY = height * 0.65;

    const flowers = [];
    const petals = [];
    const sparkles = [];

    // Spawn 14-18 blooming flowers in two burst waves
    for (let i = 0; i < 16; i++) {
      flowers.push(new BloomingFlower(spawnX, spawnY));
    }
    // Spawn 40 drifting petals
    for (let i = 0; i < 40; i++) {
      petals.push(new FlutteringPetal(spawnX, spawnY));
    }
    // Spawn 50 glowing pollen dust particles
    for (let i = 0; i < 50; i++) {
      sparkles.push(new SparkleDust(spawnX, spawnY));
    }

    let isDone = false;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.update();
        s.draw(ctx);
        if (s.life >= s.maxLife) sparkles.splice(i, 1);
      }

      // Draw fluttering petals
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.update();
        p.draw(ctx);
        if (p.life >= p.maxLife) petals.splice(i, 1);
      }

      // Draw blooming flowers
      for (let i = flowers.length - 1; i >= 0; i--) {
        const f = flowers[i];
        f.update();
        f.draw(ctx);
        if (f.life >= f.maxLife) flowers.splice(i, 1);
      }

      if (flowers.length === 0 && petals.length === 0 && sparkles.length === 0) {
        isDone = true;
        if (onComplete) onComplete();
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Uplifting Realistic Bloom Toast */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-purple-950/90 border border-purple-400/50 shadow-2xl shadow-purple-500/30 px-6 py-3 rounded-2xl flex items-center space-x-3 text-white animate-in zoom-in-95 duration-300 backdrop-blur-md">
        <span className="text-2xl animate-bounce">🌸</span>
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-white">
              Outstanding Answer!
            </h4>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              +{score}% Quality
            </span>
          </div>
          <p className="text-xs text-purple-200/90 font-medium">
            Flowers of mastery blooming! Clear structure & strong conviction.
          </p>
        </div>
        <span className="text-2xl animate-bounce delay-100">🌺</span>
      </div>
    </div>
  );
}
