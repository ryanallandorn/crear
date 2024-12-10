<script>

// resources/js/Frontend/Components/DitheredBackground.svelte

    import { onMount, onDestroy } from 'svelte';

    // Configuration
    const DOT_SIZE = 12; 
    const DOT_SPACING = 24
    const INNER_GRADIENT_DOTS = 2;
    const RIPPLE_SPEED = 0.02;
    const RIPPLE_FREQUENCY = 0.033;

    // RGBA color configurations
    const colors = {
        dark: {
            background: 'rgba(17, 24, 39, 1)', // #111827
            dot: 'rgba(192, 192, 192, 1)',    // A lighter gray
            fadeOut: 'rgba(64, 64, 64, 0.6)'  // Less transparent fade-out
        },
        light: {
            background: 'rgba(255, 255, 255, 1)', // #ffffff
            dot: 'rgba(115, 115, 115, 1)',        // #737373
            fadeOut: 'rgba(115, 115, 115, 0.4)'   // Transparent version of dot color
        }
    };

    // Theme state
    //let isDarkMode = false;

    let currentBackground = '';
    
    // Canvas setup
    let canvas;
    let ctx;
    let width = 0;
    let height = 0;
    let dots = [];
    let mousePos = { x: -1000, y: -1000 };
    let animationId = null;
    let time = 0;
    //let isDarkMode = localStorage.getItem('theme') === 'dark'; // Initial theme detection
    let isDarkMode = false;

