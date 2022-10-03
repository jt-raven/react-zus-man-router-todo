import create from 'zustand'

type Task = {
  id: number
  description: string
  done: boolean
}

type TaskState = {
  tasks: Task[]
  filteredTasks: Task[]
  newTask: string
  setNewTask: (newTask: string) => void
  addTask: () => void
  updateTask: (id: number, description: string) => void
  deleteTask: (id: number) => void
  deleteAllTasks: () => void
  updateFilteredTasks: (tasks: Task[]) => void
}

const useTaskStore = create<TaskState>(
  (set): TaskState => ({
    tasks: [],
    filteredTasks: [],
    newTask: '',
    setNewTask: newTask =>
      set(state => ({
        ...state,
        newTask
      })),
    addTask: () =>
      set(state => ({
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: state.tasks.length > 0 ? Math.max(...state.tasks.map(({ id }) => id)) + 1 : 1,
            description: state.newTask,
            done: false
          }
        ],
        newTask: ''
      })),
    updateTask: (id, description) =>
      set(state => ({
        ...state,
        tasks: state.tasks.map(task => ({
          ...task,
          description: task.id === id ? description : task.description,
          done: task.id === id ? !task.done : task.done
        }))
      })),
    deleteTask: id =>
      set(state => ({
        ...state,
        tasks: state.tasks.filter(task => task.id !== id)
      })),
    deleteAllTasks: () =>
      set(state => ({
        ...state,
        tasks: [],
        filteredTasks: []
      })),
    updateFilteredTasks: tasks =>
      set(state => ({
        ...state,
        filteredTasks: tasks
      }))
  })
)

export default useTaskStore
