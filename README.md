# Phoenix Typed Hook

Write your Phoenix LiveView client hooks using typed classes, with or without TypeScript.

![Demo of code editor autocomplete using phoenix_typed_hook](https://github.com/guisehn/phoenix_typed_hook/raw/main/misc/demo.gif)

## Reasoning

Custom LiveView [client hooks](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook) are defined as plain objects implementing callbacks such as `mounted`, `updated`, etc.

Since they're plain objects, there is no typing involved, so code editors can't provide code completion for attributes available, and also can't do compile-time checks (this last one, when TypeScript is used).

This package allows those features, by introducing a typed base hook class you can extend from, and a function to convert this class to a format that Phoenix LiveView understands.

## Installation

In your project directory, run `cd assets` and `npm install phoenix_typed_hook --save`

For extra type definitions such as for `LiveSocket`, make sure you also have `@types/phoenix_live_view` installed.

## How to use

Define your hook as a class that extends `Hook`, and convert it using `makeHook`:

```js
import { Hook, makeHook } from "phoenix_typed_hook";

class MyHook extends Hook {
  mounted() {
    this.el.style.color = "red";
    this.handleEvent("foo", (payload) => {});
  }
}

export default makeHook(MyHook);
```

Then, pass the hook as usual to the `LiveSocket` constructor options.

```js
import { MyHook } from "./hooks/MyHook";

const hooks = { MyHook };

const liveSocket = new LiveSocket("/live", Socket, { hooks, ... });
```
