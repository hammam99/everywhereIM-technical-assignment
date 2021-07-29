let down_btn = 'chevron-down-solid.svg';
let up_btn = 'chevron-up-solid.svg';

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
    const picker = document.getElementById('color-picker');
    const trash = document.getElementById('trash');
    console.log(user_id);
    picker.dataset.user_id = user_id;
    picker.style.visibility = 'visible';
    if (color_id) {
        picker.dataset.color_id = color_id;
        trash.dataset.user_id = user_id;
        trash.dataset.color_id = color_id;
        trash.style.visibility = 'visible'
    }
}

function insertColor(new_color) {
    const picker = document.getElementById('color-picker');
    let req = (picker.dataset.color_id)
        ? 'http://localhost/api/user/' + picker.dataset.user_id + '/color/'
        + picker.dataset.color_id + '?replaceWith=' + new_color
        : 'http://localhost/api/user/' + picker.dataset.user_id + '/color/' + new_color;
    fetch(req, { method: 'PUT' })
        .then(response => response.json())
        .then(data => {
            clearModal();
        });
}

function deleteColor() {
    const picker = document.getElementById('color-picker');
    const trash = document.getElementById('trash');
    let req =  'http://localhost/api/user/' + picker.dataset.user_id + '/color/' + trash.dataset.color_id;
    fetch(req, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            clearModal();
        });
}

function clearModal() {
    const picker = document.getElementById('color-picker');
    const trash = document.getElementById('trash');
    delete picker.dataset.user_id;
    delete picker.dataset.color_id;
    picker.style.visibility = 'hidden';
    trash.style.visibility = 'hidden';
    location.reload();
}