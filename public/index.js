$(() => {
	const socket = io();
	let historyLoaded = false;
	$messageContainer = $('#messages');

	const appendMessage = (message) => {
		$messageContainer.append($('<li class="list-group-item"></li>').text(message));
		$messageContainer.stop().animate({
  			scrollTop: $messageContainer[0].scrollHeight
		});
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