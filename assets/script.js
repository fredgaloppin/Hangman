
let can_play = true;

// const words = new Array("WOOD", "TIMBER", "MACHINE", "MOBILE", "MERGE",
//  "CODES");
let to_guess = "";
let display_word = "";
let used_letters = "";
let wrong_guesses = 0;
//--------------end primary declarations-------------------//

//---function on event -------//
function selectLetter(l){
	if (can_play == false){
		alert('re-start a New game');
	}
	let letter = l.toLowerCase();
	if (used_letters.indexOf(letter) != -1){
		return;
	}
	document.getElementById(l).style.opacity = 0.5;
	if (to_guess.indexOf(letter) !== -1){
 // ---correct letter guess -----------------//
		let pos = 0;
		temp_mask = display_word;
		while (to_guess.indexOf(letter, pos) != -1){
			pos = to_guess.indexOf(letter, pos);			
			end = pos + 1;
			
			start_text = temp_mask.substring(0, pos);
			end_text = temp_mask.substring(end, temp_mask.length);
			
			temp_mask = start_text + l + end_text;
			pos = end;
		}
 
	display_word = temp_mask;
	document.getElementById("displayWord").innerHTML = display_word;
 
		if (display_word.indexOf("*") == -1){
// -------won ----------------------------//
			document.getElementById("message").innerHTML = "Well done, you're free!";
			document.getElementById("attempts").innerHTML = "Let's party!";
			if (wrong_guesses == 0) {
				document.getElementById("attempts").innerHTML = "A perfect, let's party! ";
			}
			document.getElementById("hm").src = "assets/won.webp";
		can_play = false;
		}
	} else {
// -------incorrect letter guess----//
	used_letters += letter;
	document.getElementById("usedLetters").innerHTML = used_letters;
	wrong_guesses += 1;

	document.getElementById("hm").src = "assets/hang" + wrong_guesses + ".png";
	document.getElementById("attempts").innerHTML = 10-wrong_guesses+" wrong guesse(s) left";
		if (wrong_guesses == 10){
//----- lost-------------------//
			document.getElementById("message").innerHTML = "Poor lad, Far West is so unfair! Whatever, the last one at the saloon buy a round of grogs!";
			document.getElementById("attempts").innerHTML = "";
			document.getElementById("displayWord").innerHTML = to_guess;
			can_play = false;
		}
	}
}
//-------- function ---- reset---+ call selectWord-------//
function reset(){
	document.getElementById("message").innerHTML = "";
	document.getElementById("attempts").innerHTML = "";
	let arr = document.getElementsByTagName("button");
	for (let index = 0; index < arr.length; index++) {
		const element = arr[index];
		element.style.opacity = 1
	}
	
	
	selectWord();
	used_letters = "";
	document.getElementById("usedLetters").innerHTML = used_letters;
	wrong_guesses = 0;
	document.getElementById("hm").src="assets/hang0.png";
} 
//-----random word + call createMask + display mask---//
function selectWord() {
	can_play = true;

	random_number = Math.round(Math.random() * (words.length - 1));
	to_guess = words[random_number];
	console.log(to_guess);
	// -----------display masked word-----------------------------//
	masked_word = createMask(to_guess);
	document.getElementById("displayWord").innerHTML = masked_word;
	display_word = masked_word;
}
 // --- funtcion createMask------//
function createMask(m){
	mask = "";
	word_lenght = m.length;
 
	for (i = 0; i < word_lenght; i ++){
		mask += "*";
	}
	return mask;
}
function displayLetters (){
	const alpha = Array.from(Array(26)).map((e, i) => i + 65);
	const alphabet = alpha.map((x) => String.fromCharCode(x));

	alphabet.forEach(currentLetter => {
		let addLetter = document.createElement("a");
		addLetter.href = 'javascript:selectLetter("'+ currentLetter +'")';
		let addButton = document.createElement("button");
		addButton.className = "px-4 py-1.5 bg-yellow-500 rounded-full border";
		addButton.type = "button"
		addButton.id = currentLetter;
		addButton.innerHTML = currentLetter;
		addLetter.append(addButton);
		let myAlphabetSection = document.getElementById('alphabet');
	
		myAlphabetSection.append(addLetter);
		
	});
}
