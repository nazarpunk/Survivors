!function () {
    'use strict';
    /* vars */
    var that = window._g;
    var $wrap = $('#game-human-wrap');

    var _remove = function (arr) {
	var what, a = arguments, L = a.length, ax;
	while (L > 1 && arr.length) {
	    what = a[--L];
	    while ((ax = arr.indexOf(what)) !== -1) {
		arr.splice(ax, 1);
	    }
	}
	return arr;
    };

    var _valid = function _valid(obj) {
	var args = Array.prototype.slice.call(arguments, 1);

	for (var i = 0; i < args.length; i++) {
	    if (!obj || !obj.hasOwnProperty(args[i])) {
		return false;
	    }
	    obj = obj[args[i]];
	}
	return true;
    };


    //var ary = ['three', 'seven', 'eleven'];
    //removeA(ary, 'seven');

    var humans = {};

    $.each(that.humanImages, function (k, v) {
	var h = v.split('_');

	/* name */
	if (typeof humans[h[0]] === 'undefined') {
	    humans[h[0]] = {};
	}

	/* pose */
	if (typeof humans[h[0]][h[1]] === 'undefined') {
	    humans[h[0]][h[1]] = {};
	}

	/* emotion */
	if (h[2] === 'emotion') {
	    if (typeof humans[h[0]][h[1]]['emotion'] === 'undefined') {
		humans[h[0]][h[1]]['emotion'] = {};
	    }
	    if (typeof humans[h[0]][h[1]]['emotion'][h[3]] === 'undefined') {
		humans[h[0]][h[1]]['emotion'][h[3]] = {};
	    }
	    humans[h[0]][h[1]]['emotion'][h[3]][h[4]] = true;
	} else {
	    /* body */
	    if (typeof humans[h[0]][h[1]]['body'] === 'undefined') {
		humans[h[0]][h[1]]['body'] = {};
	    }
	    if (typeof humans[h[0]][h[1]]['body'][h[2]] === 'undefined') {
		humans[h[0]][h[1]]['body'][h[2]] = {};
	    }
	    humans[h[0]][h[1]]['body'][h[2]][h[3]] = true;
	}

    });

    var _gets = function (obj, arr) {
	var o = false;
	$.each(obj, function (k, v) {
	    if ($.inArray(k, arr) >= 0) {
		o = k;
		return false;
	    }
	});
	return o;
    };

    var _get = function (arr) {
	var o = {
	    a: 'error',
	    n: false,
	    p: false,
	    b: false,
	    bt: false,
	    e: false,
	    et: false,
	    img: {
		b: false,
		e: false
	    },
	    pl: {
		h: false,
		v: false
	    }
	};

	/* hide */
	if ($.inArray('hide', arr) >= 0) {
	    o.a = 'hide';
	}

	/* human */
	o.n = _gets(humans, arr);
	if (o.n === false) {
	    return o;
	}

	/* pose */
	o.p = _gets(humans[o.n], arr);
	if (o.p === false) {
	    return o;
	}

	/* body */
	if (typeof humans[o.n][o.p]['body'] === 'undefined') {
	    return o;
	}
	o.b = _gets(humans[o.n][o.p]['body'], arr);
	if (o.b === false) {
	    return o;
	}

	/* body time */
	o.bt = _gets(humans[o.n][o.p]['body'][o.b], [that.game.sun()]);
	if (o.bt === false) {
	    return o;
	}

	/* emotion */
	if (typeof humans[o.n][o.p]['emotion'] === 'undefined') {
	    return o;
	}
	o.e = _gets(humans[o.n][o.p]['emotion'], arr);
	if (o.e === false) {
	    return o;
	}

	/* emotion time */
	o.et = _gets(humans[o.n][o.p]['emotion'][o.e], [that.game.sun()]);
	if (o.et === false) {
	    return o;
	}

	/* placement h */
	o.pl.h = _gets({left: true, center: true, right: true}, arr);
	if (o.pl.h === false) {
	    o.pl.h = 'center';
	}

	o.pl.v = _gets({top: true, bottom: true}, arr);
	if (o.pl.v === false) {
	    o.pl.v = 'bottom';
	}

	o.img.b = 'human$' + [o.n, o.p, o.b, o.bt].join('_');
	o.img.e = 'human$' + [o.n, o.p, 'emotion', o.e, o.et].join('_');

	o.a = 'show';
	return o;
    };

    var draw = {
	tl: null,
	tc: null,
	tr: null,
	bl: null,
	bc: null,
	br: null
    };

    /* module */
    var module = 'human';
    that.module(module, {
	flush: function () {
	    $.each(draw, function (k, v) {
		draw[k] = null;
	    });

	    var ctx = this.game.canvas.call(this, $wrap);
	    ctx.clearRect(0, 0, this.game.size().width, this.game.size().height);
	},

	redraw: function () {

	    var ctx = this.game.canvas.call(this, $wrap);
	    var wc = this.game.size().width;
	    var hc = this.game.size().height;
	    ctx.clearRect(0, 0, wc, hc);
	    var diff = 100;

	    var img = this.game.image;

	    /* draw */
	    $.each(draw, function (k, h) {
		if (h === null) {
		    return true;
		}

		var t = 0;
		var l = 0;
		var wi = img(h.img.b).width;
		var hi = img(h.img.b).height;

		if (h.pl.v === 'bottom') {
		    t += diff;
		}

		if (h.pl.h === 'center') {
		    l = (wc / 2) - (wi / 2);
		} else if (h.pl.h === 'right') {
		    l = wc - wi;
		}

		ctx.drawImage(img(h.img.b).img, l, t);
		ctx.drawImage(img(h.img.e).img, l, t);
	    });
	},

	dispatch: function (act) {
	    /* block : true */
	    this.game.block.call(this, false, module);

	    /* prepare */
	    var str = act.value.replace(/^human\s+/, '');
	    str = $.trim(str.replace(/ {1,}/g, " "));
	    var o = _get(str.split(' '));

	    if (o.a === 'error') {
		return 'human error';
	    }

	    /* show */
	    if (o.a === 'show') {
		draw[o.pl.v[0] + o.pl.h[0]] = o;

		this['_' + module].redraw.apply(this);
	    }

	    /* hide */
	    if (o.a === 'hide') {
		if (o.n === false) {
		    $.each(draw, function (k, v) {
			draw[k] = null;
		    });
		} else {
		    $.each(draw, function (k, v) {
			if (v !== null && o.n === v.n) {
			    draw[k] = null;
			}
		    });
		}
		this['_' + module].redraw.apply(this);
	    }

	    /* block : false */
	    this.game.block.call(this, false, module);

	    /* action */
	    this.game.action.call(this, true);

	    /* return */
	    return true;
	}
    });

}();