import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from 'react-modal';
import { FaEdit } from 'react-icons/fa';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'; // Importamos íconos de Bootstrap
import '../assets/scss/_03-Componentes/_MainTareasEnProceso.scss';

Modal.setAppElement('#root');

const colorOptions = [
  { label: "Rojo", value: "#FF5733" },
  { label: "Verde", value: "#28A745" },
  { label: "Azul", value: "#007BFF" },
  { label: "Amarillo", value: "#FFC107" },
  { label: "Gris", value: "#6C757D" }
];

const initialTasks = {
  todo: [],
  doing: [],
  done: [],
  blocked: []
};

const columnOrder = ["todo", "doing", "done", "blocked"];

function MainTareasEnProceso() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    color: "#333",
    date: "",
    priority: "medium",
    assignedTo: ""
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentColumn, setCurrentColumn] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks(prevTasks => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask]
    }));
    setNewTask({ title: "", description: "", color: "#333", date: "", priority: "medium", assignedTo: "" });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    const updatedTasks = {
      ...tasks,
      [source.droppableId]: Array.from(tasks[source.droppableId]),
      [destination.droppableId]: Array.from(tasks[destination.droppableId]),
    };
    
    const [movedTask] = updatedTasks[source.droppableId].splice(source.index, 1);
    updatedTasks[destination.droppableId].splice(destination.index, 0, movedTask);
    
    setTasks(updatedTasks);
  };

  const moveTask = (direction) => {
    if (!currentTask || !currentColumn) return;

    const currentIndex = columnOrder.indexOf(currentColumn);
    let newColumn = currentColumn;

    if (direction === "next" && currentIndex < columnOrder.length - 1) {
      newColumn = columnOrder[currentIndex + 1];
    } else if (direction === "prev" && currentIndex > 0) {
      newColumn = columnOrder[currentIndex - 1];
    }

    if (newColumn !== currentColumn) {
      const updatedTasks = {
        ...tasks,
        [currentColumn]: tasks[currentColumn].filter(task => task.title !== currentTask.title),
        [newColumn]: [...tasks[newColumn], currentTask]
      };
      setTasks(updatedTasks);
      setCurrentColumn(newColumn);
    }
  };

  const openTaskModal = (task, column) => {
    setCurrentTask(task);
    setCurrentColumn(column);
    setModalIsOpen(true);
  };

  const closeTaskModal = () => {
    setModalIsOpen(false);
    setCurrentTask(null);
    setCurrentColumn("");
  };

  const handleTaskUpdate = () => {
    const updatedTasks = {
      ...tasks,
      [currentColumn]: tasks[currentColumn].map(task =>
        task.title === currentTask.title ? currentTask : task
      )
    };
    setTasks(updatedTasks);
    closeTaskModal();
  };

  const handleTaskDelete = () => {
    const updatedTasks = {
      ...tasks,
      [currentColumn]: tasks[currentColumn].filter(task => task.title !== currentTask.title)
    };
    setTasks(updatedTasks);
    closeTaskModal();
  };

  return (
    <div className="mainTareasEnProceso">
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Título de la Tarea"
          required
        />
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Descripción de la Tarea"
        />
        <div className="task-form-extra">
          <input
            type="date"
            name="date"
            value={newTask.date}
            onChange={handleInputChange}
          />
          <select
            name="color"
            value={newTask.color}
            onChange={handleInputChange}
          >
            {colorOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
          <input
            type="text"
            name="assignedTo"
            value={newTask.assignedTo}
            onChange={handleInputChange}
            placeholder="Asignado a"
          />
        </div>
        <button type="submit" className="add-task-button">Agregar</button>
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="task-columns">
          {columnOrder.map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className="task-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{status.toUpperCase()}</h2>
                  <div className="task-list">
                    {tasks[status].map((task, index) => (
                      <Draggable key={task.title} draggableId={task.title} index={index}>
                        {(provided) => (
                          <div
                            className="task-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...provided.draggableProps.style, backgroundColor: task.color }}
                          >
                            <div className="task-item-content" onClick={() => openTaskModal(task, status)}>
                              <strong>{task.title}</strong>
                              <p>{task.description}</p>
                              <small>Fecha: {task.date}</small>
                              <small>Prioridad: {task.priority}</small>
                              <small>Asignado a: {task.assignedTo}</small>
                            </div>
                            <div className="task-item-actions">
                              <button
                                className="move-button"
                                onClick={() => moveTask("prev")}
                                disabled={columnOrder.indexOf(status) === 0} // Deshabilitar si es la primera columna
                              >
                                <BsArrowLeft />
                              </button>
                              <button
                                className="move-button"
                                onClick={() => moveTask("next")}
                                disabled={columnOrder.indexOf(status) === columnOrder.length - 1} // Deshabilitar si es la última columna
                              >
                                <BsArrowRight />
                              </button>
                              <button className="edit-button" onClick={(e) => {
                                e.stopPropagation();
                                openTaskModal(task, status);
                              }}>
                                <FaEdit />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {currentTask && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeTaskModal}
          contentLabel="Editar Tarea"
          className="task-detail-modal"
        >
          <h2>Editar Tarea</h2>
          <form className="task-detail-form">
            <input
              type="text"
              name="title"
              value={currentTask.title}
              onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
              placeholder="Título de la Tarea"
            />
            <textarea
              name="description"
              value={currentTask.description}
              onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
              placeholder="Descripción de la Tarea"
            />
            <input
              type="date"
              name="date"
              value={currentTask.date}
              onChange={(e) => setCurrentTask({ ...currentTask, date: e.target.value })}
            />
            <select
              name="color"
              value={currentTask.color}
              onChange={(e) => setCurrentTask({ ...currentTask, color: e.target.value })}
            >
              {colorOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              name="priority"
              value={currentTask.priority}
              onChange={(e) => setCurrentTask({ ...currentTask, priority: e.target.value })}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            <input
              type="text"
              name="assignedTo"
              value={currentTask.assignedTo}
              onChange={(e) => setCurrentTask({ ...currentTask, assignedTo: e.target.value })}
              placeholder="Asignado a"
            />
            <button type="button" onClick={handleTaskUpdate}>Actualizar</button>
            <button type="button" onClick={handleTaskDelete}>Eliminar</button>
            <button type="button" onClick={closeTaskModal}>Cerrar</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default MainTareasEnProceso;
