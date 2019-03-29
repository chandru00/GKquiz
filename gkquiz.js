const correctAnswerIcon = "https://i.pinimg.com/736x/72/9d/53/729d53ac6b07859c758449e2e0f2b57f--happy-faces-smiley-faces.jpg";
const wrongAnswerIcon = "https://cdn1.vectorstock.com/i/1000x1000/76/10/dislike-sign-emoticon-vector-5057610.jpg";
const warningIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMkMuPeBbSvE7D5BkQu1r308pcLDUOmwnKd35atArlsa_j5CA9";

var quesArray = [
        {
            id: 1,
            question: "Which is considered as the biggest port of India?",
            type: 'objective',
            options: [
                {
                    optionPrefix: 'a',
                    text: "Kolkata",
                    value: 0
                },
                {
                    optionPrefix: 'b',
                    text: "Cochin",
                    value: 1
                },
                {
                    optionPrefix: 'c',
                    text: "Chennai",
                    value: 2
                },
                {
                    optionPrefix: 'd',
                    text: "Mumbai",
                    value: 3
                }
            ],
            answer: 3
        },
        {
            id: 2,
            question: "Which Country is called as Land of the rising Sun?",
            type: 'objective',
            options: [
                {
                    optionPrefix: 'a',
                    text: "Japan",
                    value: 0
                },
                {
                    optionPrefix: 'b',
                    text: "China",
                    value: 1
                },
                {
                    optionPrefix: 'c',
                    text: "Korea",
                    value: 2
                },
                {
                    optionPrefix: 'd',
                    text: "Holland",
                    value: 3
                }
            ],
            answer: 0
        },
        {
            id: 3,
            question: "Which lake is known as the Fresh Water Lake in India?",
            type: 'objective',
            options: [
                {
                    optionPrefix: 'a',
                    text: "Chillka Lake",
                    value: 0
                },
                {
                    optionPrefix: 'b',
                    text: "Kolleru Lake",
                    value: 1
                },
                {
                    optionPrefix: 'c',
                    text: "Pulicat Lake",
                    value: 2
                },
                {
                    optionPrefix: 'd',
                    text: "Veeranam Lake",
                    value: 3
                }
            ],
            answer: 1
        },
        {
            id: 4,
            question: "Which is the longest river in India?",
            type: 'blank',
            answer: "ganga"
        },
        {
            id: 5,
            question: "Punjab is famous for which textile?",
            type: 'blank',
            answer: "woolen"
        },
        {
            id: 6,
            question: "Where is the headQuarters of UNO situated?",
            type: 'blank',
            answer: "new york"
        },
        {
            id: 7,
            question: "Gir National Park is situated in Gujarat?",
            type: 'boolean',
            options: [
                {
                    text: "True",
                    value: true
                },
                {
                    text: "False",
                    value: false
                }
            ],
            answer: true
        },
        {
            id: 8,
            question: "Oscar Awards is given for the excellent work in the field of Sports?",
            type: 'boolean',
            options: [
                {
                    text: "True",
                    value: true
                },
                {
                    text: "False",
                    value: false
                }
            ],
            answer: false
        }
    ],
    quesCount = quesArray.length,
    quesCounter = 0,
    score = 0,
    maxOptions = 4,
    useOptionPrefix = true,
    optionPrefixSeparator = ') ',
    disabledQuestions = [],
    attemptedAnswers = [],
    changeQuestion = false,
    reviewLaterQuestions = [],
    onlyReviewLaterQuestions = false,
    dummyCounter = 0,
    questionSequences = {
        noQuestion: "no_question_found"
    };

/**
 * @description Display the question, options, updated score and question number
 */
var showQuizQuestion = function () {
    generateQuestion();
    updateQuestionNumber();
    updateScore();
    changeQuestion = false;
};

var _removeElementPrivate = function (element) {
    element.val('').removeAttr('checked');
    element.next('span').text('');
    element.parent().addClass('hidden');
};

/**
 * @description Removes the extra options from the quiz
 * @param optionId
 * Contains the id of option or array of id of options to remove
 */
