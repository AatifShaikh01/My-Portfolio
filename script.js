// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully.');

    // Typewriter Effect for Title
    const titles = ["Full Stack Developer", "MERN Stack Developer", "Web App Architect"];
    let i = 0, j = 0, currentTitle = "", isDeleting = false;
    const h2 = document.querySelector("#profile h2");

    function typeEffect() {
        if (!h2) return;
        if (isDeleting) {
            currentTitle = titles[i].substring(0, j--);
        } else {
            currentTitle = titles[i].substring(0, j++);
        }
        h2.textContent = currentTitle;

        if (!isDeleting && j === titles[i].length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % titles.length;
            setTimeout(typeEffect, 400);
        } else {
            setTimeout(typeEffect, isDeleting ? 60 : 100);
        }
    }
    typeEffect();

    // Scroll-to-top Button
    const scrollBtn = document.createElement("button");
    scrollBtn.innerText = "↑";
    scrollBtn.id = "scrollTopBtn";
    document.body.appendChild(scrollBtn);

    scrollBtn.style.position = "fixed";
    scrollBtn.style.bottom = "30px";
    scrollBtn.style.right = "30px";
    scrollBtn.style.padding = "10px 15px";
    scrollBtn.style.fontSize = "18px";
    scrollBtn.style.border = "none";
    scrollBtn.style.borderRadius = "50%";
    scrollBtn.style.backgroundColor = "#00adb5";
    scrollBtn.style.color = "#fff";
    scrollBtn.style.cursor = "pointer";
    scrollBtn.style.display = "none";
    scrollBtn.style.zIndex = "1000";
    scrollBtn.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    scrollBtn.style.transition = "0.3s ease-in-out";

    window.addEventListener("scroll", () => {
        scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Reveal animation on scroll (for project cards)
    const revealElements = document.querySelectorAll('.project-card');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial call
});
