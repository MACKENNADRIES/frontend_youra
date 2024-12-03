import { useEffect } from "react";

export const useDrawWaves = (canvasId) => {
  useEffect(() => {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0;

    const drawFlowingWaves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the first three waves
      for (let i = 0; i < 3; i++) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `rgba(222, 176, 255, 0.12)`);
        gradient.addColorStop(0.5, `rgba(166, 118, 173, 0.5)`);
        gradient.addColorStop(1, `rgba(122, 87, 173, 1)`);

        ctx.fillStyle = gradient;

        const amplitude = 100 + i * 20;
        const frequency = 0.0025 + i * 0.001;
        const yOffset = canvas.height / 3 + i * 70;

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x++) {
          const y =
            yOffset +
            amplitude * Math.sin(frequency * x + time * (0.5 + i * 0.1));
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      }

      // Draw the fourth wave
      const fourthWaveHeight = canvas.height * 0.5;
      ctx.fillStyle = `rgba(222, 176, 255, 0.9)`;
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x++) {
        const y =
          fourthWaveHeight +
          60 * Math.sin(0.003 * x + time * 0.3);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Draw the fifth wave with radial gradient
      const fifthWaveHeight = canvas.height * 0.45;
      const radialGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height)
      );

      // Adjusting alpha values for transparency
      radialGradient.addColorStop(0, "rgba(222, 176, 255, 0.2)"); // Light purple, 30% opaque
      radialGradient.addColorStop(0.5, "rgba(122, 87, 173, 0.7)"); // Medium purple, 70% opaque
      radialGradient.addColorStop(0.8, "rgba(46, 39, 111, 0.8)");  // Darker purple, 80% opaque
      radialGradient.addColorStop(1, "rgba(14, 0, 13, 0.9)");      // Very dark purple, 90% opaque

      ctx.fillStyle = radialGradient;
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x++) {
        const y =
          fifthWaveHeight +
          80 * Math.sin(0.002 * x + time * 0.4);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();

      time += 0.01;
      requestAnimationFrame(drawFlowingWaves);
    };

    drawFlowingWaves();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [canvasId]);
};
