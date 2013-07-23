
# observer

Observes a DOM Element property for changes with diff support. Uses [xdiff](https://github.com/dominictarr/xdiff) for diff output.

## install

`$ component install jwerle/observer`

## usage

```js
var observer = require('dom-observer')
	,	ob1 = observer($('#my-el')[0], {prop: 'style'})

obj.on('change', function (diff, prev) {
	console.log(diff); 
	/**
		A diff for a property set would look like this =>
		[
			[
				"set", // action
				["root", "0" ], // location, property
				"display" // value
			],
			[
				"set", // action
				["root", "length"], // location, property
				1 // value
			],
			[
				"set", // action
				["root", "cssText"], // location, property
				"display: block;" // value
			],
			[
				"set", // action
				["root", "display"], // location, property
				"block" // value
			]
		]
	**/
});
```

## api

### observer(el, opts)

* `el` - A DOM Element
* `opts` - An object of options where `.prop` is the property is to observe for changes **required**
	* `prop` - The property to observe for changes
	* `autoStart` - Boolean whether to auto start by default. (default: `true`)
	* `interval` - A number in milliseconds for how often to check for changes (default: `50`)

***example***

```js
observer(document.getElementById('el'), {prop: 'dataset'}).on('change', function (diff) {
	// do something with diff
});
```

### #start(interval)

Starts observing at a given optional interval. This is started by default, pass `autoStart: false` to `opts` object in constructor. Emits the 'start' event when started.

### #stop()

Stops observing. Emits the 'stop' event when stopped.

#### events

##### 'change'

Emitted when a change occurs on an observed property with the a `diff` array and a `prev` object which was the current state of the observed property before the change

##### 'start'

Emitted when observing has started

##### 'stop'

Emitted when observing has been stopped

## license

MIT
