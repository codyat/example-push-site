'use strict';

self.addEventListener( 'push', function( event ) {
	console.log( '[Service Worker] Push Received.' );
	const notificationObject = JSON.parse( event.data.text() );
	
	const title = notificationObject.title; 
	const options = {
		body: notificationObject.msg,
		icon: notificationObject.icon,
		badge: notificationObject.badge
		actions: [ { action : 'close', title : 'Close' } ]
	};
	self.notificationURL = notificationObject.url;
	event.waitUntil( self.registration.showNotification( title, options ) );
});

self.addEventListener( 'notificationclick', function( event ) {
	console.log( '[Service Worker] Notification click Received.' );
	const notificationObject = JSON.parse( event.data.text() ); 
	
	switch ( event.action ) {
		case 'close':
			event.notification.close();
			break;
		default:
			event.notification.close();
			event.waitUntil( clients.openWindow( notificationObject.url ) );
			break;
	}
});
