
#Quiz App Design Description

## 1 Project Description
### 1.1 General Description

The application is a quiz with 10 multiple choice questions.  The user will start the quiz, answer one question at a time, receive feedback as they answer questions and see the final score at the end.

### 1.2 UX Requirements

The start screen should have a start button.
The user should be asked one question at a time.
The user can answer questions with the mouse or keyboard.
The user should not be able to skip questions.
The user should be able to see which question they are on and what their current score is.
The user should receive feedback on their answer then move to the next questions.
At the end of the quiz the user should see their final score and have the option to take the quiz again.

### 1.3 Technical Requirements

The quiz app must render questions in a <form>.
Semantic HTML, CSS and jQuery must be used.
A11y best practices must be followed.
The app must be fully usable by keyboard and mouse.


## 2 App Layout
### 2.1 HTML

The app will have pages:
 1. Start - quiz title, photo, description, start button
 2. Question - nav bar with current question and score, question, photo, list of answers (form), correct/incorrect message, next button
 3. End - thanks for playing header, final score, button to retake quiz

All pages can be written using one HTML file. A CSS hidden class can be applied to inactive sections when the user moves to the next section. jQuery can be used to update header, nav bar, photo, form, etc.  

### 2.2 CSS

A classic responsive grid (960px, 12 columns) will be used.  
Mobile and desktop layout will be the same, everything will be in one column and centered on the page.

Classes needed:
 * Header text defaults - font, font size, color
 * Nav bar defaults - font, font size, colors, margin/padding
 * Button defaults - font, font size, border, button shadow, radius, fill color, hover
 * Image defaults - size, margin
 * Hidden - for sections that should be hidden depending on the state of the app
 * Form item layout - block, button appearance, hover
 * Correct answer - green fill 
 * Incorrect answer - red fill 
 * Final score display - font, font size


## 3 Data
### 3.1 Data Model

There are two main data sets in this app:
 1. Questions, photos and answers
    An array will be used to hold each question and its answers.
    Each question will be an object with four keys: question, image, image alt and options.
    The question value will be a string.
    The photo value will be an image link.
    The options value will be an array with an object for each answer.
    The options object will have two keys: answer and correct.
    The answer value will be a string and the correct value will be true or false.
    Keeping the answer and correct statement together will allow for a shuffle function (show answers in a different order each time the quis has been taken)

```
    const quizData = [
        // question 1
        {
            question: 'what is a baby cat called?'
            image: 'www.imagelink.jpg'
            imageAlt: 'text about image'
            options: [
                { answer: 'kitten', correct: true }
                { answer: 'puppy', correct: false }
                { answer: 'baby', correct: false }
                { answer: 'cat', correct: false }
            ]
        }
    ]
```

 2. User answers
    An array will be used to hold the expected answer, user answer and if the user's answer was correct or not.  
    Each quesiton will be added to the array as an object. The object will contain keys correctAns, userAns and result.  

```
    const userAnswers = [
        // question 1
        { correctAns: 'kitten', userAns: 'kitten', result: true }
        // question 2
        { correctAns: 'pup', userAns: 'seal', result: false }
    ]
```

### 3.2 Displaying Data
#### 3.2.1 Functions Needed

* Start quiz app - start the quiz, setup nav bar, shuffle quesitons
* Render page - renders page depending on the page type (start, question, end)
* Render question page - show nav, change photo, show form, hide footer
* Render end page - hide nav, remove photo and form, add results summary, show footer
* Disable answer buttons - after user chooses an option, disable the clicking of answer buttons
* Shuffle - change the order the questions and answer options apper each time the quiz is taken

#### 3.2.2 Event Listeners & Handlers

* Start button click - take user to the first question, show nav bar with current question and score, change header to question, update photo, populate form with question answers
* Answer option button click - color answer button red if incorrect, green if correct, show correct or incorrect message below form, show next button below message, display updated score, disable answer buttons
* Next button click - display updated nav bar, change header to next question , change photo to next question photo, change form to next question answers, hide correct/incorrect message, hide next button
* Next button click, after last question - hide nav bar, change header to thanks for playing, remove photo, show final score, display button to retake quiz
* Retake button click - take user back to the start page


### 3.3 Functions needed to manipulate data

* Current question - returns the quesiton the user is on
* Check userAnswer - compare user selection to the true/false value in the quiz data object, update quesiton nav class
* Update userAnswer - updates the user answer object by adding the current question's answer, user answer and correct true/false, reset at end of quiz




