var textbox = document.getElementById('thebox');

textbox.value = localStorage.getItem('filter') || '';

textbox.addEventListener('change', function (event) {
    localStorage.setItem('filter', event.target.value);
});
