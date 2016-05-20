/**
 * An example basic application using stores/widgets/actions
 * @module dojo-app-example/app
 */
import Promise from 'dojo-core/Promise';
import createMemoryStore from 'dojo-widgets/util/createMemoryStore';
import createButton from 'dojo-widgets/createButton';
import createDijit from 'dojo-widgets/createDijit';
import createLayoutContainer from 'dojo-widgets/createLayoutContainer';
import createList from 'dojo-widgets/createList';
import createPanel from 'dojo-widgets/createPanel';
import createResizePanel from 'dojo-widgets/createResizePanel';
import createTabbedPanel from 'dojo-widgets/createTabbedPanel';
import createTextInput from 'dojo-widgets/createTextInput';
import createWidget from 'dojo-widgets/createWidget';
import projector from 'dojo-widgets/projector';
import { Child } from 'dojo-widgets/mixins/createParentMixin';
import { ValueChangeEvent } from 'dojo-widgets/mixins/createFormFieldMixin';
import createAction, { Action, ActionState } from 'dojo-actions/createAction';

import * as DateTextBox from 'dijit/form/DateTextBox';

/**
 * List items to populate list widget
 */
const listItems = [
	{ id: 1, label: 'foo' },
	{ id: 2, label: 'bar' },
	{ id: 3, label: 'baz' },
	{ id: 4, label: 'qux' },
	{ id: 5, label: 'norf' }
];

interface WidgetStateRecord {
	[prop: string]: any;
	id: string;
	classes?: string[];
	label?: string;
	value?: any;
	closeable?: boolean;
	name?: string;
	items?: any[];
}

/**
 * A memory store which handles the widget states
 */
const widgetStore = createMemoryStore<WidgetStateRecord>({
	data: [
		{ id: 'header', label: 'Dojo 2 Example Application'},
		{ id: 'tabbed-panel', classes: [ 'pad-1em' ] },
		{ id: 'tab-1', label: 'Tab 1', closeable: false },
		{ id: 'layout-container', classes: [ 'horizontal' ] },
		{ id: 'panel-fixed', classes: [ 'fixed' ] },
		{ id: 'panel-resize', classes: [ 'vertical', 'border-right', 'pad-1em' ], width: '200px' },
		{ id: 'remove', label: 'Remove', name: 'remove' },
		{ id: 'first-name', name: 'first-name', value: 'qat' },
		{ id: 'add', label: 'Add', name: 'add' },
		{ id: 'list', classes: [ 'margin-1em' ], items: listItems },
		{ id: 'tab-2', classes: [ 'pad-1em' ], label: 'Tab 2', closeable: true },
		{ id: 'tab-2-content', label: 'You can close me!' },
		{ id: 'tab-3', classes: [ 'pad-1em' ], label: 'Tab 3', closeable: true },
		{ id: 'tab-3-content', label: 'You can try to close me, but...'},
		{ id: 'can-close', label: 'Can Close' },
		{ id: 'tab-4', classes: [ 'pad-1em' ], label: 'Tab 4' },
		{ id: 'text-usd', name: 'text-usd', value: 1 },
		{ id: 'text-gbp', name: 'text-gbp' },
		{ id: 'text-eur', name: 'text-eur' }
	]
});

const actionStore = createMemoryStore({
	data: [
		{ id: 'close-tab', canClose: false, enabled: true },
		{ id: 'can-close-tab', enabled: true },
		{ id: 'update-amount', amount: 0, usd2gbp: 0.683854, usd2eur: 0.89075, gbp2eur: 1.29691 }
	]
});

const widgets: Child[] = [];

/**
 * A header widget
 */
const header = createWidget({
	id: 'header',
	stateFrom: widgetStore,
	tagName: 'h1'
});

widgets.push(header);

const tabbedPanel = createTabbedPanel({
	id: 'tabbed-panel',
	stateFrom: widgetStore
});

widgets.push(tabbedPanel);

const tab1 = createPanel({
	id: 'tab-1',
	stateFrom: widgetStore
});

tabbedPanel.append(tab1);

const layoutContainer = createLayoutContainer({
	id: 'layout-container',
	stateFrom: widgetStore
});

tab1.append(layoutContainer);

projector.append(widgets);

const panelFixed = createPanel({
	id: 'panel-fixed',
	stateFrom: widgetStore
});

layoutContainer.append(panelFixed);

const panelResize = createResizePanel({
	id: 'panel-resize',
	stateFrom: widgetStore
});

panelFixed.append(panelResize);

/**
 * Button will remove item from list
 */
const removeButton = createButton({
	id: 'remove',
	stateFrom: widgetStore
});

panelResize.append(removeButton);

/**
 * A widget for collecting the value of the list
 */
const firstName = createTextInput({
	id: 'first-name',
	stateFrom: widgetStore
});

panelResize.append(firstName);

/**
 * A widget that will add the value to the list
 */
const addButton = createButton({
	id: 'add',
	stateFrom: widgetStore
});

panelResize.append(addButton);

/**
 * The list widget
 */
const list = createList({
	id: 'list',
	stateFrom: widgetStore
});

panelFixed.append(list);

const tab2 = createPanel({
	id: 'tab-2',
	stateFrom: widgetStore
});

tabbedPanel.append(tab2);

