/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/quick-start',
        'getting-started/requirements',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core-concepts/features',
        'concepts/architecture',
        'concepts/multi-agent',
      ],
    },
    {
      type: 'category',
      label: 'Channels',
      items: [
        'channels/overview',
        'channels/zalo',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'advanced/tools-overview',
        'advanced/exec-security',
        'advanced/browser',
        'advanced/cron',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: [
        'security/pairing-model',
        'security/best-practices',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/common-errors',
      ],
    },
    {
      type: 'category',
      label: 'CLI Reference',
      items: [
        'cli/overview',
        'cli/setup-onboarding',
        'cli/models',
        'cli/agents-system',
      ],
    },
    {
      type: 'category',
      label: 'Gateway Deep Dive',
      items: [
        'gateway/configuration',
        'gateway/networking',
        'gateway/sandboxing',
        'gateway/remote',
      ],
    },
    {
      type: 'category',
      label: 'Deployment',
      items: [
        'deployment/overview',
        'deployment/docker',
        'deployment/production',
        'deployment/railway',
      ],
    },
  ],
};

module.exports = sidebars;
