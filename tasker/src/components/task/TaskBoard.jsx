import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";

export default function TaskBoard() {
  const defaultTasks = {
    id: crypto.randomUUID(),
    title: "Sample Task",
    description: "This is a sample task description.",
    tags: ["app", "web"],
    priority: "medium",
    isFavorite: false,
  };
  const [tasks, setTasks] = useState([defaultTasks]);
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handlerAddTask = (task, isAdd) => {
    // console.log("Task:", task);
    if (isAdd) {
      setTasks((prevTasks) => [...prevTasks, task]);
    } else {
      setTasks(
        tasks.map((taskItem) => (taskItem.id === task.id ? task : taskItem))
      );
    }

    setShowModal(false);
  };
  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setTaskToUpdate(null);
  };
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  const handleDeleteAll = () => {
    setTasks([]);
  };
  const toggleFavourite = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isFavorite: !task.isFavorite } : task
      )
    );
  };
  return (
    <>
      {showModal && (
        <AddTaskModal
          handler={handlerAddTask}
          taskToUpdate={taskToUpdate}
          onclose={handleCloseModal}
        />
      )}
      <section className="mb-20" id="tasks">
        <div className="container">
          <SearchTask />
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskActions
              handleClick={() => setShowModal(true)}
              deleteAll={handleDeleteAll}
            />
            <TaskList
              tasks={tasks}
              toggleFavourite={toggleFavourite}
              onEdit={handleEditTask}
              OnDelete={handleDeleteTask}
            />
          </div>
        </div>
      </section>
    </>
  );
}
