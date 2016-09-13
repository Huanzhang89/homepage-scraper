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

function init() {
  var allComments = getAllComments(document.body);
  var storyComments = allComments.filter(function(comment) {
    return comment.nodeValue.match("name: stories");
  }).map(function(comment) {
    return comment.nodeValue.match(/(\d+)/g)[0];
  });
  storyComments.push("123", "123");
  let duplicateStoryIds = storyComments.filter(function(comment, i) {
    return storyComments.indexOf(comment) != i;
  })
  alert(storyComments);
  console.log(duplicateStoryIds);
  console.log(storyComments);
  console.log(allComments);
}

init();
