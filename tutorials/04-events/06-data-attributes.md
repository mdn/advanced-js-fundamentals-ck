## Storing Information in Data Attributes

As we saw previously, when we respond to an event, `this` is set to the element that the event is occuring on. This is useful for making changes to the element (or nearby elements). But sometimes, we need some extra information in addition to the element.

HTML5 allows us to add data to an attribute using—wait for it—_data attributes_. Data attributes look suspiciously like regular attributres, with one thing in common: they are all prefixed with `data-`. Let's take a look at an example:

```html
<section class="guitar" data-strings="6" data-material="wood"></section>
<section class="space guitar" data-strings="19" data-material="plexiglass"></section>
```

In the example above, `class` is a regular attribute from the HTML specification. `data-strings` and `data-material` are data attributes that contain arbitrary data about each guitar.

You can access the data attributes form each guitar using the `dataset` property.

```js
var guitars = document.querySelectorAll('.guitar');

for (var i = 0; i < guitars.length; i++) {
  var guitar = guitars[i];
  console.log(guitar.dataset);
}
```

This will log the following data:

```js
[object DOMStringMap] {
  material: "wood",
  strings: "6"
}
[object DOMStringMap] {
  material: "plexiglass",
  strings: "19"
}
```

We can access a specific data attribute by appending that property to the `dataset` property.

```js
var guitars = document.querySelectorAll('.guitar');

for (var i = 0; i < guitars.length; i++) {
  var guitar = guitars[i];
  console.log(guitar.dataset.material);
}
```

This will log the following:

```js
"wood"
"plexiglass"
```

## Your Turn

In `demos/events/06-musical-data`, there is a small piano keyboard. Each key on the keyboard has a `data-piano-key` attribute, for example:

```html
<button class="piano-key white-key" data-piano-key="C3"></button>
<button class="piano-key black-key" data-piano-key="C#3"></button>
<button class="piano-key white-key" data-piano-key="D3"></button>
```

There is also a `playNote` function that is globally available. `playNote` takes a note like "A4" and plays a tone at that frequency for half a second.

```js
playNote('A4'); // plays a tone at 440hz for 500 milliseconds
```

Can you write an event listener for each key that looks at the `data-piano-key` of the element that was clicked and passes that note to `playNote`?

### Extensions

Can you trigger a "C3" note whenever the "A" key is pressed on you're computer's keyboard?

Once you have that working, can you map a set of keys on your computer's keyboard to play corresponding notes in the browser?

<table>
  <thead>
    <tr>
      <th>Keyboard Key</th>
      <th>Musical Note</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A</td>
      <td>C3</td>
    </tr>
    <tr>
      <td>W</td>
      <td>C#3</td>
    </tr>
    <tr>
      <td>S</td>
      <td>D3</td>
    </tr>
    <tr>
      <td>E</td>
      <td>C#3</td>
    </tr>
    <tr>
      <td>D</td>
      <td>E3</td>
    </tr>
    <tr>
      <td>F</td>
      <td>F3</td>
    </tr>
    <tr>
      <td>T</td>
      <td>F#3</td>
    </tr>
    <tr>
      <td>G</td>
      <td>G3</td>
    </tr>
    <tr>
      <td>Y</td>
      <td>G#3</td>
    </tr>
    <tr>
      <td>H</td>
      <td>A3</td>
    </tr>
    <tr>
      <td>U</td>
      <td>A#3</td>
    </tr>
    <tr>
      <td>J</td>
      <td>B3</td>
    </tr>
  </tbody>
</table>
