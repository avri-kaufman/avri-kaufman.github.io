document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const container = document.getElementById("particles-js");
  container.appendChild(canvas);

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Create a darker, more code-like background
  const gradient = ctx.createLinearGradient(0, height / 2, 0, height);
  gradient.addColorStop(0, "#0a1a2f");
  gradient.addColorStop(1, "#152642");

  // Mountains
  class Mountain {
    constructor(baseHeight, peaks, color) {
      this.baseHeight = baseHeight;
      this.peaks = peaks;
      this.color = color;
      this.points = [];
      this.generatePoints();
    }

    generatePoints() {
      this.points = [];
      const segmentWidth = width / (this.peaks - 1);

      // Start with the leftmost point at the bottom of the canvas
      this.points.push({ x: 0, y: height });

      // Generate peaks
      for (let i = 0; i < this.peaks; i++) {
        const x = i * segmentWidth;
        const peakHeight = Math.random() * this.baseHeight;
        const y = height - peakHeight;
        this.points.push({ x, y });
      }

      // End with the rightmost point at the bottom of the canvas
      this.points.push({ x: width, y: height });
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);

      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }

      ctx.closePath();
      ctx.fill();
    }
  }

  // Code Particles
  class CodeParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height * 0.7; // Keep above mountains
      this.size = Math.random() * 10 + 5;
      this.speed = Math.random() * 0.5 + 0.2;
      this.text = this.getRandomCodeChar();
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.floor(Math.random() * 60) + 120; // Green to blue hues
    }

    getRandomCodeChar() {
      const codeChars = [
        "0",
        "1",
        "{",
        "}",
        "<",
        ">",
        "/",
        "=",
        ";",
        "()",
        "[]",
        "&&",
        "||",
        "!=",
        "==",
      ];
      return codeChars[Math.floor(Math.random() * codeChars.length)];
    }

    update() {
      this.y += this.speed;

      // Reset when particle goes off screen
      if (this.y > height) {
        this.reset();
        this.y = 0;
      }
    }

    draw() {
      ctx.save();
      ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`;
      ctx.font = `${this.size}px monospace`;
      ctx.fillText(this.text, this.x, this.y);
      ctx.restore();
    }
  }

  // Create mountains (back to front)
  const mountains = [
    new Mountain(height * 0.3, 7, "#152642"), // Furthest mountain
    new Mountain(height * 0.4, 6, "#0d1b2a"), // Middle mountain
    new Mountain(height * 0.5, 5, "#061018"), // Closest mountain
  ];

  // Create code particles
  const particles = [];
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    particles.push(new CodeParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw background gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw mountains from back to front
    mountains.forEach((mountain) => {
      mountain.draw();
    });

    // Update and draw particles
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    // Update mountains
    mountains.forEach((mountain) => {
      mountain.generatePoints();
    });

    // Update gradient
    const gradient = ctx.createLinearGradient(0, height / 2, 0, height);
    gradient.addColorStop(0, "#0a1a2f");
    gradient.addColorStop(1, "#152642");
  });
});
