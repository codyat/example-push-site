<?php 
	include_once( '[PATH_TO_PHP_FILE_CONTAINING_MYSQLI_COMMANDS]' );
	$user = isset( $_REQUEST[ 'UID' ] ) ? $_REQUEST[ 'UID' ] : "0";
?>
<div id="WatchlistSub" name="<?php echo PublicKey;?>"></div>

<form id="WatchlistForm" method="post">
	<input id="WatchlistSymbolSearch" type="text" name="SEARCH" class="form-control" placeholder="Symbol(s)* (separated by commas)" required="required">
	<input type="submit" class="WatchlistAddButton" value="Add to Watchlist">
</form>

<button id="Symbols_SnP" class="WatchlistAddButtons WatchlistLeftButton">S&amp;P 500</button>
<button id="Symbols_Russell2000" class="WatchlistAddButtons">Russell 2000</button>
<button id="Symbols_NASDAQ100" class="WatchlistAddButtons">NASDAQ 100</button>
<button id="Symbols_DOW30" class="WatchlistAddButtons">DOW 30</button>

<h3 class="WatchlistHeader">My Watchlist</h2>

<table id="WatchlistTable" class="WatchListArea">
	<tr class="WatchListHeader">
		<td class="WatchlistSymbolName"> Symbol </td>
		<td class="WatchlistRemoveAll"> Remove All </td>
	</tr>

<?php
	PopulateWatchlistFromDB( $user );
?>

</table>
