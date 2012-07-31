<?php

echo( "GET: \n\n" );

while ($element = current($_GET)) {
	echo( key($_GET) . '=' . $element . "\n" );
	next($_GET);
}

echo( "\nPOST: \n\n" );

while ($element = current($_POST)) {
	echo( key($_POST) . '=' . $element . "\n" );
	next($_POST);
}

if( $_FILES ) {

	echo( "\nFILE: \n\n" );

	while ($element = current($_FILES)) {
		echo( key($_FILES) . '=' . $element['name'] . "\n" );
		next($_FILES);
	}
}

?>