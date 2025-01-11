const levels = {
    english:{
        1: {
            sentence: "<u style='color: red;'>Use the letters in the circle.</u> The four jumbled words find then click the submit button complete the proverb / saying 'Think of the devil and ___________'",
            words: ["GIHH", "REAWA", "EPTS", "DELIS"],
            circle: [[0,3],[3,4],[1,2],[0,2,4]],
            answers: ["high", "aware", "step", "slide"],
            blank: "<u style='color: red;'>Use the letters in the circle.</u> The four jumbled words find then click the submit button complete the proverb / saying 'Think of the devil and <u style='color: green;'>there he is</u>'"
        },
        2: {
            sentence: "<u style='color: red;'>Use the letters in the circle.</u> The four jumbled words find then click the submit button complete the slogan 'Liberty, Equality and ___________'",
            words: ["DENMA", "ERFHAT", "NOIRY", "RHYITT"],
            circle: [[0,2],[0,2,5],[0,3],[0,3,5]],
            answers: ["amend", "father", "irony", "thirty"],
            blank:"<u style='color: red;'>Use the letters in the circle.</u> The four jumbled words find then click the submit button complete the slogan 'Liberty, Equality and <u style='color: green;'>Fraternity</u>'"
        }
    }, 
    tamil:{
        1: {
            sentence: "<u style='color: red;'>வட்டத்தில் உள்ள எழுத்துக்களை பயன்படுத்தி.</u> பாரதியாரின் கவிதையின் தலைப்பை பூர்த்தி செய்யும் வகையில், நான்கு குழப்பமான சொற்களைக் கண்டறிந்த பிறகு, சமர்ப்பி பொத்தானைக் கிளிக் செய்து முடிக்கவும் 'என்று தணியும் இந்த ___________'",
            words: [{word:"சும்நாதர",value:5}, {word:"பல்ந்த",value:4}, {word:"குள்கரைதி",value:5}, {word:"னம்மைதா",value:4}],
            circle: [[2,3,4],[1,2],[1,3],[1]],
            answers: ["நாதசுரம்", "பந்தல்", "குதிரைகள்", "மைதானம்"],
            blank:"<u style='color: red;'>வட்டத்தில் உள்ள எழுத்துக்களை பயன்படுத்தி.</u> பாரதியாரின் கவிதையின் தலைப்பை பூர்த்தி செய்யும் வகையில், நான்கு குழப்பமான சொற்களைக் கண்டறிந்த பிறகு, சமர்ப்பி பொத்தானைக் கிளிக் செய்து முடிக்கவும் 'என்று தணியும் இந்த <u style='color: green;'>சுதந்திர தாகம்</u>'"
        },
        2: {
            sentence: "<u style='color: red;'>வட்டத்தில் உள்ள எழுத்துக்களை பயன்படுத்தி.</u> பழமொழியை பூர்த்தி செய்யும் வகையில், நான்கு குழப்பமான சொற்களைக் கண்டறிந்த பிறகு, சமர்ப்பி பொத்தானைக் கிளிக் செய்து முடிக்கவும் 'யானைக்கு ஒரு காலம் என்றால் ___________'",
            words: [{word:"குத்துஒமக்",value:6}, {word:"ரம்பமனை",value:5}, {word:"எக்கரும்பூ",value:6}, {word:"காலம்பர",value:5}],
            circle: [[0,1,2],[1,4],[1,4,5],[1,2]],
            answers: ["ஒக்குமத்து", "பனைமரம்", "எருக்கம்பூ", "பலகாரம்"],
            blank:"<u style='color: red;'>வட்டத்தில் உள்ள எழுத்துக்களை பயன்படுத்தி.</u> பழமொழியை பூர்த்தி செய்யும் வகையில், நான்கு குழப்பமான சொற்களைக் கண்டறிந்த பிறகு, சமர்ப்பி பொத்தானைக் கிளிக் செய்து முடிக்கவும் 'யானைக்கு ஒரு காலம் என்றால் <u style='color: green;'>பூனைக்கும் ஒரு காலம்</u>'"
        }
    }
};

