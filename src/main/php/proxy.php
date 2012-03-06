<?php
//
// API Buddy PHP Ajax Proxy.
// Redirect Ajax calls when API is hosted on a different domain/subdomain/port.
// 
// Based on Yahoo! Web services example by Jason Levitt.
// http://developer.yahoo.com/javascript/howto-proxy.html
// http://developer.yahoo.com/javascript/samples/proxy/php_proxy_simple.txt
//

// Allowed hostname. Change this line to your server!
define ('HOSTNAME', 'http://api.flickr.com/services/rest');
//define ('HOSTNAME', 'http://localhost/api-buddy/php/params.php'); // DEBUG

$path = ($_POST['__api_url']) ? $_POST['__api_url'] : $_GET['__api_url'];
$url = HOSTNAME . $path;

// Read data to send on request
$postvars = '';

while ($element = current($_GET)) {
	$key = key($_GET);
	if ( $key != "__api_url" && $key != "__api_method" ) {
		$postvars .= urlencode($key) . '=' . urlencode($element) . '&';
	}
	next($_GET);
}

while ($element = current($_POST)) {
	$key = key($_POST);
	if ( $key != "__api_url" && $key != "__api_method" ) {
		$postvars .= urlencode($key) . '=' . urlencode($element) . '&';
	}
	next($_POST);
}

// Read the method
$method = ($_POST['__api_method']) ? $_POST['__api_method'] : $_GET['__api_method'];

if( isset($method) ) {
	$method = strtoupper($method);
}else {
	$method = "POST";
}

// GET? Set data on URL
if ( $method == "GET" ) {
	$url .= "?" . $postvars;
}

// Open the Curl session
$session = curl_init($url);

// Not GET? Set request method and data now that the session was initialized.
if ( $method != "GET" ) {

	if ( $method == "POST" ) {
		curl_setopt($session, CURLOPT_POST, true);
	} else {
		curl_setopt($session, CURLOPT_CUSTOMREQUEST, $method);
	}

	curl_setopt($session, CURLOPT_POSTFIELDS, $postvars);
	curl_setopt($session, CURLOPT_HTTPHEADER, array('Content-Length: ' . strlen($postvars)));
}

// Don't return HTTP headers. Do return the contents of the call
curl_setopt($session, CURLOPT_HEADER, false);
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

// Make the call
$result = curl_exec($session);

// The web service returns XML. Set the Content-Type appropriately
//header("Content-Type: text/xml");

echo $result;
curl_close($session);

?>