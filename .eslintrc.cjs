module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		// TypeScript specific rules
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

		// Svelte specific rules
		'svelte/valid-compile': 'error',
		'svelte/no-unused-svelte-ignore': 'error',
		'svelte/no-inner-declarations': 'error',
		'svelte/valid-each-key': 'error',

		// General rules
		'no-console': ['warn', { allow: ['warn', 'error'] }],
		'prefer-const': 'warn',
		'no-var': 'error'
	}
};
