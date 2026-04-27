import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'DayFlow Docs',
  tagline: 'Documentation for DayFlow — Smart Daily Planner',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://i-jennifer.github.io',
  baseUrl: '/Day-Planner/',

  organizationName: 'I-JENNIFER',
  projectName: 'Day-Planner',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/I-JENNIFER/Day-Planner/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'DayFlow',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://day-planner-olive.vercel.app',
          label: 'Live Demo',
          position: 'right',
        },
        {
          href: 'https://github.com/I-JENNIFER/Day-Planner',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Architecture',
              to: '/docs/architecture',
            },
            {
              label: 'Features',
              to: '/docs/features',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Live Demo',
              href: 'https://day-planner-olive.vercel.app',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/I-JENNIFER/Day-Planner',
            },
          ],
        },
        {
          title: 'Contribute',
          items: [
            {
              label: 'Contributing Guide',
              to: '/docs/contributing',
            },
            {
              label: 'Deployment',
              to: '/docs/deployment',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DayFlow. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
