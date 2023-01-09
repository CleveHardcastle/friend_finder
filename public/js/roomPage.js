const roomId = document.querySelector('input[name="room-id"]').value;
const loggedIn = document.querySelector('input[name="is-loggedIn"]').value;
const userId = document.querySelector('input[name="userId"]').value;

const messageCreationFormHandler = async function (event) {
  event.preventDefault();

  const messageText = document.querySelector(
    'textarea[name="message-body"]'
  ).value;
  const roomId = document.querySelector('input[name="room-id"]').value;

  if (messageText == "") return;

  const response = await fetch("/api/message/", {
    method: "POST",
    body: JSON.stringify({
      text: messageText,
      room_id: roomId,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Message creation failed");
  }
};

const joinRoomHandler = async function (event) {
  event.stopPropagation();

  if (loggedIn) {
    await fetch("/api/room-member", {
      method: "POST",
      body: JSON.stringify({
        member_id: userId,
        room_id: roomId,
      }),
      headers: { "Content-Type": "application/json" },
    });
    document.location.reload();
  } else {
    document.location.replace('/login')
  }
};

// document.querySelector('#join-room').addEventListener('click', joinRoomHandler);
document
  .querySelector("#message-creation-form")
  .addEventListener("submit", messageCreationFormHandler);
