!function () {
    'use strict';

    var $wrap = $('#game-dialog-wrap');
    var $content = $('#game-dialog-content');
    var dialogs = {};

    /* func */
    var module = 'dialog';
    window._g.module(module, {
	dialogs: function (obj) {
	    dialogs = obj;
	},

	dispatch: function (act) {
	    var that = this;

	    /* block : true */
	    this.game.block.call(this, true, module);

	    $wrap.show();

	    /* text - hide */
	    this.module('text').hide.call(this, true);

	    var dialog = dialogs[act.value];

	    $content.empty();

	    $.each(dialog, function (k, v) {
		$('<div>')
			.appendTo($content)
			.html('<span>' + v.name + '</span>')
			.on('click', function () {
			    $wrap.hide();

			    console.log(v.label);

			    /* block : false */
			    that.game.block.call(that, false, module);

			    /* label */
			    that.game.label.call(that, v.label);

			    return false;
			});
	    });

	    /* return */
	    return true;
	}
    });
}();