// Funcionalidad del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarNavLinks = document.querySelectorAll('.sidebar-nav-link');

    // Toggle del sidebar móvil
    if (navToggle && mobileSidebar) {
        navToggle.addEventListener('click', function() {
            mobileSidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Cerrar sidebar
    function closeSidebar() {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners para cerrar sidebar
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Cerrar sidebar al hacer clic en enlaces
    sidebarNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeSidebar();
        });
    });

    // Cerrar sidebar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Scroll suave para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de scroll en el header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Manejo del video de fondo del hero (video local)
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video video');
    const heroBgImage = document.querySelector('.hero-bg-image');
    
    if (heroVideo) {
        console.log('Video local configurado como fondo');
        
        // Verificar si el video se carga correctamente
        heroVideo.addEventListener('loadeddata', function() {
            console.log('Video local cargado correctamente');
        });
        
        // Manejar errores del video
        heroVideo.addEventListener('error', function() {
            console.log('Error al cargar video local, usando fondo estático');
            if (heroBgImage) {
                heroBgImage.style.display = 'block';
                heroVideo.style.display = 'none';
            }
        });
        
        // Intentar reproducir el video
        heroVideo.play().then(function() {
            console.log('Video local reproduciéndose correctamente');
        }).catch(function(error) {
            console.log('No se puede reproducir el video automáticamente:', error);
            if (heroBgImage) {
                heroBgImage.style.display = 'block';
                heroVideo.style.display = 'none';
            }
        });
        
        // Verificar si el video está disponible después de un tiempo
        setTimeout(function() {
            if (heroVideo.readyState < 2) { // Si el video no ha cargado datos
                console.log('Video local no disponible, usando fondo estático');
                if (heroBgImage) {
                    heroBgImage.style.display = 'block';
                    heroVideo.style.display = 'none';
                }
            }
        }, 5000);
    }
});

// Animación de aparición de elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a elementos
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .contact-content');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validación básica
            if (!data.nombre || !data.email || !data.mensaje) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Simular envío del formulario
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular delay de envío
            setTimeout(() => {
                alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Contador animado para estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Activar contadores cuando la sección sea visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }
});

// Manejo del video de fondo del hero
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video iframe');
    
    if (heroVideo) {
        // Asegurar que el video se reproduzca automáticamente
        heroVideo.addEventListener('load', function() {
            // El video ya está configurado para autoplay en el HTML
            console.log('Video de fondo cargado correctamente');
        });
        
        // Detener el video cuando el usuario hace scroll fuera del hero
        window.addEventListener('scroll', function() {
            const hero = document.querySelector('.hero');
            const heroHeight = hero.offsetHeight;
            const scrolled = window.pageYOffset;
            
            if (scrolled > heroHeight) {
                // Pausar el video cuando se sale del hero
                heroVideo.style.opacity = '0';
            } else {
                // Mostrar el video cuando está en el hero
                heroVideo.style.opacity = '1';
            }
        });
    }
});

// Efecto parallax suave para el hero (deshabilitado para video de fondo)
// window.addEventListener('scroll', function() {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     
//     if (hero) {
//         const rate = scrolled * -0.5;
//         hero.style.transform = `translateY(${rate}px)`;
//     }
// });

// Lazy loading para imágenes (cuando se agreguen)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Función para mostrar/ocultar botón de scroll to top
function toggleScrollTop() {
    const scrollTop = document.createElement('button');
    scrollTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTop.className = 'scroll-top';
    scrollTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollTop);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTop.style.display = 'block';
        } else {
            scrollTop.style.display = 'none';
        }
    });
    
    scrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar botón de scroll to top
document.addEventListener('DOMContentLoaded', toggleScrollTop);

// Efectos de parallax para las partículas del hero - DESHABILITADO
// document.addEventListener('DOMContentLoaded', function() {
//     const particles = document.querySelectorAll('.particle');
    
//     window.addEventListener('scroll', function() {
//         const scrolled = window.pageYOffset;
//         const rate = scrolled * -0.3;
        
//         particles.forEach((particle, index) => {
//             const speed = (index + 1) * 0.1;
//             particle.style.transform = `translateY(${rate * speed}px)`;
//         });
//     });
// });

// Animación de aparición escalonada para las tarjetas de experiencia
document.addEventListener('DOMContentLoaded', function() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    const experienceObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    experienceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        experienceObserver.observe(card);
    });
});

// Efecto de hover mejorado para las tarjetas de experiencia
document.addEventListener('DOMContentLoaded', function() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Animación de contadores para la sección story
document.addEventListener('DOMContentLoaded', function() {
    const storyStats = document.querySelectorAll('.story-stat .stat-number');
    
    const storyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                storyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const storySection = document.querySelector('.story');
    if (storySection) {
        storyObserver.observe(storySection);
    }
});

// Carrusel de productos tipo galería - Inspirado en Guinness
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const groups = document.querySelectorAll('.carousel-group');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    // Verificar que los elementos existen antes de continuar
    if (!track || !groups.length) {
        console.log('Carrusel no encontrado, saltando inicialización');
        return;
    }
    
    let currentGroup = 0;
    const totalGroups = groups.length;
    
    // Función para actualizar el carrusel
    function updateCarousel() {
        const translateX = -currentGroup * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentGroup);
        });
        
        // Actualizar groups
        groups.forEach((group, index) => {
            group.classList.toggle('active', index === currentGroup);
        });
    }
    
    // Navegación anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentGroup = (currentGroup - 1 + totalGroups) % totalGroups;
            updateCarousel();
        });
    }
    
    // Navegación siguiente
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentGroup = (currentGroup + 1) % totalGroups;
            updateCarousel();
        });
    }
    
    // Navegación por dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentGroup = index;
            updateCarousel();
        });
    });
    
    // Auto-play del carrusel (opcional)
    setInterval(() => {
        currentGroup = (currentGroup + 1) % totalGroups;
        updateCarousel();
    }, 6000); // Cambia cada 6 segundos
    
    // Pausar auto-play al hacer hover
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    let autoPlayInterval;
    
    carouselWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    carouselWrapper.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            currentGroup = (currentGroup + 1) % totalGroups;
            updateCarousel();
        }, 6000);
    });
    
    // Inicializar carrusel
    updateCarousel();
});

// Efecto de typing para el título principal - DESHABILITADO
// document.addEventListener('DOMContentLoaded', function() {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalHTML = heroTitle.innerHTML;
//         heroTitle.innerHTML = '';
       
//         let i = 0;
//         const typeWriter = () => {
//             if (i < originalHTML.length) {
//                 heroTitle.innerHTML += originalHTML.charAt(i);
//                 i++;
//                 setTimeout(typeWriter, 50);
//             }
//         };
       
//         // Iniciar el efecto después de un pequeño delay
//         setTimeout(typeWriter, 1000);
//     }
// });

// Efecto de scroll suave mejorado
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('#productos');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Efecto de brillo en los botones
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});

// Animación de las líneas decorativas del hero - DESHABILITADO
// document.addEventListener('DOMContentLoaded', function() {
//     const heroLines = document.querySelectorAll('.hero-line');
    
//     heroLines.forEach((line, index) => {
//         line.style.animationDelay = `${index * 2}s`;
//     });
// });

// Efecto de parallax para el fondo de la sección experiencia
document.addEventListener('DOMContentLoaded', function() {
    const experienceSection = document.querySelector('.experience');
    
    if (experienceSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            const rect = experienceSection.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                experienceSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }
});
