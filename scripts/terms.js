class TermsPageController {
    constructor() {
        this.currentSection = 'terms';
        this.termsManager = window.TermsManager;
        this.licenseManager = window.LicenseManager;
        
        this.init();
    }
    
    init() {
        this.initNavigation();
        this.loadContent();
        this.initInteractiveElements();
        this.updateLastUpdatedDate();
        this.addScrollEffects();
        this.handleUrlFragment();
    }

    handleUrlFragment() {
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            setTimeout(() => {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }, 500);
        }
    }

    initNavigation() {
        const navItems = document.querySelectorAll('.terms-nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.switchSection(section);
            });
        });
        
        if (navItems.length > 0) {
            navItems[0].classList.add('active');
        }
    }

    switchSection(section) {
        document.querySelectorAll('.terms-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        document.querySelector(`[data-section="${section}"]`)?.classList.add('active');
        
        this.currentSection = section;
        this.loadContent();
    }
    
    loadContent() {
        const container = document.getElementById('termsContent');
        if (!container) return;
        
        let content = '';
        
        switch (this.currentSection) {
            case 'terms':
                content = this.renderTermsOfService();
                break;
            case 'licenses':
                content = this.renderLicenses();
                break;
            default:
                content = this.renderTermsOfService();
        }
        
        container.style.opacity = '0';
        setTimeout(() => {
            container.innerHTML = content;
            container.style.opacity = '1';
            this.addContentAnimations();
            this.handleUrlFragment();
        }, 150);
    }

    renderTermsOfService() {
        const termsData = this.termsManager.getTermsData();
        const { meta, sections } = termsData;
        
        let html = `
            <div class="terms-section-header">
                <h2><i class="fas fa-file-contract"></i> Terms of Service</h2>
                <div class="terms-meta">
                    <span class="meta-item">
                        <i class="fas fa-calendar"></i>
                        Last Updated: ${this.termsManager.getFormattedLastUpdated()}
                    </span>
                    <span class="meta-item">
                        <i class="fas fa-tag"></i>
                        Version: ${meta.version}
                    </span>
                </div>
            </div>
        
        `;
        
        Object.keys(sections).forEach(key => {
            const section = sections[key];
            html += `
                <div class="terms-content-section scroll-reveal" id="${key}">
                    <div class="section-header">
                        <h3><i class="${section.icon}"></i> ${section.title}</h3>
                    </div>
                    <div class="section-content">
                        ${section.content.map(paragraph => 
                            `<p>${paragraph}</p>`
                        ).join('')}
                    </div>
                </div>
            `;
        });
        
        return html;
    }

    toggleLicenseDetails(licenseId) {
        const license = this.licenseManager.getLicense(licenseId);
        if (!license) return;
        
        const modal = this.createLicenseModal(licenseId, license);
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    createLicenseModal(licenseId, license) {
        const modal = document.createElement('div');
        modal.className = 'license-modal';
        modal.innerHTML = `
            <div class="license-modal-content">
                <div class="license-modal-header">
                    <h3>${license.name}</h3>
                    <button class="close-modal" onclick="this.closeLicenseModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="license-modal-body">
                    <pre class="license-text">${this.licenseManager.generateLicenseText(licenseId)}</pre>
                </div>
                <div class="license-modal-footer">
                    <button class="btn btn-secondary" onclick="this.copyLicenseText('${licenseId}')">
                        <i class="fas fa-copy"></i>
                        Copy License Text
                    </button>
                    <button class="btn btn-primary" onclick="this.closeLicenseModal()">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeLicenseModal();
            }
        });
        
        return modal;
    }
    
    closeLicenseModal() {
        const modal = document.querySelector('.license-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }
    
    copyLicenseText(licenseId) {
        const text = this.licenseManager.generateLicenseText(licenseId);
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('License text copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Failed to copy license text', 'error');
        });
    }

    updateLastUpdatedDate() {
        const element = document.getElementById('lastUpdated');
        if (element) {
            element.textContent = `Last updated: ${this.termsManager.getFormattedLastUpdated()}`;
        }
    }

    scrollToContent() {
        const contentSection = document.querySelector('.terms-content');
        if (contentSection) {
            contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    addScrollEffects() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    addContentAnimations() {
        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * 50}ms`;
        });
        
        this.addScrollEffects();
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

window.toggleLicenseDetails = (licenseId) => {
    if (window.termsPageController) {
        window.termsPageController.toggleLicenseDetails(licenseId);
    }
};

window.closeLicenseModal = () => {
    if (window.termsPageController) {
        window.termsPageController.closeLicenseModal();
    }
};

window.copyLicenseText = (licenseId) => {
    if (window.termsPageController) {
        window.termsPageController.copyLicenseText(licenseId);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.termsPageController = new TermsPageController();
});

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
});