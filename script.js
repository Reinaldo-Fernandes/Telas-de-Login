const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const centerX = width / 2;
const centerY = height / 2;

const particles = [];
const particleCount = 150;

// Criar partículas 3D
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: (Math.random() - 0.5) * 1080,
        y: (Math.random() - 0.5) * 1080,
        z: (Math.random() - 0.5) * 1080,
        radius: Math.random() * 2 + 1
    });
}

let angleX = 0;
let angleY = 0;

function rotate3D(p, ax, ay) {
    // Rotação eixo X
    let y = p.y * Math.cos(ax) - p.z * Math.sin(ax);
    let z = p.y * Math.sin(ax) + p.z * Math.cos(ax);
    p.y = y;
    p.z = z;

    // Rotação eixo Y
    let x = p.x * Math.cos(ay) - p.z * Math.sin(ay);
    z = p.x * Math.sin(ay) + p.z * Math.cos(ay);
    p.x = x;
    p.z = z;
}

function project(p) {
    const scale = 800 / (800 + p.z); // perspectiva
    const x = centerX + p.x * scale;
    const y = centerY + p.y * scale;
    return { x, y, scale };
}

function animate() {
    ctx.fillStyle = 'rgba(10,10,32,0.3)';
    ctx.fillRect(0, 0, width, height);

    angleX += 0.002;
    angleY += 0.003;

    particles.forEach(p => {
        rotate3D(p, 0.002, 0.003);
        const proj = project(p);
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, p.radius * proj.scale, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
