document.querySelectorAll('nav .nav-links a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        var targetId = this.getAttribute('href').slice(1);
        var targetEl = document.getElementById(targetId);
        if(targetEl){
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

var navTitle = document.querySelector('nav h1');
if(navTitle){
    navTitle.addEventListener('click', function(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

var getInTouchBtn = document.getElementById('get-in-touch-btn');
var contactFormContainer = document.getElementById('contact-form-container');
if(getInTouchBtn && contactFormContainer){
    getInTouchBtn.addEventListener('click', function(){
        var isNowVisible = contactFormContainer.classList.toggle('is-visible');
        if(isNowVisible){
            contactFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// AJAX submit for contact form
var contactForm = document.getElementById('contact-form');
var formStatusEl = document.getElementById('form-status');
if(contactForm){
    contactForm.addEventListener('submit', async function(e){
        e.preventDefault();
        if(formStatusEl){
            formStatusEl.textContent = 'Sending...';
            formStatusEl.className = 'form-status';
        }
        try{
            var formData = new FormData(contactForm);
            var actionUrl = contactForm.getAttribute('action');
            var response = await fetch(actionUrl, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });
            if(response.ok){
                if(formStatusEl){
                    formStatusEl.textContent = 'Submitted successfully';
                    formStatusEl.className = 'form-status success';
                }
                contactForm.reset();
            } else {
                var data;
                try{ data = await response.json(); } catch(_){}
                var errorMsg = (data && data.errors && data.errors.length) ? data.errors.map(function(e){return e.message;}).join(', ') : 'un expected error sending message. Please try again.';
                if(formStatusEl){
                    formStatusEl.textContent = errorMsg;
                    formStatusEl.className = 'form-status error';
                }
            }
        } catch(err){
            if(formStatusEl){
                formStatusEl.textContent = 'un expected error sending message. Please try again.';
                formStatusEl.className = 'form-status error';
            }
        }
    });
}

// Dark mode
function toggleDarkMode(){
    document.body.classList.toggle('light-mode');
}

// Lightbox Feature
document.addEventListener('DOMContentLoaded', function() {
    const projectImages = document.querySelectorAll('.project-details-container img');
    
    // Only proceed if there are images in the project details section
    if (projectImages.length > 0) {
        // Create Lightbox Elements
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        
        const lightboxImg = document.createElement('img');
        const prevBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        const closeBtn = document.createElement('button');

        prevBtn.classList.add('lightbox-prev');
        prevBtn.innerHTML = '&#10094;'; // Left Arrow HTML entity
        
        nextBtn.classList.add('lightbox-next');
        nextBtn.innerHTML = '&#10095;'; // Right Arrow HTML entity
        
        closeBtn.classList.add('lightbox-close');
        closeBtn.innerHTML = '&times;';
        
        lightbox.appendChild(prevBtn);
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(nextBtn);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);

        let currentIndex = 0;

        function showImage(index) {
            if (index >= projectImages.length) currentIndex = 0;
            else if (index < 0) currentIndex = projectImages.length - 1;
            else currentIndex = index;

            lightboxImg.src = projectImages[currentIndex].src;
            // Ensure alt text is updated for accessibility
            lightboxImg.alt = projectImages[currentIndex].alt;
        }

        // Open Lightbox
        projectImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentIndex = index;
                showImage(currentIndex);
                lightbox.classList.add('active');
            });
        });

        // Close Lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
        };

        closeBtn.addEventListener('click', closeLightbox);
        
        // Close on clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Navigation
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing on button click
            showImage(currentIndex + 1);
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex - 1);
        });

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showImage(currentIndex + 1);
            if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        });
    }
});