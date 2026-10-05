const openBtn = document.getElementById("openBtn");
const againBtn = document.getElementById("againBtn");

openBtn.addEventListener("click", () => {
  document.getElementById("message").scrollIntoView({ behavior: "smooth" });
  burstPetals(24);
});

againBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function burstPetals(count = 10) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.left = (35 + Math.random() * 30) + "vw";
    p.style.top = (15 + Math.random() * 15) + "vh";
    p.style.setProperty("--x", (Math.random() * 120 - 60) + "vw");
    p.style.animationDuration = (3 + Math.random() * 3) + "s";
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 6500);
  }
}

// Falling petals continue gently in the background.
setInterval(() => {
  const p = document.createElement("span");
  p.className = "petal";
  p.style.left = Math.random() * 100 + "vw";
  p.style.top = "-30px";
  p.style.setProperty("--x", (Math.random() * 40 - 20) + "vw");
  p.style.animationDuration = (7 + Math.random() * 6) + "s";
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 14000);
}, 900);

// Lightweight star/particle field.
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  particles = Array.from({length: Math.min(90, Math.floor(innerWidth/10))}, () => ({
    x: Math.random()*innerWidth,
    y: Math.random()*innerHeight,
    r: Math.random()*1.5+.3,
    s: Math.random()*.25+.05,
    a: Math.random()*.7+.2
  }));
}
addEventListener("resize", resize);
resize();

function animate() {
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for (const p of particles) {
    p.y -= p.s;
    if (p.y < -5) p.y = innerHeight + 5;
    ctx.globalAlpha = p.a;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(animate);
}
animate();