var removeOptions = function (optionId) {
    var element;
    /*
    * If optionId is not available, Otherwise remove all options.
    * Otherwise check if it is array, remove the option for each optionId in array.
    * If not array, remove the optionId
    * */
    if (optionId) {
        if ($.isArray(optionId) && optionId.length) {
            for (var i = 0; i < optionId.length; i++) {
                element = $(".questionsForm input#option" + optionId[i]);
                _removeElementPrivate(element);
            }
        }
        else {
            element = $(".questionsForm input#option" + optionId);
            _removeElementPrivate(element);
        }
    }
    else {
        for (var i = 0; i < maxOptions; i++) {
            element = $(".questionsForm input#option" + i);
            _removeElementPrivate(element);
        }
    }
};

/**
 * @description Disables the options from the quiz
 * @param optionId
 * Contains the id of option or array of id of options to disable
 */
var disableOptions = function (optionId) {
    var element;
    if (optionId) {
        if ($.isArray(optionId) && optionId.length) {
            for (var i = 0; i < optionId.length; i++) {
                element = $(".questionsForm input#option" + optionId[i]);
                element.attr("disabled", "disabled");
            }
        }
        else {
            element = $(".questionsForm input#option" + optionId);
            element.attr("disabled", "disabled");
        }
    }
    else {
        for (var i = 0; i < maxOptions; i++) {
            element = $(".questionsForm input#option" + i);
            element.attr("disabled", "disabled");
        }
    }
    $(".questionsForm input#txtAnswer").attr('disabled', 'disabled');
};

/**
 * @description Enables the options from the quiz
 * @param optionId
 * Contains the id of option or array of id of options to enable
 */
var enableOptions = function (optionId) {
    var element;
    if (optionId) {
        if ($.isArray(optionId) && optionId.length) {
            for (var i = 0; i < optionId.length; i++) {
                element = $(".questionsForm input#option" + optionId[i]);
                element.removeAttr("disabled");
            }
        }
        else {
            element = $(".questionsForm input#option" + optionId);
            element.removeAttr("disabled");
        }
    }
    else {
        for (var i = 0; i < maxOptions; i++) {
            element = $(".questionsForm input#option" + i);
            element.removeAttr("disabled");
        }
    }
    $(".questionsForm input#txtAnswer").removeAttr('disabled');
};

/**
 * @description Displays the updated/changed question
 */
var generateQuestion = function () {
    var question = quesArray[quesCounter], optionText, element;
    var optionsCount = question.hasOwnProperty('options') ? question.options.length : 0;
    $(".questionsForm p#questionText").text((quesCounter + 1) + optionPrefixSeparator + question.question);
    var attemptedAnswer = attemptedAnswers.find(function (element) {
        return element.id === question.id;
    });
    removeOptions();
    if (question.type === "blank") {
        element = $('.questionsForm input#txtAnswer');

        attemptedAnswer = !!attemptedAnswer ? attemptedAnswer.value : "";
        element.val(attemptedAnswer).removeClass('hidden');
    }
    else {
        $('.questionsForm input#txtAnswer').val('').addClass('hidden');
        for (var i = 0; i < optionsCount; i++) {
            element = $(".questionsForm input#option" + i);

            optionText = (useOptionPrefix && question.options[i].hasOwnProperty('optionPrefix'))
                ? (question.options[i].optionPrefix + optionPrefixSeparator + question.options[i].text)
                : question.options[i].text;

            element.val(question.options[i].value);
            element.next().text(optionText);
            element.parent().removeClass('hidden');

            if (typeof attemptedAnswer !== 'undefined' && attemptedAnswer !== null) {
                if (attemptedAnswer.value === question.options[i].value) {
                    element.prop('checked', true);
                }
            }
        }
    }
    if (disabledQuestions.indexOf(question.id) > -1) {
        disableOptions();
    }
    else {
        enableOptions();
    }
    $("#btn-review-later").removeAttr('disabled');
};

/**
 * @description Updates the displayed question number
 */
var updateQuestionNumber = function () {
    $(".StartQuiz .questionNumber").text(`${quesCounter + 1}/${quesCount}`);
};

