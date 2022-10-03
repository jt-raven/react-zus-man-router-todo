import React, { useState, useEffect, useRef } from 'react'
import { Paper, List, Group, Text, Button, TextInput } from '@mantine/core'
import useStore from '../store'

type TaskListItemProps = {
  id: number
  description: string
  done: boolean
  selectedTaskId: number | null
  setSelectedTaskId: React.Dispatch<React.SetStateAction<number | null>>
}

const TaskListItem = ({
  id,
  description,
  done,
  selectedTaskId,
  setSelectedTaskId
}: TaskListItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { updateTask, deleteTask } = useStore(state => state)

  useEffect(() => {
    inputRef.current?.focus()
  }, [isEditing])

  const onEditButtonClick = (id: number): void => {
    setSelectedTaskId(id)
    setIsEditing(true)
  }

  return (
    <List.Item>
      <Group position="apart" mt="xs" mb="xs">
        {isEditing && selectedTaskId === id ? (
          <>
            <Group>
              <Text component="span">&#9733;</Text>
              <TextInput
                ref={inputRef}
                value={description}
                onChange={e => updateTask(id, e.target.value)}
              />
            </Group>
            <Button onClick={() => setIsEditing(false)}>Save</Button>
          </>
        ) : (
          <>
            <Paper>
              <Text component="span">&#9733; </Text>
              <Text
                component="span"
                color={done ? 'grey' : 'black'}
                italic={done}
                strikethrough={done}
              >
                {description}
              </Text>
            </Paper>
            <Group spacing="xs">
              {!done ? (
                <>
                  <Button onClick={() => onEditButtonClick(id)} variant="default">
                    Edit
                  </Button>
                  <Button onClick={() => updateTask(id, description)} color="teal">
                    Done
                  </Button>
                </>
              ) : (
                <Button onClick={() => updateTask(id, description)} color="orange">
                  Undone
                </Button>
              )}
              <Button onClick={() => deleteTask(id)} color="red">
                Delete
              </Button>
            </Group>
          </>
        )}
      </Group>
    </List.Item>
  )
}

export default TaskListItem
