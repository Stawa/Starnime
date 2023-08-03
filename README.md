<h2 align="center">
    Starnime
</h2>

<h4 align="center">
    Advanced tool that delivers random anime images with extra features.
</h4>

<p align="center">
    <a href="https://www.codefactor.io/repository/github/stawa/starnime/overview/main"><img src="https://www.codefactor.io/repository/github/stawa/starnime/badge/main" alt="CodeFactor" /></a>
    <a href="https://starnime.vercel.app/"><img src="https://img.shields.io/website?down_color=critical&down_message=offline&style=flat&up_color=blue&up_message=online&url=https%3A%2F%2Fstarnime.vercel.app/api%2F"><a>
    <a href="https://www.npmjs.com/package/starnime"><img src="https://img.shields.io/npm/dm/starnime"></a>
    <a href="https://stawa.github.io/Starnime/#/"><img src="https://img.shields.io/website?up_message=available&up_color=green&down_message=unavailable&down_color=red&url=https%3A%2F%2Fstawa.github.io%2FStarnime%2F%23%2F&style=flat&label=documentation"></a>
</p>

<h4> <span class="emoji">✨</span> Features </h4>

- <b>Anime Images:</b> Get random gifs or pictures of anime characters suitable for roleplaying.
- <b>Easy-to-Use:</b> Utilize the tool either manually or through pre-built functions for effortless API fetching.
- <b>Trivia:</b> It is recommended to use this for discord bots; it is easy to maintain and can be stored as JSON.
- <b>Rule34:</b> Fetch data from the Rule34 API with a pre-built function that is already typed and easy to use.
- <b>Iwara:</b> Fetch Iwara.tv videos or images to download or get the information.
- <b>Danbooru:</b> Similar to Rule34, but with additional features.
- <b>Discord:</b> Interact with the Discord API with ease, including integration with Discord webhooks.
- <b>Error Handling:</b> Equipped with a versatile error handling class that efficiently manages any encountered errors and can be easily extracted for further analysis.

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

async function example() {
    console.log(await starnime.neko({ totalAmount: 5 }));
};

example();
```

<p> You can skip this one if you don't understand or don't want to use it manually to fetch our API. </p>

```js
const { Starnime, Version, IconsRoutes, OutputType } = require('starnime');

const starnime = new Starnime({ skipMissingError: false }); // Return undefined instead of error if there's an error.

async function example() {
    console.log(await starnime.image(Version.V1, IconsRoutes.PLUS, OutputType.RANDOM, 2));
};

example();
```

<h4> <span class="emoji"> ⚠️ </span> Error Handler </h4>

Starnime already has an error class handler called `StarError` error class that can be handled easily and can also extract information such as the error name, error message, and error code.

```js
const { Starnime } = require('starnime');

const starnime = new Starnime({ skipMissingError: false }); // Return an error instead of undefined if there's an error.

async function example() {
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
