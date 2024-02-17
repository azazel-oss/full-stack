import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function buttonClickHandler(func) {
    return func(prev => prev + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} onClick={() => buttonClickHandler(setGood)} />
      <Button text={"neutral"} onClick={() => buttonClickHandler(setNeutral)} />
      <Button text={"bad"} onClick={() => buttonClickHandler(setBad)} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Statistics = ({ good, neutral, bad, }) => {
  const total = good + neutral + bad
  return <>
    <h1>statistics</h1>
    {!(good + bad + neutral > 0) ? <p>No feedback given</p> :
      <table>
        <tbody>
          <StatisticsLine text={'good'} value={good} />
          <StatisticsLine text={'neutral'} value={neutral} />
          <StatisticsLine text={'bad'} value={bad} />
          <StatisticsLine text={'all'} value={total} />
          <StatisticsLine text={'average'} value={(good - bad) / total} />
          <StatisticsLine text={'positive'} value={good * 100 / total} />
        </tbody>
      </table>
    }
  </>
}

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticsLine = ({ text, value }) => {
  return <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
}

export default App
