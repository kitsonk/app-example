/// <reference path="../node_modules/dojo-actions/typings/dojo-actions/dojo-actions.d.ts" />
/// <reference path="../node_modules/dojo-core/typings/dojo-core/dojo-core.d.ts" />
/// <reference path="../node_modules/dojo-core/typings/symbol-shim/symbol-shim.d.ts" />
/// <reference path="../node_modules/dojo-typings/dijit/1.11/modules.d.ts" />

declare module 'rxjs/Rx' {
	export * from '@reactivex/RxJS';
}

declare module 'rxjs/Observable' {
	import * as Observable from '@reactivex/RxJS/dist/cjs/Observable';
	export = Observable;
}

declare module 'rxjs/Observer' {
	import * as Observer from '@reactivex/RxJS/dist/cjs/Observer';
	export = Observer;
}

declare module 'immutable/immutable' {
	export * from 'immutable';
}

declare module 'maquette/maquette' {
	export * from 'maquette';
}
