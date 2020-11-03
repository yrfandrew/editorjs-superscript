![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Superscript Tool

Superscript Tool for marking text-fragments for the [Editor.js](https://ifmo.su/editor).

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev editorjs-superscript
```

Include module at your application

```javascript
const Superscript = require('editorjs-superscript');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...
  
  tools: {
    ...
    superscript: {
      class: Superscript
    },
  },
  
  ...
});
```

## Config Params

This Tool has no config params

## Output data

Marked text will be wrapped with a `sup` tag.

```json
{
    "type" : "text",
    "data" : {
        "text" : "The Pacific Ocean encompasses approximately one-third of the Earth's surface, having an area of 165,200,000 km<sup>2</sup> (63,800,000 sq mi)."
    }
}
```
