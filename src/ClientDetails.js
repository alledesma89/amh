import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientDetails = ({ clientId }) => {
  const [client, setClient] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const getClient = async () => {
    try {
      const response = await axios.get(`/api/clients/${clientId}`);
      const clientData = response.data;
      setClient(clientData);
    } catch (error) {
      console.error(error);
    }
  };

  const updateClient = async () => {
    try {
      await axios.put(`/api/clients/${clientId}`, updatedData);
      getClient(); // Actualizar los datos del cliente después de la actualización
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClient();
  }, [clientId]);

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Client Details</h2>
      <p>Name: {client.name}</p>
      <p>Email: {client.email}</p>
      {/* Aquí puedes mostrar y editar el resto de la información del cliente */}
    </div>
  );
};

export default ClientDetails;

