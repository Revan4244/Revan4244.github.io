document.addEventListener('DOMContentLoaded', function() {
    logEvent('view', 'page', document.title);
    
    trackElementViews();
    trackClickEvents();
});

function trackClickEvents() {
    document.addEventListener('click', function(event) {
        const element = event.target;
        
        let elementType = getElementType(element);
        let elementDescription = getElementDescription(element);
        
        
        logEvent('click', elementType, elementDescription);
    });
}

function trackElementViews() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                let elementType = getElementType(element);
                let elementDescription = getElementDescription(element);
                
                logEvent('view', elementType, elementDescription);
                
                observer.unobserve(element);
            }
        });
    }, options);
    
    const elementsToTrack = [
        document.querySelector('#about .about-text'),
        
        document.querySelector('.profile-image'),
        
        document.querySelector('.birthplace-gallery'),
        
        document.querySelector('#education .timeline'),
        
        document.querySelector('#skills .skills-container'),

        document.querySelector('.btn-cv')
    ];
    
    elementsToTrack.forEach(element => {
        if (element) {
            observer.observe(element);
        }
    });
    
    document.querySelectorAll('.gallery-img').forEach(img => {
        if (img) {
            observer.observe(img);
        }
    });
}

function getElementType(element) {
    const tagName = element.tagName.toLowerCase();
    
    if (tagName === 'img' || element.classList.contains('profile-image') || element.classList.contains('gallery-img')) {
        return 'image';
    } else if (tagName === 'a' || element.closest('a')) {
        return 'link';
    } else if (tagName === 'button' || element.classList.contains('btn') || element.classList.contains('btn-cv')) {
        return 'button';
    } else if (element.classList.contains('nav-links') || element.closest('.nav-links')) {
        return 'navigation';
    } else if (element.classList.contains('social-icons') || element.closest('.social-icons')) {
        return 'social-icon';
    } else if (element.classList.contains('timeline-item') || element.closest('.timeline-item')) {
        return 'education-item';
    } else if (element.classList.contains('skill-item') || element.closest('.skill-item')) {
        return 'skill-item';
    } else if (element.classList.contains('about-text') || element.closest('.about-text')) {
        return 'about-text';
    } else if (element.classList.contains('form-control')) {
        return 'form-field';
    } else {
        return tagName; 
    }
}

function getElementDescription(element) {
    if (element.alt) {
        return element.alt; 
    } else if (element.textContent && element.textContent.trim()) {
        const text = element.textContent.trim();
        return text.length > 30 ? text.substring(0, 30) + '...' : text;
    } else if (element.id) {
        return 'ID: ' + element.id;
    } else if (element.className) {
        return 'Class: ' + element.className;
    } else {
        let parent = element.parentElement;
        while (parent) {
            if (parent.textContent && parent.textContent.trim()) {
                const text = parent.textContent.trim();
                return 'Parent: ' + (text.length > 30 ? text.substring(0, 30) + '...' : text);
            }
            if (parent.id) {
                return 'Parent ID: ' + parent.id;
            }
            parent = parent.parentElement;
        }
        return 'Unknown element';
    }
}

function formatTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function logEvent(eventType, elementType, description) {
    const timestamp = formatTimestamp();
    console.log(`${timestamp}, ${eventType}, ${elementType} - ${description}`);
    
}