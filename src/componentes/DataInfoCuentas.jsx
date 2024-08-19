import React, { useState, useEffect } from 'react';
import '../assets/scss/_03-Componentes/_DataInfoCuentas.scss';

const DataInfoCuentas = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TODOS');


  useEffect(() => {
    fetch('/infocuentas.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log('Datos cargados:', data); // Verifica que los datos se cargan correctamente
      })
      .catch(error => console.error('Error al cargar los datos:', error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedName('');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtra los datos
  const filteredData = data.filter(item => {

    const matchesCategory = selectedCategory === 'TODOS' || item.Categoria === selectedCategory;
    const matchesSearchTerm = searchTerm === '' || Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchesCategory && matchesSearchTerm;
  });

  // Extrae categorías
  const categories = [...new Set(data.map(item => item.Categoria))];

  // Filtra los nombres según la categoría seleccionada
  const names = selectedCategory === 'TODOS'
    ? ['Todos', ...new Set(data.map(item => item.Nombre))]
    : [...new Set(data.filter(item => item.Categoria === selectedCategory).map(item => item.Nombre))];

  return (
    <div className="data">
      <div className="search-filter-container">
        <div className="filters">
          <div className="category-buttons">
            <button
              className={selectedCategory === 'TODOS' ? 'selected' : ''}
              onClick={() => handleCategoryChange('TODOS')}
            >
              TODOS
            </button>
            {categories.map(category => (
              category !== 'TODOS' && (
                <button
                  key={category}
                  className={selectedCategory === category ? 'selected' : ''}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              )
            ))}
          
       

          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar en los datos..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          </div>
        </div>
      </div>
      {filteredData.length === 0 ? (
        <h4>No se encontraron datos en la búsqueda. Verifique su selección.</h4>
      ) : (
        <div className="data-container">
          {filteredData.map(item => (
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
                    <td><strong>Servicio:</strong></td>
                    <td>{item.Servicio}</td>
                  </tr>
                  <tr>
                    <td><strong>Empresa:</strong></td>
                    <td>{item.Empresa}</td>
                  </tr>
                  <tr>
                    <td><strong>Impuesto:</strong></td>
                    <td>{item.Impuesto}</td>
                  </tr>
                  <tr>
                    <td><strong>Agente Recaudador:</strong></td>
                    <td>{item['Agente Recaudador']}</td>
                  </tr>
                  <tr>
                    <td><strong>Sección:</strong></td>
                    <td>{item.Sección}</td>
                  </tr>
                  <tr>
                    <td><strong>Número de Cuenta:</strong></td>
                    <td>{item['Numero de Cuenta']}</td>
                  </tr>
                  <tr>
                    <td><strong>CPE:</strong></td>
                    <td>{item['CPE (Codigo Pago Electronico)']}</td>
                  </tr>
                  <tr>
                    <td><strong>Titular:</strong></td>
                    <td>{item.Titular}</td>
                  </tr>
                  <tr>
                    <td><strong>Vencimiento:</strong></td>
                    <td>{item.Vencimiento}</td>
                  </tr>
                  <tr>
                    <td><strong>Consumo Mes:</strong></td>
                    <td>{item['Consumo Mes']}</td>
                  </tr>
                  <tr>
                    <td><strong>Factura Pagada:</strong></td>
                    <td>{item['Factura Pagada']}</td>
                  </tr>
                  <tr>
                    <td><strong>Pagado con:</strong></td>
                    <td>{item['Pagado con']}</td>
                  </tr>
                  <tr>
                    <td><strong>Importe Pagado:</strong></td>
                    <td>{item['Importe Pagado']}</td>
                  </tr>
                  <tr>
                    <td><strong>Factura Digital Recibida:</strong></td>
                    <td>{item['Factura Digital Recibida']}</td>
                  </tr>
                  <tr>
                    <td><strong>Factura Digital al mail:</strong></td>
                    <td>{item['Factura Digital al mail']}</td>
                  </tr>
                  <tr>
                    <td><strong>Información Extra:</strong></td>
                    <td>{item['Información Extra']}</td>
                  </tr>
                </tbody>
              </table>
              <a href={`/path-to-invoice-pdfs/${item['Factura Imagen']}`} target="_blank" rel="noopener noreferrer">
                Ver Factura
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataInfoCuentas;
