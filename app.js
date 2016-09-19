

function getAllComments(rootElem) {
    var comments = [];
    // Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
    var iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, filterNone, false);
    var curNode;
    while (curNode = iterator.nextNode()) {
        if (curNode.nodeValue.indexOf("start of widget id:") > -1) {
            comments.push(curNode);
        }
    }
    return comments;
}

function filterNone() {
    return NodeFilter.FILTER_ACCEPT;
}

function createInfoBox() {
  var infoBox = document.createElement('div');
  infoBox.classList.add('info-box');
  document.body.appendChild(infoBox);
}

function displayInfoBox (duplicateStoryIds) {
  var infoBox = document.querySelector('.info-box');
  pushToInfoBox(duplicateStoryIds);
  infoBox.style.display = 'block';
}

function hideInfoBox () {
  var infoBox = document.querySelector('.info-box');
  infoBox.style.display = 'none';
}

function pushToInfoBox (idArray) {
  var msg = document.createElement('div');
  var infoBox = document.querySelector('.info-box');
  if (idArray.length === 0) {
    msg.innerHTML = "There are no duplicate articles on the page.";
    infoBox.appendChild(msg);
  } else if (infoBox) {
    msg.innerHTML = "The following duplicates have been found on the page:";
    infoBox.appendChild(msg);
    idArray.forEach(function(id) {
      var el = document.createElement('li');
      el.innerHTML = id;
      infoBox.appendChild(el);
    })
  }
}

function init() {
  var allComments = getAllComments(document.body);
  var storyComments = [];
  storyComments = allComments.filter(function(comment) {
    return comment.nodeValue.match("name: stories");
  }).map(function(comment) {
    return comment.nodeValue.match(/(\d+)/g)[0];
  });

  // storyComments.push("123", "456");
  // storyComments.push("123", "456");
  let duplicateStoryIds = storyComments.filter(function(comment, i) {
    return storyComments.indexOf(comment) != i;
  })

  createInfoBox();

  if (localStorage.getItem('checkboxState')) {
    displayInfoBox(duplicateStoryIds);
  }

  chrome.runtime.onMessage.addListener(function(message, sender, response) {
      localStorage.setItem('checkboxState', message.checkboxState);
      if (message.checkboxState ===  true) {
        displayInfoBox(duplicateStoryIds);
      } else {
        document.querySelector('.info-box').innerHTML = "";
        hideInfoBox();
      }
  });
}

init();
