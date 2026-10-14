module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react$',
    '^react-native$',
    '<THIRD_PARTY_MODULES>',
    '^@core/(.*)$',
    '^@server/(.*)$',
    '^@ui/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};
