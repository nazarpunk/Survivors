!function () {
    'use strict';
    /* vars */
    var $wrap = $('#game-bg');

    /* func */
    var module = 'bg';
    window._g.module(module, {
	flush: function () {
	    var ctx = this.game.canvas.call(this, $wrap);
	    ctx.clearRect(0, 0, this.game.size().width, this.game.size().height);
	},

	dispatch: function (act) {

	    /* block : true */
	    this.game.block.call(this, true, module);

	    /* name */
	    var name = $.trim(act.value.replace(/^[a-z]+/i, ''));
	    name = 'bg$' + name.replace(/\//g, '$');

	    /* check image */
	    var image = this.game.image(name);
	    if (image === false) {
		return 'wrong image name';
	    }

	    /* canvas */
	    var ctx = this.game.canvas.call(this, $wrap);

	    this.module(module).flush.call(this);
	    ctx.drawImage(image.img, 0, 0);

	    /* block : false */
	    this.game.block.call(this, false, module);

	    /* action */
	    this.game.action.call(this, true);

	    /* return */
	    return true;
	}
    });
}();