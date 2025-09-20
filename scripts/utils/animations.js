class AnimationUtils {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.scrollObserver = null;        
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupTypingAnimations();
        this.setupMorphingAnimations();
    }
    
    setupScrollAnimations() {
        if ('IntersectionObserver' in window) {
            this.scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        
                        if (entry.target.hasAttribute('data-stagger')) {
                            const delay = parseInt(entry.target.dataset.stagger) * 100;
                            entry.target.style.animationDelay = `${delay}ms`;
                        }
                        
                        this.scrollObserver.unobserve(entry.target);
                    }
                });
            }, this.observerOptions);
            
            document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
                this.scrollObserver.observe(el);
            });
        }
    }
    
    setupTypingAnimations() {
        document.querySelectorAll('.typing-text').forEach(element => {
            this.startTypingAnimation(element);
        });
    }

    startTypingAnimation(element) {
        const text = element.textContent;
        const speed = parseInt(element.dataset.speed) || 50;
        let i = 0;
        
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === 'none' ? 
                        '2px solid var(--primary-color)' : 'none';
                }, 750);
            }
        };
        
        typeWriter();
    }
    
    setupMorphingAnimations() {
        document.querySelectorAll('.morphing-blob').forEach(blob => {
            this.addBlobMorphing(blob);
        });
    }

    addBlobMorphing(blob) {
        const morphKeyframes = [
            { borderRadius: '50% 50% 50% 50%' },
            { borderRadius: '25% 75% 30% 70%' },
            { borderRadius: '75% 25% 70% 30%' },
            { borderRadius: '30% 70% 50% 50%' },
            { borderRadius: '50% 50% 50% 50%' }
        ];
        
        blob.animate(morphKeyframes, {
            duration: 8000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    }

    staggerAnimation(elements, animationClass = 'animate-in', delay = 50) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, index * delay);
        });
    }
    
    slideIn(element, direction = 'up', duration = 600) {
        const directions = {
            up: { transform: 'translateY(30px)', opacity: '0' },
            down: { transform: 'translateY(-30px)', opacity: '0' },
            left: { transform: 'translateX(-30px)', opacity: '0' },
            right: { transform: 'translateX(30px)', opacity: '0' }
        };
        
        const startState = directions[direction] || directions.up;
        
        element.style.transform = startState.transform;
        element.style.opacity = startState.opacity;
        element.style.transition = `all ${duration}ms ease-out`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translate(0, 0)';
            element.style.opacity = '1';
        });
    }
    
    scale(element, fromScale = 0, toScale = 1, duration = 400) {
        element.style.transform = `scale(${fromScale})`;
        element.style.transition = `transform ${duration}ms ease-out`;
        
        requestAnimationFrame(() => {
            element.style.transform = `scale(${toScale})`;
        });
    }

    fade(element, fromOpacity = 0, toOpacity = 1, duration = 400) {
        element.style.opacity = fromOpacity;
        element.style.transition = `opacity ${duration}ms ease-out`;
        
        requestAnimationFrame(() => {
            element.style.opacity = toOpacity;
        });
    }
    
    createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(27, 217, 106, 0.3);
            transform: scale(0);
            animation: ripple 600ms linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    createSkeleton(element) {
        element.classList.add('loading-skeleton');
        
        const observer = new MutationObserver(() => {
            if (element.textContent.trim() || element.querySelector('img, video, iframe')) {
                element.classList.remove('loading-skeleton');
                observer.disconnect();
            }
        });
        
        observer.observe(element, { childList: true, subtree: true });
    }

    parallax(element, speed = 0.5) {
        const updateParallax = () => {
            const scrollY = window.pageYOffset;
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (scrollY + windowHeight > elementTop && scrollY < elementTop + elementHeight) {
                const yPos = -(scrollY - elementTop) * speed;
                element.style.transform = `translateY(${yPos}px)`;
            }
        };
        
        window.addEventListener('scroll', updateParallax, { passive: true });
        updateParallax(); 
        
        return () => {
            window.removeEventListener('scroll', updateParallax);
        };
    }

    textReveal(element, duration = 50) {
        const text = element.textContent;
        const characters = text.split('');
        
        element.innerHTML = characters.map(char => 
            `<span style="opacity: 0; transform: translateY(20px); transition: all 0.3s ease;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        const spans = element.querySelectorAll('span');
        
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, index * duration);
        });
    }
    
    elastic(element, property = 'transform', fromValue = 'scale(0)', toValue = 'scale(1)', duration = 600) {
        element.style[property] = fromValue;
        element.style.animation = `elastic ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
        
        const keyframes = `
            @keyframes elastic {
                0% { ${property}: ${fromValue}; }
                60% { ${property}: scale(1.1); }
                100% { ${property}: ${toValue}; }
            }
        `;
        
        if (!document.querySelector('#elastic-keyframes')) {
            const style = document.createElement('style');
            style.id = 'elastic-keyframes';
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
    }
    
    randomAnimation(element) {
        const animations = ['fadeInUp', 'slideInLeft', 'slideInRight', 'zoomIn', 'bounce', 'elastic'];
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];
        element.classList.add(`animate-${randomAnim}`);
    }
    
    async chainAnimations(animations) {
        for (const anim of animations) {
            await new Promise(resolve => {
                const { element, type, options = {}, delay = 0 } = anim;
                
                setTimeout(() => {
                    switch (type) {
                        case 'slideIn':
                            this.slideIn(element, options.direction, options.duration);
                            break;
                        case 'fade':
                            this.fade(element, options.from, options.to, options.duration);
                            break;
                        case 'scale':
                            this.scale(element, options.from, options.to, options.duration);
                            break;
                        default:
                            element.classList.add(type);
                    }
                    
                    setTimeout(resolve, options.duration || 400);
                }, delay);
            });
        }
    }
    
    onScroll(callback, delay = 32) {
        let ticking = false;
        
        const update = () => {
            callback();
            ticking = false;
        };
        
        const requestUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestUpdate, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', requestUpdate);
        };
    }

    destroy() {
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
        }
        }
}

const injectAnimationKeyframes = () => {
    if (document.querySelector('#animation-keyframes')) return;
    
    const keyframes = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes elastic {
            0% { transform: scale(0); }
            60% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes slideInUp {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInLeft {
            0% {
                opacity: 0;
                transform: translateX(-30px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            0% {
                opacity: 0;
                transform: translateX(30px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes zoomIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .animate-slideInUp { animation: slideInUp 0.6s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out forwards; }
        .animate-zoomIn { animation: zoomIn 0.5s ease-out forwards; }
        .animate-elastic { animation: elastic 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
    `;
    
    const style = document.createElement('style');
    style.id = 'animation-keyframes';
    style.textContent = keyframes;
    document.head.appendChild(style);
};

document.addEventListener('DOMContentLoaded', injectAnimationKeyframes);

window.AnimationUtils = new AnimationUtils();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationUtils;
}