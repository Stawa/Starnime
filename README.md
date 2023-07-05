<h2 align="center">
    Starnime
</h2>

<h4 align="center">
    Advanced tool that delivers random anime images with extra features.
</h4>

<p align="center">
    <a href="https://codeclimate.com/github/Stawa/Starnime/maintainability"><img src="https://api.codeclimate.com/v1/badges/31c5c495e872602c3ee5/maintainability" /></a>
    <a href="https://starnime.vercel.app/"><img src="https://img.shields.io/website?down_color=critical&down_message=offline&style=flat&up_color=blue&up_message=online&url=https%3A%2F%2Fstarnime.vercel.app/api%2F"><a>
    <a href="https://www.npmjs.com/package/starnime"><img src="https://img.shields.io/npm/dm/starnime"></a>
    <a href="https://github.com/Stawa/Starnime"><img src="https://img.shields.io/website?up_message=available&up_color=green&down_message=unavailable&down_color=red&url=https%3A%2F%2Fstawa.github.io%2FStarnime%2F%23%2F&style=flat&label=documentation"></a>
</p>

<h4> <span class="emoji">✨</span> Features </h4>

- <b>Anime Images: This include random gifs or pictures of anime characters that can be also use for roleplaying.</b>
- <b>Easy-to-Use: Can be utilized either manually or through pre-built functions for effortless API fetching.</b>
- <b>Trivia: This can be used for discord bot and easy to maintain also can be stored as JSON.</b>
- <b>Rule34: This feature can fetch the Rule34 API with a pre-built function that is already typed and easy to use.</b>
- <b>Discord: Use it to interact with the Discord API with ease, including the integration of Discord webhooks.</b>
- <b>Error Handling: Equipped with a versatile error handling class that efficiently manages any encountered errors and can be easily extracted for further analysis.</b>

<h4> <span class="emoji">📦</span> Installation </h4>

<p> There are two choices for installing: stable and the latest version. Here's how, </p>

```bash
$ npm install starnime@latest
$ npm install https://github.com/Stawa/Starnime
```

<h4> <span class="emoji"> 🚀 </span> Quickstart </h4>

This is the pre-built function, so you don't have to import many classes. Also, the output is already being typed using the `ApiResponse` class. If you want to configure each parameter individually, you can use the parameters that are typed using the `ParametersOptions` class.

```js
const { Starnime } = require('starnime');

const starnime = new Starnime({ skipMissingError: false });

async funtion example() {
    console.log(await starnime.neko({ totalAmount: 5 }));
};

example();
```

<p> You can skip this one if you don't understand or don't want to use it manually to fetch our API. </p>

```js
const { Starnime, Version, IconsRoutes, OutputType } = require('starnime');

const starnime = new Starnime({ skipMissingError: false }); // Return undefined instead of error if there's an error.

async funtion example() {
    console.log(await starnime.image(Version.V1, IconsRoutes.PLUS, OutputType.RANDOM, 2));
};

example();
```

<h4> <span class="emoji"> ⚠️ </span> Error Handler </h4>

Starnime already has an error class handler called `StarError` error class that can be handled easily and can also extract information such as the error name, error message, and error code.

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

<h4> <span class="emoji"> ❓ </span> Help </h4>

If you got an unexpected error, you can request an issue on our Github repository. If something is missing, you can use the `Starnime.image` function and then request a pull request if you want. Also, if you don't know how to use the extra features, you can check out our documentation!

<h4> <span class="emoji">🔗</span> Links </h4>

- **[Github Repository](https://github.com/Stawa/Starnime)**
- **[Application Programming Interface](https://starnime.vercel.app/)**
- **[Documentation](https://stawa.github.io/Starnime/#/)**
