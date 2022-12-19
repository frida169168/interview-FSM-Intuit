class Helpers {
	static getStateByName(options, context, stateStr) {
		let state = options.states[stateStr];
		return new State(
			context,
			state.nextState,
			state.callback,
			state.waitUntilNextState ?? 0
		);
	}
}

class Context {
	constructor(options) {
		this.currentState = Helpers.getStateByName(
			options,
			this,
			options.initialState
		);
		this.options = options;
	}

	transition() {
		if (this.currentState.nextState) {
			this.currentState = Helpers.getStateByName(
				this.options,
				this,
				this.currentState.nextState
			);
			this.currentState.handle();
		}
	}

	start() {
		this.currentState.handle();
	}
}

class State {
	constructor(context, nextState, callback, waitUntilNextState) {
		this.context = context;
		this.nextState = nextState;
		this.callback = callback;
		this.waitUntilNextState = waitUntilNextState;
	}

	handle() {
		const state = this;

		setTimeout(function () {
			state.context.transition();
		}, state.waitUntilNextState);

		this.callback();
	}
}

export default class Fsm extends Context {}
