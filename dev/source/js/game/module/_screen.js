!function () {
    'use strict';

    var that = window._g;

    var $wrap = $('#game-screen-wrap');

    var _zeros = function (number, width) {
	width -= number.toString().length;
	if (width > 0)
	{
	    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
	}
	return number + "";
    };

    var _draw = function (name) {
	var that = this;

	var img = this.game.image(name).img;
	var ctx = this.game.canvas.call(this, $wrap);
	ctx.clearRect(0, 0, that.game.size().width, that.game.size().height);
	ctx.drawImage(img, 0, 0);
	this.game.block.call(this, false, module);
    };

    var _anim = function (imgs) {
	/* canvas */
	var ctx = this.game.canvas.apply(this, [$wrap]);

	/* draw */
	var f = function () {
	    var img = imgs.shift();
	    if (img === undefined) {
		that.game.block.call(this, false, module);
		return;
	    }
	    ctx.clearRect(0, 0, that.game.size().width, that.game.size().height);
	    ctx.drawImage(img, 0, 0);
	    setTimeout(f, 160, imgs);
	};
	f();

    };

    var screens = {
	landing: function () {
	    _draw.call(this, 'bg$screen$landing');
	},

	weekLater: function () {
	    _draw.call(this, 'bg$screen$date$weekLater');
	},

	shuttle: function () {
	    _draw.call(this, 'bg$screen$shuttle_fly');
	},

	prologue_start: function () {
	    _draw.call(this, 'bg$screen$prologue$001');
	},

	prologue_anim: function () {
	    this.game.block.call(this, true, module);

	    /* imgs */
	    var imgs = [];
	    for (var i = 2; i <= 22; i++) {
		imgs.push(that.game.image('bg$screen$prologue$' + _zeros(i, 3)).img);
	    }

	    _anim.call(this, imgs);

	},

	day01_dawn: function () {
	    this.game.block.call(this, true, module);
	    /* imgs */
	    var imgs = [];
	    var _push = function (img) {
		imgs.push(that.game.image('bg$screen$prologue$' + img).img);
	    };

	    for (var i = 22; i <= 29; i++) {
		_push(_zeros(i, 3));
	    }

	    _push('029_dawn');
	    _anim.call(this, imgs);
	}

    };

    /* module */
    var module = 'screen';
    that.module(module, {
	hide: function () {
	    $wrap.empty().hide();
	    this.module(module).active.call(this, false);
	},

	active: function (isActive) {
	    $wrap[isActive ? 'addClass' : 'removeClass']('active');
	},

	dispatch: function (act) {
	    this.game.block.call(this, true, module);

	    $wrap.show();

	    /* name */
	    var name = $.trim(act.value.replace(/^[a-z]+/i, ''));

	    if (typeof screens[name] === 'function') {
		this._screen.active.apply(this, [true]);
		screens[name].apply(this);
	    } else {
		alert('Screen: ' + name);
	    }

	    /* return */
	    return true;
	}

    });

}();