# Phoenix Typed Hook

Write your Phoenix LiveView client hooks using typed classes, with or without TypeScript.

See autocomplete available in VS Code by using it:

![Demo of code editor autocomplete using phoenix_typed_hook](https://github.com/guisehn/phoenix_typed_hook/raw/v0.18.0/misc/demo.gif)

## Reasoning

Custom LiveView [client hooks](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook) are defined as plain objects implementing callbacks such as `mounted`, `updated`, etc.

Since they're plain objects, there is no typing involved, so code editors can't provide code completion for attributes available, and also can't do compile-time checks (this last one, when TypeScript is used).

This package allows those features, by introducing a typed base hook class you can extend from, and a function to convert this class to a format that Phoenix LiveView understands.

## How to use

Once installed, define your hook as a class that extends `Hook`, and convert it using `makeHook`:

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
import MyHook from "./hooks/my_hook";

const hooks = { MyHook };

const liveSocket = new LiveSocket("/live", Socket, { hooks, ... });
```

## Installation

Phoenix Typed Hook can be installed via NPM or Mix.

### Installing with NPM

In your project directory, go to the assets folder (`cd assets`) and run `npm install phoenix_typed_hook --save`

### Installing with Hex

Using Hex to install Phoenix Typed Hook requires more steps compared to NPM, but allows you to manage its version on `mix.exs`, closer to where the Phoenix LiveView version is also declared. This makes it easier to remember to upgrade them together.

Add `phoenix_typed_hook` to the list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:phoenix_typed_hook, "~> 0.18"}
  ]
end
```

And run `mix deps.get`.

After that, open `assets/package.json` of your project (create it if it doesn't exist), and add `phoenix_typed_hook` to the list of dependencies:

```js
{
  "dependencies": {
    "phoenix_typed_hook": "file:../deps/phoenix_typed_hook"
  }
}
```

And run `npm install` inside the `assets` folder.
