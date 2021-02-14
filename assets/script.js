
let can_play = true;
let words = new Array("WOOD", "TIMBER", "MACHINE", "MOBILE", "MERGE",
 "CODES");

let to_guess = "";
let display_word = "";
let used_letters = "";
let wrong_guesses = 0;
//--------------end primary declarations-------------------//

//---function on event -------//
function selectLetter(l){
	if (can_play == false){
		return;
	}
	if (used_letters.indexOf(l) != -1){
		return;
	}
	document.getElementById(l).style.opacity = 0.5;
	if (to_guess.indexOf(l) != -1){
 // ---correct letter guess -----------------//
		pos = 0;
		temp_mask = display_word;
 
		while (to_guess.indexOf(l, pos) != -1){
			pos = to_guess.indexOf(l, pos);			
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
		can_play = false;
		}
	} else {
// -------incorrect letter guess----//
	used_letters += l;
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
	document.getElementById(l).style.opacity = 1;
	selectWord();
	used_letters = "";
	document.getElementById("usedLetters").innerHTML = used_letters;
	wrong_guesses = 0;
	document.getElementById("hm").src="assets/hang0.png";
} 
//-----random word + call createMask + display mask---//
function selectWord()
{
can_play = true;

random_number = Math.round(Math.random() * (words.length - 1));
to_guess = words[random_number];
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

