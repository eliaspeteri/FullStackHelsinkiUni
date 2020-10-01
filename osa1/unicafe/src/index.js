import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
  <h1>{props.text}</h1>
  )
}

const Button = (props) => (
  <button onClick = {props.handleClick}>{props.text}</button>)


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newGood => {
    setGood(newGood)
  }
  const setToNeutral = newNeutral => {
    setNeutral(newNeutral)
  }
  const setToBad = newBad => {
    setBad(newBad)
  }

const Statistics = (props) => {
  if(good !== 0 || neutral !== 0 || bad !== 0){
    return(
      <div>
        <table>
          <tbody>
            <tr><StatisticLine text="good" value={good} /></tr>
            <tr><StatisticLine text="neutral" value={neutral} /></tr>
            <tr><StatisticLine text="bad" value={bad} /></tr>
            <tr><StatisticLine text="all" value={good + neutral + bad} /></tr>
            <tr><StatisticLine text="average" value={(good + (neutral*0) + (bad*-1)/3)/10} /></tr>
            <tr><StatisticLine text="positive" value={(good / (neutral + bad)) * 100 + ' %'} /></tr>
          </tbody>
        </table>
      </div>
    )
  }
  else {
    return("No feedback given")
  }
}

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td><td>{props.value} </td>
    </>
  )
}

  return (
    <div>
      <Header text={"give feedback"}/>
      <Button handleClick={() => setToGood(good + 1)} text="good"/>
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setToBad(bad + 1)} text="bad"/>
      <Header text={"statistics"} />
      <Statistics />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))