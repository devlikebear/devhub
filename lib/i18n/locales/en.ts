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
      clear: 'Clear',
      copy: 'Copy',
      swap: 'Swap Input/Output',
    },
    messages: {
      copySuccess: 'Copied!',
      copyError: 'Failed to copy',
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
  tools: {
    base64: {
      title: 'Base64 Encoder/Decoder',
      subtitle: 'Convert plain text to and from Base64 instantly.',
      modes: {
        encode: 'Encoding (Text → Base64)',
        decode: 'Decoding (Base64 → Text)',
      },
      labels: {
        inputEncode: 'Original Text',
        inputDecode: 'Base64 String',
        outputEncode: 'Base64 Result',
        outputDecode: 'Decoded Result',
        size: 'Size',
      },
      placeholders: {
        encode: 'Type text to encode...',
        decode: 'Paste a Base64 encoded string...',
      },
      error: 'An error occurred while converting.',
    },
    color: {
      title: 'Color Tool',
      subtitle: 'Convert between HEX, RGB, HSL and generate color palettes.',
      inputLabel: 'Color Input',
      placeholder: '#3b82f6 or rgb(59, 130, 246)',
      hint: 'Supports HEX, RGB, and HSL formats',
      previewLabel: 'Preview',
      errorInvalid: 'The provided value is not a valid color.',
      formatSectionTitle: 'Color Formats',
      formatLabels: {
        hex: 'HEX',
        rgb: 'RGB',
        hsl: 'HSL',
      },
      complementaryTitle: 'Complementary',
      analogousTitle: 'Analogous',
      triadicTitle: 'Triadic',
      shadesTitle: 'Shades',
      originalLabel: 'Original',
      complementaryLabel: 'Complementary',
      analogousLabel: ['Analogous 1', 'Analogous 2', 'Original'],
      triadicLabel: ['Original', 'Triad 2', 'Triad 3'],
      shadeLabel: ['Shade 1', 'Shade 2', 'Shade 3', 'Shade 4', 'Shade 5'],
    },
    timestamp: {
      title: 'Timestamp Converter',
      subtitle: 'Convert between epoch timestamps and human-readable time.',
      epochLabel: 'Epoch Timestamp',
      epochPlaceholder: '1609459200000',
      epochHint: 'Automatically detects seconds or milliseconds',
      dateLabel: 'Date & Time',
      datePlaceholder: '2021-01-01T00:00:00Z',
      dateHint: 'Supports ISO 8601 and other parseable formats',
      nowButton: 'Set to Now',
      resultTitle: 'Conversion Result',
      rows: {
        epochMs: 'Epoch (milliseconds)',
        epochSec: 'Epoch (seconds)',
        iso: 'ISO 8601',
        local: 'Local Time (Korea)',
        utc: 'UTC',
      },
      copyLabels: {
        epoch: 'Epoch (ms)',
        epochSec: 'Epoch (s)',
        iso: 'ISO 8601',
        local: 'Local Time',
        utc: 'UTC',
      },
      errors: {
        invalidTimestamp: 'The provided value is not a valid timestamp.',
        invalidDate: 'The provided value is not a valid date string.',
        generic: 'An error occurred while converting.',
      },
    },
    url: {
      title: 'URL Encoder / Decoder',
      subtitle: 'Encode or decode full URLs and query parameters safely.',
      mode: {
        encode: 'Encoding',
        decode: 'Decoding',
      },
      target: {
        full: 'Full URL',
        component: 'Query Parameter',
      },
      infoLabels: {
        mode: 'Mode',
        target: 'Target',
      },
      placeholder: {
        encode: 'Enter a URL or parameter to encode',
        decode: 'Paste a string to decode',
      },
      reservedTitle: 'Reserved Characters',
      reservedDescription:
        'In query parameter mode all reserved characters are percent-encoded.',
      encodeHint:
        '• Full URL mode keeps separators such as `/` or `:` by using encodeURI.\n• Query parameter mode uses encodeURIComponent so every reserved character is escaped.',
      safetyWarning: '⚠️ Decoded result may include an unsafe protocol.',
      resultTitle: 'Result',
      errors: {
        generic: 'An error occurred while converting.',
      },
    },
    json: {
      title: 'JSON Formatter',
      subtitle: 'Format, validate, and minify JSON payloads.',
      buttons: {
        format: 'Format',
        minify: 'Minify',
        sample: 'Sample JSON',
        clear: 'Clear',
      },
      indentLabel: 'Indentation',
      indentOptions: {
        two: '2 spaces',
        four: '4 spaces',
        tab: 'Tab',
      },
      input: {
        label: 'Input',
        placeholder: '{"key": "value"}',
        errorTitle: '⚠️ JSON Error',
        validMessage: '✓ This is valid JSON.',
        analysis: {
          summary: 'Type: {{type}} | Keys: {{keys}} | Depth: {{depth}}',
        },
        lineColumn: 'Line {{line}}, Column {{column}}',
      },
      output: {
        label: 'Output',
        placeholder: 'Click the format or minify button to get started.',
      },
      guide: {
        title: 'Usage Guide',
        items: [
          '• Format: Adds indentation and line breaks for readability.',
          '• Minify: Removes whitespace to reduce payload size.',
          '• Live Validation: JSON is validated as you type.',
          '• Error Location: Exact line and column are displayed on failure.',
          '• Analysis: Inspect type, key count, and nesting depth.',
          '• Privacy: Everything runs in your browser, nothing is uploaded.',
        ],
        keyboardTitle: 'Keyboard Shortcuts',
        shortcuts: {
          format: '• Ctrl/Cmd + Enter: Format',
          minify: '• Ctrl/Cmd + M: Minify',
        },
      },
      errors: {
        generic: 'An error occurred while processing the JSON.',
      },
      sample: `{
  "name": "DevHub",
  "version": "1.0.0",
  "tools": [
    { "id": "timestamp", "name": "Timestamp Converter", "category": "converter" },
    { "id": "base64", "name": "Base64 Encoder/Decoder", "category": "converter" }
  ],
  "features": {
    "privacy": true,
    "free": true,
    "responsive": true
  }
}`,
    },
    markdown: {
      title: 'Markdown Preview',
      subtitle: 'Write and preview Markdown in real time.',
      inputTitle: 'Markdown Input',
      previewTitle: 'Live Preview',
      buttons: {
        loadSample: 'Load Sample',
        clear: 'Clear',
        copyMarkdown: 'Copy Markdown',
        copyHtml: 'Copy HTML',
      },
      placeholder: '# Start typing your Markdown here',
      emptyPreview: 'Nothing to preview. Type Markdown in the left pane.',
      copySuccess: '{{type}} copied!',
      copyError: 'Failed to copy to clipboard',
      guide: {
        title: 'Usage Guide',
        items: [
          '• All text is processed locally in your browser and is never sent to a server.',
          '• Supports headings, lists, code blocks, links, images, blockquotes, and more.',
          '• Copy HTML to paste directly into blogs or document editors.',
          '• Image URLs with unsafe protocols are automatically blocked.',
        ],
      },
      sample: `# DevHub Markdown Preview

See your Markdown rendered in real time.

## Supported Syntax
- **Bold** and *italic*
- ~~Strikethrough~~
- Nested lists
- [Links](https://devhub.marvin-42.com) and ![images](https://placehold.co/80x40)

> Blockquotes look like this.

\`\`\`
def greet(name):
    return f"Hello, {name}!"

greet('DevHub')
\`\`\`

---

Quickly draft your Markdown with DevHub!`,
    },
  },
};

export type EnglishDictionary = typeof en;
