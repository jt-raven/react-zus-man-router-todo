import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Title, List, Group, Text, Button, Divider } from '@mantine/core'
import useStore from '../store'
import TaskListItem from './TaskListItem'

const TaskList = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
  const { tasks, deleteAllTasks } = useStore(state => state)
  const tasksExist: boolean = tasks.length > 0

  return (
    <>
      <Title order={1} align="center">
        Todo List
      </Title>
      {tasksExist ? (
        <List listStyleType="none" p="md">
          {tasks.map(({ id, ...props }) => (
            <TaskListItem
              key={id}
              id={id}
              {...props}
              selectedTaskId={selectedTaskId}
              setSelectedTaskId={setSelectedTaskId}
            />
          ))}
          {tasks.length > 1 && (
            <List.Item>
              <Group position="right">
                <Button onClick={deleteAllTasks} color="red">
                  Delete All
                </Button>
              </Group>
            </List.Item>
          )}
        </List>
      ) : (
        <Text m="md" align="center" italic>
          Empty List
        </Text>
      )}
      {tasksExist && <Divider variant="dashed" />}
      <Group position="center" p="md">
        <Button component={Link} to="/add" color="green">
          Add a new task
        </Button>
      </Group>
    </>
  )
}

export default TaskList