tab2.append(createWidget({
	id: 'tab-2-content',
	stateFrom: widgetStore,
	tagName: 'div'
}));

/* Adding a Dojo 1 Dijit to a Dojo 2 Panel */
tab2.append(createDijit({
	Ctor: DateTextBox,
	params: {
		id: 'dateBox',
		name: 'dateBox',
		value: '16/06/1973'
	},
	tagName: 'input'
}));

tab2.append(createDijit({
	Ctor: 'dijit/form/Button', /* using the MID */
	params: {
		label: 'Rocking it old school!',
		onClick() {
			alert('Yes, old school!');
		}
	}
}));

const tab3 = createPanel({
	id: 'tab-3',
	stateFrom: widgetStore
});

tabbedPanel.append(tab3);

tab3.append(createWidget({
	id: 'tab-3-content',
	stateFrom: widgetStore,
	tagName: 'div'
}));

const canCloseButton = createButton({
	id: 'can-close',
	stateFrom: widgetStore
});

tab3.append(canCloseButton);

/**
 * An action that will pop an item from the list item and patch the items into the widgetstore
 */
const actionPopList = createAction({
	do() {
		listItems.pop();
		return widgetStore.patch({ id: 'list', items: listItems });
	}
});

/**
 * Connect the buttons onclick to the action
 */
removeButton.on('click', actionPopList);

/**
 * An action that will take the value from the text input, push it onto the list and patch
 * the widget store
 */
const actionPushList = createAction({
	do() {
		const label = firstName.value;
		listItems.push({ id: listItems.length, label: label });
		return widgetStore.patch({ id: 'list', items: listItems }) /* patch the list */
			.patch({ id: 'first-name', value: label }); /* patch the value of fisrt-name */
	}
});

/**
 * Connect the buttons onclick to the action
 */
addButton.on('click', actionPushList);

const actionCloseTab3 = createAction({
	do(options) {
		if (options && options.event && !this.state.canClose) {
			(<any> options.event).preventDefault();
			return widgetStore.patch({ label: 'I said you can\'t close me' }, { id: 'tab-3-content' });
		}
	}
});
actionCloseTab3.observeState('close-tab', actionStore);
tab3.on('close', actionCloseTab3);

const actionCanCloseTab3 = createAction({
	do() {
		return actionStore.patch({ canClose: true }, { id: 'close-tab' })
			.then(() => widgetStore.patch({ label: 'Now you can close the tab!!!' }, { id: 'tab-3-content'}));
	}
});
canCloseButton.on('click', actionCanCloseTab3);

/** TAB 4 */

const tab4 = createPanel({
	id: 'tab-4',
	stateFrom: widgetStore
});

tabbedPanel.append(tab4);

interface UpdateAmountState extends ActionState {
	amount: number;
	usd2gbp: number;
	usd2eur: number;
	gbp2eur: number;
}

const textUSD = createTextInput({
	stateFrom: widgetStore,
	id: 'text-usd'
});

const textGBP = createTextInput({
	stateFrom: widgetStore,
	id: 'text-gbp'
});

const textEUR = createTextInput({
	stateFrom: widgetStore,
	id: 'text-eur'
});

const actionUpdateAmount = createAction({
	stateFrom: actionStore,
	id: 'update-amount',
	do({ event }: { event: ValueChangeEvent<number> }) {
		const action: Action<any, any, UpdateAmountState> = this;
		const { value, target } = event;
		if (value === String(Number(value))) {
			event.preventDefault();
			let usd: number | string;
			let gbp: number | string;
			let eur: number | string;
			if (target === <any> textUSD) {
				usd = value;
				gbp = Math.round(Number(value) * action.state.usd2gbp * 1000) / 1000;
				eur = Math.round(Number(value) * action.state.usd2eur * 1000) / 1000;
			}
			else if (target === <any> textGBP) {
				usd = Math.round(Number(value) / action.state.usd2gbp * 1000) / 1000;
				gbp = value;
				eur = Math.round(Number(value) * action.state.gbp2eur * 1000) / 1000;
			}
			else {
				usd = Math.round(Number(value) / action.state.usd2eur * 1000) / 1000;
				gbp = Math.round(Number(value) / action.state.gbp2eur * 1000) / 1000;
				eur = value;
			}
			console.log(usd, gbp, eur);
			return Promise.all([
				widgetStore.patch({ value: usd }, { id: 'text-usd' }),
				widgetStore.patch({ value: gbp }, { id: 'text-gbp' }),
				widgetStore.patch({ value: eur }, { id: 'text-eur' })
			]);
		}
	}
});

textUSD.on('valuechange', actionUpdateAmount);
textGBP.on('valuechange', actionUpdateAmount);
textEUR.on('valuechange', actionUpdateAmount);

tab4.append(createWidget({
	tagName: 'app-label',
	state: {
		label: 'USD'
	}
}));
tab4.append(textUSD);
tab4.append(createWidget({
	tagName: 'app-label',
	state: {
		label: 'GBP'
	}
}));
tab4.append(textGBP);
tab4.append(createWidget({
	tagName: 'app-label',
	state: {
		label: 'EUR'
	}
}));
tab4.append(textEUR);

/**
 * Attach the VDOM
 */
projector.attach();
