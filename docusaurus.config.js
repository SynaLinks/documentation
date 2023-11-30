// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HybridAGI Docs',
  tagline: 'The Programmable Neuro-Symbolic AGI',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://synalinks.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/documentation/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'synalinks', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    path: 'i18n',
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/hybridagi-social-card.png',
      navbar: {
        title: 'HybridAGI Docs',
        logo: {
          alt: 'SynaLinks logo',
          src: 'img/logo-light.svg',
          srcDark: 'img/logo-dark.svg'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'localeDropdown',
            position: 'left',
          },
          {
            href: 'https://www.synalinks.com',
            label: 'SynaLinks',
            position: 'right',
          },
          {
            href: 'https://github.com/SynaLinks/HybridAGI',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/dRuHxrJR',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'SynaLinks',
                href: 'https://www.synalinks.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/SynaLinks/HybridAGI',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} SynaLinks SAS. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },

      announcementBar: {
        id: 'work_in_progress',
        content:
          'Work in progress, give a ⭐ to our <a href="https://github.com/SynaLinks/HybridAGI">Github</a> to support us!',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: false,
      },
    }),
};

export default config;
