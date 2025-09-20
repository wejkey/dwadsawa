class PluginManager {
    constructor() {
        this.plugins = [
            // **************************************************
            // ================ Active Plugins ================
            {
                id: 'reviews',
                name: 'Reviews',
                description: 'Let your players review your server (★★★☆☆). Your Administration, Gameplay or/and Community.<br>',
                version: 'v1.0.1',
                category: 'plugins',
                icon: 'fa-solid fa-star',
                downloads: 38,
                supportedVersions: ['1.21', '1.20', '1.19'],
                tags: ['reviews', 'social', 'comments'],
                downloadUrl: 'https://modrinth.com/plugin/reviews#download',
                documentationUrl: 'https://modrinth.com/plugin/reviews',
            },
            {
                id: 'valentines',
                name: 'Valentines',
                description: 'Original Valentines plugin. Everything in one; Marriages, Leaderboards, Moods, Chat symbols and more.<br>',
                version: 'v3.0.0',
                category: 'plugins',
                icon: 'fas fa-heart',
                downloads: 156,
                supportedVersions: ['1.21', '1.20', '1.19'],
                tags: ['social', 'friends', 'cosmetic'],
                downloadUrl: 'https://modrinth.com/plugin/valentines#download',
                documentationUrl: 'https://modrinth.com/plugin/valentines',
            },

            // **************************************************
            // ================ Archived Plugins ================
            {
                id: 'mobstatus',
                name: 'MobStatus',
                description: 'All mobs names, levels, healthbar and rarity just above them with particles and animations.<br>',
                version: 'Archive',
                category: 'archive',
                icon: 'fa-solid fa-chart-simple',
                downloads: 109,
                supportedVersions: ['1.20'],
                tags: ['holo', 'stats', 'particles', 'mobs'],
                downloadUrl: 'https://modrinth.com/plugin/mobstatus#download',
                documentationUrl: 'hhttps://modrinth.com/plugin/mobstatus',
            }
        ];

        this.categories = {
            all: 'Everything',
            plugins: 'Active Plugins',
            archive: 'Archived'
        };

        this.currentFilter = 'all';
        this.searchTerm = '';
        this.sortBy = 'downloads'; 
    }

    getPlugins(filter = this.currentFilter, search = this.searchTerm) {
        let filtered = this.plugins;

        if (filter !== 'all') {
            filtered = filtered.filter(plugin => plugin.category === filter);
        }

        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(plugin =>
                plugin.name.toLowerCase().includes(searchLower) ||
                plugin.description.toLowerCase().includes(searchLower) ||
                plugin.tags.some(tag => tag.toLowerCase().includes(searchLower))
            );
        }

        filtered.sort((a, b) => {
            if (a.category === 'plugins' && b.category === 'archive') return -1;
            if (a.category === 'archive' && b.category === 'plugins') return 1;
            
            if (a.category === b.category) {
                return b.downloads - a.downloads;
            }
            
            return 0;
        });

        return filtered;
    }

    getPluginById(id) {
        return this.plugins.find(plugin => plugin.id === id) || null;
    }

    getPluginsByCategory(category) {
        if (category === 'all') {
            return this.plugins;
        }
        return this.plugins.filter(plugin => plugin.category === category);
    }

    getStatistics() {
        const totalDownloads = this.plugins.reduce((sum, plugin) => sum + plugin.downloads, 0);
        const totalPlugins = this.plugins.length;
        const categoryCounts = {};

        this.plugins.forEach(plugin => {
            categoryCounts[plugin.category] = (categoryCounts[plugin.category] || 0) + 1;
        });

        return {
            totalPlugins,
            totalDownloads,
            categoryCounts,
            mostDownloaded: this.plugins.reduce((max, plugin) => 
                plugin.downloads > max.downloads ? plugin : max, this.plugins[0])
        };
    }

    setFilter(filter) {
        this.currentFilter = filter;
    }

    setSearch(search) {
        this.searchTerm = search;
    }

    setSortBy(sortBy) {
        this.sortBy = sortBy;
    }

    getCategoriesWithCounts() {
        const counts = {};
        Object.keys(this.categories).forEach(key => {
            counts[key] = key === 'all' ? this.plugins.length : 
                this.plugins.filter(plugin => plugin.category === key).length;
        });
        return counts;
    }

    formatDownloads(downloads) {
        if (downloads >= 1000000) {
            return (downloads / 1000000).toFixed(1) + 'M';
        } else if (downloads >= 1000) {
            return (downloads / 1000).toFixed(1) + 'K';
        }
        return downloads.toString();
    }

    getFeaturedPlugins(count = 3) {
        const shuffled = [...this.plugins].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    getCompatiblePlugins(version) {
        return this.plugins.filter(plugin => 
            plugin.supportedVersions.includes(version)
        );
    }

    advancedSearch(criteria) {
        let results = this.plugins;

        if (criteria.name) {
            results = results.filter(plugin => 
                plugin.name.toLowerCase().includes(criteria.name.toLowerCase())
            );
        }

        if (criteria.category && criteria.category !== 'all') {
            results = results.filter(plugin => plugin.category === criteria.category);
        }

        if (criteria.minDownloads) {
            results = results.filter(plugin => plugin.downloads >= criteria.minDownloads);
        }

        if (criteria.version) {
            results = results.filter(plugin => 
                plugin.supportedVersions.includes(criteria.version)
            );
        }

        if (criteria.tags && criteria.tags.length > 0) {
            results = results.filter(plugin =>
                criteria.tags.some(tag => plugin.tags.includes(tag))
            );
        }

        return results;
    }
}

window.PluginManager = new PluginManager();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PluginManager;
}