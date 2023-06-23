<center>
    <a href="https://nodei.co/npm/starnime/"><img src="https://nodei.co/npm/starnime.png"></a>
</center>

#### :fas fa-download fa-fw: Installation

You can choose which version you want to use for your project: `stable` or `latest`.

```terminal
$|success|npm install starnime@latest
$|warning|npm install https://github.com/Stawa/Starnime
```

#### :fas fa-code fa-fw: Simple Start

Each pre-built function in [`Starnime`](/Starnime/#/starnime?id=starnime-class) is already typed using the [`ApiResponse`](/Starnime/#/starnime?id=apiresponse-class) class, making it easy to fetch responses from our API.

```js
const { Starnime } = require('starnime');

const starnime = new Starnime({ skipMissingError: false });

async funtion example() {
    console.log(await starnime.neko({ totalAmount: 5 }));
};

example();
```

#### :fas fa-laptop-code fa-fw: Manual Fetching

The [`Starnime`](/Starnime/#/starnime?id=starnime-class) class also has a function that can be used for fetching our API manually. If you have no idea how to use it, there are some enums available to use. If you are still confused, you can go to our documentation API.

```js
const { Starnime, Version, IconsRoutes, OutputType } = require('starnime');

const starnime = new Starnime({ skipMissingError: false }); // Return undefined instead of error if there's an error.

async funtion example() {
    console.log(await starnime.image(Version.V1, IconsRoutes.PLUS, OutputType.RANDOM, 2));
};

example();
```

#### :fa fa-triangle-exclamation fa-fw: Error Handler

[`Starnime`](/Starnime/#/starnime?id=starnime-class) already has a class that handles any errors (excluding `dependencies`), so you can use `try` and `catch` the error easily. Every error that shows up is already being typed by the [`StarError`](/Starnime/#/starnime?id=starerror-class) class, so you can console log the error name, error message, and error code.

```js
const { Starnime } = require('starnime');

const starnime = new Starnime({ skipMissingError: false }); // Return an error instead of undefined if there's an error.

async funtion example() {
    try {
        console.log(await starnime.image('invalid_version', 'invalid_endpoint', 'invalid_type', 'invalid_total'));
    } catch(err) {
        console.log(err.name, err.code, err.message)
    }
};

example();
```
