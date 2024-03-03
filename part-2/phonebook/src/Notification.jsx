import './index.css'
const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={isSuccess ? 'success' : 'error'}>
      {message}
    </div>
  )
}

export default Notification