let currentLevel = null;
let language = "";

function loadLevel(level,language) {
    if(document.querySelectorAll('.input-box-wrap')){
        document.querySelectorAll('.input-box-wrap').forEach(elem => {
            elem.remove();
        });
    }
    currentLevel = level;
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('english-level-inside-page').classList.remove('hidden-elem');
    if(language==="english"){
        let circle = levels[language][level].circle;
        document.querySelector('.navigation.english').classList.remove('hidden-elem');
        document.querySelector('.submit-english').classList.remove('hidden-elem');
        document.querySelector('.submit-tamil').classList.add('hidden-elem');
        document.getElementById('english-level-page').classList.add('hidden-elem');
        document.getElementById('sentence').innerHTML = levels[language][level].sentence;

        levels[language][level].words.forEach((word, index) => {
        document.getElementById(`jumbled-word-${index + 1}`).textContent = word;

            word.split('').forEach((letter, square) =>{
                const inputBoxWrap = Object.assign(document.createElement("div"), { className: "input-box-wrap", innerHTML: '<input type="text" class="input-1-box" maxlength="1">' });
                document.querySelector(`.input-word-${index + 1}`).appendChild(inputBoxWrap);

                if(circle[index].includes(square)) {
                    inputBoxWrap.classList.add('circle');
                }

            })
        });
    } else if(language==="tamil") {
        let circle = levels[language][level].circle;
        document.getElementById('tamil-level-page').classList.add('hidden-elem');
        document.querySelector('.navigation.tamil').classList.remove('hidden-elem');
        document.querySelector('.submit-tamil').classList.remove('hidden-elem');
        document.querySelector('.submit-english').classList.add('hidden-elem');
        document.getElementById('sentence').innerHTML = levels[language][level].sentence;

        levels[language][level].words.forEach((word, index) => {
        document.getElementById(`jumbled-word-${index + 1}`).textContent = word.word;

        Array.from({ length: word.value }).forEach((_, square) => {

            const inputBoxWrap = Object.assign(document.createElement("div"), {
                className: "input-box-wrap",
                innerHTML: '<input type="text" class="input-1-box" maxlength="3">'
            });

            document.querySelector(`.input-word-${index + 1}`).appendChild(inputBoxWrap);

            if (circle[index].includes(square)) {
                    inputBoxWrap.classList.add('circle');
                }
            });
        });
    }

    document.querySelectorAll('.input-1-box').forEach((elem, index) => {
        elem.addEventListener("input", (e) => {
            if (e.key !== "Backspace") {
                document.querySelectorAll('.input-1-box')[index+1].focus();
            }
        });
    
        elem.addEventListener("keydown", (e) => {
            if (e.key === "Backspace") {
                if (elem.value == ""){
                    document.querySelectorAll('.input-1-box')[index-1].value="";
                    document.querySelectorAll('.input-1-box')[index-1].focus();
                } else {
                    elem.value = "";
                }
            }
        });

        elem.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") {
                if (elem !== ""){
                    document.querySelectorAll('.input-1-box')[index+1].focus();
                }
            }
        });
        elem.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                document.querySelectorAll('.input-1-box')[index-1].focus();
            }
        });
    });
}

function goHome() {
    currentLevel = null;
    document.getElementById('home-page').classList.add('active');
    document.querySelector('.navigation.tamil').classList.add('hidden-elem');
    document.querySelector('.navigation.english').classList.add('hidden-elem');
    document.querySelector('#english-level-page').classList.add('hidden-elem');
    document.querySelector('#tamil-level-page').classList.add('hidden-elem');
    document.getElementById('english-level-inside-page').classList.add('hidden-elem');    
}

function exitGame() {
    if(language==="english"){
        alert("Thank you for playing!");
    } else if(language==="tamil"){
        alert("விளையாடியதற்கு நன்றி!");
    }
    goHome();
}

