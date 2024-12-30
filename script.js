const levels = {
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
};

let currentLevel = null;

function loadLevel(level) {
    currentLevel = level;

    document.getElementById('sentence').textContent = levels[level].sentence;
    levels[level].words.forEach((word, index) => {
        document.getElementById(`jumbled-word-${index + 1}`).textContent = word;
        document.getElementById(`input-word-${index + 1}`).value = "";
    });

    document.getElementById('home-page').classList.remove('active');
    document.getElementById('level-page').classList.add('active');
}

function goHome() {
    currentLevel = null;
    document.getElementById('home-page').classList.add('active');
    document.getElementById('level-page').classList.remove('active');
}

function exitGame() {
    alert("Thank you for playing!");
    goHome();
}

function nextLevel() {
    const next = currentLevel + 1;
    if (levels[next]) {
        loadLevel(next);
    } else {
        alert("Congratulations! You completed all levels.");
        goHome();
    }
}

function goBack() {
    const previous = currentLevel - 1;
    if (levels[previous]) {
        loadLevel(previous);
    } else {
        alert("You are already at the first level.");
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
    const lst = levels[currentLevel].answers;
    const inputVal1 = document.getElementById('input-word-1').value.toLowerCase();
    if (!inputVal1) return alert("Find all words!");
    const inputVal2 = document.getElementById('input-word-2').value.toLowerCase();
    if (!inputVal2) return alert("Find all words!");
    const inputVal3 = document.getElementById('input-word-3').value.toLowerCase();
    if (!inputVal3) return alert("Find all words!");
    const inputVal4 = document.getElementById('input-word-4').value.toLowerCase();
    if (!inputVal4) return alert("Find all words!");
    const data = unmatchCount(lst,[inputVal1, inputVal2, inputVal3, inputVal4]);
    if(data['matchedIndices']){    
        if(data['matchedIndices'].length === lst.length){
            alert("Level "+ currentLevel +" completed successfully!")
        } else {
            alert("Arranged "+ data["unmatchedIndices"].join(',') +" is not match the answer!");
        }
        

    }else{
        alert("Arranged all words is not match the answer!")
    }
}
