import React, { Component } from "react";
import "./assets/style.css";
import quizService from "./quizService";
import Result from "./components/Result";
import QuestionBox from "./components/QuestionBox";

class App extends Component {
  state = {
    questionbank: [],
    score: 0,
    responses: 0
  };

  getQuestions = () => {
    quizService().then(question => {
      this.setState({
        questionbank: question
      });
    });
  };

  computeAnswer = (answer, correct) => {
    if (answer === correct) {
      this.setState({
        score: this.state.score + 1
      });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    });
  };
  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0
    });
  };
  componentDidMount() {
    this.getQuestions();
  }
  render() {
    return (
      <div className="container">
        <div className="title">QuizBee App</div>
        {this.state.questionbank.length > 0 &&
          this.state.responses < 5 &&
          this.state.questionbank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                options={answers}
                key={questionId}
                selected={answer => this.computeAnswer(answer, correct)}
              />
            )
          )}

        {this.state.responses === 5 ? (
          <Result score={this.state.score} playAgain={this.playAgain} />
        ) : null}
      </div>
    );
  }
}

export default App;
