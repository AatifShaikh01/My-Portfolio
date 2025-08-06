document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Show scroll indicator only on desktop
function checkScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (window.innerWidth > 768) {
    scrollIndicator.style.display = 'flex';
  } else {
    scrollIndicator.style.display = 'none';
  }
}

// Initial check
checkScrollIndicator();

// Check on window resize
window.addEventListener('resize', checkScrollIndicator);

  // Mobile Navigation
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Sticky Navigation on Scroll
  const navbar = document.querySelector('.floating-nav');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active Link Highlighting
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // Animate Skill Bars
  const animateSkillBars = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const percent = entry.target.getAttribute('data-percent');
          const bar = entry.target.querySelector('.skill-bar span');
          bar.style.width = `${percent}%`;
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skillItems.forEach(item => {
      skillsObserver.observe(item);
    });
  };

  // Skills Data
  const technologies = {
    frontend: [
      { name: "HTML5", icon: "fab fa-html5", percent: 95 },
      { name: "CSS3", icon: "fab fa-css3-alt", percent: 90 },
      { name: "JavaScript", icon: "fab fa-js", percent: 85 },
      { name: "React", icon: "fab fa-react", percent: 80 },
      { name: "Next.js", icon: "fas fa-code", percent: 75 },
      { name: "Tailwind CSS", icon: "fas fa-wind", percent: 85 }
    ],
    backend: [
      { name: "Node.js", icon: "fab fa-node-js", percent: 85 },
      { name: "Express", icon: "fas fa-server", percent: 80 },
      { name: "Python", icon: "fab fa-python", percent: 75 },
      { name: "Django", icon: "fas fa-code", percent: 70 },
      { name: "PHP", icon: "fab fa-php", percent: 65 }
    ],
    databases: [
      { name: "MongoDB", icon: "fas fa-database", percent: 80 },
      { name: "MySQL", icon: "fas fa-database", percent: 75 },
      { name: "Firebase", icon: "fas fa-fire", percent: 70 },
      { name: "PostgreSQL", icon: "fas fa-database", percent: 65 }
    ],
    tools: [
      { name: "Git", icon: "fab fa-git-alt", percent: 85 },
      { name: "Docker", icon: "fab fa-docker", percent: 70 },
      { name: "AWS", icon: "fab fa-aws", percent: 65 },
      { name: "Postman", icon: "fas fa-code", percent: 80 },
      { name: "VS Code", icon: "fas fa-code", percent: 90 }
    ]
  };

  // Render Skills Dynamically
  const renderSkills = () => {
    const skillsContainer = document.querySelector('.skills-container');
    skillsContainer.innerHTML = '';

    for (const category in technologies) {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'skill-category';
      
      const heading = document.createElement('h3');
      heading.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      
      const skillsList = document.createElement('div');
      skillsList.className = 'skills-list';
      
      technologies[category].forEach(tech => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.setAttribute('data-percent', tech.percent);
        
        skillItem.innerHTML = `
          <div class="skill-icon">
            <i class="${tech.icon}"></i>
          </div>
          <span>${tech.name}</span>
          <div class="skill-bar"><span></span></div>
        `;
        
        skillsList.appendChild(skillItem);
      });
      
      categoryDiv.appendChild(heading);
      categoryDiv.appendChild(skillsList);
      skillsContainer.appendChild(categoryDiv);
    }

    // Animate the skill bars after rendering
    animateSkillBars();
  };

  renderSkills();

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const submitText = document.getElementById('submitText');
      const submitLoader = document.getElementById('submitLoader');
      const formMessage = document.getElementById('formMessage');
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Show loading state
      submitText.textContent = 'Sending...';
      submitLoader.style.display = 'inline-block';
      submitBtn.disabled = true;
      
      // Save to Firebase
      saveMessage(name, email, subject, message)
        .then(() => {
          // Success
          formMessage.textContent = 'Message sent successfully!';
          formMessage.classList.add('success');
          formMessage.classList.remove('error');
          contactForm.reset();
        })
        .catch((error) => {
          // Error
          formMessage.textContent = 'Error sending message. Please try again.';
          formMessage.classList.add('error');
          formMessage.classList.remove('success');
          console.error('Error saving message:', error);
        })
        .finally(() => {
          // Reset button
          submitText.textContent = 'Send Message';
          submitLoader.style.display = 'none';
          submitBtn.disabled = false;
          formMessage.style.display = 'block';
          
          // Hide message after 5 seconds
          setTimeout(() => {
            formMessage.style.display = 'none';
          }, 5000);
        });
    });
  }

  // Project Card Animation
  const projectCards = document.querySelectorAll('.project-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
  });
});

document.querySelectorAll('.project-video').forEach(video => {
  video.addEventListener('mouseenter', () => {
    video.play();
  });
  
  video.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

// Remove splash screen after animation completes
window.addEventListener('load', function() {
  setTimeout(function() {
    const splash = document.querySelector('.splash-screen');
    if (splash) {
      splash.style.display = 'none';
    }
  }, 5000);
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Format message for WhatsApp
  const whatsappMessage = `*New Message From Portfolio*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
  
  // Open WhatsApp with pre-filled message
  window.open(`https://wa.me/918975570113?text=${whatsappMessage}`, '_blank');
});

/* ========== WHATSAPP FUNCTION ========== */
document.getElementById('whatsappBtn').addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  const text = `*Portfolio Message*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
  
  // Mobile/Desktop detection
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const whatsappUrl = isMobile ? 
    `whatsapp://send?phone=918975570113&text=${text}` : 
    `https://web.whatsapp.com/send?phone=918975570113&text=${text}`;
  
  // Open link
  window.open(whatsappUrl, '_blank');
});
