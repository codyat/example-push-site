let applicationServerKey = '';
let userID = '';
document.Symbols = "";

( function ( $ ) {
	"use strict";

	$( function () {
		/* Watchlist Add */
		$( document ).on( 'submit', '#WatchlistForm', function( e ) {
			if ( !e.isDefaultPrevented() ) {
                                var Symbols = $( "#WatchlistSymbolSearch" ).attr( "value" ).replace( / /g, '' );
                                var URL = "/wp-content/themes/bb-theme/WatchlistAddSymbol.php";
                                var Data = jQuery.param( { Symbols: Symbols, UID: userID } );
                                var Status = $.post( URL, Data )
                                        .done( function( Data ) {
                                                $( '#WatchlistForm' )[ 0 ].reset();
                                                $( "#Watchlist" ).load( "/wp-content/themes/bb-theme/WatchlistAllow.php", { 'UID' : userID } );
                                        } )
                        }
                        return false;
                })

		/* Watchlist Remove */
		$( document ).on( 'click', ".trash", function() {
                        var ChartRow   = $( this ).parent().parent();
                        var UID = ChartRow.attr( 'id' ).split( "_" )[ 0 ];
                        var Symbol = ChartRow.attr( 'id' ).split( "_" )[ 1 ];
                        $.ajax({
                                type: "POST",
                                url: '/wp-content/themes/bb-theme/WatchlistSymbolRemove.php',
                                data: { UID: UID, Symbol: Symbol },
                        });
			ChartRow.remove();
		})
		
		$( document ).on( 'click', '#Symbols_DOW30', function() {
			document.Symbols = "KO,AAPL,MCD,XOM,MSFT";
                        var URL = "/wp-content/themes/bb-theme/WatchlistAddSymbol.php";
                        var Data = jQuery.param( { Symbols: document.Symbols, UID: userID } );
			var Status = $.post( URL, Data ).done( function( Data ) {
				$( '#WatchlistForm' )[ 0 ].reset();
                                $( "#Watchlist" ).load( "/wp-content/themes/bb-theme/WatchlistAllow.php", { 'UID' : userID } );
			});
		})
		
		$( document ).on( 'click', '#Symbols_NASDAQ100', function() {
			document.Symbols = "NFLX,EXPE,TCOM,TSLA,SBUX";
                        var URL = "/wp-content/themes/bb-theme/WatchlistAddSymbol.php";
                        var Data = jQuery.param( { Symbols: document.Symbols, UID: userID } );
			var Status = $.post( URL, Data ).done( function( Data ) {
				$( '#WatchlistForm' )[ 0 ].reset();
                                $( "#Watchlist" ).load( "/wp-content/themes/bb-theme/WatchlistAllow.php", { 'UID' : userID } );
			});
		})
		
		$( document ).on( 'click', '#Symbols_Russell2000', function() {
			document.Symbols = "CENX,ADMA,ATNI,AOSL,CMTL";
                        var URL = "/wp-content/themes/bb-theme/WatchlistAddSymbol.php";
                        var Data = jQuery.param( { Symbols: document.Symbols, UID: userID } );
			var Status = $.post( URL, Data ).done( function( Data ) {
				$( '#WatchlistForm' )[ 0 ].reset();
                                $( "#Watchlist" ).load( "/wp-content/themes/bb-theme/WatchlistAllow.php", { 'UID' : userID } );
			});
		})
		
		$( document ).on( 'click', '#Symbols_SnP', function() {
			document.Symbols = "MMM,ABT,ABBV,ABMD,ACN";
                        var URL = "/wp-content/themes/bb-theme/WatchlistAddSymbol.php";
                        var Data = jQuery.param( { Symbols: document.Symbols, UID: userID } );
			var Status = $.post( URL, Data ).done( function( Data ) {
				$( '#WatchlistForm' )[ 0 ].reset();
                                $( "#Watchlist" ).load( "/wp-content/themes/bb-theme/WatchlistAllow.php", { 'UID' : userID } );
			});
		})

		$( document ).on( 'click', '#Symbols_All', function() {
			document.Symbols = "A,AA,AAAU,AACG,AADR";
			var URL = "/wp-content/themes/bb-theme/WatchlistAddSymbol.php";
                        var Data = jQuery.param( { Symbols: document.Symbols, UID: userID } );
                        var Status = $.post( URL, Data ).done( function( Data ) {
                                $( '#WatchlistForm' )[ 0 ].reset();
                                $( "#Watchlist" ).load( "/wp-content/themes/bb-theme/WatchlistAllow.php", { 'UID' : userID } );
                        });
                })

		$( document ).on( 'click', '.WatchlistRemoveAll', function () {
			var URL = "/wp-content/themes/bb-theme/WatchlistRemoveAll.php";
			var Data = jQuery.param( { UID : userID } );
			$.post( URL, Data ).done( function( Data ) {
                                $( "#Watchlist" ).load( "/wp-content/themes/bb-theme/WatchlistAllow.php", { 'UID' : userID } );
                        });
		})
	});

	function GetASK() {
	        const ASK = document.querySelector( '#WatchlistSub' );
	        if ( ASK ) applicationServerKey = ASK.getAttribute( 'name' );
	        else       setTimeout( GetASK, 100 );
	}

	function GetUserID() {
        	const ID = document.querySelector( '#WatchlistMain' );
	        if ( ID ) userID = ID.getAttribute( 'name' );
        	else      setTimeout( GetUserID, 100 );
	}
	
	GetASK();
	GetUserID();
	
	if ( !( 'serviceWorker' in navigator ) )				updateWatchlist( 'Incompatible' );
	if ( !( 'PushManager' in window ) )					updateWatchlist( 'Incompatible' );
	if ( !( 'showNotification' in ServiceWorkerRegistration.prototype ) )	updateWatchlist( 'Incompatible' );

	if ( Notification.permission === 'denied' )  updateWatchlist( 'Blocked' );
	if ( Notification.permission === 'granted' ) updateWatchlist( 'Granted' );
	if ( Notification.permission === 'default' ) updateWatchlist( 'Undefined' );

	navigator.serviceWorker.register( '/ServiceWorker.js' ).then(
		() => {
                	console.log( '[SW] Service worker has been registered.' );
                	push_updateSubscription();
        	},
        	e => {
                	console.error( '[SW] Service worker registration failed', e );
        	}
	);

	function updateWatchlist( state ) {
		switch ( state ) {
			case 'Incompatible':
				$( function() { $( '#Watchlist' ).load( "/wp-content/themes/bb-theme/WatchlistUnsupported.php" ); } );
				break;
			case 'Blocked':
				$( function() { $( '#Watchlist' ).load( "/wp-content/themes/bb-theme/WatchlistDeny.php" ); } );
				break;
			case 'Granted':
				$( function() { $( '#Watchlist' ).load( "/wp-content/themes/bb-theme/WatchlistAllow.php", { 'UID': userID } ); } ); 
				break;
			case 'Undefined':
				$( function() { $( '#Watchlist' ).load( "/wp-content/themes/bb-theme/WatchlistDefault.php" ); } );
				break;
			default:
				console.error( 'Unhandled page state', state );
				break;
		}
	}

	function urlBase64ToUint8Array( base64String ) {
		const padding = '='.repeat( ( 4 - base64String.length % 4 ) % 4 );
		const base64 = ( base64String + padding ).replace( /\-/g, '+' ).replace( /_/g, '/' );

		const rawData = window.atob( base64 );
		const outputArray = new Uint8Array( rawData.length );

		for ( let i = 0; i < rawData.length; ++i )
			outputArray[ i ] = rawData.charCodeAt( i );
	
		return outputArray;
	}

	function checkNotificationPermission() {
		return new Promise( ( resolve, reject ) => {
			if ( Notification.permission === 'denied' )
				return reject( new Error( 'Push messages are blocked.' ) );

			if ( Notification.permission === 'granted' )
				return resolve();

			if ( Notification.permission === 'default' )
				return Notification.requestPermission().then( result => { ( result !== 'granted' ) ? reject( new Error( 'Bad permission result' ) ) : resolve(); });

			return reject( new Error( 'Unknown permission' ) );
		});
	}

	function push_subscribe() {
		return checkNotificationPermission().then( 
			() => navigator.serviceWorker.ready 
		).then( 
			serviceWorkerRegistration => serviceWorkerRegistration.pushManager.subscribe({
				userVisibleOnly: true,
          			applicationServerKey: urlBase64ToUint8Array( applicationServerKey ),
			})
		).then( 
			subscription => {
				$( function() { $( '#Watchlist' ).load( "/wp-content/themes/bb-theme/WatchlistAllow.php", { 'UID' : userID } ); } );
				return push_sendSubscriptionToServer( subscription, 'POST' );
			}
		).then( 
			subscription => subscription
		).catch( 
			e => {
				if ( Notification.permission === 'denied' ) {
					$( function() { $( '#Watchlist' ).load( "/wp-content/themes/bb-theme/WatchlistDeny.php" ); } );
				} else {
					console.error( 'Impossible to subscribe to push notifications', e );
				}
	      		}
		);
		
	}

	function push_updateSubscription() {
		navigator.serviceWorker.ready.then( 
			serviceWorkerRegistration => serviceWorkerRegistration.pushManager.getSubscription()
		).then( 
			subscription => {
				if ( !subscription ){
					console.warn( "No Subscription Available! Try unregistering this service worker and reseting the notifications permissions and reload the page." ); 
					return; 
				}
				return push_sendSubscriptionToServer( subscription, 'PUT' );
			}
		).then( 
			subscription => subscription 
		).catch( 
			e => {
				console.error( 'Error when updating the subscription', e );
			}
		);
	}

	function push_sendSubscriptionToServer( subscription, method ) {
		const key = subscription.getKey( 'p256dh' );
		const token = subscription.getKey( 'auth' );
		const contentEncoding = ( PushManager.supportedContentEncodings || [ 'aesgcm' ] )[ 0 ];
		
		return fetch( '/wp-content/themes/bb-theme/PushSubscriptionHandler.php', {
			method,
			body: JSON.stringify({
				endpoint:  subscription.endpoint,
				user_id:   userID,
				publicKey: key   ? btoa( String.fromCharCode.apply( null, new Uint8Array( key ) ) )   : null,
				authToken: token ? btoa( String.fromCharCode.apply( null, new Uint8Array( token ) ) ) : null,
				contentEncoding,
			}),
		}).then(
			() => subscription
		);
	}

	$( function() { 
		$( document ).on( 'click', '#PushButton', function() {
			push_subscribe();
		});
	});

})(jQuery);
