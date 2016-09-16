chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  console.log('background');
  chrome.runtime.sendMessage(tabs[0].id, {type: "getDuplicateStoryIds"}, function (duplicateIdArray){
      if (duplicateIdArray.length < 1) {
        console.log("no duplicates");
      } else {
        console.log(duplicateIdArray);
      }
  })
});

console.log("background");
