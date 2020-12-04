<?php
	include_once( '[PATH_TO_PHP_FILE_CONTAINING_MYSQLI_COMMANDS]' );

	$user    = isset( $_POST[ 'UID' ] ) ? $_POST[ 'UID' ] : 0 ;
	$symbols = isset( $_POST[ 'Symbols' ] ) ? str_replace(" ", "", $_POST[ 'Symbols' ] ) : "";

	if ( $user > 0 && $symbols != "" ) 
		AddToWatchlistDB( $user, $symbols );
?>
