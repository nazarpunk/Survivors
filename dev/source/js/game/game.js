!function () {
    'use strict';

    var actions = [];
    var actionID = -1;
    var sun = 'day';
    var that = window._g;

    var labels = {};
    var images = {};
    var blocks = {};
    var dialogs = {};
    var dialogID = 0;

    var instanceID = 0;

    var isDev = that.isDev;

    var $log = $('#dev_log');
    var $dev = $('#dev_wrapper');
    var $btnStart = $('#game-menu-btn-start');

    that.game = {
	isBlock: function () {
	    var isBlock = false;
	    $.each(blocks, function (k, v) {
		if (v === true) {
		    isBlock = true;
		    return false;
		}
	    });

	    return isBlock;
	},
	block: function (state, module) {
	    if (typeof module === 'undefined') {
		module = 'main';
	    }
	    blocks[module] = state;
	},

	instance: function () {
	    return instanceID;
	},
	sun: function () {
	    return sun;
	},

	canvas: function ($wrap) {
	    var id = $wrap.attr('id') + '-canvas';
	    var $canvas = $('#' + id);
	    if ($canvas.length === 0) {
		$('<canvas>').prependTo($wrap).attr('id', id);
	    }

	    var c = document.getElementById(id);
	    c.width = this.game.size().width;
	    c.height = this.game.size().height;

	    return c.getContext('2d');
	},

	image: function (name) {

	    /* normal */
	    if (typeof images[name] !== 'undefined') {
		return images[name];
	    }

	    /* sun */
	    if (typeof images[name + '_' + sun] !== 'undefined') {
		return images[name + '_' + sun];
	    }

	    return false;
	},

	images: function (imgs) {
	    images = imgs;
	},

	size: function () {
	    return {
		width: 1200,
		height: 800
	    };
	},

	time: function (set) {
	    if (typeof set === 'undefined') {
		if (['day', 'night', 'sunset', 'dawn'].indexOf(set) >= 0) {
		    that = set;
		}
	    }
	    return sun;
	},

	reset: function () {
	    /* set defaults */
	    blocks = {main: true};
	    sun = 'day';
	    instanceID++;
	    actionID = -1;

	    /* flush */
	    $.each(that.modules, function (k, v) {
		if (typeof that[v].flush === 'function') {
		    that[v].flush.call(that);
		}
	    });
	    
	    $('body').removeClass('production');

	    /* show blocks */
	    if (this.isDev) {
		
		$('#dev_wrapper').show();
	    }

	    $('#game-message').hide();
	    $('#game-wrapper').show();
	    $('#game-text-wrap').show();
	    $('#game-menu').show();
	},

	actions: function (str) {
	    /* split */
	    var story = str.split(/\r|\n|\r\n/);

	    var _log = function (str) {
		$log.prepend('<div>' + str + '</div>');
	    };

	    if (isDev) {
		$log.empty();
		_log('Начинаем обработку сюжета');
	    }

	    /* reset game state */
	    instanceID++;
	    actionID = -1;
	    actions = [];
	    labels = {};
	    dialogs = {};
	    dialogID = 0;

	    /* vars */
	    var stringID = 0;

	    /* message */
	    var $msg = $('<div>').appendTo('#game-message');

	    /* modules */
	    var modules = [
		'bg',
		'human',
		'screen',
		'text',
		'say',
		'label',
		'go',
		'delay',
		'shake',
		'sun'
	    ];
	    var reModule = new RegExp('^(' + modules.join('|') + ')', 'i');

	    var isComment = false;

	    var isDialog = false;
	    var dialog = [];

	    $.each(story, function (k, v) {
		/* message */
		$msg.html('Обработка сюжета: ' + (k + 1) + '/' + story.length);

		/* prepare */
		v = $.trim(v.replace(/ {1,}/g, ' '));

		/* string ID */
		stringID++;

		/* comment */
		if (/^\/\*/.test(v)) {
		    isComment = true;
		} else if (/\*\/$/.test(v)) {
		    isComment = false;
		    return true;
		}

		/* skip */
		if (v === '' || /^\/\//.test(v) || isComment) {
		    return true;
		}

		/* action ID */
		var actionID = actions.length;

		/* dialog - start */
		if (v === 'dialog' && !isDialog) {
		    dialog = [];
		    isDialog = true;
		    return true;
		}

		/* dialog - add */
		if (v !== 'dialog' && isDialog) {

		    var m = v.match(/^([a-z_0-9]+)/i);

		    var d = {
			label: null,
			name: null
		    };

		    if (m !== null && m.length === 2) {
			d.label = $.trim(m[1]);

			var re = new RegExp('^' + m[1] + '', 'i');
			d.name = $.trim(v.replace(re, ''));

			dialog.push(d);
		    }

		    return true;
		}

		/* dialog - end */
		if (v === 'dialog' && isDialog) {
		    var id = ++dialogID;
		    dialogs[id] = dialog;
		    isDialog = false;

		    /* action add */
		    actions.push({
			module: 'dialog',
			id: {
			    string: stringID,
			    action: actionID
			},
			value: id
		    });

		    return true;
		}


		/* module */
		var module = v.match(reModule);
		if (module === null) {
		    module = 'text';
		} else {
		    module = module[0];
		}

		/* module alias */
		if (module === 'say') {
		    module = 'text';
		}

		/* module: label */
		if (module === 'label') {
		    var m = v.match(/^label\s+([a-z_0-9]+)/i);
		    if (m !== null && m.length === 2) {
			labels[m[1]] = actionID;
		    }
		}

		/* action add */
		actions.push({
		    module: module,
		    id: {
			string: stringID,
			action: actionID
		    },
		    value: v
		});

	    });

	    /* dialogs - set */
	    this.module('dialog').dialogs.call(this, dialogs);

	    if (this.isDev) {
		_log('Обработка окончена');
	    }

	    that.game.reset.call(this);
	},

	label: function (label) {
	    if (typeof labels[label] !== 'undefined') {
		this.game.action.call(this, labels[label]);
	    } else {
		alert('Label error: ' + label);
	    }
	    return;
	},

	action: function (actionNext) {
	    var that = this;

	    /* is block */
	    if (this.game.isBlock()) {
		return;
	    }

	    /* action ID */
	    if (actionNext === true) {
		actionID++;
	    } else if (Number.isInteger(actionNext)) {
		actionID = actionNext;
	    }

	    /* end game */
	    if (typeof actions[actionID] === 'undefined') {
		alert('К сожалению дальнейшая часть игры ещё не готова :(');
		this.game.reset.call(this);
		return;
	    }

	    var act = actions[actionID];

	    if (isDev) {
		$('<div>')
			.prependTo('#dev_log')
			.html('Строка <b>' + act.id.string + '</b>: ' + act.value);

	    }

	    /* label|go|delay|shake|sun */
	    if (act.module === 'label') {
		this.game.action.call(this, true);
		return;
	    } else if (act.module === 'go') {
		/* go */
		this.game.label.call(this, act.value.replace(/^go\s+/, ''));
	    } else if (act.module === 'delay') {
		var d = parseFloat(act.value.replace(/^delay/, ''));
		this.game.block.call(this, true);

		setTimeout(function () {
		    that.game.block.call(this, false);
		    that.game.action.call(that, true);
		}, d * 1000);
		return;
	    } else if (act.module === 'shake') {
		this.game.block.call(this, true);
		$('body').css('overflow', 'hidden');
		$('#game-wrapper').effect("shake", {direction: 'left', distance: 20, times: 2}, 200, function () {
		    that.game.block.call(this, false);
		    $('body').removeAttr('style');
		    that.game.action.call(that, true);
		});
	    } else if (act.module === 'sun') {
		var val = $.trim(act.value.replace(/^sun/, ''));

		if ($.inArray(val, ['day', 'night', 'dawn', 'sunset']) >= 0) {
		    sun = val;
		}

		this.game.action.call(this, true);
		return;
	    }

	    /* module */
	    var name = '_' + act.module;

	    /* screen fix */
	    if (act.module !== 'screen') {
		this.module('screen').hide.call(this);
	    }

	    /* action */
	    if (typeof this[name] !== 'undefined' && typeof this[name]['dispatch'] === 'function') {
		var response = this[name].dispatch.apply(this, [act]);
		if (response !== true) {
		    console.warn(response, act);
		    this.game.block.call(this, true);
		}
		return;
	    }
	},

	preload: function () {
	    var $message = $('#game-message');
	    var game = this.game;
	    var that = this;

	    /* start */
	    $btnStart
		    .on('click', function (e) {
			game.reset.call(that);
			blocks = {};
			game.action.call(that, true);

			$('#game-menu').hide();
			return false;
		    });

	    /* dev help */
	    $dev
		    .on('click', function (e) {
			var $btn = $(e.target).closest('.game-dev-demo-btn');
			if ($btn.length > 0) {
			    var $btns = $dev.find('input,button').prop('disabled', true);

			    $.get($btn.data('href'), function (str) {
				$btns.prop('disabled', false);
				game.actions.call(that, str);
				$btnStart.trigger('click');
				$('html,body')
					.animate({
					    scrollTop: 0
					}, 600);
			    });

			}

		    });


	    /* action */
	    $('#game')
		    .on('click', function () {
			game.action.call(that, true);
		    });

	    /* key - space */
	    $(window)
		    .keydown(function (e) {
			if (e.keyCode === 32) {
			    game.action.call(that, true);
			    return false;
			}
		    });

	    /* mouse on */
	    var mouseInterval;
	    var mouseTimeout;
	    $(window)
		    .on('mousedown', function () {
			mouseTimeout = setTimeout(function () {
			    mouseInterval = setInterval(function () {
				game.action.call(that, true);
			    }, 100);
			}, 1000);
		    })
		    .on('mouseup', function () {
			clearTimeout(mouseTimeout);
			clearInterval(mouseInterval);
		    });

	    /* dev */
	    if (this.isDev) {
		/* play */
		$('#dev_file-btn')
			.on('click', function () {

			    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
				alert('Ваш браузер не поддерживает FileAPI');
				return;
			    }

			    var input = document.getElementById('dev_file');
			    if (!input.files) {
				alert("Ваш браузер не поддерживает .files");
			    } else if (!input.files[0]) {
				alert("Файл не выбран");
			    } else {
				var file = input.files[0];
				var fr = new FileReader();
				fr.onload = function () {
				    var str = fr.result;
				    alert('Файл загружен, можете начать новую игру.');
				    $('html,body').scrollTop(0);
				    game.actions.call(that, str);
				};
				fr.readAsText(file, "windows-1251");
			    }
			});

	    }

	    var $imageLoading = $('#image-loading');
	    var _imageCache = function () {

		var $images = $imageLoading.children('img');
		var loaded = 0;
		var count = $images.length;
		var imgs = {};

		$images.each(function (k, v) {
		    var img = new Image();
		    var name = $(this).data('name');
		    var src = $(this).attr('src');

		    img.onload = function () {
			loaded++;
			imgs[name] = {
			    img: this,
			    src: src,
			    width: this.width,
			    height: this.height
			};
			if (loaded === count) {
			    that.game.images(imgs);
			    $('<div>')
				    .appendTo($message)
				    .html('Загрузка сюжета');

			    $
				    .get(that.domain + '/story.txt?v=' + new Date().getTime(), function (str) {
					game.actions.call(that, str);

					/* test */
					if (0) {
					    $btnStart.trigger('click');
					}
				    })
				    .fail(function () {
					alert('Не удалось загрузить сюжет. Страница будет обновлена.');
					window.location.reload(true);
				    });
			}
		    };
		    img.src = src;
		});
	    };

	    /* image loading */
	    $imageLoading
		    .imagesLoaded()
		    .done(function (instance) {
			_imageCache();
		    })
		    .fail(function () {
			alert('Не все изображения были загружены. Страница будет обновлена');
			window.location.reload(true);
		    })
		    .progress(function (instance, image) {
			var c = parseInt(that.imageCount);
			$message.html('Загрузка изображений: ' + instance.progressedCount + '/' + c);
			if (!image.isLoaded) {
			    console.warn(image);
			}
		    });
	}
    };

    /* start game */
    that.game.preload.call(that);

}();
