<center>
    <h2>Starnime「 <i class="fa-solid fa-book"></i> Examples 」</h2>
    <p>Every example of additional features will be shown here, and you can also check out the documentation.</p>
</center>

<h4 id="starnime-example"> <i class="fa-solid fa-circle-chevron-right"></i> Starnime </h4>

```js
const { Starnime, OutputType } = require('starnime');

const starnime = new Starnime();

async function example() {
    const one_generated = await starnime.bite();
    const two_generated = await starnime.smile({ totalAmount: 2 });
    const custom_generated = await starnime.neko({ outputType: OutputType.GIFONLY, totalAmount: 2 });

    console.log(one_generated);
    console.log(two_generated);
    console.log(custom_generated);
};

example();
```

<h4 id="discord-webhook-example"> <i class="fa-solid fa-circle-chevron-right"></i> Discord Webhook </h4>

```js
const { DiscordWebhook, DiscordEmbed } = require('starnime');

const webhook = new DiscordWebhook(
    { webhookURL: 'url', username: '', avatarURL: '', retryAtLimit: true, skipAnyError: false}
);
const embed = new DiscordEmbed()
.setAuthor('name', 'url', 'icon_url')
.setTitle('title')
.setDescription('description')
.setFooter('text', 'icon_url')
.setURL('title_url')
.setImage('img_url')
.setColor([r, g, b]) // or .setColor('#...') for hex
.addFields('name', 'value', 'inline: true/false')
.setTimestamp();

async function example() {
    webhook.addEmbed(embed);
    await webhook.execute();
};

example();
```

<h4 id="r34-example"> <i class="fa-solid fa-circle-chevron-right"></i> R34 </h4>

```js
const { R34 } = require('starnime');

const r34 = new R34();

async function example() {
    const search = await r34.search(1, ['vtuber']); // Limit: 1, Tags: ['vtuber']
    console.log(search.file_url) // Typed by PostR34 class

    const random_post = await r34.get_random_post();
    console.log(random_post.id) // Typed by PostR34 class
};

example();
```