/**
 * @description Updates the displayed scores
 * @param quit
 * Checks if scores are updating on quiting quiz
 */
var updateScore = function (quit) {
    if (quit) {
        $('.endPage h4#finalScore').text(`${score}/${quesCounter + 1}`);
    }
    else {
        $(".StartQuiz .scoreCard").text(`${score}/${quesCount}`);
    }
};

/**
 * @description Gets the answer of the current question
 * @param question
 * @param avoidPrefix
 * @returns {string|number}
 */
var getAnswer = function (question, avoidPrefix) {
    var answer;
    if (question.type !== 'blank') {
        answer = question.options.find(function (option) {
            return option.value === question.answer;
        });
        if (avoidPrefix)
            answer = answer.text;
        else
            answer = (useOptionPrefix && answer.hasOwnProperty('optionPrefix'))
                ? (answer.optionPrefix + optionPrefixSeparator + answer.text)
                : answer.text;
    }
    else {
        answer = question.answer;
    }
    return answer;
};

/**
 * @description Verify if the answer is correct/incorrect
 * @param currentQuestion
 * @param attemptedAnswer
 * @param nextPrev
 * @param skipCounter
 */
var verifyAns = function (currentQuestion, attemptedAnswer, nextPrev, skipCounter) {
    /*
    * Check if the answer is already selected,
    * */
    if (nextPrev === 'next') {
        nextQues();
        if (disabledQuestions.indexOf(currentQuestion.id) > -1) {
            if (!skipCounter) quesCounter++;
            showQuizQuestion();
            return;
        }
    }
    else {
        if (disabledQuestions.indexOf(currentQuestion.id) > -1) {
            prevQues();
            if (!skipCounter) quesCounter--;
            showQuizQuestion();
            return;
        }
    }

    disabledQuestions.push(currentQuestion.id);
    attemptedAnswers.push({id: currentQuestion.id, index: quesCounter, value: attemptedAnswer});

    if (attemptedAnswer === currentQuestion.answer) {
        score++;
        showAnswerStatus(currentQuestion, true);
    }
    else {
        showAnswerStatus(currentQuestion, false);
    }
    if (!skipCounter) {
        if (nextPrev === 'next')
            quesCounter++;
        else
            quesCounter--;
    }
};

/**
 * @description Displays alert for correct/wrong/missing answer
 * @param question
 * @param isCorrect
 */
var showAnswerStatus = function (question, isCorrect) {
    $('.alert-box').removeClass('hidden');
    var text = 'Yes, You are Correct!!';
    if (isCorrect === null) {
        $(".alert-box-block img").attr("src", warningIcon);
        if (question.type === 'blank') {
            text = "Please fill the answer";
        }
        else {
            text = 'Please select an option';
        }
        $(".alert-box-block #alertText").text(text);
        return;
    }

    if (isCorrect) {
        $(".alert-box-block img").attr("src", correctAnswerIcon);
        $(".alert-box-block #alertText").text(text);
    }
    else {
        text = `Sorry, You are Incorrect!! The correct answer is: ${getAnswer(question)}`;
        $(".alert-box-block img").attr("src", wrongAnswerIcon);
        $(".alert-box-block #alertText").text(text);
    }
};

/**
 * @description Displays the final score after finishing the quiz
 */
var displayFinalScore = function () {
    $(".quizOutline").hide('slow');
    $('.endPage').removeClass('hidden');
    $('.endPage h4#finalScore').text(`Your Total Score is: ${score}/${quesCount}`);
    $('.correctAnswer .count').text(score);
    $('.wrongAnswer .count').text(quesCount - score);
    showScoreSheet();
    resetQuiz();
};

