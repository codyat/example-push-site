<?php
include_once( '[PATH_TO_PHP_FILE_CONTAINING_MYSQLI_COMMANDS]' );

$subscription = json_decode(file_get_contents('php://input'), true);
if ( !isset( $subscription[ 'endpoint' ] ) ) {
	echo 'Error: not a subscription';
	return;
}

$method = $_SERVER[ 'REQUEST_METHOD' ];

switch ( $method ) {
	case 'POST':
		$resp = SubscribeUser( $subscription[ 'user_id' ], $subscription[ 'endpoint' ], $subscription[ 'publicKey' ], $subscription[ 'authToken' ] );
		break;
	case 'PUT':
		$resp = UpdateSubscription( $subscription[ 'user_id' ], $subscription[ 'endpoint' ], $subscription[ 'publicKey' ], $subscription[ 'authToken' ] );
		break;
	case 'DELETE':
		$resp = UnsubscribeUser( $subscription[ 'user_id' ], $subscription[ 'endpoint' ], $subscription[ 'publicKey' ], $subscription[ 'authToken' ] );
		break;
	default:
		echo "Error: method not handled";
		return;
}

?>
