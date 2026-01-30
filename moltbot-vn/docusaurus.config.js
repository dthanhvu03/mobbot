// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Moltbot VN',
    tagline: 'Tài liệu Moltbot tiếng Việt - Từ người dùng, cho người dùng',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://mobbot.vercel.app',
    // Update khi deploy
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'dthanhvu03', // Update với GitHub org thực tế
    projectName: 'mobbot', // Update với repo name

    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',

    // Vietnamese locale
    i18n: {
        defaultLocale: 'vi',
        locales: ['vi']
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            (
                {
                    docs: {
                        sidebarPath: require.resolve('./sidebars.js'),
                        editUrl: 'https://github.com/dthanhvu03/mobbot/tree/main/'
                    },
                    blog: {
                        showReadingTime: true,
                        editUrl: 'https://github.com/dthanhvu03/mobbot/tree/main/'
                    },
                    sitemap: {
                        changefreq: 'daily',
                        priority: 0.7,
                        ignorePatterns: ['/tags/**'],
                    },
                    theme: {
                        customCss: require.resolve('./src/css/custom.css')
                    }
                }
            ),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    (
        { // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            metadata: [
                {name: 'keywords', content: 'moltbot, clawdbot, ai agent, self-hosted, automation, chatbot, trợ lý ảo, tiếng việt, hướng dẫn cài đặt, tích hợp zalo, telegram bot, discord bot, whatsapp automation'},
                {name: 'twitter:card', content: 'summary_large_image'},
                {name: 'og:site_name', content: 'Moltbot VN'},
                {name: 'og:type', content: 'website'},
                {name: 'og:locale', content: 'vi_VN'},
                {name: 'google-site-verification', content: 'EGErfvV2eGeCa1mSauaUh5GMHlp7XI5MarTjD_-5idI'},
            ],
            navbar: {
                title: 'Moltbot VN',
                logo: {
                    alt: 'Moltbot VN Logo',
                    src: 'img/logo.svg'
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Tài Liệu'
                    }, {
                        to: '/blog',
                        label: 'Blog',
                        position: 'left'
                    }, {
                        to: '/showcase',
                        label: 'Showcase',
                        position: 'left'
                    }, {
                        to: '/security',
                        label: 'Security',
                        position: 'left'
                    }, {
                        href: 'https://github.com/moltbot-vn/moltbot-vn',
                        label: 'GitHub',
                        position: 'right'
                    },
                ]
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Tài Liệu',
                        items: [
                            {
                                label: 'Bắt Đầu',
                                to: '/docs/intro'
                            },
                            {
                                label: 'Security Alerts',
                                to: '/security'
                            },
                        ]
                    }, {
                        title: 'Cộng Đồng',
                        items: [
                            {
                                label: 'Discord',
                                href: 'https://discord.gg/moltbot-vn'
                            }, {
                                label: 'Telegram',
                                href: 'https://t.me/moltbotvn'
                            }, {
                                label: 'Facebook Group',
                                href: 'https://facebook.com/groups/moltbotvn'
                            },
                        ]
                    }, {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                to: '/blog'
                            }, {
                                label: 'GitHub',
                                href: 'https://github.com/facebook/docusaurus'
                            },
                        ]
                    },
                ],
                copyright: `Copyright © ${
                    new Date().getFullYear()
                } Moltbot VN Community. Tài liệu từ người dùng, cho người dùng.`
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme
            }
        }
    )
};

module.exports = config;
