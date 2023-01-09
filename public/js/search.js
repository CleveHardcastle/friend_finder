
const searchFormHandler = async function(event) {
    event.preventDefault();

    const searchText = document.querySelector('input[name="search"]').value;
    const loggedIn = document.querySelector('input[name="is-loggedIn"]').value;
    
    const search = searchText.split(" ").join("_");

    document.location.replace(`/search/${search}`);

}

document.querySelector('#search-form').addEventListener('submit', searchFormHandler);