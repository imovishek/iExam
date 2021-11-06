import { useHistory } from 'react-router-dom'

const CheckAuthentication = () => {
  const history = useHistory()
  if (!localStorage.email) history.push('/login')
  return (
    <div></div>
  )
}

export default CheckAuthentication
