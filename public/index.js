$(() => {
	const socket = io();
	let historyLoaded = false;

	const appendMessage = (message) => {
		$('#messages').append($('<li class="list-group-item"></li>').text(message));
	};

	socket.on('history', (history) => {
		if (!historyLoaded) {
			history.forEach((historicalMessage) => {
		  		appendMessage(historicalMessage);
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
		if(msg) {
			appendMessage(msg);
	  	}
	});
});