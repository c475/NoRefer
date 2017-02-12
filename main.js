var textbox = document.getElementById('thebox');
var help = document.getElementById('help');
var info = document.getElementById('info');

textbox.value = localStorage.getItem('filter') || '';

textbox.addEventListener('change', function (event) {
    localStorage.setItem('filter', event.target.value);
});

help.addEventListener('click', function (event) {
	if (event.target.innerText === 'Show help') {
		help.innerText = 'Close help';
		info.style.display = 'inline';
	} else {
		help.innerText = 'Show help';
		info.style.display = 'none';
	}
});
