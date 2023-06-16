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
    <li><h5>Coming Soon</h5></li>
</ul>

<h4> <span class="emoji">📦</span> Installation </h4>

```bash
npm install starnime
```

<h4> <span class="emoji"> 🚀 </span> Quickstart </h4>

<p> You can skip this one if you don't understand or don't want to use it manually to fetch our API. </p>

```js
const { Starnime, Version, Category, Icons } = require('starnime');

const starnime = new Starnime({skipMissingError: true});

async funtion example() {
    console.log(await starnime.image(Version.V1, Category.ICONS));
};

example();
```

<h4> <span class="emoji">🔗</span> Links </h4>

- **[Github Repository](https://github.com/Stawa/Starnime)**
- **[Application Programming Interface](https://starnime.vercel.app/)**
