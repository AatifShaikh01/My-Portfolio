// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully.');

    // ========== Typewriter Effect ==========
    const titles = ["Full Stack Developer", "MERN Stack Developer", "Web App Architect"];
    let i = 0, j = 0, currentTitle = "", isDeleting = false;
    const h2 = document.querySelector("#profile h2");

    function typeEffect() {
        if (!h2) return;
        currentTitle = isDeleting
            ? titles[i].substring(0, j--)
            : titles[i].substring(0, j++);

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

    // ========== Scroll-to-top Button ==========
    const scrollBtn = document.createElement("button");
    scrollBtn.innerText = "↑";
    scrollBtn.id = "scrollTopBtn";
    document.body.appendChild(scrollBtn);

    Object.assign(scrollBtn.style, {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        padding: "12px 16px",
        fontSize: "20px",
        border: "none",
        borderRadius: "50%",
        backgroundColor: "#00adb5",
        color: "#fff",
        cursor: "pointer",
        display: "none",
        zIndex: "1000",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        transition: "opacity 0.3s ease-in-out"
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "block";
            scrollBtn.style.opacity = "1";
        } else {
            scrollBtn.style.opacity = "0";
            setTimeout(() => {
                if (window.scrollY < 300) scrollBtn.style.display = "none";
            }, 300);
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== Reveal Animation ==========
    const revealElements = document.querySelectorAll('.project-card');

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - 80) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial call
});