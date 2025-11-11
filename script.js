// elements
const sections = document.querySelectorAll(".loading__sec");
const logo = document.querySelectorAll(".logo-stellarix");

// effet de pulsation du logo (pendant le chargement)
const pulse = gsap.to(logo, {
  scale: 1.1,
  opacity: 1,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
  duration: 0.8
});

// timeline principale du chargement
const tl = gsap.timeline({ paused: true });

// simulation du "temps de chargement" avant l'animation de sortie
tl.to({}, { duration: 2 }); // 2 secondes de pulsation avant que ça disparaisse

// sections montent + logo disparaît en même temps
tl.to(sections, {
  yPercent: -100,
  stagger: 0.12,
  duration: 1.2,
  ease: "power2.inOut",
  onStart: () => pulse.kill() // stoppe la pulsation au moment de la sortie
}, "start")
  .to(logo, {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: "power2.out"
  }, "start") // même label = même moment

  // la div .loading glisse vers le haut
  .to(".loading", {
    y: "-100%",
    duration: 1,
    ease: "power2.inOut"
  }, "-=50%");

// Lancer l’animation
tl.play();
