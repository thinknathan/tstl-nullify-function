# tstl-nullify-function

TypeScriptToLua plugin that adds a statement to change local functions to `nil` if you annotate them with `@nullify`. This is only useful if you are using [another plugin](https://github.com/Cheatoid/TSTL-extensions/tree/main) to inline the function, making the original function declaration redundant.

## Example

```ts
/**
 * @nullify
 */
function foo() {
	...
}
```

Becomes:

```lua
local function foo
	...
end
foo = nil
```

## Installation

Requires a modern version of TSTL. Tested on TSTL >= 1.22.0.

1. Install this plugin

```bash
yarn add git+https://git@github.com/thinknathan/tstl-nullify-function.git#^1.0.0 -D
# or
npm install git+https://git@github.com/thinknathan/tstl-nullify-function.git#^1.0.0 --save-dev
```

2. Add `tstl-nullify-function` to `tstl.luaPlugins` in `tsconfig.json`

```diff
{
	"tstl": {
		"luaPlugins": [
+			{ "name": "tstl-nullify-function" }
		],
	}
}
```

## License

CC0
