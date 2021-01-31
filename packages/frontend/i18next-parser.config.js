module.exports = {
  locales: ['en', 'fr'],

  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  defaultNamespace: 'translation',
  defaultValue: '',
  contextSeparator: '_',
  keySeparator: '.',
  keepRemoved: false,
  indentation: 2,
  createOldCatalog: false,

  lexers: {
    js: ['JavascriptLexer'],
    ts: ['JavascriptLexer'],
    jsx: ['JsxLexer'],
    tsx: ['JsxLexer'],
    default: ['JavascriptLexer'],
  },
  lineEnding: 'auto',
  namespaceSeparator: ':',
  input: undefined,
  sort: true,
  skipDefaultValues: false,
  useKeysAsDefaultValue: false,
  verbose: false,
  failOnWarnings: false,
  customValueTemplate: null,
};
