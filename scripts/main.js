class InternationalMCApp {
    constructor() {
        this.currentFilter = 'all';
        this.isLoading = true;
        
        this.init();
    }
    
    async init() {
        try {
            await this.initializeComponents();
            this.startApplication();
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.handleInitError();
        }
    }

    async initializeComponents() {
        this.initNavigation();
        this.initCodePreview();
        this.initPluginsSection();
        this.initStatistics();
        this.initScrollEffects();
        this.initInteractiveElements();
    }

    startApplication() {
        this.isLoading = false;
        console.log('InternationalMC website initialized successfully');
    }

    initNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        navToggle?.classList.remove('active');
                        navMenu?.classList.remove('active');
                        
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        this.updateActiveNavLink(link);
                    }
                }
            });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
        });
        
        this.initScrollSpy();
    }

    initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    if (targetLink) {
                        this.updateActiveNavLink(targetLink);
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    initCodePreview() {
        const codeContent = document.getElementById('codeContent');
        
        if (codeContent) {
            const codeLines = [
                '<span style="color: var(--accent-blue);">name:</span> <span style="color: var(--primary-color);">InternationalMC</span>',
                '<span style="color: var(--accent-blue);">version:</span> <span style="color: var(--primary-color);">1.4.2</span>',
                '<span style="color: var(--accent-blue);">api-version:</span> <span style="color: var(--primary-color);">1.20</span>',
                '<span style="color: var(--accent-blue);">author:</span> <span style="color: var(--text-secondary);">InternationalMC</span>',
                '<span style="color: var(--accent-blue);">description:</span> <span style="color: var(--text-secondary);">Developing Minecraft plugins for better in-game experience</span>'
            ];
            
            this.typeCode(codeContent, codeLines);
        }
    }
    
    async typeCode(element, lines) {
        for (let i = 0; i < lines.length; i++) {
            await this.typeCodeLine(element, lines[i]);
            await this.delay(200);
        }
    }

    typeCodeLine(element, line) {
        return new Promise(resolve => {
            const lineElement = document.createElement('div');
            lineElement.innerHTML = line || '&nbsp;';
            lineElement.style.opacity = '0';
            element.appendChild(lineElement);
            
            setTimeout(() => {
                lineElement.style.transition = 'opacity 0.3s ease-out';
                lineElement.style.opacity = '1';
                setTimeout(resolve, 100);
            }, 50);
        });
    }

    initPluginsSection() {
        this.renderPlugins();
        this.initPluginFilters();
        this.initPluginAnimations();
    }

    renderPlugins(filter = 'all') {
        const pluginsGrid = document.getElementById('pluginsGrid');
        
        if (!pluginsGrid) return;
        
        const plugins = window.PluginManager.getPlugins(filter);
        
        pluginsGrid.innerHTML = '';
        
        if (plugins.length === 0) {
            pluginsGrid.innerHTML = `
                <div class="no-plugins">
                    <i class="fas fa-search"></i>
                    <h3>No plugins found</h3>
                    <p>Try adjusting your filter criteria.</p>
                </div>
            `;
            return;
        }
        
        plugins.forEach((plugin, index) => {
            const pluginCard = this.createPluginCard(plugin);
            pluginCard.style.animationDelay = `${index * 50}ms`;
            pluginsGrid.appendChild(pluginCard);
        });
        
        setTimeout(() => {
            document.querySelectorAll('.plugin-card').forEach(card => {
                card.classList.add('animate-in');
            });
        }, 50);
    }
    
    createPluginCard(plugin) {
        const card = document.createElement('div');
        card.className = 'plugin-card';
        card.dataset.category = plugin.category;
        
        const isArchived = plugin.category === 'archive';
        const iconClass = isArchived ? 'plugin-icon-archive' : 'plugin-icon';
        const versionClass = isArchived ? 'plugin-version-archive' : 'plugin-version';
        
        card.innerHTML = `
            <div class="plugin-header">
                <div class="${iconClass}">
                    <i class="${plugin.icon}"></i>
                </div>
                <div class="plugin-info">
                    <h3>${plugin.name}</h3>
                    <span class="${versionClass}">${plugin.version}</span>
                </div>
            </div>
            
            <p class="plugin-description">${plugin.description}</p>
            
            <div class="plugin-meta">
                ${plugin.tags.map(tag => `<span class="plugin-tag ${isArchived ? 'tag-archive' : 'tag-active'}">${tag}</span>`).join('')}
            </div>
            
            <div class="plugin-stats">
                <div class="plugin-stat">
                    <i class="fas fa-download"></i>
                    <span>${window.PluginManager.formatDownloads(plugin.downloads)}</span>
                </div>
                <div class="plugin-stat">
                    <i class="fas fa-code-branch"></i>
                    <span>${plugin.supportedVersions.join(', ')}</span>
                </div>
            </div>
            
            <div class="plugin-actions">
                <button class="btn ${isArchived ? 'btn-archive' : 'btn-primary'} btn-sm" onclick="window.open('${plugin.downloadUrl}', '_blank')">
                    <i class="fas fa-download"></i>
                    Download
                </button>
                <button class="btn btn-secondary btn-sm" onclick="window.open('${plugin.documentationUrl}', '_blank')">
                    <i class="fas fa-book"></i>
                    Docs
                </button>
            </div>
        `;
        
        this.addPluginCardEffects(card);
        
        return card;
    }

    addPluginCardEffects(card) {
        card.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (window.AnimationUtils) {
                    window.AnimationUtils.createRipple(btn, e);
                }
            });
        });
        
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                card.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                card.style.transform = 'translateY(0)';
            }
        });
    }

    initPluginFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.filterPlugins(filter);
            });
        });
    }

    filterPlugins(filter) {
        const pluginCards = document.querySelectorAll('.plugin-card');
        
        pluginCards.forEach(card => {
            card.style.transition = 'all 0.3s ease-out';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });
        
        setTimeout(() => {
            this.renderPlugins(filter);
            this.currentFilter = filter;
        }, 300);
    }

    initPluginAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.plugin-card').forEach(card => {
            observer.observe(card);
        });
    }

    initStatistics() {
        // Reserved for future statistics implementation
    }

    initScrollEffects() {
        const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    if (entry.target.dataset.stagger) {
                        entry.target.style.animationDelay = `${entry.target.dataset.stagger}ms`;
                    }
                    
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    initInteractiveElements() {
        this.addTouchSupport();
    }
    
    addTouchSupport() {
        const touchElements = document.querySelectorAll('.btn, .plugin-card, .nav-link, .filter-btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }, { passive: true });
        });
    }

    handleInitError() {
        console.error('Failed to initialize InternationalMC website');
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    destroy() {
        if (window.AnimationUtils) {
            window.AnimationUtils.destroy();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.InternationalMCApp = new InternationalMCApp();
});

document.addEventListener('visibilitychange', () => {
});

window.addEventListener('beforeunload', () => {
    if (window.InternationalMCApp) {
        window.InternationalMCApp.destroy();
    }
});

window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
    }, 250);
});