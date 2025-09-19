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

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$#%&".split("");
let fontSize = 14;
let columns;
let drops;

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}

function draw() {
  ctx.fillStyle = "rgba(15,23,42,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#38bdf8";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  requestAnimationFrame(draw);
}

window.addEventListener("resize", initCanvas);

initCanvas();
draw();
