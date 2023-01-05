const createRoomFormHandler = async function(event) {
    event.preventDefault();

    const roomTitle = document.querySelector('input[name="title"]').value;
    const roomDescription = document.querySelector('textarea[name="description"]').value;

    const response = await fetch('/api/room/', {
        method: 'POST',
        body: JSON.stringify({
            title: roomTitle,
            description: roomDescription
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Room Creation Failed');
    }
};

document.querySelector('#room-creation-form').addEventListener('submit', createRoomFormHandler);