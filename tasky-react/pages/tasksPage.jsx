import Task from "../src/components/Task";  // Fixed path (no need for "src" prefix)
import AddTaskForm from "../src/components/Task";  // Fixed path
import { useState, useEffect } from 'react';
import { getTasks, addTask, deleteTask, updateTask } from "../src/api/tasky-api";  // Fixed file name

function TasksPage() {
  const [taskState, setTaskState] = useState({ tasks: [] });

  useEffect(() => {
    getTasks().then(tasks => {
      setTaskState({ tasks });
    });
  }, []);

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Low"
  });

  const doneHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks[taskIndex].done = !tasks[taskIndex].done;
    updateTask(tasks[taskIndex]);
    setTaskState({ tasks });
  };

  const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    const id = tasks[taskIndex]._id;
    tasks.splice(taskIndex, 1);
    deleteTask(id);
    setTaskState({ tasks });
  };

  const formChangeHandler = (event) => {
    const form = { ...formState, [event.target.name]: event.target.value };
    setFormState(form);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const tasks = taskState.tasks ? [...taskState.tasks] : [];
    const newTask = await addTask(formState);
    tasks.push(newTask);
    setTaskState({ tasks });
  };

  return (
    <>
      {taskState.tasks.map((task, index) => (
        <Task
          key={task._id}
          title={task.title}
          description={task.description}
          deadline={task.deadline}
          done={task.done}
          priority={task.priority}
          markDone={() => doneHandler(index)}
          deleteTask={() => deleteHandler(index)}
        />
      ))}
      <AddTaskForm submit={formSubmitHandler} change={formChangeHandler} />
    </>
  );
}

export default TasksPage;