var showScoreSheet = function () {
    var row, question, answer, status;
    for (var i = 0; i < quesArray.length; i++) {
        question = quesArray[i];
        answer = attemptedAnswers.find(function (element) {
            return element.id === question.id;
        }).value;
        status = (question.answer === answer) ? 'assets/images/tick.png' : 'assets/images/cross.png';
        if (question.type !== 'blank') {
            if (answer)
                answer = question.options.find(function (option) {
                    return option.value === answer;
                }).text;
        }
        else {
            answer = answer || '';
        }

        row = '<tr>' +
            '<td>' + question.question + '</td>' +
            '<td>' + getAnswer(question, true) + '</td>' +
            '<td>' + answer + '</td>' +
            '<td>' + '<img src="' + status + '">' + '</td>' +
            '</tr>';
        console.log(row);
        $('.scoresheet tbody').append(row);
    }
};

/**
 * @description Resets the quiz counters
 */
var resetQuiz = function () {
    quesCounter = 0;
    score = 0;
    disabledQuestions = [];
    enableOptions();
    attemptedAnswers = [];
    reviewLaterQuestions = [];
    dummyCounter = 0;
    onlyReviewLaterQuestions = false;
};

/**
 * @description Checks if the question is already answered/reviewed
 * @param question
 * @returns {boolean}
 */
var isAlreadyDisabled = function (question) {
    return (disabledQuestions.indexOf(question.id) > -1);
};

/**
 * @description Checks if question is set to review later
 * @param question
 * @returns {boolean}
 */
var isSetReviewLater = function (question) {
    return (reviewLaterQuestions.indexOf(question.id) > -1);
};

/**
 * @description Click of intro button or start over button to start quiz
 */
$(document).on('click', '#btn-intro, #btn-startover', function (event) {
    $('.introPage, .endPage').addClass('hidden');
    $('.quizOutline').fadeIn("slow");
    $('.progress').css("opacity","1");

    $('.current')
    resetQuiz();
    showQuizQuestion();
});

/**
 * @description Checks if the next question is available
 * @param counter
 * @returns {*}
 */
var findNextQuestionIndex = function (counter) {
    dummyCounter = counter;
    if (dummyCounter === (quesCount - 1)) {
        return dummyCounter + 1;
    }
    dummyCounter++;
    var nextQuestion = quesArray[dummyCounter];
    /*
    * If next question is in review later array, skip it and find the next question which is not in review later
    * */
    if (isSetReviewLater(nextQuestion)) {
        if (dummyCounter < quesArray.length) {
            return findNextQuestionIndex(dummyCounter);
        }
        else
            return questionSequences.noQuestion;
    }
    else
        return dummyCounter;
};


/**
 * @description Click of next button
 */
$(document).on('click', '#btn-next', function (event) {
    var question = quesArray[quesCounter],
        answerGiven;

    var nextQuesIndex = findNextQuestionIndex(quesCounter);

    /*If current question is already reviewed, don't ask for answer, and skip it*/
    if (isAlreadyDisabled(question)) {
        changeQuestion = true;
        quesCounter = nextQuesIndex;
        if (quesCounter === quesCount) {
            closeAnswer();
            return;
        }
        showQuizQuestion();
        return;
    }

    /*
    * If question is of type = blank, read the input and show the answer status
    * Else if question is objective/boolean, read the selected value and show the answer status
    * */
    if (question.type === 'blank') {
        answerGiven = $('.questionsForm input#txtAnswer').val();
        answerGiven = answerGiven ? answerGiven.trim().toLowerCase() : answerGiven;
        if (!answerGiven) {
            showAnswerStatus(question, null);
            return;
        }
    }
    else {
        answerGiven = $('.questionsForm input[type=radio]:checked').val();
        if (answerGiven && question.type === 'boolean')
            answerGiven = (answerGiven === 'true');
        else if (answerGiven && question.type === 'objective')
            answerGiven = Number(answerGiven);

        if (typeof answerGiven === 'undefined') {
            showAnswerStatus(question, null);
            return;
        }
    }

    /*If answering the review later question, check the answer and show next review later question*/
    if (onlyReviewLaterQuestions) {
        changeQuestion = true;
        verifyAns(question, answerGiven, 'next', true);
        reviewLaterQuestions.splice(reviewLaterQuestions.indexOf(question.id), 1);
        showReviewLaterQuestion();
    }

    if (typeof nextQuesIndex !== 'undefined' && nextQuesIndex !== null && typeof nextQuesIndex === 'number') {
        quesCounter = nextQuesIndex;
        changeQuestion = true;
        verifyAns(question, answerGiven, 'next', true);
        return;
    }
    else if (nextQuesIndex === questionSequences.noQuestion) {
        return;
    }

    changeQuestion = true;
    verifyAns(question, answerGiven, 'next');

});

