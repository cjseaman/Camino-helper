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


setTimeout(function() {
	
	var averageWordCount = countOtherWords();

	var findDoc = window.setInterval(function(){
		if((iframeBox = document.querySelector('[title="Rich Text Area. Press ALT+F8 for help"]')) != null) {
			doc = iframeBox.contentDocument;
			iframeDocBox = doc.getElementById('tinymce');
			clearInterval(findDoc);
			
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

function countWords(s){
	if(s.match(/[a-z]/i)) {
		s = s.replace(/(^\s*)|(\s*$)/gi,"");
		s = s.replace(/\n /gi," ");
		s = s.replace(/\n\n/gi," ");
		s = s.replace(/[ ]{2,}/gi," ");
		return s.split(' ').length;
	} else return 0;
}

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
