
/**
 * Module dependencies
 */

var EventEmitter = require('events').EventEmitter
	,	x = require('xdiff')
	, clone = require('clone')


/**
 * Expose `Observer`
 */

module.exports = Observer;


/**
 * `Observer` constructor
 *
 * @api public
 * @param {Node} el
 * @param {Object} opts - optional
 */

function Observer (el, opts) {
	if (!(this instanceof Observer)) return new Observer(el, opts);
	else if (!(el instanceof Element)) throw TypeError("expecting instance of `Node`");
	else if ('object' !== typeof opts) throw new TypeError("expecting an object for the second argument got `"+ typeof opts +"`");

	var self = this
		,	iv = null
		, prop = opts.prop
		, current = null

	if (!prop) throw new Error("expecting `.prop` on `opts` object");

	try {
		current = clone(el[prop]);
	} catch (e) {
		throw new Error("invalid property or circular reference found for `."+ prop +"`");
	}

	this.el = el;
	this.observed = el[prop];
	this.interval = opts.interval || 50;

	this.start = function () {
		iv = setInterval(function () {
			var diff, tmp = {}, tmp2 = {}
			if ('object' !== typeof current) {
				if (self.el[prop] !== self.observed) {
					tmp[prop] = self.el[prop];
					tmp2[prop] = self.observed
					self.emit('change', x.diff(tmp, tmp2), self.observed);
					self.observed = self.el[prop];
				}
			}
			else if (diff = x.diff(current, clone(self.observed))) {
				self.emit('change', diff, clone(self.observed));
				current = clone(self.observed);
			}
		}, self.interval);

		self.emit('start');
		return this;
	}


	this.stop = function () {
		clearInterval(iv);
		self.emit('stop');
		return this;
	};

	if (false !== opts.autoStart)
		this.start();
}

Observer.prototype.__proto__ = EventEmitter.prototype;