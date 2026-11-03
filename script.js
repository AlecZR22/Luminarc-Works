document.addEventListener('DOMContentLoaded', () => {

    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }


    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    const roles = [
        "Freelance Photography",
        "Event Highlights Shoot",
        "Cinematic Video Editing",
        "Graphic & Visual Design",
        "Web Development"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeTarget = document.getElementById('typewriterText');

    function typeEffect() {
        if (!typeTarget) return;

        const currentRole = roles[roleIdx];
        if (isDeleting) {
            typeTarget.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typeTarget.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
        }

        let typeSpeed = isDeleting ? 50 : 110;

        if (!isDeleting && charIdx === currentRole.length) {
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            typeSpeed = 400;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();

    // Portfolio Showcase Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-gradient-to-r', 'from-blue-600', 'to-sky-500', 'text-white', 'shadow-lg');
                b.classList.add('text-gray-400', 'glass-card');
            });
            btn.classList.remove('text-gray-400', 'glass-card');
            btn.classList.add('bg-gradient-to-r', 'from-blue-600', 'to-sky-500', 'text-white', 'shadow-lg');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox Modal functions
    const modal = document.getElementById('projectModal');

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Booking Form handling
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    if (contactForm && formAlert) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formAlert.classList.remove('hidden');
            formAlert.className = 'mt-4 p-4 rounded-xl text-sm font-medium text-center bg-blue-500/20 text-blue-300 border border-blue-400/30';
            formAlert.innerHTML = '<i class="fa-solid fa-circle-check mr-2"></i> Thank you! Your booking inquiry for Luminarc Works has been received.';
            contactForm.reset();

            setTimeout(() => {
                formAlert.classList.add('hidden');
            }, 6000);
        });
    }
});

// Modal functions defined globally for inline onclick execution
function openModal(title, category, desc, imgSrc) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDesc = document.getElementById('modalDesc');
    const modalImg = document.getElementById('modalImg');

    if (modalTitle && modalCategory && modalDesc && modalImg && modal) {
        modalTitle.textContent = title;
        modalCategory.textContent = category;
        modalDesc.textContent = desc;
        modalImg.src = imgSrc;
        modal.classList.remove('hidden');
    }
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}