function nextLevel() {
    const next = currentLevel + 1;
    if (levels[language][next]) {
        loadLevel(next,language);
    } else {
        if(language==="english"){
            alert("Congratulations! You completed all levels.");
        } else if(language==="tamil"){
            alert("வாழ்த்துகள்! அனைத்து நிலைகளையும் முடித்துவிட்டீர்கள்.");
        }
        goHome();
    }
}

function goBack() {
    const previous = currentLevel - 1;
    if (levels[language][previous]) {
        loadLevel(previous,language);
    } else {
        if(language==="english"){
            alert("You are already at the first level.");
        } else if(language==="tamil"){
            alert("நீங்கள் ஏற்கனவே முதல் நிலையில் இருக்கிறீர்கள்.");
        }
    }
}

function unmatchCount(lst1, lst2){
    const unmatchedIndices = [];
    const matchedIndices = [];
    lst1.forEach((text, index) => {
        if (text == lst2[index]) {
            matchedIndices.push(index+1);
        }else{
            unmatchedIndices.push(index+1);
        }
    });
    return {matchedIndices, unmatchedIndices};
}

function goSubmit() {
    const lst = levels[language][currentLevel].answers;
    const inputFields = language === "english"
        ? ['input-word-1', 'input-word-2', 'input-word-3', 'input-word-4']
        : ['input-word-1', 'input-word-2', 'input-word-3', 'input-word-4'];

    const errorMessage = language === "english" 
        ? "Find all words!" 
        : "எல்லா வார்த்தைகளையும் கண்டுபிடி!";

    const completionMessage = language === "english"
        ? `Level ${currentLevel} completed successfully!`
        : `நிலை ${currentLevel} வெற்றிகரமாக முடிந்தது!!`;

    const unmatchedMessage = language === "english"
        ? "Arranged {indices} is not match the answer!"
        : "வரிசைப்படுத்தப்பட்ட {indices} ஆனது பதிலுடன் பொருந்தவில்லை!";

    const allUnmatchedMessage = language === "english"
        ? "Arranged all words is not match the answer!"
        : "அனைத்து வார்த்தைகளும் பதிலுடன் பொருந்தவில்லை!";

    const inputValues = [];
    for (let i = 0; i < inputFields.length; i++) {
        let allValues = document.querySelectorAll(`.${inputFields[i]} .input-box-wrap .input-1-box`);
        let inputValue = "";
        allValues.forEach(input =>{
            inputValue += String(input.value);
        });
        if (!inputValue) return alert(errorMessage);
        inputValues.push(language === "english" ? inputValue.toLowerCase() : inputValue);
    }
    const data = unmatchCount(lst, inputValues);
    
    if (data.matchedIndices.length === lst.length) {
        if (language === "english") {
            document.getElementById('sentence').innerHTML = levels[language][currentLevel].blank;
        } else if (language === "tamil") {
            document.getElementById('sentence').innerHTML = levels[language][currentLevel].blank;
        }
        alert(completionMessage);
    } else if (data.unmatchedIndices.length > 0) {
        if (language === "english") {
            document.getElementById('sentence').innerHTML = levels[language][currentLevel].sentence;
        } else if (language === "tamil") {
            document.getElementById('sentence').innerHTML = levels[language][currentLevel].sentence;
        }
        alert(unmatchedMessage.replace("{indices}", data.unmatchedIndices.join(',')));
    } else {
        if (language === "english") {
            document.getElementById('sentence').innerHTML = levels[language][currentLevel].sentence;
        } else if (language === "tamil") {
            document.getElementById('sentence').innerHTML = levels[language][currentLevel].sentence;
        }
        alert(allUnmatchedMessage);
    }
}


function Tamil(){
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('tamil-level-page').classList.remove('hidden-elem');
    language = "tamil";
}

function English(){
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('english-level-page').classList.remove('hidden-elem');
    language = "english";
}