(<DojoLoader.RootRequire> require).config({
	baseUrl: '../..',
	packages: [
		{ name: 'src', location: '_build/src' },
		{ name: 'dojo-actions', location: 'node_modules/dojo-actions/dist/umd' },
		{ name: 'dojo-compose', location: 'node_modules/dojo-compose/dist/umd' },
		{ name: 'dojo-core', location: 'node_modules/dojo-core/dist/umd' },
		{ name: 'dojo-widgets', location: 'node_modules/dojo-widgets/dist/umd' },
		{ name: 'immutable', location: 'node_modules/immutable/dist' },
		{ name: 'maquette', location: 'node_modules/maquette/dist' },
		{ name: 'rxjs', location: 'node_modules/@reactivex/rxjs/dist/amd' },
		{ name: 'dojo1', location: '_build/dojo1' },
		{ name: 'dojo', location: '_build/dojo1/dojo' },
		{ name: 'dijit', location: '_build/dojo1/dijit' }
	],
	map: {
		'*': {
			'maquette/maquette': 'maquette/maquette.min',
			'immutable/immutable': 'immutable/immutable.min'
		}
	}
});

/* Requiring in the main module */
require([ 'dojo1/app-example', 'src/app' ], function () {});
