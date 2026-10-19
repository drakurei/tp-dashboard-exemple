import { Container } from 'react-bootstrap'
import TaskDashboard from './components/TaskDashboard'

function App() {
  return (
    <div className='bg-light'>
      <Container fluid className='py-4'>
        <TaskDashboard />
      </Container>
    </div>
  )
}

export default App
