<?php

return [

	/**
	 * Configure client constructor parameters. Example: base_uri
	 */
	'defaults' => [
		/**
		 * Configures a base URL for the client so that requests created using a relative URL are combined with the base_url
		 * See: http://guzzle.readthedocs.org/en/latest/quickstart.html#creating-a-client
		 */
		'base_uri' => 'http://localhost:33333',

		/**
		 * Secret Key
		 * See: https://github.com/wppconnect-team/wppconnect-server#secret-key
		 */
<<<<<<< HEAD
		'secret_key' => env('WPP_KEY', ''),
=======
		'secret_key' => ''
>>>>>>> 5319b999e8317c1ae8fc8b157bab6c3d547995c9
	]

];
