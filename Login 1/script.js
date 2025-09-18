const linksMenu = document.querySelectorAll('.link-menu');
const paginas = document.querySelectorAll('.pagina');

linksMenu.forEach(link =>{
    link.addEventListener('click', function(e){
        e.preventDefault();
        const targetId = this.getAttribute('data-target');

        paginas.forEach(pagina =>{
            pagina.classList.add('hidden');
        });
        document.getElementById(targetId).classList.remove('hidden');
    });
});

//Animação
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const num = 60;

for (let i = 0; i < num; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 1,
    dy: (Math.random() - 0.5) * 1,
    radius: 2
  });
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
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// -- Pega todos os Links do Menu --

// pega todos os links do menu
const links = document.querySelectorAll('.link-menu');
// pega a caixa de login
const loginBox = document.querySelector('.login-box');
// pega todas as páginas
// const paginas = document.querySelectorAll('.pagina'); // Removido para evitar redeclaração

links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // evita comportamento padrão do link
    
    const target = link.getAttribute('data-target');

    // se for "login", mostra a tela de login
    if (target === "login") {
      loginBox.style.display = "block";
      paginas.forEach(p => p.classList.add("hidden"));
    } else {
      // esconde o login
      loginBox.style.display = "none";

      // esconde todas as páginas
      paginas.forEach(p => p.classList.add("hidden"));

      // mostra só a página escolhida
      const paginaAtiva = document.getElementById(target);
      if (paginaAtiva) {
        paginaAtiva.classList.remove("hidden");
      }
    }
  });
});