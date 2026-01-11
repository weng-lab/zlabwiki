import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};

// import { defineCollection, z } from 'astro:content';
// import { docsLoader } from '@astrojs/starlight/loaders';
// import { docsSchema } from '@astrojs/starlight/schema';
//
// export const collections = {
//   docs: defineCollection({
//     loader: docsLoader(),
//     schema: docsSchema({
//       extend: z.object({
//         authors: z.array(z.object({
//           name: z.string(),
//           email: z.string().optional(),
//         })).optional(),
//       }),
//     }),
//   }),
// };
