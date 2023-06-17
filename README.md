<h2 align="center">
    Starnime
</h2>

<h4 align="center">
    Advanced tool that delivers random anime images with extra features.
</h4>

<p align="center">
    <a href="https://starnime.vercel.app/"><img src="https://img.shields.io/website?down_color=critical&down_message=offline&style=flat-square&up_color=blue&up_message=online&url=https%3A%2F%2Fstarnime.vercel.app%2F"><a>
    <a href="https://github.com/Stawa/Starnime/blob/main/LICENSE"><img src="https://img.shields.io/pypi/l/anvolt.py?color=informational&style=flat-square"></a>
    <a href="https://github.com/Stawa/Starnime"><img src="https://img.shields.io/github/package-json/v/Stawa/Starnime?style=flat-square"></a>
</p>

<h4> <span class="emoji">✨</span> Features </h4>

<ul>
    <li><h5>Anime Images: This include random gifs or pictures of anime characters that can be also use for roleplaying</h5></li>
    <li><h5>Easy-to-Use: Can be utilized either manually or through pre-built functions for effortless API fetching.</h5></li>
    <li><h5>Error Handling: Equipped with a versatile error handling class that efficiently manages any encountered errors and can be easily extracted for further analysis.</h5></li>
</ul>

<h4> <span class="emoji">📦</span> Installation </h4>

```bash
$ npm install starnime@latest
```

<h4> <span class="emoji"> 🚀 </span> Quickstart </h4>

This is the pre-built function, so you don't have to import many classes. Also, the output is already being typed using the [`ApiResponse`](https://github.com/Stawa/Starnime/blob/main/lib/index.js#L33) class.

```js
const { Starnime } = require('starnime');

const starnime = new Starnime({skipMissingError: false});

async funtion example() {
    console.log(await starnime.neko());
};

example();
```

<p> You can skip this one if you don't understand or don't want to use it manually to fetch our API. </p>

```js
const { Starnime, Version, Category, Icons } = require('starnime');

const starnime = new Starnime({skipMissingError: true}); // Return undefined instead of error if there's an error.

async funtion example() {
    console.log(await starnime.image(Version.V1, Category.ICONS, Icons.PLUS));
};

example();
```

<h4> <span class="emoji"> ⚠️ </span> Error Handler </h4>

<p> Starnime already has an error class handler called <a href="https://github.com/Stawa/Starnime/blob/main/lib/index.js#L13"><b>StarError</b></a> that can be handled easily and can also extract information such as the error name, error message, and error code. </p>

```js
const { Starnime } = require('starnime');

const starnime = new Starnime({skipMissingError: false}); // Return an error instead of undefined if there's an error.

async funtion example() {
    try {
        console.log(await starnime.image('invalid_version', 'invalid_category', 'invalid_endpoint'));
    } catch(err) {
        console.log(err.name, err.code, err.message)
    }
};

example();
```

<h4> <span class="emoji"> ❓ </span> Help </h4>

If you got unexpected error you can requests an issue on our Github Repository also if something is missing you can use the [`image`](https://github.com/Stawa/Starnime/blob/main/lib/index.js#L114) function and then requests a pull requests if you want.

<h4> <span class="emoji">🔗</span> Links </h4>

- **[Github Repository](https://github.com/Stawa/Starnime)**
- **[Application Programming Interface](https://starnime.vercel.app/)**
