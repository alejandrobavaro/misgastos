import React, { useState } from "react";
import Modal from 'react-modal';
import { FaEdit, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
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

const columns = ["todo", "doing", "done", "blocked"];

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

  const handleColorChange = (color) => {
    setNewTask({ ...newTask, color });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(newTask).every(field => field !== "")) {
      setTasks(prevTasks => ({
        ...prevTasks,
        todo: [...prevTasks.todo, newTask]
      }));
      setNewTask({ title: "", description: "", color: "#333", date: "", priority: "medium", assignedTo: "" });
    }
  };

  const moveTask = (task, fromColumn, direction) => {
    const currentIndex = columns.indexOf(fromColumn);
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < columns.length) {
      const newColumn = columns[newIndex];

      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        newTasks[fromColumn] = prevTasks[fromColumn].filter(t => t !== task);
        newTasks[newColumn] = [...prevTasks[newColumn], task];
        return newTasks;
      });
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
    setTasks(prevTasks => ({
      ...prevTasks,
      [currentColumn]: prevTasks[currentColumn].map(task =>
        task.title === currentTask.title ? currentTask : task
      )
    }));
    closeTaskModal();
  };

  const handleTaskDelete = () => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [currentColumn]: prevTasks[currentColumn].filter(task => task.title !== currentTask.title)
    }));
    closeTaskModal();
  };

  return (
    <div className="mainTareasEnProceso">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título de la Tarea:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Título de la Tarea"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción de la Tarea:</label>
          <textarea
            id="description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            placeholder="Descripción de la Tarea"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Fecha:</label>
          <input
            id="date"
            type="date"
            name="date"
            value={newTask.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group color-selector">
          <label>Color de Tarjeta:</label>
          <div className="color-options">
            {colorOptions.map(option => (
              <div
                key={option.value}
                className={`color-option ${newTask.color === option.value ? 'selected' : ''}`}
                style={{ backgroundColor: option.value }}
                onClick={() => handleColorChange(option.value)}
              >
                {newTask.color === option.value && <span className="checkmark">✓</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Prioridad:</label>
          <select
            id="priority"
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="assignedTo">Asignado a:</label>
          <input
            id="assignedTo"
            type="text"
            name="assignedTo"
            value={newTask.assignedTo}
            onChange={handleInputChange}
            placeholder="Asignado a"
          />
        </div>
        <button type="submit" className="add-task-button">Agregar</button>
      </form>

      <div className="task-columns">
        {columns.map((status) => (
          <div key={status} className="task-column">
            <h2>{status.toUpperCase()}</h2>
            <div className="task-list">
              {tasks[status].map((task, index) => (
                <div key={index} className="task-item" style={{ backgroundColor: task.color }}>
                  <div className="task-item-content" onClick={() => openTaskModal(task, status)}>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                    <small>Fecha: {task.date}</small>
                    <small>Prioridad: {task.priority}</small>
                    <small>Asignado a: {task.assignedTo}</small>
                  </div>
                  <div className="task-item-controls">
                    <button
                      className="move-left-button"
                      onClick={() => moveTask(task, status, -1)}
                      disabled={columns.indexOf(status) === 0}
                    >
                      <FaArrowLeft />
                    </button>
                    <button
                      className="move-right-button"
                      onClick={() => moveTask(task, status, 1)}
                      disabled={columns.indexOf(status) === columns.length - 1}
                    >
                      <FaArrowRight />
                    </button>
                    <button className="edit-button" onClick={(e) => {
                      e.stopPropagation();
                      openTaskModal(task, status);
                    }}>
                      <FaEdit />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

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
