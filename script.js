const levels = {
    english:{
        1: {
            sentence: "The four jumbled words find then click the submit button complete the proverb / saying 'Think of the devil and ___________'",
            words: ["GIHH", "REAWA", "EPTS", "DELIS"],
            answers: ["high", "aware", "step", "slide"]
        },
        2: {
            sentence: "The four jumbled words find then click the submit button complete the slogan 'Liberty, Equality and ___________",
            words: ["DENMA", "ERFHAT", "NOIRY", "RHYITT"],
            answers: ["amend", "father", "irony", "thirty"]
        }
    }, 
    tamil:{
        1: {
            sentence: "பாரதியாரின் கவிதையின் தலைப்பை பூர்த்தி செய்யும் வகையில், நான்கு குழப்பமான சொற்களைக் கண்டறிந்த பிறகு, சமர்ப்பி பொத்தானைக் கிளிக் செய்து முடிக்கவும் 'என்று தணியும் இந்த ___________'",
            words: ["சும்நாதர", "பல்ந்த", "குள்கரைதி", "னம்மைதா"],
            answers: ["நாதசுரம்", "பந்தல்", "குதிரைகள்", "மைதானம்"]
        },
        2: {
            sentence: "பழமொழியை பூர்த்தி செய்யும் வகையில், நான்கு குழப்பமான சொற்களைக் கண்டறிந்த பிறகு, சமர்ப்பி பொத்தானைக் கிளிக் செய்து முடிக்கவும் 'யானைக்கு ஒரு காலம் என்றால் ___________",
            words: ["குத்துஒமக்", "ரம்பமனை", "எக்கரும்பூ", "காலம்பர"],
            answers: ["ஒக்குமத்து", "பனைமரம்", "எருக்கம்பூ", "பலகாரம்"]
        }
    }
};

let currentLevel = null;
let language = "";

function loadLevel(level) {
    currentLevel = level;
    document.getElementById('home-page').classList.remove('active');
    if(language==="english"){
        document.getElementById('english-level-inside-page').classList.add('active');
        document.getElementById('english-level-page').classList.remove('active');
        document.getElementById('sentence').textContent = levels[language][level].sentence;
    levels[language][level].words.forEach((word, index) => {
        document.getElementById(`jumbled-word-${index + 1}`).textContent = word;
        document.getElementById(`input-word-${index + 1}`).value = "";
    });
    } else if(language==="tamil") {
        document.getElementById('tamil-level-inside-page').classList.add('active');
        document.getElementById('tamil-level-page').classList.remove('active');
        document.getElementById('sentencex').textContent = levels[language][level].sentence;
    levels[language][level].words.forEach((word, index) => {
        document.getElementById(`jumbled-wordx-${index + 1}`).textContent = word;
        document.getElementById(`input-wordx-${index + 1}`).value = "";
    });
    }
}

function goHome() {
    currentLevel = null;
    document.getElementById('home-page').classList.add('active');
    document.getElementById('tamil-level-page').classList.remove('active');
    document.getElementById('english-level-page').classList.remove('active');
    document.getElementById('tamil-level-inside-page').classList.remove('active');
    document.getElementById('english-level-inside-page').classList.remove('active');    
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
        loadLevel(next);
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
        loadLevel(previous);
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
        : ['input-wordx-1', 'input-wordx-2', 'input-wordx-3', 'input-wordx-4'];

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
        const inputValue = document.getElementById(inputFields[i]).value.trim();
        if (!inputValue) return alert(errorMessage);
        inputValues.push(language === "english" ? inputValue.toLowerCase() : inputValue);
    }

    const data = unmatchCount(lst, inputValues);
    
    if (data['matchedIndices']) {
        if (data['matchedIndices'].length === lst.length) {
            alert(completionMessage);
        } else {
            alert(unmatchedMessage.replace("{indices}", data["unmatchedIndices"].join(',')));
        }
    } else {
        alert(allUnmatchedMessage);
    }
}


function Tamil(){
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('tamil-level-page').classList.add('active');
    language = "tamil";
}

function English(){
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('english-level-page').classList.add('active');
    language = "english";
}
