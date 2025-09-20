class TermsManager {
    constructor() {
        this.termsData = {
            meta: {
                title: 'Terms of Service',
                lastUpdated: '2025-09-13',
                version: '2.0',
                effectiveDate: '2025-09-14',
                companyName: 'InternationalMC',
                jurisdiction: 'International'
            },
            
            sections: {
                acceptance: {
                    title: 'Acceptance of Terms',
                    icon: 'fas fa-handshake',
                    content: [
                        'By using InternationalMC plugins or website, you accept and agree with terms below.',
                        'If you do not agree, do not use this service.'
                    ]
                },
                
                serviceDescription: {
                    title: 'Service Description',
                    icon: 'fas fa-cogs',
                    content: [
                        'InternationalMC provides Minecraft plugins, including but not limited to:',
                        '• Custom Minecraft server plugins',
                        '• Plugin installation and configuration support',
                        '• Technical documentation and guides',
                        '• Support through Discord and other platforms',
                        'Our services are provided "as is" without warranty of any kind.'
                    ]
                },
                
                userResponsibilities: {
                    title: 'User Responsibilities',
                    icon: 'fas fa-user-shield',
                    content: [
                        'Users are responsible for:',
                        '• Providing accurate information when using our plugins',
                        '• Using our plugins in accordance with Minecraft Terms of Service (+EULA)',
                        '• Not using our plugins for any illegal or unauthorized purposes',
                        '• Following community guidelines'
                    ]
                },
                
                restrictions: {
                    title: 'Usage Restrictions',
                    icon: 'fas fa-ban',
                    content: [
                        'The following activities are strictly prohibited:',
                        '• Reverse engineering, decompiling, or disassembling our plugins',
                        '• Redistributing or reselling our plugins without explicit permission',
                        '• Engaging in any form of harassment or abuse',
                        '• Violating any applicable local, state, national, or international law'
                    ]
                },
                
                support: {
                    title: 'Support and Maintenance',
                    icon: 'fas fa-life-ring',
                    content: [
                        'We do not guarantee response times or resolution of issues.',
                        'We reserve the right to refuse support.'
                    ]
                },
                
                liability: {
                    title: 'Limitation of Liability',
                    icon: 'fas fa-exclamation-triangle',
                    content: [
                        'InternationalMC shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
                        'We are not responsible for any loss of data, profits, or business interruption.',
                        'Users acknowledge that they use our services at their own risk.'
                    ]
                },
                
                termination: {
                    title: 'Termination',
                    icon: 'fas fa-times-circle',
                    content: [
                        'We reserve the right to terminate or suspend access to our services at any time, with or without cause.'                    ]
                },
                
                modifications: {
                    title: 'Modifications to Terms',
                    icon: 'fas fa-edit',
                    content: [
                        'We reserve the right to modify these terms at any time without prior notice.',
                        'Changes will be effective immediately upon posting on our website.',
                        'Continued use of our services after changes constitutes acceptance of new terms.',
                        'Users are encouraged to review these terms periodically.',
                        'Significant changes may be announced through our community channels.'
                    ]
                },
                
                license: {
                    id: 'license',
                    title: 'IMCCL',
                    content: [
                        'InternationalMC Core License',
                        'Copyright © 2025 InternationalMC. All rights reserved.',
                        '',
                        'Permission is granted to use this software on your own Minecraft server(s) in accordance with InternationalMC Terms of Service.',
                        '',
                        'You may NOT:',
                        '- Copy, redistribute, or re-upload this software to any other platform.',
                        '- Modify, decompile, or create derivative works of this software.',
                        '- Share this software with third parties without explicit written permission.',
                        '- Claim ownership of this software or misrepresent it as your own.',
                        '',
                        'This software is provided "as is," without warranty of any kind, express or implied.'                    ]
                }
            },

        };
    }
    
    getTermsData() {
        return this.termsData;
    }

    getSection(section) {
        return this.termsData.sections[section] || null;
    }

    getMeta() {
        return this.termsData.meta;
    }
    
    updateTerms(newData) {
        this.termsData = { ...this.termsData, ...newData };
    }

    addSection(key, section) {
        this.termsData.sections[key] = section;
    }

    removeSection(key) {
        delete this.termsData.sections[key];
    }
    
    getFormattedLastUpdated() {
        const date = new Date(this.termsData.meta.lastUpdated);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    isRecentlyUpdated(days = 30) {
        const lastUpdated = new Date(this.termsData.meta.lastUpdated);
        const now = new Date();
        const diffTime = Math.abs(now - lastUpdated);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= days;
    }
    
    renderAsHTML() {
        const { meta, sections } = this.termsData;
        let html = `<div class="terms-document">`;
        
        html += `
            <div class="terms-header">
                <h1>${meta.title}</h1>
                <div class="terms-meta">
                    <span>Last Updated: ${this.getFormattedLastUpdated()}</span>
                    <span>Version: ${meta.version}</span>
                    <span>Effective: ${new Date(meta.effectiveDate).toLocaleDateString()}</span>
                </div>
            </div>
        `;
        
        Object.keys(sections).forEach(key => {
            const section = sections[key];
            html += `
                <div class="terms-section" id="${key}">
                    <h2><i class="${section.icon}"></i> ${section.title}</h2>
                    <div class="terms-content">
                        ${section.content.map(paragraph => 
                            `<p>${paragraph}</p>`
                        ).join('')}
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
        return html;
    }

    exportAsJSON() {
        return JSON.stringify(this.termsData, null, 2);
    }

    importFromJSON(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            this.termsData = data;
            return true;
        } catch (error) {
            console.error('Failed to import terms:', error);
            return false;
        }
    }
}

window.TermsManager = new TermsManager();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TermsManager;
}