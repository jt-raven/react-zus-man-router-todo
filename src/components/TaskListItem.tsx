import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { Paper, List, Group, Text, Button, TextInput } from '@mantine/core'
import useTaskStore from '../store'
import useInputValidation from '../hooks/useInputValidation'

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
  const { updateTask, deleteTask } = useTaskStore(state => state)
  const [setUserInput, isValid] = useInputValidation(description, value => !!value.trim().length)

  useEffect(() => {
    inputRef.current?.focus()
  }, [isEditing])

  const onTextInputChange = (id: number, event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value

    updateTask(id, value)
    setUserInput(value)
  }

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
                onChange={e => onTextInputChange(id, e)}
              />
            </Group>
            <Button onClick={() => setIsEditing(false)} disabled={!isValid}>
              Save
            </Button>
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
                  <Button onClick={() => updateTask(id, description, true)} color="teal">
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
