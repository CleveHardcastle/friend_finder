const messageCreationFormHandler = async function(event) {
    event.preventDefault();

    const messageText = document.querySelector('textarea[name="message-body"]').value;
    const roomId = document.querySelector('input[name="room-id"]').value;

    if (messageText == '')
        return;

    const response = await fetch('/api/message/', {
        method: 'POST',
        body: JSON.stringify({
            text: messageText,
            room_id: roomId
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Message creation failed');
    }
};

document.querySelector('#message-creation-form').addEventListener('submit', messageCreationFormHandler);