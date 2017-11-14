$(() => {
	const socket = io();
	let historyLoaded = false;

	socket.on('history', (history) => {
		if (!historyLoaded) {
			history.forEach((historicalMessage) => {
		  		$('#messages').append($('<li>').text(historicalMessage));
		  		historyLoaded = true;
		  	});
	  	}
	});
	      
	$('form').submit((e) => {
		e.preventDefault();
		socket.emit('chat message', $('#message-input').val());
		$('#message-input').val('');
		return false;
	});

	socket.on('chat message', (msg) => {
	  	$('#messages').append($('<li>').text(msg));
	});
});