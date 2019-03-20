<?php
$version = 4;

$d = preg_replace('/\/$/', '', "http://" . $_SERVER['SERVER_NAME'] . strtok($_SERVER["REQUEST_URI"], '?'));

function getDirContents($dir, &$results = array()) {
    $files = scandir($dir);

    foreach ($files as $value) {
	$path = realpath($dir . DIRECTORY_SEPARATOR . $value);
	if (!is_dir($path)) {
	    $results[] = $path;
	} else if ($value != "." && $value != "..") {
	    getDirContents($path, $results);
	    //$results[] = $path;
	}
    }

    return $results;
}

$images		 = getDirContents(dirname(__FILE__) . '/source/img');
$imagesCount	 = count($images);
$imagesStr	 = '';
foreach ($images as $image) {
    $name		 = str_replace(dirname(__FILE__), '', $image);
    $name		 = str_replace('/source/img/', '', $name);
    $name		 = preg_replace('/\\.[^.\\s]{3,4}$/', '', $name);
    $name		 = str_replace('/', '$', $name);
    $imagesStr	 .= '<img data-name="' . $name . '" src="' . str_replace(dirname(__FILE__), $d, $image) . '?v=' . $version . '">';
}

$isDev = isset($_GET['dev']);

$help = function($name, $path) use ($d) {
    $path = "$d/help/$path.txt?" . time();
    return "<div><a href='$path' target='_blank'>$name</a> <button type='button' class='game-dev-demo-btn' data-href='$path'>Играть</button></div>";
}
?><!DOCTYPE html>
<html lang="ru">
    <head>
	<meta charset="utf-8">

	<title>Выжившие</title>
	<link href="data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAB0qKAAyC8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEAEQARAAAAERARAREAAAABEREREAAAAAAREREAAAAAACIiIgAAAAACIiIiIAAAAAIiIiIgAAAAACIiIiAAAAAAIiIiIAAAAAACAiACAAAAAAICIAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMzwAAxI8AAOAfAADwPwAA8D8AAOAfAADgHwAA8B8AAPAfAAD6bwAA+n8AAP+/AAD//wAA//8AAP//AAD//wAA" rel="icon" type="image/x-icon" />
	<link rel="stylesheet" href="<?= $d ?>/source/dest/out.css?v=<?= time() ?>">
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<?php if (!$isDev) { ?>
    	<script src="https://vk.com/js/api/openapi.js?160" type="text/javascript"></script>
	<?php } ?>
    </head>

    <body class="production">
	<div id="game-message">Загрузка изображений: 0/<?= $imagesCount ?></div>

	<div id="game-wrapper" style="display:none">
	    <span></span>
	    <div id="game-wrap">
		<div id="game">
		    <div id="image-loading"><?= $imagesStr ?></div>
		    <div id="game-bg"></div>

		    <div id="game-human-wrap"></div>

		    <div id="game-text-wrap" style="display: none">
			<div id="game-text-name-wrap" style="display:none"><div><div id="game-text-name"></div></div></div>
			<div id="game-text"></div>
		    </div>

		    <div id="game-dialog-wrap" style="display: none"><div id="game-dialog-content"></div></div>

		    <div id="game-screen-wrap" style="display: none"></div>

		    <div id="game-menu">
			<div id="game-menu-btn-start" class="btn">Начать игру</div>
			<div id="game-menu-text">
			    Команда
			    <a href="https://vk.com/survirvors" target="_blank">Just4U</a>
			    представляет новую визуальную новеллу - Выжившие: между двух огней.<br>
			    <br>
			    Сообщество создано в связи с разработкой новой компьютерной игры, под кодовым названием "Выжившие". Активная деятельность уже началась, так что в не очень далеком будущем игра выйдет в свет. Приятного пребывания в нашем тихом уголке выживающих :)
			    <br>
			    <br>
			</div>
		    </div>
		</div>
	    </div>
	    <span></span>
	</div>

	<?php if ($isDev) { ?>
    	<div id="dev_wrapper" style="display: none">
    	    <div>
    		<div id="dev_log"></div>
    	    </div>
    	    <div id="dev_help">
    		<div>
    		    Приветствуем Вас в режиме написания сюжета.
    		    <br>
    		    Если у вас есть файлик сюжета, то можете загрузить его здесь
    		    <br>
    		    <br>
    		    <input id="dev_file" type="file" accept=".txt">
    		    <button id="dev_file-btn" type="button" autocomplete="off">Играть</button>
    		</div>
    		<h1>Начало работы</h1>
    		<div>Для начала скачайте файлик
    		    <a charset="UTF-8" href="<?= $d . '/story.txt?v=' . time() ?>" target="_blank">текущего сюжета</a>,
    		    чтобы ознакомиться с синтаксисом и понять как всё устроено.
    		    <br>
    		    Установите любой редактор текста с номерацией строк, например
    		    <a href="https://notepad-plus-plus.org/" target="_blank">notepad++</a>.
    		</div>
    		<h1>Описание комманд</h1>
    		<div>
    		    Движок читает файл построчно.
    		    Соответственно одна строка - одно действие.<br>
    		    Чтобы ознакомиться с другими функциями, поглядите файлы выложенные ниже.
    		</div>
		    <?= $help('Комментарии, текст', 'text') ?>
		    <?= $help('Фоны', 'bg') ?>
    		<div>
    		    Все фоны можно посмотреть <a href="<?= $d ?>/help/bg.php" target="_blank">здесь</a>.
    		</div>
		    <?= $help('Персонажи', 'human') ?>
    		<div>
    		    Доступные персонажей можно посмотреть здесь <a href="<?= $d ?>/help/human.php" target="_blank">здесь</a>.
    		</div>
		    <?= $help('Время суток для фонов и персонажей', 'sun') ?>

		    <?= $help('Переходы (label, go)', 'label') ?>

		    <?= $help('Диалоги', 'dialog') ?>

    		<br>
    		<blockquote>
    		    Дальнейшее описание в разработке, смотрите
    		    <a charset="UTF-8" href="<?= $d . '/story.txt?v=' . time() ?>" target="_blank">файл сюжета</a>
    		    или стучите в <a href="https://vk.com/nazarpunk" target="_blank">вк</a>.
    		</blockquote>

    	    </div>
    	</div>
	<?php } else { ?>

    	<div id="vk-comments-wrap"><div id="vk-comments"></div></div>
    	<script type="text/javascript">
    	    VK.init({apiId: 6820887, onlyWidgets: true});
    	    VK.Widgets.Comments("vk-comments", {
    		limit: 100,
    		mini: 0,
    		attach: "*",
    		pageUrl: 'http://gorsaldo.ga/game/survivors/'
    	    }, 'survivors');
    	</script>

	<?php } ?>


	<?php
	$human = [];
	foreach (glob(dirname(__FILE__) . '/source/img/human/*') as $path) {
	    $human[] = "'" . pathinfo($path)['filename'] . "'";
	}
	?>

	<script>
	    window._g = {
		humanImages: [<?= implode(',', $human) ?>],
		imageCount: <?= $imagesCount ?>,
		domain: '<?= $d ?>',
		isDev: <?= $isDev ? 'true' : 'false' ?>,
		modules: [],
		module: function (module, func) {
		    if (arguments.length === 1) {
			return this['_' + module];
		    } else {
			module = '_' + module;
			this.modules.push(module);
			this[module] = func;
		    }
		}
	    };
	</script>
	<script src="<?= $d ?>/source/dest/vendor.js?v=<?= time() ?>"></script>
	<script src="<?= $d ?>/source/dest/out.js?v=<?= time() ?>"></script>
    </body>
</html>