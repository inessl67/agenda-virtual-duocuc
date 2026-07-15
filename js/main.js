// ============================================================
// CONFIGURACIÓN DEL ENLACE DE AGENDAMIENTO
// Modifica la URL a continuación con el enlace de Microsoft Bookings.
// La URL debe ser completa y comenzar con https://
// Ejemplo: 'https://bookings.cloud.microsoft/book/TuCorreo@duoc.cl/...'
// ============================================================
const BOOKING_URL = 'https://outlook.office365.com/book/DuocUCSedeAntonioVaras1@duoc.cl/?ismsaljsauthenabled=true';

// ============================================================
// CONFIGURACIÓN DE REDES SOCIALES
// Agrega las URLs de las redes sociales institucionales.
// Deja vacío ('') si la red social no está configurada.
// ============================================================
const SOCIAL_LINKS = {
    facebook: '',
    instagram: '',
    linkedin: ''
};

// --- Estado ---
let modalTrigger = null;

// ========== UTILIDADES ==========

function isValidBookingUrl(url) {
    if (!url || typeof url !== 'string') return false;
    var trimmed = url.trim();
    return trimmed.length > 0 && trimmed.startsWith('https://');
}

// ========== BOOKING ==========

function initBooking() {
    var heroCta = document.getElementById('hero-cta');
    var openBtn = document.getElementById('open-booking');
    var fallbackLink = document.getElementById('booking-fallback-link');

    if (!isValidBookingUrl(BOOKING_URL)) {
        [heroCta, openBtn].forEach(function (btn) {
            if (btn) btn.style.display = 'none';
        });
        return;
    }

    [heroCta, openBtn].forEach(function (btn) {
        if (btn) {
            btn.addEventListener('click', function () { openModal(btn); });
        }
    });

    if (fallbackLink) fallbackLink.href = BOOKING_URL;
}

// ========== MODAL ==========

function openModal(trigger) {
    var modal = document.getElementById('booking-modal');
    if (!modal) return;

    modalTrigger = trigger;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    var iframe = document.getElementById('booking-iframe');
    if (iframe && isValidBookingUrl(BOOKING_URL)) {
        iframe.src = BOOKING_URL;
        startIframeTimeout(iframe);
    }

    var closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();

    modal.addEventListener('keydown', handleModalKeys);
    var backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
}

function closeModal() {
    var modal = document.getElementById('booking-modal');
    if (!modal) return;

    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';

    var iframe = document.getElementById('booking-iframe');
    if (iframe) iframe.src = '';

    var fallback = document.getElementById('booking-fallback');
    if (fallback) fallback.setAttribute('hidden', '');

    if (modalTrigger) {
        modalTrigger.focus();
        modalTrigger = null;
    }

    modal.removeEventListener('keydown', handleModalKeys);
}

function handleModalKeys(e) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') {
        var modal = document.getElementById('booking-modal');
        var focusable = modal.querySelectorAll('button, [href], iframe, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    }
}

function startIframeTimeout(iframe) {
    var fallback = document.getElementById('booking-fallback');
    var loaded = false;
    iframe.addEventListener('load', function () { loaded = true; });
    setTimeout(function () {
        if (!loaded && fallback) fallback.removeAttribute('hidden');
    }, 10000);
}

// ========== HEADER ==========

function initStickyHeader() {
    var header = document.getElementById('main-header');
    if (!header) return;
    function check() {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', check, { passive: true });
    check();
}

function initHamburgerMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open.toString());
    });

    // Cerrar al seleccionar enlace
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ========== ANIMATIONS ==========

function initScrollAnimations() {
    var elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach(function (el) { el.classList.add('visible'); });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(function (el) { observer.observe(el); });
}

// ========== ACCORDION ==========

function initAccordion() {
    var buttons = document.querySelectorAll('.accordion-btn');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            toggleItem(btn, buttons);
        });
        btn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleItem(btn, buttons);
            }
        });
    });
}

function toggleItem(active, all) {
    var wasExpanded = active.getAttribute('aria-expanded') === 'true';
    var panelId = active.getAttribute('aria-controls');
    var panel = document.getElementById(panelId);

    // Colapsar todos
    all.forEach(function (btn) {
        btn.setAttribute('aria-expanded', 'false');
        var p = document.getElementById(btn.getAttribute('aria-controls'));
        if (p) p.setAttribute('hidden', '');
    });

    // Expandir si estaba cerrado
    if (!wasExpanded) {
        active.setAttribute('aria-expanded', 'true');
        if (panel) panel.removeAttribute('hidden');
    }
}

// ========== SOCIAL LINKS ==========

function initSocialLinks() {
    Object.keys(SOCIAL_LINKS).forEach(function (network) {
        var url = SOCIAL_LINKS[network];
        var link = document.querySelector('[data-social="' + network + '"]');
        if (!link) return;
        if (!url || url.trim() === '') {
            link.removeAttribute('href');
            link.setAttribute('aria-disabled', 'true');
        } else {
            link.href = url;
        }
    });
}

// ========== SMOOTH SCROLL ==========

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var id = this.getAttribute('href');
            if (id === '#') return;
            var target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ========== TEAM AREAS COLLAPSE ==========

function initTeamAreas() {
    var toggles = document.querySelectorAll('.team-area-toggle');
    if (!toggles.length) return;

    toggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            var panelId = toggle.getAttribute('aria-controls');
            var panel = document.getElementById(panelId);

            // Cerrar todos los demás
            toggles.forEach(function (other) {
                if (other !== toggle) {
                    other.setAttribute('aria-expanded', 'false');
                    var otherPanel = document.getElementById(other.getAttribute('aria-controls'));
                    if (otherPanel) otherPanel.setAttribute('hidden', '');
                }
            });

            // Toggle el actual
            if (expanded) {
                toggle.setAttribute('aria-expanded', 'false');
                if (panel) panel.setAttribute('hidden', '');
            } else {
                toggle.setAttribute('aria-expanded', 'true');
                if (panel) panel.removeAttribute('hidden');
            }
        });
    });
}

/**
 * Muestra/oculta botón de scroll to top.
 */
function initScrollTopButton() {
    var btn = document.getElementById('btn-top');
    if (!btn) return;
    function check() {
        if (window.scrollY > 400) {
            btn.removeAttribute('hidden');
        } else {
            btn.setAttribute('hidden', '');
        }
    }
    window.addEventListener('scroll', check, { passive: true });
    check();
}

// ========== INIT ==========

document.addEventListener('DOMContentLoaded', function () {
    initBooking();
    initStickyHeader();
    initHamburgerMenu();
    initScrollAnimations();
    initSmoothScroll();
    initAccordion();
    initSocialLinks();
    initTeamAreas();
    initScrollTopButton();
});

// Export para testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidBookingUrl, initBooking, openModal, closeModal,
        initStickyHeader, initHamburgerMenu, initScrollAnimations,
        initAccordion, initSocialLinks, initSmoothScroll, initTeamAreas
    };
}
