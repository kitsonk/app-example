# dojo-actions

[![Build Status](https://travis-ci.org/dojo/actions.svg?branch=master)](https://travis-ci.org/dojo/actions)
[![codecov.io](http://codecov.io/github/dojo/actions/coverage.svg?branch=master)](http://codecov.io/github/dojo/actions?branch=master)

A command like library for Dojo 2 Applications.

**NOTE** At this stage, this is a functional prototype for a proposal that is under discussion.  This is not yet intended for production use.  Consider it *pre-alpha* and is intended to allow people to assess the API. **Use at your own risk and the final API may or may not look anything like this**

## Features

Actions embody the concept of *doing* something that can be express behaviour without having to re-implement the behaviour in various locations of an application.  In the concept of a Dojo 2 application, Widgets call Actions which mutate state in Stores which change the State of Widgets.

### Creation

To create a new action, simply use the Action factory:

```typescript
import createAction from 'dojo-actions/createAction';

const action = createAction({
    do() {
        /* do something */
    }
});

action
    .do()
    .then((result) => {
        /* do something with the result */
    });
```

You *must* specify a `do()` method when using the Action factory.  The Action will wrap the `.do()` method, ensuring that no matter what the return, it will return a `dojo-core/async/Task` which is a `Promise` with the ability to cancel.

### State

Each Action has a `.state` object which contains any sort of mutatable state.  This is provided by the `dojo-compose/mixin/createStateful` mixin.  When the `.do()` method is invoked, it is scoped so that `this` is the calling action, and therefore `this.state` can be used to read from the state.

### Future

It is envisioned that some foundational "helper" actions will be added to this package to make it easy.

## How do I use this package?

The easiest way to use this package is to install it via `npm`:

```
$ npm install dojo-actions
```

In addition, you can clone this repository and use the Grunt build scripts to manage the package.

Using under TypeScript or ES6 modules, you would generally want to just `import` the `dojo-actions/createAction` module:

```typescript
import createAction from 'dojo-compose/createAction';

const action = createAction({
    do() { /* do something */ }
});

action.do();
```

## How do I contribute?

We appreciate your interest!  Please see the [Dojo 2 Meta Repository](https://github.com/dojo/meta#readme) for the
Contributing Guidelines and Style Guide.

## Testing

Test cases MUST be written using [Intern](https://theintern.github.io) using the Object test interface and Assert assertion interface.

90% branch coverage MUST be provided for all code submitted to this repository, as reported by istanbul’s combined coverage results for all supported platforms.

To test locally in node run:

`grunt test`

To test against browsers with a local selenium server run:

`grunt test:local`

To test against BrowserStack or Sauce Labs run:

`grunt test:browserstack`

or

`grunt test:saucelabs`

## Licensing information

TODO: If third-party code was used to write this library, make a list of project names and licenses here

* [Third-party lib one](https//github.com/foo/bar) ([New BSD](http://opensource.org/licenses/BSD-3-Clause))

© 2004–2015 Dojo Foundation & contributors. [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
