let down_btn = 'chevron-down-solid.svg';
let up_btn = 'chevron-up-solid.svg';

// Declaring global variables
window.onload = () => {
    window.picker = document.getElementById('color-picker');
    window.trash = document.getElementById('trash');
}

// Discard color picker on escape
document.addEventListener('keyup', (e) => {
    if(e.key === "Escape") {
        clearModal(false);
    }
});

window.picker = document.getElementById('color-picker');
function toggleList(ev) {
    let hidden =  ev.target.src.includes(down_btn);
    let list = ev.target.parentElement.parentElement.querySelector('.colors-list');
    if(list)
        if (hidden) {
            list.style.display = 'block';
            ev.target.src = up_btn;
        } else {
            list.style.display = 'none';
            ev.target.src = down_btn;
        }
}

function showPicker(user_id, color_id) {
    window.picker.dataset.user_id = user_id;
    window.picker.style.visibility = 'visible';
    if (color_id) {
        window.picker.dataset.color_id = color_id;
        window.trash.dataset.user_id = user_id;
        window.trash.dataset.color_id = color_id;
        window.trash.style.visibility = 'visible'
    }
}

function insertColor(new_color) {
    let req = (window.picker.dataset.color_id)
        ? 'http://localhost/api/user/' + window.picker.dataset.user_id + '/color/'
        + window.picker.dataset.color_id + '?replaceWith=' + new_color
        : 'http://localhost/api/user/' + window.picker.dataset.user_id + '/color/' + new_color;
    fetch(req, { method: 'PUT' })
        .then(response => response.json())
        .then(data => {
            clearModal();
        });
}

function deleteColor() {
    let req =  'http://localhost/api/user/' + window.picker.dataset.user_id + '/color/' + window.trash.dataset.color_id;
    fetch(req, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            clearModal();
        });
}

function clearModal(refresh = true) {
    delete window.picker.dataset.user_id;
    delete window.picker.dataset.color_id;
    window.picker.style.visibility = 'hidden';
    window.trash.style.visibility = 'hidden';
    if(refresh)
        location.reload();
}