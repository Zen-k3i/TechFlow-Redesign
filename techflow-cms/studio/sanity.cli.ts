import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ce31dig5',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  // The Next.js site lives at the repo root, two levels up.
  typegen: {
    enabled: true,
    path: '../../src/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../../sanity.types.ts',
    overloadClientMethods: true,
  },
})
