/*********** Typewriter Effect ***********/
const typewriter = document.getElementById("typewriter");
const cursor = document.querySelector(".cursor");
const phrases = [
  "Aspiring Full Stack Developer ",
  "Tech Enthusiast ",
  "Code Lover ",
];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[index];
  if (isDeleting) {
    typewriter.textContent = currentPhrase.substring(0, charIndex--);
  } else {
    typewriter.textContent = currentPhrase.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % phrases.length;
    setTimeout(typeEffect, 300);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

/*********** Responsive Menu ***********/
const sidemenu = document.getElementById("sidemenu");
function openmenu() {
  sidemenu.style.right = "0";
}
function closemenu() {
  sidemenu.style.right = "-200px";
}

/*********** Google Form ***********/
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(
    "https://script.google.com/macros/s/AKfycbycVqLbdRoFjyxLf7HNTLp25nyS-O6BXMvzgjQLeQoT-ajpNH0kjdNcU-WJ4EOhIOBPQg/exec",
    {
      method: "POST",
      body: new FormData(form),
    }
  )
    .then((response) => {
      msg.innerHTML = "Message sent successfully";
      setTimeout(() => (msg.innerHTML = ""), 1000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});

/*********** Sticky Navbar ***********/
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

/*********** Scroll-to-Top ***********/
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*********** Scroll Animations (IntersectionObserver) ***********/
const fadeElements = document.querySelectorAll(".skills-list div, .work, .contact-left, .contact-right");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach((el) => {
  el.classList.add("fade-in");
  observer.observe(el);
});
