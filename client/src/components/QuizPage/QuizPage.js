import React, { Component } from 'react'
import { Button, Input, Label } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import './QuizPage.css'
const testData = require('./testData.json')

class QuizPage extends Component {
  constructor () {
    super()
    this.state = {
      className: '',
      studentName: '',
      quizName: '',
      quizContent: [],
      questions: [],
      page: 1,
      cache: [],
      grade: 0,
      submit: false
    }
    this.back = this.back.bind(this)
    this.next = this.next.bind(this)
    this.selectAnswer = this.selectAnswer.bind(this)
    this.check = this.check.bind(this)
    this.submit = this.submit.bind(this)
  }
  componentDidMount () {
    const quiz = testData.quiz
    this.setState({
      className: quiz.className,
      studentName: quiz.studentName,
      quizName: quiz.quizName,
      quizContent: quiz.quizContent,
      questions: quiz.questions
    })
  }

  displayQuizContent () {
    let content = []
    for (let i = 0; i < this.state.quizContent.length; i++) {
      content.push(
        <p key={`paragraph${i}`}>{this.state.quizContent[i]}</p>
      )
    }
    return content
  }

  displayChoices () {
    let options = []
    const question = this.state.page - 1
    const choices = this.state.questions[question].choices
    for (let i = 0; i < choices.length; i++) {
      options.push(
        <div key={`choice${i}`}>
          <Input type={choices[i].type} id={choices[i].id} name={choices[i].name} value={choices[i].id} onChange={this.selectAnswer} checked={this.check(choices[i].type, choices[i].id)} />
          <Label for={choices[i].id}>{choices[i].label}</Label>
        </div>
      )
    }
    return options
  }

  check (type, value) {
    if (this.state.cache.length > 0 && this.state.cache[this.state.page - 1] !== null) {
      if (type === 'checkbox') {
        if (this.state.cache[this.state.page - 1].indexOf(value) > -1) {
          return true
        }
      } else {
        if (this.state.cache[this.state.page - 1] === value) {
          return true
        }
      }
    }
  }

  back () {
    this.setState({
      page: this.state.page - 1
    })
  }

  next () {
    let cacheCopy = Object.assign([], this.state.cache)
    const index = this.state.page - 1
    if (!cacheCopy[index]) {
      cacheCopy[index] = null
    }
    this.setState({
      cache: cacheCopy,
      page: this.state.page + 1
    })
  }

  submit () {
    let cacheCopy = Object.assign([], this.state.cache)
    const index = this.state.page - 1
    let gradeCopy = 0
    if (!cacheCopy[index]) {
      cacheCopy[index] = null
    }
    for (let i = 0; i < cacheCopy.length; i++) {
      if (cacheCopy[i] === null) {
        continue
      } else if (typeof (cacheCopy[i]) === 'object') {
        cacheCopy[i].sort()
        this.state.questions[i].answer.sort()
        if (JSON.stringify(cacheCopy[i]) === JSON.stringify(this.state.questions[i].answer)) {
          gradeCopy = gradeCopy + 1
        }
      } else {
        if (cacheCopy[i] === this.state.questions[i].answer) {
          gradeCopy = gradeCopy + 1
        }
      }
    }
    this.setState({
      grade: (gradeCopy / cacheCopy.length) * 100,
      submit: true
    })
  }

  selectAnswer (event) {
    let cacheCopy = Object.assign([], this.state.cache)
    const page = this.state.page - 1
    if (event.target.type === 'checkbox') {
      if (cacheCopy[page]) {
        const index = cacheCopy[page].indexOf(event.target.id)
        if (index > -1) {
          cacheCopy[page].splice(index, 1)
        } else {
          cacheCopy[page].push(event.target.id)
        }
      } else {
        cacheCopy[page] = [event.target.id]
      }
    } else {
      cacheCopy[page] = event.target.id
    }
    this.setState({
      cache: cacheCopy
    })
  }

  render () {
    if (this.state.questions.length === 0) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <div className='quiz_header'>
          <h1>{this.state.className} - {this.state.studentName}</h1>
          <h1>{this.state.page} of {this.state.questions.length}</h1>
        </div>
        <div className='quiz_body'>
          <h1>{this.state.quizName}</h1>
          {this.displayQuizContent()}
          <h1>Question: {this.state.page}</h1>
          <p>{this.state.questions[this.state.page - 1].question}</p>
        </div>
        <div className='answers_list'>
          {this.displayChoices()}
        </div>
        <div className='quiz_buttons'>
          {this.state.page > 1 ? <Button color='warning' className='back_button' onClick={this.back}>Back</Button> : null}
          {this.state.page !== this.state.questions.length ? <Button color='info' className='next_button' onClick={this.next}>Next</Button> : null}
          {this.state.page === this.state.questions.length ? <Button color='danger' className='submit_button' onClick={this.submit}>Submit</Button> : null}
          {this.state.submit ? <Redirect to={
            {
              pathname: '/result',
              state: { grade: this.state.grade }
            }
          } /> : null}
        </div>
      </div>
    )
  }
}

export default QuizPage
