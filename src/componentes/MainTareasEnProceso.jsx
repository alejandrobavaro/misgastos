import React, { useState } from "react";
import Modal from "react-modal";
import { FaEdit, FaArrowRight, FaArrowLeft, FaTrash } from "react-icons/fa";
import "../assets/scss/_03-Componentes/_MainTareasEnProceso.scss";



const colorOptions = [
  { label: "Rojo", value: "#FF5733" },
  { label: "Verde", value: "#28A745" },
  { label: "Azul", value: "#007BFF" },
  { label: "Amarillo", value: "#FFC107" },
  { label: "Gris", value: "#6C757D" },
];

const initialTasks = {
  todo: [
    {
      title: "Tarea 1",
      description: "Descripción 1",
      color: "#FF5733",
      date: "2024-08-12",
      priority: "medium",
      assignedTo: "Nombre 1",
    },
  ],
  doing: [
    {
      title: "Tarea 2",
      description: "Descripción 2",
      color: "#28A745",
      date: "2024-08-12",
      priority: "high",
      assignedTo: "Nombre 2",
    },
  ],
  done: [
    {
      title: "Tarea 3",
      description: "Descripción 3",
      color: "#007BFF",
      date: "2024-08-12",
      priority: "low",
      assignedTo: "Nombre 3",
    },
  ],
  blocked: [
    {
      title: "Tarea 4",
      description: "Descripción 4",
      color: "#FFC107",
      date: "2024-08-12",
      priority: "medium",
      assignedTo: "Nombre 4",
    },
  ],
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
    assignedTo: "",
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
    if (Object.values(newTask).every((field) => field.trim() !== "")) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, newTask],
      }));
      setNewTask({
        title: "",
        description: "",
        color: "#333",
        date: "",
        priority: "medium",
        assignedTo: "",
      });
    }
  };

  const moveTask = (task, fromColumn, direction) => {
    const currentIndex = columns.indexOf(fromColumn);
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < columns.length) {
      const newColumn = columns[newIndex];

      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };
        newTasks[fromColumn] = prevTasks[fromColumn].filter((t) => t !== task);
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
    setTasks((prevTasks) => ({
      ...prevTasks,
      [currentColumn]: prevTasks[currentColumn].map((task) =>
        task.title === currentTask.title ? currentTask : task
      ),
    }));
    closeTaskModal();
  };

  const handleTaskDelete = (task) => {
    if (!task) return; // Check if task is defined

    setTasks((prevTasks) => ({
      ...prevTasks,
      [currentColumn]: prevTasks[currentColumn].filter((t) => t !== task),
    }));
    closeTaskModal();
  };

  return (
    <div className="mainTareasEnProceso">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título de la Tarea</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Título de la Tarea"
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción de la Tarea</label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            placeholder="Descripción de la Tarea"
          />
        </div>
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            name="date"
            value={newTask.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Color de la Tarjeta</label>
          <div className="color-picker">
            {colorOptions.map((option) => (
              <div
                key={option.value}
                className={`color-option ${
                  newTask.color === option.value ? "selected" : ""
                }`}
                style={{ backgroundColor: option.value }}
                onClick={() => setNewTask({ ...newTask, color: option.value })}
              >
                {newTask.color === option.value && (
                  <FaEdit className="check-icon" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Prioridad</label>
          <select
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
          <label>Asignado a</label>
          <input
            type="text"
            name="assignedTo"
            value={newTask.assignedTo}
            onChange={handleInputChange}
            placeholder="Asignado a"
          />
        </div>
        <button type="submit" className="add-task-button">
          Agregar
        </button>
      </form>

      <div className="task-columns">
        {columns.map((status) => (
          <div key={status} className="task-column">
            <h2>{status.toUpperCase()}</h2>
            <div className="task-list">
              {tasks[status].length > 0 ? (
                <div className="task-list-container">
                  {tasks[status].map((task, index) => (
                    <div
                      key={index}
                      className="task-item"
                      style={{ backgroundColor: task.color }}
                    >
                      <div
                        className="task-item-content"
                        onClick={() => openTaskModal(task, status)}
                      >
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
                          className="edit-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openTaskModal(task, status);
                          }}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="move-right-button"
                          onClick={() => moveTask(task, status, 1)}
                          disabled={
                            columns.indexOf(status) === columns.length - 1
                          }
                        >
                          <FaArrowRight />
                        </button>
                      
                    
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="nohaytareas">No hay tareas en esta columna.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {currentTask && (
  <div className="modal-container"> {/* Contenedor adicional */}
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
          onChange={(e) =>
            setCurrentTask({ ...currentTask, title: e.target.value })
          }
          placeholder="Título de la Tarea"
        />
        <textarea
          name="description"
          value={currentTask.description}
          onChange={(e) =>
            setCurrentTask({ ...currentTask, description: e.target.value })
          }
          placeholder="Descripción de la Tarea"
        />
        <input
          type="date"
          name="date"
          value={currentTask.date}
          onChange={(e) =>
            setCurrentTask({ ...currentTask, date: e.target.value })
          }
        />
        <div className="color-picker">
          {colorOptions.map((option) => (
            <div
              key={option.value}
              className={`color-option ${
                currentTask.color === option.value ? "selected" : ""
              }`}
              style={{ backgroundColor: option.value }}
              onClick={() =>
                setCurrentTask({ ...currentTask, color: option.value })
              }
            >
              {currentTask.color === option.value && (
                <FaEdit className="check-icon" />
              )}
            </div>
          ))}
        </div>
        <select
          name="priority"
          value={currentTask.priority}
          onChange={(e) =>
            setCurrentTask({ ...currentTask, priority: e.target.value })
          }
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
        <input
          type="text"
          name="assignedTo"
          value={currentTask.assignedTo}
          onChange={(e) =>
            setCurrentTask({ ...currentTask, assignedTo: e.target.value })
          }
          placeholder="Asignado a"
        />
        <button type="button" onClick={handleTaskUpdate}>
          Actualizar
        </button>
        <button type="button" onClick={() => handleTaskDelete(currentTask)}>
          Eliminar
        </button>
        <button type="button" onClick={closeTaskModal}>
          Cerrar
        </button>
      </form>
    </Modal>
  </div>
)}

    </div>
  );
}

export default MainTareasEnProceso;
