

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

function displayInfoBox () {
  var infoBox = document.querySelector('.info-box');
  infoBox.style.display = 'block';
}

function hideInfoBox () {
  var infoBox = document.querySelector('.info-box');
  infoBox.style.display = 'none';
}

function init() {
  var allComments = getAllComments(document.body);
  var storyComments = allComments.filter(function(comment) {
    return comment.nodeValue.match("name: stories");
  }).map(function(comment) {
    return comment.nodeValue.match(/(\d+)/g)[0];
  });

  let duplicateStoryIds = storyComments.filter(function(comment, i) {
    return storyComments.indexOf(comment) != i;
  })
  console.log(duplicateStoryIds);
  createInfoBox();
  chrome.runtime.onMessage.addListener(function(message, sender, response) {
      console.log(message.checkboxState);
      if (message.checkboxState ===  true) {
        console.log('on');
        console.log(duplicateStoryIds);
        displayInfoBox();
      } else {
        hideInfoBox();
        console.log('off');
      }
  });

}

chrome.runtime.onMessage.addListener(function(req, sender, sendRes) {
  console.log('content script message received');
})
init();
