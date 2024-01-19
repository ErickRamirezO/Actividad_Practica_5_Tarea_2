// AdoptionForm.jsx
import { useState } from "react";

const AdoptionForm = ({ menu, onAdoptionSubmit }) => {
  const [selectedPedido, setSelectedPedido] = useState("");
  const [nombreInput, setNombreInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPedido && nombreInput) {
      onAdoptionSubmit(selectedPedido, nombreInput);
      // Clear selected values after submission
      setSelectedPedido("");
      setNombreInput("");
    } else {
      console.error("Debe seleccionar una comida y su nombre .");
    }
  };
  

  return (
    <div className="ContenedorFormulario">
      
      <div className="pedidos_form"></div>
      <form class="formulario" onSubmit={handleSubmit}>
        <div className="">
        <h3>Datos del cliente :</h3>
        <div className="datos_cliente">
          <label htmlFor="nombreInput">Ingrese su nombre: </label>
          <input
            type="text"
            id="nombreInput"
            value={nombreInput}
            onChange={(e) => setNombreInput(e.target.value)} // Manejar cambios en el input de texto
          />
        </div>
        <div class="datos_cliente">
          <label htmlFor="adopterSelect">Seleccionar la comida:</label>
          <select
            id="adopterSelect"
            value={selectedPedido}
            onChange={(e) => setSelectedPedido(e.target.value)}
          >
            <option value="" disabled>
              Seleccione una comida
            </option>
            {menu.map((menuItem) => (
              <option key={menuItem.id} value={menuItem.id}>
                {menuItem.name}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <button className="btn-submit" type="submit"  >
          Enviar Pedido
        </button>
        </div>

        {/* Mostrar lista de adoptantes y perros disponibles */}
        <div className="Comida-disponible">
          <div>
          <h3>Comida Disponible:</h3>
          <ol>

            {menu.map((menuItem) => (
              <li key={menuItem.id}>{menuItem.name}</li>
            ))}
          </ol>
          </div>
          <div>
            <img src="./comida.jpg" alt="" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdoptionForm;
