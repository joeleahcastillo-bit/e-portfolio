/**
 * 3D Starfield Background
 * Creates an animated purple galaxy starfield effect
 */

class Starfield {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 800;
        this.speed = 0.5;
        this.mouse = { x: 0, y: 0 };
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.resizeCanvas();
        this.createStars();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }
    
    createStars() {
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push(this.createStar());
        }
    }
    
    createStar() {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * Math.max(this.canvas.width, this.canvas.height);
        
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            z: Math.random() * 2000,
            size: Math.random() * 2,
            color: this.getStarColor(),
            speed: Math.random() * 0.5 + 0.2
        };
    }
    
    getStarColor() {
        const colors = [
            'rgba(168, 85, 247, ',  // Purple
            'rgba(236, 72, 153, ',  // Pink
            'rgba(147, 51, 234, ',  // Deep Purple
            'rgba(59, 130, 246, ',  // Blue
            'rgba(255, 255, 255, '  // White
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX - this.centerX) / this.centerX;
            this.mouse.y = (e.clientY - this.centerY) / this.centerY;
        });
    }
    
    updateStar(star) {
        // Move star towards camera
        star.z -= star.speed * this.speed * 5;
        
        // Reset star if it's too close
        if (star.z <= 0) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * Math.max(this.canvas.width, this.canvas.height);
            star.x = Math.cos(angle) * radius;
            star.y = Math.sin(angle) * radius;
            star.z = 2000;
        }
    }
    
    drawStar(star) {
        // Calculate 3D projection
        const scale = 1000 / (1000 + star.z);
        const x = this.centerX + star.x * scale + (this.mouse.x * 50);
        const y = this.centerY + star.y * scale + (this.mouse.y * 50);
        
        // Don't draw if off screen
        if (x < 0 || x > this.canvas.width || y < 0 || y > this.canvas.height) {
            return;
        }
        
        // Calculate size and opacity based on distance
        const size = star.size * scale;
        const opacity = Math.min((2000 - star.z) / 2000, 1);
        
        // Draw star
        this.ctx.beginPath();
        this.ctx.fillStyle = star.color + opacity + ')';
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add glow for closer stars
        if (star.z < 500) {
            const glowSize = size * 3;
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, glowSize);
            gradient.addColorStop(0, star.color + opacity * 0.5 + ')');
            gradient.addColorStop(1, star.color + '0)');
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, glowSize, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Draw speed lines for very close stars
        if (star.z < 200) {
            const prevZ = star.z + star.speed * this.speed * 5;
            const prevScale = 1000 / (1000 + prevZ);
            const prevX = this.centerX + star.x * prevScale + (this.mouse.x * 50);
            const prevY = this.centerY + star.y * prevScale + (this.mouse.y * 50);
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = star.color + opacity * 0.5 + ')';
            this.ctx.lineWidth = size / 2;
            this.ctx.moveTo(prevX, prevY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }
    
    animate() {
        // Clear canvas with trail effect
        this.ctx.fillStyle = 'rgba(10, 0, 20, 0.3)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw all stars
        for (let star of this.stars) {
            this.updateStar(star);
            this.drawStar(star);
        }
        
        // Add some nebula clouds
        this.drawNebula();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawNebula() {
        const time = Date.now() * 0.0001;
        
        // Create multiple nebula clouds
        for (let i = 0; i < 3; i++) {
            const x = this.centerX + Math.sin(time + i) * 200;
            const y = this.centerY + Math.cos(time + i * 1.5) * 150;
            const radius = 150 + Math.sin(time * 2 + i) * 50;
            
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
            
            if (i % 2 === 0) {
                gradient.addColorStop(0, 'rgba(147, 51, 234, 0.03)');
                gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
            } else {
                gradient.addColorStop(0, 'rgba(236, 72, 153, 0.02)');
                gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
            }
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

// Initialize starfield when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Starfield('starfield');
});
