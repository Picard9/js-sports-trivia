
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {

	// todo: create your "getNextQuestion" function
	const getNextQuestion = async () => {
        const url = 'https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple'
        const response = await fetch(url) // Fetch a new question
        const json = await response.json() // Parse the JSON
        
        const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
        const answers = shuffle([ ...incorrect, correct ])
        return { question, answers, correct }
    }
	
	// todo: create your "renderQuestion" function
	const renderQuestion = ({ question, answers, correct }) => { 
		
        answersElement.innerHTML = '' // Clear previous answers
		questionElement.textContent = decodeHtml(question)

		answers.forEach(answer => {
			const button = document.createElement('button') //Create a button for each Answer
			button.textContent = decodeHtml(answer) //Assign content for each created button, with the Answer
			answersElement.append(button) //Insert each button created in this selected Element in my html

			//Add an Even listener for each answer
			button.addEventListener('click', () => {

				if (answer === correct) {
					button.classList.add('correct')
					answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
					alert('Correct!')
					return
				}
	
				button.disabled = true
				alert('Incorrect!')
			})
		})
	
	}

	// todo: add the event listener to the "nextQuestion" button
	nextQuestionElement.addEventListener('click', async () => {
		renderQuestion(await getNextQuestion())
		nextQuestionElement.disabled = true
		setTimeout(() => nextQuestionElement.disabled = false, 10000)
	})

	//text to view if the data are retrieve
	//  console.log(await getNextQuestion())

})()

// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()

