import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../assets/scss/_03-Componentes/_MainPublicidadSlider.scss';

const MainPublicidadSlider = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("/productos.json"); // Carga los productos desde un archivo JSON
        const productos = await response.json();
        setProductos(productos);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProductos();
  }, []); 

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="gridPadrePublicidad1">
      <div className="publicidad-grid-contenedor">
        <div className="publicidad-grid fila-publicidad">
          <div className="publicidad-container">
            <Slider {...settings}>
              {productos.map((producto) => (
                <div key={producto.id} className="slide-item">
                  <img
                    src={producto.imagenes[0]}
                    alt={producto.nombre}
                    className="imagen-publicidad objetoCentrado1"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="publicidad-container">
            <Slider {...settings}>
              {productos
                .slice()
                .reverse()
                .map((producto) => (
                  <div key={producto.id} className="slide-item">
                    <img
                      src={producto.imagenes[0]}
                      alt={producto.nombre}
                      className="imagen-publicidad objetoCentrado1"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </div>
        <h3 className="tituloImportante3">INVERTI EN VOS</h3>
        <div className="gridPadreProductos1">
          {productos.map((producto) => (
            <img
              key={producto.id}
              src={producto.imagenes[0]}
              alt={producto.nombre}
              className="imagen-limitada8 objetoCentrado1"
            />
          ))}
        </div>
        <hr className="transparent-hr" />
      </div>
    </div>
  );
};

export default MainPublicidadSlider;