// Reactive theme colors
    $: themeColors = isDarkMode ? colors.dark : colors.light;

    // Reference to the debounced mouse move handler
    let debouncedHandleMouseMove;

        // Theme management - Updated to be more reactive
    function handleThemeChange(event) {
        isDarkMode = event.detail.theme === 'dark';
        updateTheme();
        if (ctx) {
            draw(); // Trigger immediate redraw with new theme
        }
    }

    // Theme management
    // function updateTheme() {
    //     const theme = localStorage.getItem('theme') || 'light';
    //     isDarkMode = theme === 'dark';
        
    //     const customBg = localStorage.getItem('backgroundColor');
    //     if (customBg) {
    //         currentBackground = customBg;
    //         if (document.body) {
    //             document.body.style.backgroundColor = currentBackground;
    //         }
    //     } else {
    //         currentBackground = getThemeColors().background;
    //         if (document.body) {
    //             document.body.style.backgroundColor = currentBackground;
    //         }
    //     }
    // }


    function updateTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        isDarkMode = theme === 'dark';
        currentBackground = getThemeColors().background;
        
        if (document.body) {
            document.body.style.backgroundColor = currentBackground;
        }
    }


    function handleStorageChange(e) {
        if (e.key === 'theme' || e.key === 'backgroundColor') {
            updateTheme();
        }
    }

    // function getThemeColors() {
    //     const themeColors = isDarkMode ? colors.dark : colors.light;
    //     return {
    //         ...themeColors,
    //         background: currentBackground || themeColors.background
    //     };
    // }


    function getThemeColors() {
        return isDarkMode ? colors.dark : colors.light;
    }


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

    function updateDistances() {
        let minDistance = Infinity;
        dots.forEach(dot => {
            const dx = dot.x - mousePos.x;
            const dy = dot.y - mousePos.y;
            dot.distanceToMouse = Math.sqrt(dx * dx + dy * dy);
            minDistance = Math.min(minDistance, dot.distanceToMouse);
        });

        dots.forEach(dot => {
            dot.isClosest = (dot.distanceToMouse === minDistance);
        });
    }

    function calculateDotColor(dot) {
        const theme = getThemeColors();
        const baseColor = isDarkMode ? 128 : 115; // Base color value for dots

        if (dot.isClosest) {
            // Subtle highlight for closest dot
            return `rgba(${baseColor}, ${baseColor}, ${baseColor}, 0.9)`;
        }

        const distanceInDots = Math.floor(dot.distanceToMouse / DOT_SPACING);
        const innerCircleRadius = INNER_GRADIENT_DOTS * DOT_SPACING;

        if (dot.distanceToMouse <= innerCircleRadius) {
            const gradientProgress = dot.distanceToMouse / innerCircleRadius;
            const intensityFactor = Math.pow(1 - gradientProgress, 2);
            
            // More subtle inner gradient
            const alpha = 0.8 - (0.4 * gradientProgress);
            return `rgba(${baseColor}, ${baseColor}, ${baseColor}, ${alpha})`;
        } else {
            const distance = dot.distanceToMouse - innerCircleRadius;
            const maxDistance = Math.max(width, height) / 2;
            
            // Calculate distance ratio (0 = near center, 1 = far edge)
            const distanceRatio = Math.min(distance / maxDistance, 1);
            
            // Calculate ring width (2 dots near center, 5 dots at edges)
            const minRingWidth = 2;
            const maxRingWidth = 5;
            const ringWidth = maxRingWidth - (maxRingWidth - minRingWidth) * Math.pow(1 - distanceRatio, 1.5);
            
            // Calculate wave effect intensity (stronger near center, weaker at edges)
            const baseIntensityMultiplier = Math.pow(1 - distanceRatio, 2) * 1.2 + 0.2;
            
            // Calculate position within the current ring (0 to 1)
            const positionInRing = (distance % DOT_SPACING) / DOT_SPACING;
            
            // Enhanced wave effect
            const wave = Math.sin(distance * RIPPLE_FREQUENCY + time);
            const waveThreshold = 1 - (1 / ringWidth);
            const normalizedWave = wave > waveThreshold ? 
                Math.pow((wave - waveThreshold) / (1 - waveThreshold), 1.2) : 0;
            
            // Calculate final alpha
            const intensity = normalizedWave * baseIntensityMultiplier * (1 - positionInRing) * 3.0;
            const minBrightness = 0.4 * (1 - distanceRatio * 0.6);
            const alpha = Math.max(intensity, minBrightness);
            
            return `rgba(${baseColor}, ${baseColor}, ${baseColor}, ${alpha})`;
        }
    }

    // Debounce function
    function debounce(fn, delay) {
        let timeoutId;
        return function(...args) {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        }
    }

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

        // Clear the entire canvas once
        const theme = getThemeColors();
        ctx.fillStyle = theme.background;
        ctx.fillRect(0, 0, width, height);

        // Draw all dots without individual clearing
        dots.forEach(dot => {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, DOT_SIZE / 2, 0, Math.PI * 2);
            ctx.fillStyle = calculateDotColor(dot);
            ctx.fill();
            ctx.closePath();
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


    /**
     * 
     */ 
    const initialize = () => {
        if (canvas) {
            updateTheme();
            ctx = canvas.getContext('2d');
            handleResize();
            
            window.addEventListener('storage', handleStorageChange);
            window.addEventListener('resize', handleResize);
            
            // Initialize debounced mouse move handler with a delay of 50ms
            debouncedHandleMouseMove = debounce(handleMouseMove, 25);
            window.addEventListener('mousemove', debouncedHandleMouseMove);
            window.addEventListener('mouseleave', handleMouseLeave);
            
            const themeCheckInterval = setInterval(() => {
                updateTheme();
            }, 100);

            draw();

            // Store the interval ID for cleanup
            initialize.themeCheckInterval = themeCheckInterval;
        }
    }


    /**
     * 
     */ 
    onMount(() => {
        // Initial theme setup
        updateTheme();
        
        // Set up theme change listener
        window.addEventListener('themeChange', handleThemeChange);
        
        if (document.readyState === 'complete') {
            initialize();
        } else {
            window.addEventListener('load', initialize);
        }

        return () => {
            window.removeEventListener('load', initialize);
            window.removeEventListener('themeChange', handleThemeChange);
            if (initialize.themeCheckInterval) {
                clearInterval(initialize.themeCheckInterval);
            }
        };
    });


    // onDestroy(() => {
    //     window.removeEventListener('storage', handleStorageChange);
    //     window.removeEventListener('resize', handleResize);
    //     window.removeEventListener('themeChange', handleThemeChange);
    //     // Remove global mouse event listeners
    //     window.removeEventListener('mousemove', debouncedHandleMouseMove);
    //     window.removeEventListener('mouseleave', handleMouseLeave);
    //     if (animationId) {
    //         cancelAnimationFrame(animationId);
    //     }
    //     if (initialize.themeCheckInterval) {
    //         clearInterval(initialize.themeCheckInterval);
    //     }
    // });


    onDestroy(() => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('themeChange', handleThemeChange);
        window.removeEventListener('mousemove', debouncedHandleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        if (initialize.themeCheckInterval) {
            clearInterval(initialize.themeCheckInterval);
        }
    });

</script>

<style lang="scss">


    canvas {
        position: fixed; /* Ensure the canvas stays fixed relative to the viewport */
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        opacity: 0.4;
        pointer-events: none; /* Allow mouse events to pass through the canvas */
        z-index: 0; /* Place the canvas behind other elements */
    }


    // .dark {
    //     canvas {
    //         opacity: 0.4;
    //     }

    // }

</style>

<canvas bind:this={canvas}></canvas>
