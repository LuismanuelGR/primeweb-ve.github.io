/* ==========================================================================
   PRIME-WEB PORTFOLIO DIGITAL - JAVASCRIPT LOGIC
   Features: Dark/Light Mode Switcher with Logo Swapping, 3D Hero Card Tilt,
   Portfolio Filter, Project Modal, Interactive Budget Calculator, FAQ Accordion,
   and Responsive Navigation.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. THEME TOGGLE & LOGO SWAPPING LOGIC
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeBtnText = themeToggleBtn ? themeToggleBtn.querySelector('.theme-btn-text') : null;
  const brandLogo = document.getElementById('brand-logo');
  const footerLogo = document.getElementById('footer-logo');

  // Logo file paths as instructed:
  // White logo for Dark Mode, Blue logo for Light Mode.
  const LOGO_DARK = 'PRIME-WEB LOGO (BLANCO).png';
  const LOGO_LIGHT = 'PRIME-WEB LOGO (AZUL).png';

  // Check saved theme preference or default to 'dark'
  const savedTheme = localStorage.getItem('primeweb_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('primeweb_theme', theme);

    if (theme === 'dark') {
      if (brandLogo) brandLogo.src = LOGO_DARK;
      if (footerLogo) footerLogo.src = LOGO_DARK;
      if (themeBtnText) themeBtnText.textContent = 'Modo Oscuro';
    } else {
      if (brandLogo) brandLogo.src = LOGO_LIGHT;
      if (footerLogo) footerLogo.src = LOGO_LIGHT;
      if (themeBtnText) themeBtnText.textContent = 'Modo Claro';
    }
  }


  /* --------------------------------------------------------------------------
     2. NAVBAR SCROLL EFFECT & MOBILE MENU
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      mobileToggle.querySelector('.icon-open').style.display = isOpen ? 'none' : 'block';
      mobileToggle.querySelector('.icon-close').style.display = isOpen ? 'block' : 'none';
    });
  }

  // Close mobile menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('active');
      if (mobileToggle) {
        mobileToggle.querySelector('.icon-open').style.display = 'block';
        mobileToggle.querySelector('.icon-close').style.display = 'none';
      }
    });
  });

  // Active Nav Link Observer
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));


  /* --------------------------------------------------------------------------
     OPTIMIZADO: SCROLL REVEAL OBSERVER (Carga Fluida en Móviles)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll(
    '.adn-card, .valor-item, .service-card, .timeline-step, .portfolio-card, .calc-radio-card, .faq-item, .contact-card, .contact-form-column, .section-header'
  );

  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Dejar de observar para ahorrar recursos en procesadores móviles
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px 80px 0px', // Anticipa la aparición 80px antes de llegar para evitar retrasos
      threshold: 0.02
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }


  /* --------------------------------------------------------------------------
     3. 3D HERO CARD TILT EFFECT
     -------------------------------------------------------------------------- */
  const heroCard = document.getElementById('hero-card');
  if (heroCard && window.innerWidth > 1024) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }


  /* --------------------------------------------------------------------------
     4. PORTFOLIO FILTERING & PROJECT MODAL
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // Projects Data for Modal
  const projectsData = [
    {
      title: "PRIME-WEB",
      url: "https://primeweb-ve.com/",
      category: "Plataforma Principal & Portal Corporativo",
      description: "Portal digital oficial del emprendimiento PRIME-WEB. Diseñado para proyectar la identidad de la marca, servicios de desarrollo web, metodologías de trabajo y casos de éxito.",
      features: ["Desarrollo 100% a medida", "Diseño responsivo móvil y TV", "Modo Oscuro/Claro integrado", "Velocidad de carga superior"]
    },
    {
      title: "Cerrajería García",
      url: "https://cerrajeriagracia.primeweb-ve.com/",
      category: "Sitio Web Corporativo de Servicios",
      description: "Página corporativa moderna enfocada en la captación rápida de clientes de cerrajería de urgencia. Integra botones de contacto directo y llamadas a la acción eficientes.",
      features: ["Landing page de alta conversión", "Optimización móvil prioritaria", "Integración con WhatsApp", "Carga ultra rápida"]
    },
    {
      title: "Disco Óptico Plus",
      url: "https://discoopticoplus.primeweb-ve.com/",
      category: "Catálogo Comercial y Servicios Ópticos",
      description: "Plataforma comercial para la visualización de servicios ópticos, exámenes y productos. Cuenta con una interfaz intuitiva organizada para facilitar la navegación del usuario.",
      features: ["Catálogo digital interactivo", "Formulario de citas", "Diseño limpio y accesible", "SEO local optimizado"]
    },
    {
      title: "Golden Hands",
      url: "https://goldenhands.primeweb-ve.com/",
      category: "Servicios Profesionales Especializados",
      description: "Web corporativa de diseño elegante para la presentación de servicios profesionales destacados, destacando la confiabilidad y valores de la marca.",
      features: ["Secciones corporativas estructuradas", "UI/UX sofisticada", "Formulario de consulta", "Seguridad web avanzada"]
    },
    {
      title: "ICER",
      url: "https://icervzla.com/",
      category: "Portal Web Institucional",
      description: "Sitio web para la institución ICER en Venezuela, organizado para comunicar programas educativos, capacitaciones y servicios a la comunidad.",
      features: ["Estructura institucional completa", "Publicación de eventos", "Compatibilidad multi-dispositivo", "Optimización Core Web Vitals"]
    },
    {
      title: "Iglesys",
      url: "https://iglesys.primeweb-ve.com/login.html",
      category: "Sistema de Gestión & Login Institucional",
      description: "Plataforma de autenticación y control de usuarios para la administración eficiente de datos institucionales con seguridad reforzada.",
      features: ["Portal de autenticación seguro", "Diseño accesible e intuitivo", "Optimización de datos", "Protección contra vulnerabilidades"]
    },
    {
      title: "Swappealo",
      url: "https://swappealo.primeweb-ve.com/",
      category: "Plataforma Web de Intercambio Digital",
      description: "Plataforma dinámica e interactiva orientada al intercambio digital de bienes y servicios. Presenta una interfaz fluida pensada para la interacción constante.",
      features: ["Diseño interactivo dinámico", "Flujo de usuario intuitivo", "Layout responsivo", "Integración moderna"]
    },
    {
      title: "UJEV",
      url: "https://ujevr4.com/",
      category: "Portal Corporativo e Institucional",
      description: "Portal institucional de alta disponibilidad diseñado para comunicar la visión, proyectos y actividades corporativas oficiales de la organización UJEV.",
      features: ["Branding institucional fuerte", "Velocidad de respuesta óptima", "Formatos adaptativos", "Estructura semántica SEO"]
    },
    {
      title: "Vida UNITEC",
      url: "https://vidaunitec.com/",
      category: "Comunidad & Portal Educativo Integrativo",
      description: "Portal universitario integrador para la difusión de noticias, eventos estudiantiles y actividades comunitarias de la universidad.",
      features: ["Agenda de eventos comunitarios", "Interfaz juvenil y accesible", "Multi-dispositivo", "Optimización de medios"]
    },
    {
      title: "Zafirosmen",
      url: "https://zafirosmen.primeweb-ve.com/",
      category: "Barbería & Estética Masculina",
      description: "Sitio web exclusivo para centro de estética masculina y barbería, permitiendo mostrar servicios, lista de precios y reserva directa de citas.",
      features: ["Estética visual masculina premium", "Reserva directa por WhatsApp", "Galería de cortes y servicios", "Carga optimizada"]
    }
  ];

  const modalOverlay = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectIndex = btn.getAttribute('data-project');
      const data = projectsData[projectIndex];

      if (data && modalContent && modalOverlay) {
        modalContent.innerHTML = `
          <div class="modal-header margin-bottom-md">
            <span class="step-tag">${data.category}</span>
            <h2 class="section-title margin-top-md" style="font-size: 1.8rem;">${data.title}</h2>
          </div>
          <p class="modal-desc margin-bottom-md" style="color: var(--text-secondary); font-size: 1rem;">
            ${data.description}
          </p>
          <div class="modal-features margin-bottom-md">
            <h4 style="margin-bottom: 0.75rem;">Características Principales:</h4>
            <ul class="service-features">
              ${data.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('')}
            </ul>
          </div>
          <div class="modal-footer margin-top-lg" style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="${data.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block">
              <span>Visitar Sitio Web Oficial</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        `;
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      modalOverlay.setAttribute('aria-hidden', 'true');
    }
  }


  /* --------------------------------------------------------------------------
     5. INTERACTIVE PROJECT BUDGET CALCULATOR
     -------------------------------------------------------------------------- */
  const projectTypeInputs = document.querySelectorAll('input[name="project-type"]');
  const addonCheckboxes = document.querySelectorAll('.calc-checkbox-group input');
  const totalPriceElem = document.getElementById('calc-total-price');
  const sumProjectName = document.getElementById('sum-project-name');
  const sumProjectTime = document.getElementById('sum-project-time');
  const sendWhatsappBtn = document.getElementById('send-whatsapp-btn');

  function calculateBudget() {
    let total = 0;
    let selectedTypeLabel = 'Landing Page';
    let selectedTime = '5 - 7 días';

    // Get Project Type Price
    projectTypeInputs.forEach(input => {
      const parentLabel = input.closest('.calc-radio-card');
      if (input.checked) {
        total += parseInt(input.getAttribute('data-price') || '0', 10);
        selectedTypeLabel = parentLabel.querySelector('strong').textContent;
        selectedTime = input.getAttribute('data-time') || '5 - 7 días';
        parentLabel.classList.add('active');
      } else {
        parentLabel.classList.remove('active');
      }
    });

    // Add Addons Prices
    addonCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        total += parseInt(checkbox.getAttribute('data-price') || '0', 10);
      }
    });

    // Update UI elements
    if (totalPriceElem) totalPriceElem.textContent = total;
    if (sumProjectName) sumProjectName.textContent = selectedTypeLabel;
    if (sumProjectTime) sumProjectTime.textContent = selectedTime;
  }

  // Add Listeners
  projectTypeInputs.forEach(input => input.addEventListener('change', calculateBudget));
  addonCheckboxes.forEach(checkbox => checkbox.addEventListener('change', calculateBudget));

  // Initial Calculation
  calculateBudget();

  // Send WhatsApp Quote Button Action
  if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener('click', () => {
      const total = totalPriceElem ? totalPriceElem.textContent : '0';
      const type = sumProjectName ? sumProjectName.textContent : 'Web';
      const time = sumProjectTime ? sumProjectTime.textContent : 'Días';

      // Selected addons text list
      const selectedAddons = [];
      addonCheckboxes.forEach(cb => {
        if (cb.checked) {
          const name = cb.closest('.calc-checkbox-card').querySelector('span').textContent.trim();
          selectedAddons.push(name);
        }
      });

      const message = `Hola PRIME-WEB! 👋 Deseo información sobre una cotización para un proyecto web.%0A%0A📌 *Tipo de Proyecto:* ${type}%0A⏱️ *Tiempo Estimado:* ${time}%0A➕ *Adicionales:* ${selectedAddons.length > 0 ? selectedAddons.join(', ') : 'Sin adicionales'}%0A💰 *Presupuesto Estimado:* $${total} USD%0A%0A¿Podemos agendar una reunión o revisión?`;

      const whatsappUrl = `https://wa.me/?text=${message}`;
      window.open(whatsappUrl, '_blank');
    });
  }


  /* --------------------------------------------------------------------------
     6. FAQ ACCORDION LOGIC
     -------------------------------------------------------------------------- */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all items
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });


  /* --------------------------------------------------------------------------
     7. CONTACT FORM SUBMISSION HANDLER (Envío Real de Correos a primewebpw@gmail.com)
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formStatusMsg = document.getElementById('form-status-msg');

  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const serviceInput = document.getElementById('form-service');
      const messageInput = document.getElementById('form-message');

      const name = nameInput ? nameInput.value : '';
      const email = emailInput ? emailInput.value : '';
      const service = serviceInput ? serviceInput.value : '';
      const message = messageInput ? messageInput.value : '';

      // Visual State: Submitting
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Enviando...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
      }

      if (formStatusMsg) {
        formStatusMsg.className = 'form-status-msg';
        formStatusMsg.style.color = 'var(--accent-cyan)';
        formStatusMsg.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Enviando solicitud a primewebpw@gmail.com...`;
      }

      try {
        // FormSubmit AJAX Endpoint
        const response = await fetch('https://formsubmit.co/ajax/primewebpw@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `Nueva Solicitud de Cotización de ${name} - PRIME-WEB`,
            _captcha: 'false',
            Nombre: name,
            Email: email,
            Servicio_de_Interes: service,
            Mensaje: message
          })
        });

        const data = await response.json();

        if (response.ok || data.success === "true" || data.success === true) {
          if (formStatusMsg) {
            formStatusMsg.className = 'form-status-msg success';
            formStatusMsg.style.color = 'var(--green-pulse)';
            formStatusMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> ¡Excelente, ${name}! Tu solicitud se envió directamente a <strong>primewebpw@gmail.com</strong>. Te responderemos muy pronto.`;
          }
          contactForm.reset();
        } else {
          throw new Error('Respuesta no exitosa de FormSubmit');
        }
      } catch (error) {
        console.warn('Fallback a apertura mailto por error de red en FormSubmit:', error);

        // Fallback: Launch default email app with prefilled body
        const mailSubject = encodeURIComponent(`Solicitud de Proyecto: ${name} (${service})`);
        const mailBody = encodeURIComponent(`Hola PRIME-WEB,\n\nNombre: ${name}\nCorreo: ${email}\nServicio de Interés: ${service}\n\nMensaje:\n${message}\n\nSaludos.`);
        
        window.location.href = `mailto:primewebpw@gmail.com?subject=${mailSubject}&body=${mailBody}`;

        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg success';
          formStatusMsg.style.color = 'var(--green-pulse)';
          formStatusMsg.innerHTML = `<i class="fa-solid fa-envelope-circle-check"></i> Abriendo tu cliente de correo para enviar a <strong>primewebpw@gmail.com</strong>. ¡Gracias, ${name}!`;
        }
        contactForm.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Enviar Solicitud</span> <i class="fa-solid fa-paper-plane"></i>`;
        }

        setTimeout(() => {
          if (formStatusMsg) formStatusMsg.innerHTML = '';
        }, 8000);
      }
    });
  }

});
