// build-sw.mjs
import {generateSW} from 'workbox-build';

generateSW({
  swDest: './build/sw.js',
  globDirectory: './build',
  globPatterns: [
		'**/*.{json,ico,html,png,txt,css,js,svg}'
	],
	swDest: 'build/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
});