import React, { useState, useEffect } from 'react';

function App() {
  const [clientes, setClientes] = useState([]);
  const [nombreCliente, setNombreCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');

  useEffect(() => {
    // Aquí debes hacer una llamada a la API para obtener la lista de clientes
    // y actualizar el estado "clientes" con los datos recibidos
  }, []);

  const handleAgregarCliente = () => {
    // Aquí debes hacer una llamada a la API para agregar un nuevo cliente
    // utilizando los valores de "nombreCliente" y "emailCliente"
    // Después de agregar el cliente, actualiza la lista de clientes y limpia los campos de entrada
  };

  const handleEliminarCliente = (id) => {
    // Aquí debes hacer una llamada a la API para eliminar el cliente con el ID proporcionado
    // Después de eliminar el cliente, actualiza la lista de clientes
  };

  return (
    <div>
      <h1>Clientes</h1>

      <h2>Agregar cliente</h2>
      <input type="text" placeholder="Nombre" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} />
      <input type="email" placeholder="Email" value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} />
      <button onClick={handleAgregarCliente}>Agregar</button>

      <h2>Lista de clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nombre} - {cliente.email}{' '}
            <button onClick={() => handleEliminarCliente(cliente.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}



import React, { useState } from 'react';
import ClientList from './ClientList';
import ClientDetails from './ClientDetails';

const App = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const handleSelectClient = (clientId) => {
    setSelectedClient(clientId);
  };

  return (
    <div>
      <ClientList onSelectClient={handleSelectClient} />
      {selectedClient && <ClientDetails clientId={selectedClient} />}
    </div>
  );
};

export default App;

