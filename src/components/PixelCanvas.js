class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.03, 0.2) * speed; // Slower speed
    this.size = 0;
    this.sizeStep = Math.random() * 0.1; // Smaller growth step
    this.minSize = 6; // Minimum size
    this.maxSizeInteger = 10; // Maximum size
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 2 + (this.width + this.height) * 0.005; // Slower delay progression
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }

    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.05; // Smaller decrement for smooth disappearance
    }

    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }

    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

class PixelCanvas extends HTMLElement {
  static register(tag = "pixel-canvas") {
    if ("customElements" in window) {
      customElements.define(tag, this);
    }
  }

  static css = `
    :host {
      display: grid;
      inline-size: 100%;
      block-size: 100%;
      overflow: hidden;
    }
  `;

  get colors() {
    // Generate random shades of purple
    const shadesOfPurple = Array.from({ length: 5 }, () =>
      `rgb(${this.getRandomValue(100, 160)}, ${this.getRandomValue(
        50,
        80
      )}, ${this.getRandomValue(150, 200)})`
    );
    return shadesOfPurple;
  }

  get gap() {
    const value = this.dataset.gap || 20; // Larger gap for more scattered pixels
    const min = 10;
    const max = 50;

    if (value <= min) {
      return min;
    } else if (value >= max) {
      return max;
    } else {
      return parseInt(value);
    }
  }

  get speed() {
    const value = this.dataset.speed || 15; // Slower animation speed
    const min = 0;
    const max = 50;
    const throttle = 0.0005; // Slower throttle

    if (value <= min || this.reducedMotion) {
      return min;
    } else if (value >= max) {
      return max * throttle;
    } else {
      return parseInt(value) * throttle;
    }
  }

  connectedCallback() {
    const canvas = document.createElement("canvas");
    const sheet = new CSSStyleSheet();

    this._parent = this.parentNode;
    this.shadowroot = this.attachShadow({ mode: "open" });

    sheet.replaceSync(PixelCanvas.css);

    this.shadowroot.adoptedStyleSheets = [sheet];
    this.shadowroot.append(canvas);
    this.canvas = this.shadowroot.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.timeInterval = 1000 / 60;
    this.timePrevious = performance.now();
    this.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    this.init();
    this.resizeObserver = new ResizeObserver(() => this.init());
    this.resizeObserver.observe(this);

    this._parent.addEventListener("mouseenter", this);
    this._parent.addEventListener("mouseleave", this);
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
    this._parent.removeEventListener("mouseenter", this);
    this._parent.removeEventListener("mouseleave", this);
    delete this._parent;
  }

  handleEvent(event) {
    this[`on${event.type}`](event);
  }

  onmouseenter() {
    cancelAnimationFrame(this.animation);
    this.animation = this.animate("appear");
  }

  onmouseleave() {
    cancelAnimationFrame(this.animation);
    this.animation = this.animate("disappear");
  }

  init() {
    const rect = this.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    this.pixels = [];
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.createPixels();
  }

  getDistanceToCanvasCenter(x, y) {
    const dx = x - this.canvas.width / 2;
    const dy = y - this.canvas.height / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance;
  }

  createPixels() {
    for (let x = 0; x < this.canvas.width; x += this.gap) {
      for (let y = 0; y < this.canvas.height; y += this.gap) {
        if (Math.random() > 0.7) continue; // Skip some pixels for scatter effect

        const color = this.colors[
          Math.floor(Math.random() * this.colors.length)
        ];
        const delay = this.reducedMotion
          ? 0
          : this.getDistanceToCanvasCenter(x, y);

        this.pixels.push(
          new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay)
        );
      }
    }
  }

  animate(fnName) {
    this.animation = requestAnimationFrame(() => this.animate(fnName));

    const timeNow = performance.now();
    const timePassed = timeNow - this.timePrevious;

    if (timePassed < this.timeInterval) return;

    this.timePrevious = timeNow - (timePassed % this.timeInterval);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.pixels.length; i++) {
      this.pixels[i][fnName]();
    }

    if (this.pixels.every((particle) => particle.isIdle)) {
      cancelAnimationFrame(this.animation);
    }
  }

  getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }
}

PixelCanvas.register();
