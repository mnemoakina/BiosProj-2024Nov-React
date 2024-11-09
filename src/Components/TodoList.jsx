import TodoItem from "./TodoItem";

const TodoList = ({ tasks, onEditTask, onDeleteTask, onToggleComplete }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
