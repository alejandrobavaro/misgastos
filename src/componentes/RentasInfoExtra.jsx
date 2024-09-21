import React, { useState, useEffect } from 'react';
import '../assets/scss/_03-Componentes/_RentasInfoExtra.scss';

const RentasInfoExtra = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [filterField, setFilterField] = useState("Categoria");

  // Almacena el índice de la foto actual para cada item
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [previewPdf, setPreviewPdf] = useState(null); // Estado para controlar el PDF que se está previsualizando

  useEffect(() => {
    fetch("/inforentas.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        // Inicializar el índice de la imagen a 0 para cada item
        const initialIndexes = {};
        data.forEach((item) => {
          initialIndexes[item.id] = 0;
        });
        setCurrentImageIndex(initialIndexes);
        console.log("Datos cargados:", data);
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredData = data.filter((item) => {
    const matchesCategory =
      selectedCategory === "TODOS" || item[filterField] === selectedCategory;

    return matchesCategory;
  });

  const categories = [...new Set(data.map((item) => item[filterField]))];

  // Función para avanzar a la siguiente imagen
  const handleNextImage = (id, totalImages) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [id]: (prevState[id] + 1) % totalImages, // Avanza al siguiente índice
    }));
  };

  // Función para retroceder a la imagen anterior
  const handlePrevImage = (id, totalImages) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [id]: (prevState[id] - 1 + totalImages) % totalImages, // Retrocede al índice anterior
    }));
  };

  // Función para mostrar la previsualización del PDF
  const handlePreviewPdf = (pdfUrl) => {
    setPreviewPdf(pdfUrl); // Establece el PDF seleccionado para previsualización
  };

  // Función para cerrar la previsualización del PDF
  const closePdfPreview = () => {
    setPreviewPdf(null); // Oculta la previsualización del PDF
  };

  return (
    <div className="rentas-info-extra">
      <div className="filter-buttons">
        <button
          className={selectedCategory === "TODOS" ? "selected" : ""}
          onClick={() => handleCategoryChange("TODOS")}
        >
          TODOS
        </button>

        <button
          className={selectedCategory === "Tipo" ? "selected" : ""}
          onClick={() => handleCategoryChange("Tipo")}
        >
          Tipo
        </button>

        <button
          className={selectedCategory === "Titular" ? "selected" : ""}
          onClick={() => handleCategoryChange("Titular")}
        >
          Titular
        </button>

        <button
          className={selectedCategory === "Alquilado" ? "selected" : ""}
          onClick={() => handleCategoryChange("Alquilado")}
        >
          Alquilado
        </button>

        <button
          className={selectedCategory === "No Alquilado" ? "selected" : ""}
          onClick={() => handleCategoryChange("No Alquilado")}
        >
          No Alquilado
        </button>

        <button
          className={selectedCategory === "Alquilado por" ? "selected" : ""}
          onClick={() => handleCategoryChange("Alquilado por")}
        >
          Alquilado por
        </button>
      </div>

      {filteredData.length === 0 ? (
        <h4>No se encontraron datos en la búsqueda. Verifique su selección.</h4>
      ) : (
        <div className="data-container">
          {filteredData.map((item) => (
            <div key={item.id} className="data-item">
              <h3>{item.Nombre}</h3>
              <table>
                <tbody>
                  <tr>
                    <td><strong>Categoria:</strong></td>
                    <td>{item.Categoria}</td>
                  </tr>
                  <tr>
                    <td><strong>Tipo:</strong></td>
                    <td>{item.Tipo}</td>
                  </tr>
                  <tr>
                    <td><strong>Titular:</strong></td>
                    <td>{item.Titular}</td>
                  </tr>
                  <tr>
                    <td><strong>Alquilado:</strong></td>
                    <td>{item.Alquilado}</td>
                  </tr>
                  <tr>
                    <td><strong>Alquilado a:</strong></td>
                    <td>{item["Alquilado a"]}</td>
                  </tr>
                  <tr>
                    <td><strong>Alquilado por:</strong></td>
                    <td>{item["Alquilado por"]}</td>
                  </tr>
                  <tr>
                    <td><strong>Fecha de Cobro:</strong></td>
                    <td>{item["Fecha de Cobro"]}</td>
                  </tr>
                  <tr>
                    <td><strong>Facturado:</strong></td>
                    <td>{item.Facturado}</td>
                  </tr>
                  <tr>
                    <td><strong>Impuestos Pagados:</strong></td>
                    <td>{item["Impuestos Pagados"]}</td>
                  </tr>
                  <tr>
                    <td><strong>Servicios Pagados:</strong></td>
                    <td>{item["Servicios Pagados"]}</td>
                  </tr>
                  <tr>
                    <td><strong>Total Ganancia Renta:</strong></td>
                    <td>{item["Total Ganancia Renta"]}</td>
                  </tr>
                </tbody>
              </table>
              <div className="image-thumbnails">
                {item["Ver Fotos Propiedad"] && item["Ver Fotos Propiedad"].length > 0 && (
                  <div className="carousel">
                    <button onClick={() => handlePrevImage(item.id, item["Ver Fotos Propiedad"].length)}>
                      &#9664;
                    </button>
                    <img
                      src={item["Ver Fotos Propiedad"][currentImageIndex[item.id]]}
                      alt={`Foto de ${item.Nombre} ${currentImageIndex[item.id] + 1}`}
                      className="thumbnail"
                    />
                    <button onClick={() => handleNextImage(item.id, item["Ver Fotos Propiedad"].length)}>
                      &#9654;
                    </button>
                  </div>
                )}
              </div>

              {/* Ver Contrato - Previsualizar PDF */}
              <div className="pdf-options">
  <button onClick={() => handlePreviewPdf(item["Contrato Imagen"])}>
    Previsualizar Contrato
  </button>
  <a
    href={`/contratos-alquiler${item["Contrato Imagen"]}`}
    target="_blank"
    rel="noopener noreferrer"
    download={item["Contrato Imagen"]}
  >
    Descargar Contrato
  </a>
</div>


            </div>
          ))}
        </div>
      )}

      {/* Mostrar previsualización del PDF si hay uno seleccionado */}
      {previewPdf && (
        <div className="pdf-preview">
          <iframe
            src={`/contratos-alquiler${previewPdf}`}
            title="Previsualización del contrato"
            className="pdf-viewer"
          />
         <button onClick={closePdfPreview}>
  &times;
</button>

        </div>
      )}
    </div>
  );
};

export default RentasInfoExtra;
