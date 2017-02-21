// cSpell:words truthy falsy

var initializeQuiz = function () {
  // Parts of the HTML
  var questionArea = document.getElementById('question-area')
  var answerArea = document.getElementById('answer-area')
  var nextButton = document.getElementById('next-button')
  var truthyButton = document.getElementById('truthy')
  var falsyButton = document.getElementById('falsy')

  // Messages
  var messages = {
    correct: 'Correct! 🎉 ',
    incorrect: 'Try again! 😞'
  }

  // Questions
  var expressionCategories = {
    truthyTrue: {
      isTruthy: true,
      expressions: ['true'],
      explanation: 'This is truthy, because it\'s literally <em>true</em>!'
    },
    truthyNumber: {
      isTruthy: true,
      expressions: ['100', '-7', '0.25'],
      explanation: 'This is truthy, because it\'s <em>something</em> - a non-zero number!'
    },
    truthyString: {
      isTruthy: true,
      expressions: ['\'apple\'', '\'green\'', '\'0\'', '\'🐱\'', '\'false\''],
      explanation: 'This is truthy, because it\'s <em>something</em> - a non-empty string!'
    },
    falsyValues: {
      isTruthy: false,
      expressions: ['false', '0', 'null', 'undefined', '\'\''],
      explanation: 'This is falsy, because it is <em>nothing</em>!'
    }
  }

  // combine them all into one big list of expressions
  var allExpressions = []

  Object.keys(expressionCategories).forEach(function (categoryName) {
    allExpressions = allExpressions.concat(expressionCategories[categoryName].expressions)
  })

  // Declare this so it can be used later
  var currentExpression
  /***********************************************************
  /* Functions
  ************************************************************/
  // Generate a random expression as a string
  var getRandomExpression = function() {
    // Generate a random index number for our expressionCategories array
    var randomIndex = Math.floor(Math.random() * allExpressions.length)
    // Get the value with that index from expressionCategories
    var randomExpression = allExpressions[randomIndex]
    return randomExpression
  }

  // Change the question area on the page
  var displayQuestion = function (expression) {
    questionArea.innerHTML = expression
  }

  // Get a new question and update the display
  var displayNewQuestion = function () {
    // get the next random expression and update currentExpression
    currentExpression = getRandomExpression()
    // show the current expression in the question area
    displayQuestion(currentExpression)
    // Make the previous answer disappear
    answerArea.innerHTML = ''
  }

  // Given an expression as a string, get its category
  var getExpressionCategory = function (expression) {
    var allCategoryNames = Object.keys(expressionCategories)
    // return the category name for which the expression exists in its list of expressions
    var expressionCategoryName = allCategoryNames.find(function (categoryName) {
      var expressionsInCategory = expressionCategories[categoryName].expressions
      return expressionsInCategory.indexOf(expression) !== -1
    })
    // If expression can't be found, throw an error
    if (!expressionCategoryName) {
      throw new Error('no category found for expression: ' + expression)
    }
    return expressionCategories[expressionCategoryName]
  }

  // Display feedback based on which button the user clicked
  var feedback = function () {
    // Get the category that currentExpression is in
    var currentExpressionCategory = getExpressionCategory(currentExpression)
    // Get some data about the currentExpression category
    var answer = currentExpressionCategory.isTruthy
    var explanation = currentExpressionCategory.explanation
    // Display feedback based on what the user clicked
    if (((event.target === truthyButton) && (answer === true)) ||
        ((event.target === falsyButton) && (answer === false))) {
      answerArea.innerHTML = messages.correct + explanation
    } else {
      answerArea.innerHTML = messages.incorrect
    }
  }

  /*************************************************************
  /* And now we actually do stuff
  **************************************************************/
  // Initialize
  displayNewQuestion()

  // When the user clicks Truthy, show feedback
  truthyButton.addEventListener('click', feedback)
  // When the user clicks Falsy, show feedback
  falsyButton.addEventListener('click', feedback)
  // When the user clicks Next, give them a new question
  nextButton.addEventListener('click', displayNewQuestion )
}

initializeQuiz()
