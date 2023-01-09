const messages = document.querySelectorAll("#message-list button");
const members = document.querySelectorAll("#member-list button");
const roomId = document.querySelector('input[name="room-id"]').value;

const editRoomFormHandler = async function (event) {
  event.preventDefault();

  const titleText = document.querySelector('input[name="title"]').value;
  const descriptionText = document.querySelector(
    'textarea[name="description"]'
  ).value;

  if (titleText == "" || descriptionText == "") {
    alert("Title and Description must not be empty");
    return;
  }

  const response = await fetch(`/api/room/${roomId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: titleText,
      description: descriptionText,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/room/${roomId}`);
  } else {
    alert("Room Edit failed");
  }
};

const messageDeleteHandler = async function (event) {

  const messageId = event.target.id;
  const response = await fetch(`/api/message/${messageId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Message Deletion Failed");
  }
};

const memberDeleteHandler = async function (event) {
  event.stopPropagation();
  const roomMemberId = event.target.id;
  const response = await fetch(`/api/room-member/${roomMemberId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Room Member Deletion Failed");
  }
};

const deleteRoomHandler = async function (event) {
  event.stopPropagation();
  const response = await fetch(`/api/room/${roomId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Room Deletion Failed");
  }
};

for (var i = 0; i < messages.length; i++) {
  messages[i].addEventListener("click", messageDeleteHandler);
}
for (var i = 0; i < members.length; i++) {
  members[i].addEventListener("click", memberDeleteHandler);
}

document
  .querySelector("#room-edit-form")
  .addEventListener("submit", editRoomFormHandler);
document.querySelector("#delete").addEventListener("click", deleteRoomHandler);
