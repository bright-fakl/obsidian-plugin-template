import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Example Plugin',
  description: 'Documentation for the Example Plugin',
  base: '/obsidian-plugin-template/',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/bright-fakl/obsidian-plugin-template' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Usage', link: '/guide/usage' },
          { text: 'Configuration', link: '/guide/configuration' },
          { text: 'Troubleshooting', link: '/guide/troubleshooting' }
        ]
      },
      {
        text: 'Development',
        items: [
          { text: 'Overview', link: '/development/' },
          { text: 'Architecture', link: '/development/architecture' },
          { text: 'API Reference', link: '/development/api' },
          { text: 'Testing', link: '/development/testing' },
          { text: 'Contributing', link: '/development/contributing' }
        ]
      }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Your Name'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bright-fakl/obsidian-plugin-template' }
    ]
  },

  markdown: {
    lineNumbers: true,
    theme: 'github-dark'
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ]
});