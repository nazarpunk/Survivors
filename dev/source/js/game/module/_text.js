!function () {
    'use strict';

    var names = {};

    var $wrap = $('#game-text-wrap');

    var $text = $('#game-text');
    var $nameWrap = $('#game-text-name-wrap');
    var $name = $('#game-text-name');


    /* add module */
    var module = 'text';
    window._g.module(module, {
	hide: function (state) {
	    $wrap[state === true ? 'hide' : 'show']();
	},

	dispatch: function (act) {

	    /* block : true */
	    this.game.block.call(this, true, module);

	    /* show */
	    this.module(module).hide.call(this, false);

	    /* prepare */
	    var value = act.value.replace(/^(text|say)\s+/, '');

	    /* if define */
	    var m = value.match(/^define\s+([a-z_]+)/i);

	    if (m !== null && m.length === 2) {
		/* block : false */
		this.game.block.call(this, false, module);

		names[m[1]] = value.replace(/^define\s+([a-z_]+)\s+/i, '');
		this.game.action.call(this, true);
		return true;
	    }

	    /* name */
	    m = value.match(/^([a-z_]+)/i);

	    var isName = false;
	    if (m !== null) {
		isName = typeof names[m[0]] !== 'undefined';
	    }
	    var text = isName === false ? value : value.replace(/^[a-z_]+\s+/i, '');

	    $nameWrap[isName ? 'show' : 'hide']();
	    $name.html(isName ? names[m[0]] : '');

	    $text.html(text);

	    /* block : false */
	    this.game.block.call(this, false, module);

	    /* return */
	    return true;
	}
    });

}();