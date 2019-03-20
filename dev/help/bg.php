<?php
$d = preg_replace('/\/$/', '', "http://" . $_SERVER['SERVER_NAME']);

function getDirContents($dir, &$results = array()) {
    $files = scandir($dir);

    foreach ($files as $value) {
	$path = realpath($dir . DIRECTORY_SEPARATOR . $value);
	if (!is_dir($path)) {
	    $results[] = $path;
	} else if ($value != "." && $value != "..") {
	    getDirContents($path, $results);
	}
    }

    return $results;
}

$images = getDirContents(dirname(__FILE__) . '/../source/img');
?><!DOCTYPE html>
<html lang="ru">
    <head>
	<meta charset="utf-8">
	<title>Выжившие - список фонов</title>
	<link href="data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAB0qKAAyC8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEAEQARAAAAERARAREAAAABEREREAAAAAAREREAAAAAACIiIgAAAAACIiIiIAAAAAIiIiIgAAAAACIiIiAAAAAAIiIiIAAAAAACAiACAAAAAAICIAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMzwAAxI8AAOAfAADwPwAA8D8AAOAfAADgHwAA8B8AAPAfAAD6bwAA+n8AAP+/AAD//wAA//8AAP//AAD//wAA" rel="icon" type="image/x-icon" />


	<script type='text/javascript' src='unitegallery/js/jquery-11.0.min.js'></script>

	<script type='text/javascript' src='unitegallery/js/ug-common-libraries.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-functions.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-thumbsgeneral.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-thumbsstrip.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-touchthumbs.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-panelsbase.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-strippanel.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-gridpanel.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-thumbsgrid.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-tiles.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-tiledesign.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-avia.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-slider.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-sliderassets.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-touchslider.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-zoomslider.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-video.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-gallery.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-lightbox.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-carousel.js'></script>
	<script type='text/javascript' src='unitegallery/js/ug-api.js'></script>

	<link rel='stylesheet' href='unitegallery/css/unite-gallery.css' type='text/css' />

	<script type='text/javascript' src='unitegallery/themes/tiles/ug-theme-tiles.js'></script>

	<link rel='stylesheet'  href='unitegallery/themes/default/ug-theme-default.css' type='text/css' />


    </head>

    <body>
	<div id="gallery" style="display: none">



	    <?php
	    foreach ($images as $v) {
		$img	 = str_replace($_SERVER['DOCUMENT_ROOT'], '', $v);
		$path	 = $d . $img;
		$name	 = stristr($img, 'bg/');

		if ($name === false || preg_match('/^bg\/screen/', $name)) {
		    continue;
		}

		$name	 = str_replace('bg/', 'bg ', $name);
		$name	 = preg_replace('/\.[a-z]+$/', '', $name);
		$name	 = preg_replace('/(_sunset|_day|_dawn|_night)$/','', $name);

		echo "<img alt='$name' src='$path'
		 data-image='$path'
		 data-description='$name'>";
	    }
	    ?>


	</div>


	<script>
	    jQuery("#gallery").unitegallery({
		gallery_background_color: 'transparent',
		tile_enable_textpanel: true,
		tile_textpanel_always_on: true,
		tiles_space_between_cols: 0,
		gallery_width: "100%",
		theme_gallery_padding: 0

	    });
	</script>
	<style>
	    body {
		margin: 0;
		padding: 0;
		background: rgb(0, 0, 0) url(../source/img/body/bg.jpg) top center repeat;
		background-attachment: fixed;
		color: white;
	    }
	</style>
    </body>
</html>