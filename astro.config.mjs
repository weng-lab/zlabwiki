// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

import Icons from 'unplugin-icons/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://wiki.wenglab.org",
  integrations: [
    starlight({
      title: 'ZLab Wiki',
      favicon: './public/favicon.ico',
      components: {
        Hero: './src/components/Hero.astro'
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/weng-lab' }],
      sidebar: [
        { label: 'Getting Started', slug: 'getting-started' },
        {
          label: 'DevOps Tutorials',
          autogenerate: { directory: 'devops-tutorials' },
            // Each item here is one entry in the nav bar
            // { label: 'UCSC Genome Browser Tutorial', slug: 'devops-tutorials/ucsc-genome-browser-tutorial' },
        },
        {
          label: 'Software Tutorials',
          autogenerate: { directory: 'software-tutorials' },
        },
        {
          label: 'References',
          autogenerate: { directory: 'references' }
        },
        {
          label: 'Troubleshooting',
          autogenerate: { directory: 'troubleshooting' },
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
   }),
    mermaid({
      theme: 'dark',
      autoTheme: true,
    })
  ],
  vite: {
    plugins: [
      Icons({ compiler: 'astro' }),
    ],
  },

});
