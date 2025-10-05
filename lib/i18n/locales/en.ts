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
      share: 'Share',
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
    description: 'A collection of online developer utilities to boost productivity',
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
        value: 'devlikebear@gmail.com',
        link: 'mailto:devlikebear@gmail.com',
      },
      {
        icon: '💼',
        title: 'GitHub',
        value: '@devlikebear',
        link: 'https://github.com/devlikebear',
      },
      {
        icon: '💬',
        title: 'X',
        value: '@slartimark42',
        link: 'https://x.com/slartimark42',
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
    search: {
      placeholder: 'Search tools... (Press / to focus)',
      noResults: 'No tools found',
      noResultsHint: 'Try a different search term',
      resultsCount: 'Found {{count}} tools',
    },
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
      {
        id: 'diff',
        name: 'Diff Checker',
        description: 'Compare texts and visualize differences',
        icon: '🔍',
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
    uuid: {
      title: 'UUID Generator',
      subtitle: 'Generate UUIDs (v4) instantly',
      countLabel: 'Count',
      countOptions: {
        one: '1',
        five: '5',
        ten: '10',
        twentyFive: '25',
        fifty: '50',
        hundred: '100',
      },
      uppercaseLabel: 'Uppercase',
      hyphensLabel: 'Include hyphens',
      buttons: {
        generate: 'Generate',
        clear: 'Clear',
        copyAll: 'Copy All',
        copy: 'Copy',
      },
      messages: {
        copied: 'Copied: {{text}}',
        copyFailed: 'Failed to copy',
        allCopied: '{{count}} UUIDs copied!',
      },
      resultTitle: 'Generated UUIDs ({{count}})',
      guide: {
        title: 'Usage Guide',
        items: [
          '• <strong>UUID</strong>: Universally Unique Identifier',
          '• <strong>Version</strong>: This tool generates UUID v4 (random-based)',
          '• <strong>UUID v4</strong>: Random-based UUID with extremely low collision probability',
          '• <strong>Use cases</strong>: Database primary keys, session IDs, file names, etc.',
          '• <strong>Format</strong>: 8-4-4-4-12 (36 characters total with hyphens)',
          '• <strong>Options</strong>: Toggle case and hyphen formatting',
          '• <strong>Security</strong>: Uses Web Crypto API for secure random generation',
          '• <strong>Privacy</strong>: All generation happens in your browser, nothing is sent to a server',
        ],
        examples: {
          title: 'Examples',
          lowercase: 'Lowercase + hyphens:',
          uppercase: 'Uppercase + hyphens:',
          noHyphens: 'Lowercase without hyphens:',
        },
      },
    },
    hash: {
      title: 'Hash Generator',
      subtitle: 'Convert text to hash values using various algorithms and compare results',
      inputLabel: 'Input String',
      placeholder: 'Enter text to hash',
      hint: 'Hashes are sensitive to input. Even whitespace and line breaks affect the result.',
      algorithmLabel: 'Select Algorithm',
      algorithms: {
        md5: {
          label: 'MD5',
          description: '32-character hexadecimal hash, commonly used for checksums',
        },
        sha1: {
          label: 'SHA-1',
          description: '160-bit hash, used in legacy systems like Git objects',
        },
        sha256: {
          label: 'SHA-256',
          description: '256-bit hash, currently recommended for security',
        },
      },
      resultTitle: 'Result',
      generating: 'Generating hash...',
      emptyMessage: 'Enter text to automatically generate a hash with the selected algorithm.',
      copySuccess: '{{label}} copied!',
      copyFailed: 'Failed to copy to clipboard',
      error: 'An error occurred while generating the hash',
      buttons: {
        copy: 'Copy',
        share: 'Share',
      },
      guide: {
        title: 'Usage Guide',
        items: [
          '• Hashes are one-way functions; the original string cannot be recovered from the hash.',
          '• MD5 and SHA-1 are not recommended for security purposes. Use them only for file integrity checks.',
          '• SHA-256 is a strong hash algorithm suitable for modern cryptographic applications.',
          '• Hash results change completely even with a single character difference (Avalanche Effect).',
          '• All processing is done in your browser and nothing is sent to a server.',
          '• Results are provided in both Hex and Base64 formats.',
        ],
      },
    },
    jwt: {
      title: 'JWT Decoder',
      subtitle: 'Quickly inspect JWT headers, payloads, and metadata without signature verification',
      tokenLabel: 'JWT Token',
      loadSample: 'Load Sample',
      clear: 'Clear',
      placeholder: 'Paste your JWT token in header.payload.signature format',
      copyToken: 'Copy JWT',
      warningNoSignature: '⚠️ Signature segment is empty. This token may not be verified.',
      notice: '• This tool runs client-side and <strong className="text-gray-300">does not perform signature verification.</strong><br />• Be cautious when using sensitive tokens in your browser.',
      emptyValue: 'Unable to parse valid JSON data.',
      noSignature: 'No signature value.',
      metadata: {
        algorithm: 'Algorithm',
        type: 'Type',
        contentType: 'Content-Type',
        keyId: 'Key ID',
        issuedAt: 'Issued (iat)',
        notBefore: 'Not Before (nbf)',
        expiresAt: 'Expires (exp)',
      },
      sections: {
        header: 'Header',
        payload: 'Payload',
        signature: 'Signature',
      },
      buttons: {
        copyRaw: 'Copy Raw',
        copyJson: 'Copy JSON',
        copySignature: 'Copy Signature',
        share: 'Share',
      },
      copySuccess: '{{label}} copied!',
      copyFailed: 'Failed to copy to clipboard',
      claims: {
        iss: 'iss (Issuer)',
        sub: 'sub (Subject)',
        aud: 'aud (Audience)',
        exp: 'exp (Expiration)',
        nbf: 'nbf (Not Before)',
        iat: 'iat (Issued At)',
        jti: 'jti (JWT ID)',
      },
    },
    regex: {
      title: 'Regex Tester',
      subtitle: 'Test and validate regex patterns in real-time and see matching results',
      patternLabel: 'Regex Pattern',
      patternPlaceholder: 'e.g., ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      patternHint: 'Enter pattern only without slashes (/). Error messages will be displayed if any.',
      flagsLabel: 'Flags',
      currentFlags: 'Current flags:',
      testStringLabel: 'Test String',
      testStringPlaceholder: 'Enter single or multiline text to test\ne.g., hello@example.com\nHELLO@EXAMPLE.COM',
      buttons: {
        reset: 'Reset',
        copyInput: 'Copy Input',
        clear: 'Clear',
        copyMatch: 'Copy Match',
      },
      flags: {
        g: { label: 'g', description: 'Global – find all matches' },
        i: { label: 'i', description: 'Ignore Case – case-insensitive matching' },
        m: { label: 'm', description: 'Multiline – ^/$ match each line' },
        s: { label: 's', description: 'DotAll – . matches newlines' },
        u: { label: 'u', description: 'Unicode – extended Unicode matching' },
        y: { label: 'y', description: 'Sticky – match from lastIndex only' },
      },
      matchResults: {
        title: 'Match Results',
        highlightTitle: 'Highlight',
        emptyString: '∅ (empty string)',
        emptyInput: 'Enter a test string to see matching results in real-time.',
        noMatches: 'No matches found. Try adjusting the pattern or flags.',
        matchNumber: 'Match #{{number}}',
        startPosition: 'Start position:',
        endPosition: 'End position:',
        length: 'Length:',
        captureGroupCount: 'Capture groups:',
        captureGroups: 'Capture Groups',
        namedGroups: 'Named Groups',
      },
      copySuccess: '{{label}} copied!',
      copyFailed: 'Failed to copy to clipboard',
      regexError: 'Unable to parse regex pattern',
      guide: {
        title: 'Usage Guide',
        items: [
          '• Patterns and flags are evaluated as you type, with results updated instantly.',
          '• Without the g flag, only the first match is returned. Keep g enabled to see all matches.',
          '• Named capture groups are displayed separately in match cards.',
          '• Zero-length matches automatically advance position to prevent infinite loops.',
        ],
      },
    },
    diffPage: {
      title: 'Diff Checker',
      subtitle: 'Compare two texts and visualize the differences',
      labels: {
        original: 'Original Text',
        modified: 'Modified Text',
        result: 'Diff Result',
      },
      buttons: {
        sample: 'Load Sample',
        clear: 'Clear All',
        copy: 'Copy Result',
      },
      options: {
        mode: 'Compare Mode',
        modeOptions: {
          line: 'Line by Line',
          word: 'Word by Word',
        },
        ignoreCase: 'Ignore Case',
        ignoreWhitespace: 'Ignore Whitespace',
      },
      stats: {
        title: 'Statistics',
        added: 'Added',
        removed: 'Removed',
        unchanged: 'Unchanged',
      },
      messages: {
        copied: 'Copied!',
        empty: 'Enter texts to compare',
      },
    },
  },
};

export type EnglishDictionary = typeof en;
