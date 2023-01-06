let newInterestCount = 0;

// Inserts entry field for interests when add button is clicked
const addInterest = (event) => {
  event.preventDefault();
  event.stopPropagation();


  const formTemplate = document.getElementById('template');
  const newEntryCount = document.querySelectorAll(".interest-grid-new").length;

  // checks if there is already an empty field added, if so duplicate the input fields
  if (newEntryCount === 1 && formTemplate.classList.contains('hidden')) {
    formTemplate.classList.remove('hidden');
  } else {
    const newFormGrid = document.querySelector(".interest-grid-new").cloneNode(true);
    newFormGrid.querySelector('textarea[name="interest-body"]').value = '';
    document.querySelector('#user-interest').appendChild(newFormGrid);
  }
}

// saves edited user information (first/last name, gender, age, about)
const saveUserInfo = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  console.log("here i am")
  const userId = document.querySelector('input[name="userId"]').value;
  const first_name = document.querySelector('input[name="first-name"]').value;
  const last_name= document.querySelector('input[name="last-name"]').value;
  const age = document.querySelector('input[name="age"]').value;
  const gender = document.querySelector('select[name="gender"]').value;
  const description = document.querySelector('textarea[name="description"]').value;

  await fetch(`/api/user/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ first_name, last_name, age, gender,description })
  });

  document.location.replace(`/profile/${userId}`);
}

// updates/creates all interest edits
const saveInterest = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const userId = document.querySelector('input[name="userId"]').value;
  const updateEntries = document.querySelectorAll('.interest-grid');
  const newEntries = document.querySelectorAll('.interest-grid-new');

  // updates existing interests
  if (updateEntries.length > 0) {
    for ( let i = 0; i < updateEntries.length; i++ ){
      const interestId = updateEntries[i].querySelector('select[name="interest-category"]').id;
      const category_id = updateEntries[i].querySelector('select[name="interest-category"]').value;
      const body = updateEntries[i].querySelector('textarea[name="interest-body"]').value;

      await fetch(`/api/interest/${interestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_id, body })
      });
    }
  }

  // creates all new interests
  if (newEntries.length > 0) {
    for ( let i = 0; i < newEntries.length; i++ ){
      const category_id = newEntries[i].querySelector('select[name="interest-category"]').value;
      const body = newEntries[i].querySelector('textarea[name="interest-body"]').value;

      await fetch(`/api/interest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_id, body })
      });
    }
  }

  document.location.replace(`/profile/${userId}`);
  
}

// removes an interest
const deleteInterest = async (event) => {
  event.stopPropagation();
  event.preventDefault();

  const userId = document.querySelector('input[name="userId"]').value;
  const interestId = event.target.id;

  await fetch(`/api/interest/${interestId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace(`/profile/edit/${userId}`)
}

// return to profile without making changes 
const cancelEdit = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const userId = document.querySelector('input[name="userId"]').value;
  document.location.replace(`/profile/${userId}`);
}

// deletes the user, irreversable
const deleteUser = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const userId = document.querySelector('input[name="userId"]').value;

  await fetch(`/api/user/${userId}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' }
  })

  document.location.replace('/');
}


document.querySelector('#user-info').addEventListener('submit', saveUserInfo);
document.querySelector('#interest-form').addEventListener('submit', saveInterest);