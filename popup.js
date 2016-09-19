var toggleButton = document.querySelector("input")
function saveToLocal () {
  localStorage.setItem('checkboxState', toggleButton.checked);
  animateCheckbox();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {checkboxState: toggleButton.checked}, function(response) {
      console.log('received response');
    })
  })
}

function loadFromLocal () {
  toggleButton.checked = JSON.parse(localStorage.getItem('checkboxState'));
  animateCheckbox();
}

function animateCheckbox () {
  toggleButton.checked ? toggleButton.classList.add('checked') : toggleButton.classList.remove('checked');
}
window.onload = function() {
  loadFromLocal();
}
toggleButton.addEventListener('click', saveToLocal);
