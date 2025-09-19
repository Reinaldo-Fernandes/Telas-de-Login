const linksMenu = document.querySelectorAll('.link-menu');
const paginas = document.querySelectorAll('.pagina');
const loginBox = document.querySelector('.login-box');

// Menu navegação
linksMenu.forEach(link =>{
    link.addEventListener('click', function(e){
        e.preventDefault();
        const targetId = this.getAttribute('data-target');

        if (targetId === "login") {
            loginBox.style.display = "block";
            paginas.forEach(p => p.classList.add("hidden"));
        } else {
            loginBox.style.display = "none";
            paginas.forEach(p => p.classList.add("hidden"));
            document.getElementById(targetId).classList.remove("hidden");
        }
    });
});

// ================= ANIMAÇÃO DE PARTÍCULAS =================
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let particles = [];
let num;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // calcula número proporcional ao tamanho da tela
  const baseDensity = 9000; // quanto maior esse valor, menos partículas
  num = Math.floor((canvas.width * canvas.height) / baseDensity);

  particles.length = 0; // limpa o array
  for (let i = 0; i < num; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 1,
      dy: (Math.random() - 0.5) * 1,
      radius: 2
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < num; i++) {
    let p = particles[i];
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();

    for (let j = i + 1; j < num; j++) {
      let p2 = particles[j];
      let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(56,189,248," + (1 - dist/120) + ")";
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
animate();