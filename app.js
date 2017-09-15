'use strict'

// quizData - holds questions, image urls and answer options
const quizData = [
  {
    question: 'What is a baby llama called?',
    image: 'https://image.ibb.co/hsBnda/lama_2191743_960_720.jpg',
    imageAlt: 'baby llama',
    options: [
        { answer: 'cria', correct: true },
        { answer: 'calf', correct: false },
        { answer: 'kid', correct: false },
        { answer: 'alpaca', correct: false }
    ]
  },
  {
    question: 'What is a baby elephant called?',
    image: 'https://image.ibb.co/mz1yjF/elephant_baby_285515_960_720.jpg',
    imageAlt: 'baby elephant',
    options: [
        { answer: 'baby', correct: false },
        { answer: 'cub', correct: false },
        { answer: 'calf', correct: true },
        { answer: 'pup', correct: false }
    ]
  },
  {
    question: 'What is a baby giraffe called?',
    image: 'https://image.ibb.co/i35PPF/giraffe_2064520_1280.jpg',
    imageAlt: 'baby giraffe',
    options: [
        { answer: 'joey', correct: false },
        { answer: 'calf', correct: true },
        { answer: 'kid', correct: false },
        { answer: 'pup', correct: false }
    ]
  },
  {
    question: 'What is a baby sea lion called?',
    image: 'https://image.ibb.co/iZ6W4F/sea_lion_463925.jpg',
    imageAlt: 'baby sea lion',
    options: [
        { answer: 'cub', correct: false },
        { answer: 'kitten', correct: false },
        { answer: 'calf', correct: false },
        { answer: 'pup', correct: true }
    ]
  },
  {
    question: 'What is a baby hedgehog called?',
    image: 'https://image.ibb.co/mR6yjF/hedgehog_910994_960_720.jpg',
    imageAlt: 'baby hedgehog',
    options: [
        { answer: 'infant', correct: false },
        { answer: 'hedgie', correct: false },
        { answer: 'piglet', correct: true },
        { answer: 'joey', correct: false }
    ]
  },
  {
    question: 'What is a baby koala called?',
    image: 'https://image.ibb.co/naMW4F/koala_61189_960_720.jpg',
    imageAlt: 'baby koala',
    options: [
        { answer: 'joey', correct: true },
        { answer: 'kid', correct: false },
        { answer: 'cub', correct: false },
        { answer: 'baby', correct: false }
    ]
  },
  {
    question: 'What is a baby monkey called?',
    image: 'https://image.ibb.co/eLF2Bv/monkey_450151_960_720.jpg',
    imageAlt: 'baby monkey',
    options: [
        { answer: 'cub', correct: false },
        { answer: 'baby', correct: false },
        { answer: 'pup', correct: false },
        { answer: 'infant', correct: true }
    ]
  },
  {
    question: 'What is a baby panda called?',
    image: 'https://image.ibb.co/gR1Lya/panda_1711000_960_720.jpg',
    imageAlt: 'baby panda',
    options: [
        { answer: 'kid', correct: false },
        { answer: 'cub', correct: true },
        { answer: 'calf', correct: false },
        { answer: 'joey', correct: false }
    ]
  },
  {
    question: 'What is a baby turtle called?',
    image: 'https://image.ibb.co/coKJjF/sea_turtles_1503461_960_720.jpg',
    imageAlt: 'baby turtle',
    options: [
        { answer: 'baby', correct: false },
        { answer: 'tortoise', correct: false },
        { answer: 'hatchling', correct: true },
        { answer: 'infant', correct: false }
    ]
  },
  {
    question: 'What is a baby rhino called?',
    image: 'https://image.ibb.co/kqiYJa/rhino_2675891_960_720.jpg',
    imageAlt: 'baby rhino',
    options: [
        { answer: 'pup', correct: false },
        { answer: 'calf', correct: true },
        { answer: 'kid', correct: false },
        { answer: 'fawn', correct: false }
    ]
  }
]

// userAnswers holds the correct ansower, user selected answers and if the answer was correct or not for each qestion. Starts as an empty array and will be pupulated as the user completes the quiz.
const userAnswers = []

function startQuiz () {
  // setup question progress bar based on number of questions
  $('#progressbar-section').attr('aria-valuenow', 1)
  $('#progressbar-section').attr('aria-valuemax', `${quizData.length}`)
  quizData.forEach((question, index) => {
    $('.question-progress').append(`<span id="q${index + 1}" class="not-answered">${index + 1}</span>`)
  })

  // shuffle questions and answers
  shuffle(quizData)
  quizData.forEach(item => {
    shuffle(item.options)
  })

  // activate main (start) button
  handleMainBtnClick()
}

function shuffle (array) {
  for (let i = array.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [array[i - 1], array[j]] = [array[j], array[i - 1]]
  }
}

