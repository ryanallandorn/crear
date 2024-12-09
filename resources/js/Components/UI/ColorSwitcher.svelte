<script>
    import { onMount, onDestroy } from 'svelte';
  
    // Configuration
    const DOT_SIZE = 12;             // Bigger dots
    const DOT_SPACING = 32;          // Adjusted spacing for bigger dots
    const INNER_GRADIENT_DOTS = 5;   
    const RIPPLE_SPEED = 0.02;      
    const RIPPLE_FREQUENCY = 0.03;   
  
    // Tailwind color configurations
    const colors = {
      dark: {
        background: '#111827', // neutral-900
        dot: '#404040',       // neutral-700
        fadeOut: '#171717'    // neutral-900
      },
      light: {
        background: '#ffffff', // white
        dot: '#737373',       // neutral-500
        fadeOut: '#f5f5f5'    // neutral-100
      }
    };
  
    // Theme state
    let isDarkMode = false;
    
    // Canvas setup
    let canvas;
    let ctx;
    let width = 0;
    let height = 0;
    let dots = [];
    let mousePos = { x: -1000, y: -1000 };
    let animationId = null;
    let time = 0;
  
    // Theme management
    function updateTheme() {
      const theme = localStorage.getItem('theme') || 'light';
      isDarkMode = theme === 'dark';
      if (document.body) {
        document.body.style.backgroundColor = getThemeColors().background;
      }
    }
  
    function handleStorageChange(e) {
      if (e.key === 'theme') {
        updateTheme();
      }
    }
  
    // Get current theme colors
    function getThemeColors() {
      return isDarkMode ? colors.dark : colors.light;
    }
  
    // Rest of the functions remain the same
    function initializeDots() {
      if (!canvas) return;
      
      dots = [];
      width = canvas.width;
      height = canvas.height;
      
      const cols = Math.floor(width / DOT_SPACING);
      const rows = Math.floor(height / DOT_SPACING);
  
      const xOffset = (width - (cols * DOT_SPACING)) / 2;
      const yOffset = (height - (rows * DOT_SPACING)) / 2;
  
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          dots.push({
            x: Math.round(x * DOT_SPACING + xOffset + DOT_SPACING / 2),
            y: Math.round(y * DOT_SPACING + yOffset + DOT_SPACING / 2),
            distanceToMouse: Infinity
          });
        }
      }
    }
  
    // ... [previous distance and color calculation functions remain the same]
  
    function handleMouseMove(event) {
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      mousePos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  
    function handleMouseLeave() {
      mousePos = { x: -1000, y: -1000 };
    }
  
    function draw() {
      if (!ctx || !canvas) return;
  
      time += RIPPLE_SPEED;
      updateDistances();
  
      const theme = getThemeColors();
      ctx.fillStyle = theme.background;
      ctx.fillRect(0, 0, width, height);
  
      dots.forEach(dot => {
        ctx.clearRect(
          dot.x - DOT_SIZE/2 - 1, 
          dot.y - DOT_SIZE/2 - 1, 
          DOT_SIZE + 2, 
          DOT_SIZE + 2
        );
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_SIZE / 2, 0, Math.PI * 2);
        ctx.fillStyle = calculateDotColor(dot);
        ctx.fill();
      });
  
      animationId = requestAnimationFrame(draw);
    }
  
    function handleResize() {
      if (!canvas) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = canvas.width;
      height = canvas.height;
      
      initializeDots();
    }
  
    onMount(() => {
      if (canvas) {
        updateTheme(); // Initial theme setup
        ctx = canvas.getContext('2d');
        handleResize();
        
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        
        // Watch for theme changes in localStorage
        const themeCheckInterval = setInterval(() => {
          updateTheme();
        }, 100);
  
        draw();
  
        return () => clearInterval(themeCheckInterval);
      }
    });
  
    onDestroy(() => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    });
  </script>
  
  <style>
    canvas {
      display: block;
      width: 100vw;
      height: 100vh;
    }
  </style>
  
  <canvas bind:this={canvas}></canvas>