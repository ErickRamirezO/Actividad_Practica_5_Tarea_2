import { useState, useEffect } from 'react';
import AdoptionForm from './components/AdoptionForm';
import ListaPedidos from './components/ListaPedidos';
import './App.css';

const App = () => {
  const [menu, setMenu] = useState([]);
  const [pedidos, setPedidos] = useState([]); // Estado actualizado para almacenar pedidos

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuResponse = await fetch('http://localhost:3001/menu');
        const menuData = await menuResponse.json();
        setMenu(menuData);

        const pedidosResponse = await fetch('http://localhost:3001/pedidos');
        const pedidosData = await pedidosResponse.json();
        setPedidos(pedidosData);
      } catch (error) {
        console.error('Error al cargar datos:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleAdoptionSubmit = async (id, nombreInput) => {
    try {
      const response = await fetch('http://localhost:3001/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: pedidos.length + 1,
          pedido: id,
          Nombre: nombreInput,
        }),
      });

      if (response.ok) {
        const newPedido = await response.json();
        // Actualizar el estado de pedidos con los nuevos datos
        setPedidos((prevPedidos) => [...prevPedidos, newPedido]);

        // Mostrar una alerta con los datos de la nueva adopción
        alert(`¡Pedido realizada con éxito!\nID: ${newPedido.id}\nPedido: ${newPedido.pedido}\nNombre: ${newPedido.nombre}`);
      } else {
        throw new Error('Error al enviar la solicitud de adopción.');
      }
    } catch (error) {
      console.error('Error en la solicitud de pedido:', error.message);
      throw error;
    }
  };

  return (
    <div className="App">
      <AdoptionForm menu={menu} onAdoptionSubmit={handleAdoptionSubmit} />
      <ListaPedidos pedidos={pedidos} />
    </div>
  );
};

export default App;
