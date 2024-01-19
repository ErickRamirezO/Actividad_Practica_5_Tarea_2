// ListaPedidos.jsx
import React from 'react';


const ListaPedidos = ({ pedidos }) => (
  <div className='ContenedorPedidos'>
    <h3>Lista de Pedidos:</h3>
    <ul>
      {pedidos.map((pedidoItem) => (
        <li key={pedidoItem.id}>
          Pedido: {pedidoItem.pedido}, Nombre: {pedidoItem.nombre}
        </li>
      ))}
    </ul>
  </div>
)

export default ListaPedidos;