/**
 * @description Checks if the previous question is available
 * @param counter
 * @returns {*}
 */
var findPreviewQuestionIndex = function (counter) {
    dummyCounter = counter;
    if (dummyCounter === 0) {
        return dummyCounter;
    }
    dummyCounter--;
    var prevQuestion = quesArray[dummyCounter];
    /*
    * If previous question is in review later array, skip it and find the previous question which is not in review later
    * */
    if (isSetReviewLater(prevQuestion)) {
        if (dummyCounter > 0) {
            return findPreviewQuestionIndex(dummyCounter);
        }
        else {
            return questionSequences.noQuestion;
        }
    }
    else {
        return dummyCounter;
    }
};

/**
 * @description Click of previous button
 */

$(document).on('click', '#btn-prev', function (event) {
    previousQues();
    if (quesCounter === 0)
        return;
    /*If already on first question or answering the review later question, you can't go back*/
    if (onlyReviewLaterQuestions) {
        alert("You can't check previous review later question");
        return;
    }

    var question = quesArray[quesCounter],
        answerGiven;

    var prevQuesIndex = findPreviewQuestionIndex(quesCounter);

    /*If current question is already reviewed, don't ask for answer, and skip it*/
    if (isAlreadyDisabled(question)) {
        changeQuestion = true;
        // quesCounter--;
        quesCounter = prevQuesIndex;
        showQuizQuestion();
        return;
    }

    /*
    * If question is of type = blank, read the input and show the answer status
    * Else if question is objective/boolean, read the selected value and show the answer status
    * */
    if (question.type === 'blank') {
        answerGiven = $('.questionsForm input#txtAnswer').val();
        answerGiven = answerGiven ? answerGiven.trim().toLowerCase() : answerGiven;
        if (!answerGiven) {
            showAnswerStatus(question, null);
            return;
        }
    }
    else {
        answerGiven = $('.questionsForm input[type=radio]:checked').val();
        if (answerGiven && question.type === 'boolean')
            answerGiven = (answerGiven === 'true');
        else if (answerGiven && question.type === 'objective')
            answerGiven = Number(answerGiven);

        if (typeof answerGiven === 'undefined') {
            showAnswerStatus(question, null);
            return;
        }
    }


    if (typeof prevQuesIndex !== 'undefined' && prevQuesIndex !== null && typeof prevQuesIndex === 'number') {
        quesCounter = prevQuesIndex;
        changeQuestion = true;
        verifyAns(question, answerGiven, 'prev', true);
        return;
    }
    else if (prevQuesIndex === questionSequences.noQuestion) {
        return;
    }
    changeQuestion = true;
    verifyAns(question, answerGiven, 'prev');


});

var addToReviewNow = function (question) {
    disableOptions();
    if (!isAlreadyDisabled(question)) {
        /*Add question to disabled questions*/
        disabledQuestions.push(question.id);
        /*Push empty answer to attempted answers*/
        attemptedAnswers.push({id: question.id, index: quesCounter, value: null});
    }
    alert("Correct Answer is: \n" + getAnswer(question));
};

/**
 * @description Click of review now
 * This will show the correct answer and question will be locked.
 */
$(document).on('click', '#btn-review-now', function (event) {
    var question = quesArray[quesCounter];
    /*If answering review later questions, we can review them now,
    * else if question added to review later can't be reviewed now,
    * otherwise, review the answer
    * */
    if (onlyReviewLaterQuestions) {
        addToReviewNow(question);
        /*Remove question from review later questions*/
        reviewLaterQuestions.splice(reviewLaterQuestions.indexOf(question.id), 1);
        showReviewLaterQuestion();
    }
    else if (isSetReviewLater(question)) {
        alert("Question added to review later can't be reviewed now");
    }
    else {
        addToReviewNow(question);
    }
});

