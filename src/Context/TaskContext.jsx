import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const initialTaskState = {
  tasks: [],
  filter: "all",
  modalTask: null,
  isEditing: false,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_MODAL_TASK":
      return {
        ...state,
        modalTask: action.payload,
        isEditing: action.isEditing,
      };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

const TaskContext = createContext();

// Custom hook para usar el contexto
export const useTasks = () => useContext(TaskContext);

// Proveedor del contexto
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        dispatch({ type: "SET_TASKS", payload: response.data });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Función que agrega o actualiza una tarea
  const saveTask = async (task) => {
    try {
      if (task.id) {
        const response = await axios.put(
          `http://localhost:5000/todos/${task.id}`,
          task
        );
        dispatch({ type: "UPDATE_TASK", payload: response.data });
      } else {
        const response = await axios.post("http://localhost:5000/todos", {
          ...task,
          isCompleted: false,
        });
        dispatch({ type: "ADD_TASK", payload: response.data });
      }
      dispatch({ type: "SET_MODAL_TASK", payload: null }); // Cerrar el modal al terminar
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      dispatch({ type: "DELETE_TASK", payload: id });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Función para alternar el estado de completitud de la tarea
  const toggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      const response = await axios.put(
        `http://localhost:5000/todos/${task.id}`,
        updatedTask
      );
      dispatch({ type: "UPDATE_TASK", payload: response.data });
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ state, dispatch, saveTask, deleteTask, toggleComplete }}
    >
      {children}
    </TaskContext.Provider>
  );
};
