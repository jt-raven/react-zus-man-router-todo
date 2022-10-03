import { Routes, Route } from 'react-router-dom'
import { Container } from '@mantine/core'
import TaskList from './components/TaskList'
import AddTask from './components/AddTask'
import PageNotFound from './components/PageNotFound'

const App = () => (
  <Container pt="md">
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="add" element={<AddTask />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Container>
)

export default App
