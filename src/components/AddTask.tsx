import { useEffect, useRef, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Title, Paper, Group, Anchor, TextInput, Button } from '@mantine/core'
import useTaskStore from '../store'
import useInputValidation from '../hooks/useInputValidation'

const AddTask = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { newTask, setNewTask, addTask } = useTaskStore(state => state)
  const [setUserInput, isValid] = useInputValidation(newTask, value => !!value.trim().length)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const onTextInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value

    setNewTask(value)
    setUserInput(value)
  }

  const onAddButtonClick = (): void => {
    addTask()
    navigate('/')
  }

  return (
    <Paper p="md">
      <Title order={1} align="center">
        Add a New Task
      </Title>
      <Group position="center" mt="md">
        <Anchor component={Link} to="/" weight={700} underline={false}>
          Back to My List
        </Anchor>
      </Group>
      <Group spacing="xs" position="center" mt="md">
        <TextInput
          ref={inputRef}
          value={newTask}
          onChange={onTextInputChange}
          placeholder="What do you want to do?"
          required
        />
        <Button onClick={onAddButtonClick} color="green" disabled={!isValid}>
          Add
        </Button>
      </Group>
    </Paper>
  )
}

export default AddTask