/**
 * @description Click of review later
 * This will hold the question for answering later
 */
$(document).on('click', '#btn-review-later', function (event) {
    var question = quesArray[quesCounter];
    if (isAlreadyDisabled(question)) {
        alert("Attempted or already reviewed questions can't be reviewed later");
        return;
    }
    if (isSetReviewLater(question)) {
        alert("You have already added this question to review later");
        return;
    }
    if (onlyReviewLaterQuestions) {
        alert("You are already answering review later questions. You can't set it to review later again");
        return;
    }

    if (confirm("You have selected to review later. The question will be available to answer later only.\nAre you sure you want to review later?")) {
        disableOptions();
        reviewLaterQuestions.push(question.id);
        $(this).attr('disabled', 'disabled');

        changeQuestion = true;
        quesCounter++;
        if (quesCounter < quesArray.length) {
            showQuizQuestion();
        }
        else {
            if (reviewLaterQuestions.length === 0)
                displayFinalScore();
            else {
                if (confirm("Some questions are not answered yet. Do you want to answer now?")) {
                    onlyReviewLaterQuestions = true;
                    showReviewLaterQuestion();
                }
                else {
                    alert('final score');
                    displayFinalScore();
                }
            }
        }
    }
});

var closeAnswer = function () {
    $('.alert-box').addClass('hidden');
    $(".alert-box-block img").removeAttr('src');
    $(".alert-box-block #alertText").text('');
    if (quesCounter < quesArray.length) {
        if (changeQuestion)
            showQuizQuestion();
    }
    else {
        if (reviewLaterQuestions.length === 0) {
            displayFinalScore();
        }
        else {
            if (confirm("Some questions are not answered yet. Do you want to answer now?")) {
                onlyReviewLaterQuestions = true;
                showReviewLaterQuestion();
            }
            else {
                displayFinalScore();
            }
        }
    }
};

/**
 * @description Click of close button for alert.
 * This will update the question or display the final score.
 */
$(document).on('click', '#btn-close, .btn-close', function (event) {
    closeAnswer();

});

/**
 * @description Quits the quiz and display the score
 */
$(document).on('click', '#btn-quit', function (event) {
    $('.quizOutline').hide();
    $('.endPage').removeClass('hidden');
    updateScore(true);
    $('.correctAnswer .count').text(score);
    $('.wrongAnswer .count').text(quesCounter + 1 - score);
    showScoreSheet();
});

/**
 * @description Close answer on pressing enter
 */
$(document).on('keypress', function (e) {
    if (e.which === 13 || e.key === 13) {
        e.preventDefault();
        if (!$('.alert-box').hasClass('hidden')) {
            closeAnswer();
        }
    }
});


function nextQues() {
    var $next = $('.progress ul li.current').removeClass('current').addClass('complete').next('li');
    if ($next.length) {
        $next.removeClass('complete').addClass('current');
        //console.log('Prev');
    } else {
        $(".progress ul li:first").removeClass('complete').addClass('current');
        if (".progress ul li:last") {
            $('.progress ul li').removeClass('current').removeClass('complete').removeAttr('class');
            $(".progress ul li:first").addClass('current');
        }
        //console.log('Next');
    }
}

function previousQues() {
    var $prev = $('.progress ul li.current').removeClass('current').removeClass('complete').removeAttr('class').prev('li');
    if ($prev.length) {
        $prev.removeClass('complete').addClass('current');
        //console.log('Prev');
    } else {
        $(".progress ul li:first").removeClass('complete').addClass('current');
        $(".progress ul li:last").removeClass('current').removeClass('complete').removeAttr('class');
        //console.log('Prev');
    }
}

/**
 * @description Finds the review later question and show it.
 */
var showReviewLaterQuestion = function () {
    /*When all the review later questions are answered, show final score*/
    if (!reviewLaterQuestions.length) {
        displayFinalScore();
        return;
    }
    var question = quesArray.find(function (element, index) {
        if (element.id === reviewLaterQuestions[0]) {
            quesCounter = index;
            return element;
        }
    });
    showQuizQuestion();
};



