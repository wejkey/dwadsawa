class FooterManager {
    constructor() {
        this.footerData = {
            company: {
                name: 'InternationalMC',
                description: 'Minecraft plugin development team creating original plugins for servers.',
                founded: '2025',
                logo: 'fas fa-cube'
            },
            navigation: {
                main: [
                    { name: 'Home', url: '/index.html' },
                    { name: 'Plugins', url: '/index.html#plugins' },
                    { name: 'About', url: '/index.html#about' },
                    { name: 'Contact', url: '/index.html#contact' }
                ],
                resources: [
                    { name: 'Modrinth', url: 'https://modrinth.com/user/International' },
                    { name: 'Github', url: 'https://github.com/internationalmc' }

                ],
                legal: [
                    { name: 'Terms', url: './terms.html' },
                    { name: 'License', url: './terms.html#license' }
                ]
            },
            social: [
                {
                    name: 'Discord',
                    icon: 'fab fa-discord',
                    url: 'https://internationalmc.pages.dev/discord',
                    color: '#5865F2'
                },
                {
                    name: 'GitHub',
                    icon: 'fab fa-github',
                    url: 'https://github.com/InternationalMC',
                    color: '#333'
                },
                {
                    name: 'Modrinth',
                    icon: 'fa-solid fa-wrench',
                    url: 'https://modrinth.com/user/International',
                    color: '#1BD96A'
                },
                {
                    name: 'Mail',
                    icon: 'fa fa-envelope',
                    url: 'mailto:rewejkem@proton.me',
                    color: '#E94234'
                },
                {
                    name: 'PayPal',
                    icon: 'fa-brands fa-paypal',
                    url: 'https://www.paypal.com/paypalme/rewejkem',
                    color: '#0197DA'
                }
            ],
        };
    }

    renderFooter() {
        return `
            <div class="footer-content">
                <div class="container">
                    <div class="footer-main">
                        ${this.renderCompanySection()}
                        ${this.renderNavigationSections()}
                    </div>
                    
                    <div class="footer-divider"></div>
                    
                    <div class="footer-bottom">
                        ${this.renderBottomContent()}
                    </div>
                </div>
            </div>
            
            ${this.renderFooterStyles()}
        `;
    }

    renderCompanySection() {
        const { company, social } = this.footerData;
        
        return `
            <div class="footer-section footer-company">
                <div class="footer-logo">
                    <i class="${company.logo}"></i>
                    <span>${company.name}</span>
                </div>
                <p class="footer-description">${company.description}</p>
        
                
                <div class="footer-social">
                    ${social.map(item => `
                        <a href="${item.url}" class="social-link" target="_blank" rel="noopener noreferrer" 
                           data-tooltip="${item.name}" style="--social-color: ${item.color}">
                            <i class="${item.icon}"></i>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderNavigationSections() {
        const { navigation } = this.footerData;
        
        return `
            <div class="footer-section">
                <h4 class="footer-title">Quick Links</h4>
                <ul class="footer-links">
                    ${navigation.main.map(link => `
                        <li><a href="${link.url}" class="footer-link">${link.name}</a></li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="footer-section">
                <h4 class="footer-title">Resources</h4>
                <ul class="footer-links">
                    ${navigation.resources.map(link => `
                        <li><a href="${link.url}" class="footer-link">${link.name}</a></li>
                    `).join('')}
                </ul>
            </div>

            <div class="footer-section">
                <h4 class="footer-title">Support Us</h4>
                <ul class="footer-links">
                    <li><a href="https://paypal.me/rewejkem" class="footer-link">PayPal</a></li>
                </ul>
            </div>
        `;
    }


    renderBottomContent() {
        const { company, navigation } = this.footerData;
        const currentYear = new Date().getFullYear();
        
        return `
            <div class="footer-bottom-content">
                <div class="footer-copyright">
                    <p>&copy; ${currentYear} ${company.name}. All rights reserved.</p>
                    <p class="footer-tagline">Not affiliated with Mojang or Microsoft. Statistics are not automatically updated.</p>
                </div>
                
                <div class="footer-legal">
                    ${navigation.legal.map(link => `
                        <a href="${link.url}" class="legal-link">${link.name}</a>
                    `).join('')}
                </div>
                
                <div class="footer-badge">
                    <i class="fas fa-heart"></i>
                    <span>Made by <a href="https://wejkey.github.io/">Wejkey</a></span>
                </div>
            </div>
        `;
    }

    renderFooterStyles() {
        return `
            <style>
                .footer-content {
                    background: var(--bg-secondary);
                    border-top: 1px solid var(--border-primary);
                    padding: var(--spacing-xxxl) 0 var(--spacing-xl) 0;
                    margin-top: var(--spacing-xxxl);
                }
                
                .footer-main {
                    display: grid;
                    grid-template-columns: 2fr repeat(3, 1fr);
                    gap: var(--spacing-xxxl);
                    margin-bottom: var(--spacing-xxxl);
                }
                
                .footer-section {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }
                
                .footer-company {
                    max-width: 400px;
                }
                
                .footer-logo {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    font-size: var(--fs-xl);
                    font-weight: var(--fw-bold);
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-md);
                }
                
                .footer-logo i {
                    color: var(--primary-color);
                    font-size: var(--fs-2xl);
                }
                
                .footer-description {
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin-bottom: var(--spacing-lg);
                }
                
                .footer-social {
                    display: flex;
                    gap: var(--spacing-sm);
                }
                
                .social-link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: var(--bg-tertiary);
                    border: 1px solid var(--border-secondary);
                    border-radius: var(--radius-md);
                    color: var(--text-secondary);
                    transition: all var(--transition-fast);
                    position: relative;
                }
                
                .social-link:hover {
                    background: var(--social-color, var(--primary-color));
                    border-color: var(--social-color, var(--primary-color));
                    color: white;
                    transform: translateY(-2px);
                }
                
                .footer-title {
                    font-size: var(--fs-lg);
                    font-weight: var(--fw-semibold);
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-md);
                }
                
                .footer-links {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-sm);
                }
                
                .footer-link {
                    color: var(--text-secondary);
                    transition: color var(--transition-fast);
                    font-size: var(--fs-sm);
                }
                
                .footer-link:hover {
                    color: var(--primary-color);
                }
                
                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-sm);
                }
                
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    color: var(--text-secondary);
                    font-size: var(--fs-sm);
                    transition: color var(--transition-fast);
                }
                
                .contact-item:hover {
                    color: var(--primary-color);
                }
                
                .contact-item i {
                    width: 16px;
                    color: var(--primary-color);
                }
                
                .footer-divider {
                    height: 1px;
                    background: var(--border-primary);
                    margin: var(--spacing-xl) 0;
                }
                
                .footer-bottom-content {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                    gap: var(--spacing-xl);
                }
                
                .footer-copyright {
                    text-align: left;
                }
                
                .footer-copyright p {
                    margin: 0;
                    color: var(--text-tertiary);
                    font-size: var(--fs-sm);
                }
                
                .footer-tagline {
                    font-style: italic;
                    font-size: var(--fs-xs) !important;
                    margin-top: var(--spacing-xs) !important;
                }
                
                .footer-legal {
                    display: flex;
                    gap: var(--spacing-lg);
                    justify-content: center;
                }
                
                .legal-link {
                    color: var(--text-tertiary);
                    font-size: var(--fs-xs);
                    transition: color var(--transition-fast);
                }
                
                .legal-link:hover {
                    color: var(--primary-color);
                }
                
                .footer-badge {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: var(--spacing-xs);
                    color: var(--text-tertiary);
                    font-size: var(--fs-xs);
                }
                
                .footer-badge i {
                    color: var(--accent-red);
                }
                
                @media (max-width: 1024px) {
                    .footer-main {
                        grid-template-columns: 1fr 1fr;
                        gap: var(--spacing-xl);
                    }
                    
                    .footer-company {
                        grid-column: 1 / -1;
                        max-width: none;
                    }
                }
                
                @media (max-width: 768px) {
                    .footer-main {
                        grid-template-columns: 1fr;
                        gap: var(--spacing-xl);
                    }
                    

                    
                    .footer-bottom-content {
                        grid-template-columns: 1fr;
                        text-align: center;
                        gap: var(--spacing-md);
                    }
                    
                    .footer-legal {
                        justify-content: center;
                        flex-wrap: wrap;
                    }
                    
                    .footer-badge {
                        justify-content: center;
                    }
                }
                
                @media (max-width: 480px) {
                    
                    .footer-legal {
                        flex-direction: column;
                        gap: var(--spacing-sm);
                    }
                    
                    .social-link {
                        width: 36px;
                        height: 36px;
                    }
                }
            </style>
        `;
    }

    addTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.classList.add('tooltip');
        });
    }

    initSmoothScrolling() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link && link.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }

    updateFooterData(newData) {
        this.footerData = { ...this.footerData, ...newData };
        this.render();
    }

    render() {
        const footerElement = document.getElementById('footer');
        if (footerElement) {
            footerElement.innerHTML = this.renderFooter();
            this.init();
        }
    }
}

window.FooterManager = new FooterManager();

document.addEventListener('DOMContentLoaded', () => {
    window.FooterManager.render();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FooterManager;
}