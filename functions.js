//Collin Seaman
//
//Camino Word Counter
//
//Counts words inside comment box, displays word count as a number updated every .5 sec, and shows average word count of all other posts.

var iframeBox;
var iframeDocBox;
var iframeDocText;
var bottomBox;
var wordCount;
var doc;
var otherPosts = [];
var postText;
var counterNode;
var otherText = [];

//main function runs every 3 seconds until findDoc() is initialized (comment page is loaded)

setTimeout(function() {

	//sets averageWordCount() to the number of total words in all other comments divided by the number of comments
	
	var averageWordCount = countOtherWords();

	//Once findDoc() is initialized, function runs every 1 seconds, searching for the comment box. Once comment box is found, clears findDoc() interval and runs findText()

	var findDoc = window.setInterval(function(){
		if((iframeBox = document.querySelector('[title="Rich Text Area. Press ALT+F8 for help"]')) != null) {
			doc = iframeBox.contentDocument;
			iframeDocBox = doc.getElementById('tinymce');
			clearInterval(findDoc);
			
			//Gets html from iframe comment box as a string and passes it to countWords()

			var findText = window.setInterval(function() {
				iframeDocText = getAllWords(iframeDocBox);
				wordCount = countWords(iframeDocText);
				bottomBox = document.getElementsByClassName("clearfix");
				bottomBox[1].innerHTML = "word count: "+ wordCount + ", " + "mean word count: " + averageWordCount;
			}, 500);
		
		}
	}, 1000);

}, 3000);

function getAllWords(container) {
    var allInternal = container.innerText;
    return allInternal;
}

//counts words given a string s of characters

function countWords(s){
	if(s.match(/[a-z]/i)) {
		s = s.replace(/(^\s*)|(\s*$)/gi,"");
		s = s.replace(/\n /gi," ");
		s = s.replace(/\n\n/gi," ");
		s = s.replace(/[ ]{2,}/gi," ");
		return s.split(' ').length;
	} else return 0;
}

//Finds all posts on page and returns the average word count of those posts

function countOtherWords() {
	var count = 0;
	var words;
	otherPosts = document.getElementsByClassName("message user_content");
	for(var i = 1; i < otherPosts.length; i++) {
		words = getAllWords(otherPosts[i]);
		count += countWords(words);
	}
	count = count / (otherPosts.length - 1);
	count = count.toFixed();
	return count;
}