function handleMainBtnClick () {
  // click start button and be taken to the first question page
  $('#main-btn').on('click', event => {
    console.log('main button clicked')
    renderPage()
  })
}

function renderPage () {
  // find out what page the user is on then render the sections for that page using the button text
  const buttonText = $('#main-btn-text').text()

  if (buttonText === 'Begin Quiz' || buttonText === 'Next Question') {
    renderQuestionPage()
    handleAnswerBtnClick()
  }
  if (buttonText === 'See Results') { renderEndPage() }
  if (buttonText === 'Try Again') { location.reload() }
}

function currentQuestion () {
  const index = userAnswers.length
  return quizData[index]
}

function renderQuestionPage () {
  // find out what the current question number is
  const questionData = currentQuestion()
  const questionNumber = userAnswers.length + 1

  // update class of current question in quesiton-progress, show progress bar
  $('#progressbar-section').attr('aria-valuenow', `${questionNumber}`)
  $(`#q${questionNumber}`).removeClass('not-answered').addClass('current-question')
  $('.progress-bar').removeClass('hide-content')

  // update the header and image, clear previous answer options
  $('.heading-text').html(questionData.question)
  $('.animal-image').attr('src', questionData.image)
  $('.animal-image').attr('alt', questionData.imageAlt)
  $('.option-buttons').html('')

  // populate and display new answer options
  const options = questionData.options
  options.forEach((option, index) => {
    const newButton = `<button type='button' id="option${index + 1}" class="option-btn">${option.answer}</button>`
    $('.option-buttons').append(newButton)
  })
  $('.answer-options').removeClass('hide-element')

  // hide footer
  $('.footer').addClass('hide-element')
}

function handleAnswerBtnClick () {
  $('.option-btn').click(event => {
    console.log('answer button clicked')
    // prevent default
    event.preventDefault()

    // find out what the current question number is
    const questionNumber = userAnswers.length + 1
    const index = userAnswers.length
    const questionData = currentQuestion()

    // find user selection
    const userSelection = event.currentTarget.text()
    console.log(`user selected answer: ${userSelection}`)
    const correctAns = questionData.options.find(option => option.correct === true).answer

    let correct = null
    if (userSelection === correctAns) { correct = true }
    else { correct = false }

    // update userAnswers
    updateUserAnswers(userSelection, correct, index)

    // update question progress bar
    let newClass = null
    if (correct === true) { newClass = 'correct' }
    if (correct === false) { newClass = 'incorrect' }
    $(`#q${questionNumber}`).removeClass('current-question').addClass(newClass)

    // update current score
    const correctAnswers = userAnswers.filter(answer => answer.correct === true)
    $('#questions-correct').html(correctAnswers.length)
    $('#questions-answered').html(userAnswers.length)

    // disable all option buttons
    $('.option-btn').attr('disabled', 'disabled')

    // update css of correct answer and incorrect (if selected) buttons
    if (correct === true) {
      $(event.currentTarget).addClass('correct')
    }
    if (correct === false) {
      $(event.currentTarget).addClass('incorrect')
      const correctBtnID = $(`.option-btn:contains('${correctAns}')`).attr('id')
      $(`#${correctBtnID}`).addClass('correct')
    }

    // update footer text and main button text
    const message = generateMessage(correct, index)
    $('#footer-text').html(message)
    if (questionNumber < quizData.length) {
      $('#main-btn-text').html('Next Question')
    }
    if (questionNumber === quizData.length) {
        $('#main-btn-text').html('See Results')
    }

    // show footer
    $('.footer').removeClass('hide-element')
  })
}

function updateUserAnswers (answer, correct, index) {
  const correctAns = quizData[index].options.find(option => option.correct === true).answer
  console.log(`correct answer: ${correctAns}`)

  userAnswers.push({ 'correctAns': correctAns, 'userAns': answer, 'correct': correct })
  console.log('user answers array:')
  console.log(userAnswers)
}

function generateMessage (correct, index) {
  const correctAns = quizData[index].options.find(option => option.correct === true).answer

  if (correct === true) { return `That's correct!` }
  if (correct === false) { return `Sorry, the correct answer is ${correctAns}.` }
}

function renderEndPage () {
  console.log('end page rendered')
  // hide progress bar content
  $('.progress-bar').addClass('hide-content')

  // update header text, hide photo and answer options
  $('.heading-text').html('Thanks for playing!')
  $('.image-div').addClass('hide-element')
  $('.answer-options').addClass('hide-element')

  // display results
  const correctAnswers = userAnswers.filter(answer => answer.correct === true)
  $('.results-div').removeClass('hide-element')
  $('#final-score').html(`${correctAnswers.length}/${userAnswers.length}`)

  // update footer-text and main-btn-text, show footer
  $('#footer-text').addClass('hide-element')
  $('#main-btn-text').html('Try Again')
  $('.footer').removeClass('hide-element')
  $('#main-btn').attr('focus', false)
}

$(startQuiz)
