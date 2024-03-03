const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Total = (props) => {
  return <b>Number of exercises {props.sumOfExercises}</b>
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Course = ({ course }) => {
  const sumOfExercises = course.parts.reduce((acc, b) => {
    return acc + b.exercises
  }, 0)

  return <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sumOfExercises={sumOfExercises} />
  </>
}

export default Course
