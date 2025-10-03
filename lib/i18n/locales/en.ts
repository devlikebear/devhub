export const en = {
  common: {
    language: {
      label: 'Language',
      english: 'English',
      korean: 'Korean',
    },
    buttons: {
      viewTools: 'Explore Tools',
      viewGithub: 'View on GitHub',
      learnMore: 'Learn More',
    },
  },
  navbar: {
    home: 'Home',
    about: 'About',
    tools: 'Tools',
    contact: 'Contact',
  },
  footer: {
    title: 'DevHub',
    description: 'Portfolio & blog platform for developers',
    quickLinksTitle: 'Quick Links',
    connectTitle: 'Connect',
    rights: '© {{year}} DevHub. Built with Next.js & Cloudflare Pages.',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/tools', label: 'Tools' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  home: {
    heroTitle: 'DevHub',
    heroSubtitle: 'A collection of online developer utilities to boost productivity.',
    heroCtas: {
      tools: 'Explore Tools',
      github: 'View on GitHub',
    },
    features: [
      {
        title: '🛠️ Practical Utilities',
        description: 'More than 10 developer tools including timestamp, Base64, JSON, and more.',
      },
      {
        title: '🔒 Privacy First',
        description: 'Every conversion runs in the browser. No data ever leaves your device.',
      },
      {
        title: '⚡ Fast & Free',
        description: 'Instant access without ads or paywalls—ready whenever you are.',
      },
    ],
  },
  about: {
    heroTitle: 'About DevHub',
    heroSubtitle: 'A free online utility hub designed to support developer productivity.',
    mission: {
      title: '🎯 Our Mission',
      paragraphs: [
        'DevHub brings everyday conversion, formatting, and validation tools together so developers can work faster in one place.',
        'All tools run entirely in the browser, keeping your data private while remaining completely free and ad-free.',
      ],
    },
    featuresTitle: '✨ Key Highlights',
    features: [
      {
        title: '🔒 Privacy First',
        description: 'Every task is processed client-side so nothing is sent to a server.',
      },
      {
        title: '⚡ High Performance',
        description: 'Powered by Next.js and Cloudflare Pages for fast global delivery.',
      },
      {
        title: '🆓 Free & Open Source',
        description: 'Use every tool without ads or fees, and explore the source code freely.',
      },
      {
        title: '📱 Responsive Design',
        description: 'Optimized for desktop, tablet, and mobile for consistent experiences.',
      },
    ],
    techStack: {
      title: '🛠️ Tech Stack',
      columns: [
        {
          title: 'Frontend',
          items: ['Next.js 15', 'TypeScript', 'Tailwind CSS 4'],
        },
        {
          title: 'Infrastructure',
          items: ['Cloudflare Pages', 'Edge Network CDN', 'Auto SSL'],
        },
        {
          title: 'Development',
          items: ['Git & GitHub', 'ESLint', 'npm'],
        },
      ],
    },
    openSource: {
      title: '🤝 Open Source',
      description: 'DevHub is fully open source. Review the codebase on GitHub and get involved.',
      button: 'View on GitHub',
    },
  },
  contact: {
    heroTitle: 'Get in Touch',
    heroSubtitle: 'Have feedback or ideas for DevHub? We’d love to hear from you.',
    methods: [
      {
        icon: '📧',
        title: 'Email',
        value: 'hello@devhub.dev',
        link: 'mailto:hello@devhub.dev',
      },
      {
        icon: '💼',
        title: 'GitHub',
        value: '@devlikebear',
        link: 'https://github.com/devlikebear',
      },
      {
        icon: '💬',
        title: 'Twitter',
        value: '@devhub',
        link: 'https://twitter.com/devhub',
      },
    ],
    issues: {
      title: '🐛 Report Issues & Request Features',
      description: 'Found a bug or want to suggest a new utility? Open an issue on GitHub and let us know!',
      button: 'Open GitHub Issues',
    },
    faqTitle: 'Frequently Asked Questions',
    faq: [
      {
        question: 'Are all tools free to use?',
        answer: 'Yes. Every tool on DevHub is completely free and ad-free.',
      },
      {
        question: 'Do you send my data to a server?',
        answer: 'No. Everything runs in your browser, so your data never leaves your device.',
      },
      {
        question: 'Can I request a new tool?',
        answer: 'Absolutely. Send us an idea through GitHub Issues and we’ll take a look.',
      },
      {
        question: 'Is DevHub open source?',
        answer: 'Yes. The entire project is open source and available on GitHub.',
      },
    ],
  },
  toolsPage: {
    heroTitle: 'Developer Utility Tools',
    heroSubtitle: 'Use a growing set of online utilities to streamline your workflow.',
    categories: {
      converter: 'Converters',
      formatter: 'Formatters',
      generator: 'Generators',
      tester: 'Testers',
    },
    comingSoonNotice: '💡 More tools are coming soon!',
    badges: {
      comingSoon: 'Coming Soon',
    },
    items: [
      {
        id: 'timestamp',
        name: 'Timestamp Converter',
        description: 'Convert between epoch timestamps and date/time values.',
        icon: '🕐',
        category: 'converter',
        status: 'available',
      },
      {
        id: 'base64',
        name: 'Base64 Encoder/Decoder',
        description: 'Encode plain text to Base64 or decode encoded strings.',
        icon: '🔤',
        category: 'converter',
        status: 'available',
      },
      {
        id: 'json',
        name: 'JSON Formatter',
        description: 'Format, validate, and minify JSON payloads.',
        icon: '📋',
        category: 'formatter',
        status: 'available',
      },
      {
        id: 'color',
        name: 'Color Tool',
        description: 'Convert between HEX, RGB, and HSL and build palettes.',
        icon: '🎨',
        category: 'converter',
        status: 'available',
      },
      {
        id: 'uuid',
        name: 'UUID Generator',
        description: 'Generate UUID v4 values on demand.',
        icon: '🔑',
        category: 'generator',
        status: 'available',
      },
      {
        id: 'hash',
        name: 'Hash Generator',
        description: 'Create MD5, SHA-1, or SHA-256 hashes instantly.',
        icon: '🔐',
        category: 'generator',
        status: 'available',
      },
      {
        id: 'regex',
        name: 'Regex Tester',
        description: 'Test regular expressions and inspect match results.',
        icon: '🔍',
        category: 'tester',
        status: 'available',
      },
      {
        id: 'markdown',
        name: 'Markdown Preview',
        description: 'Write Markdown and see the HTML output in real time.',
        icon: '📝',
        category: 'formatter',
        status: 'available',
      },
      {
        id: 'url',
        name: 'URL Encoder/Decoder',
        description: 'Encode or decode full URLs and query parameters.',
        icon: '🔗',
        category: 'converter',
        status: 'available',
      },
      {
        id: 'jwt',
        name: 'JWT Decoder',
        description: 'Inspect JWT headers, payloads, and metadata.',
        icon: '🎫',
        category: 'tester',
        status: 'available',
      },
    ],
  },
};

export type EnglishDictionary = typeof en;
