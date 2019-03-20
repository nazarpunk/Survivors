<?php
$d	 = preg_replace('/\/$/', '', "http://" . $_SERVER['SERVER_NAME']);
?><!DOCTYPE html>
<html lang="ru">
    <head>
	<meta charset="utf-8">
	<title>Выжившие - список персонажей</title>
	<link href="data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAB0qKAAyC8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEAEQARAAAAERARAREAAAABEREREAAAAAAREREAAAAAACIiIgAAAAACIiIiIAAAAAIiIiIgAAAAACIiIiAAAAAAIiIiIAAAAAACAiACAAAAAAICIAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMzwAAxI8AAOAfAADwPwAA8D8AAOAfAADgHwAA8B8AAPAfAAD6bwAA+n8AAP+/AAD//wAA//8AAP//AAD//wAA" rel="icon" type="image/x-icon" />
    </head>

    <body>

	<?php
	$human	 = [];
	foreach (glob(dirname(__FILE__) . '/../source/img/human/*') as $path) {
	    $h = explode('_', pathinfo($path)['filename']);
	    // name
	    if (!isset($human[$h[0]])) {
		$human[$h[0]] = [];
	    }
	    // pose
	    if (!isset($human[$h[0]][$h[1]])) {
		$human[$h[0]][$h[1]] = [
		    'd'	 => [],
		    'e'	 => []
		];
	    }
	    if ($h[2] === 'emotion') {
		$e	 = &$human[$h[0]][$h[1]]['e'];
		$e[]	 = $h[3];
		$e	 = array_unique($e);
	    } else {
		$d	 = &$human[$h[0]][$h[1]]['d'];
		$d[]	 = $h[2];
		$d	 = array_unique($d);
	    }
	}

	echo '<dl>';
	foreach ($human as $name => $poses) {
	    echo "<dt>Имя персонажа: $name</dt>";
	    echo '<dd><dl>';
	    foreach ($poses as $pose => $p) {
		echo '<dd><dl>';
		echo "<dt>Поза: $pose</dt>";
		echo '<dd>Типы одежды: ' . implode(', ', $p['d']) . '</dd>';
		echo '<dd>Эмоции: ' . implode(', ', $p['e']) . '</dd>';
		echo '</dl></dd>';
	    }
	    echo '</dl></dd>';
	}
	echo '</dl>';
	?>



	<style>
	    body {
		background: rgb(0, 0, 0) url(../source/img/body/bg.jpg) top center repeat;
		background-attachment: fixed;
		color: white;
		font-family: monospace;
	    }
	</style>
    </body>
</html>