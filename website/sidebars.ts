import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'architecture',
    'features',
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/types',
        'api/components',
        'api/utilities',
      ],
    },
    'deployment',
    'contributing',
  ],
};

export default sidebars;
