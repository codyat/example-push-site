<?php
	include_once( '[PATH_TO_PHP_FILE_CONTAINING_MYSQLI_COMMANDS]' );

	$user = $_POST[ 'UID' ];

	RemoveAllFromDB( $user );
?>
