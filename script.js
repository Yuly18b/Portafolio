/**
 * PORTAFOLIO PROFESIONAL - NELLY YULIED BENÍTEZ
 * JavaScript Vanilla Puro
 * Funcionalidades:
 * 1. Menú móvil (Toggle accesible)
 * 2. Modo Oscuro / Modo Claro con persistencia en localStorage
 * 3. Enlace activo en navegación con IntersectionObserver
 * 4. Filtrado interactivo de proyectos
 * 5. Validación en tiempo real del formulario de contacto
 * 6. Botón flotante 'Volver arriba'
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selector de Tema Claro / Oscuro con LocalStorage
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // 2. Menú de Navegación Móvil
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // 3. Resaltado de Sección Activa en el Menú con Intersection Observer
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // 4. Filtrado de Proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. Validación del Formulario de Contacto
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formFeedback = document.getElementById('formFeedback');

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const showError = (input, errorSpan, message) => {
        input.classList.add('input-error');
        errorSpan.textContent = message;
    };

    const clearError = (input, errorSpan) => {
        input.classList.remove('input-error');
        errorSpan.textContent = '';
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nameVal = nameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const subjectVal = subjectInput.value.trim();
            const messageVal = messageInput.value.trim();

            if (nameVal.length < 3) {
                showError(nameInput, document.getElementById('nameError'), 'Por favor ingresa tu nombre completo.');
                isValid = false;
            } else {
                clearError(nameInput, document.getElementById('nameError'));
            }

            if (!validateEmail(emailVal)) {
                showError(emailInput, document.getElementById('emailError'), 'Ingresa un correo electrónico válido.');
                isValid = false;
            } else {
                clearError(emailInput, document.getElementById('emailError'));
            }

            if (subjectVal.length < 4) {
                showError(subjectInput, document.getElementById('subjectError'), 'El asunto debe tener al menos 4 caracteres.');
                isValid = false;
            } else {
                clearError(subjectInput, document.getElementById('subjectError'));
            }

            if (messageVal.length < 10) {
                showError(messageInput, document.getElementById('messageError'), 'El mensaje debe tener al menos 10 caracteres.');
                isValid = false;
            } else {
                clearError(messageInput, document.getElementById('messageError'));
            }

            if (isValid) {
                formFeedback.className = 'form-feedback success';
                formFeedback.textContent = '¡Gracias por contactarme! Tu mensaje ha sido simulado con éxito.';
                formFeedback.style.display = 'block';
                contactForm.reset();

                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 5000);
            }
        });
    }

    // 6. Botón Volver Arriba
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
