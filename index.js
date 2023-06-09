const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Configurar middleware para el manejo de datos en formato JSON
app.use(express.json());

// Configurar la clave secreta para firmar y verificar los tokens JWT
const secretKey = 'mi_clave_secreta';

// Rutas de la API
// ...
// Aquí puedes definir las rutas y la lógica de tu API REST con operaciones CRUD básicas
// ...

function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token inválido' });
      }
  
      // Guardar el usuario en el objeto de solicitud para su uso posterior
      req.user = user;
  
      next();
    });
  }
  
  // Ruta protegida con autenticación
  app.get('/clientes', authenticateToken, (req, res) => {
    // El usuario autenticado está disponible en req.user
    // ...
  });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

    

  // Datos de prueba para simular una base de datos
let clientes = [];

// Obtener todos los clientes
app.get('/clientes', (req, res) => {
  res.json(clientes);
});

// Obtener un cliente específico
app.get('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const cliente = clientes.find((cliente) => cliente.id === id);

  if (!cliente) {
    return res.status(404).json({ error: 'Cliente no encontrado' });
  }

  res.json(cliente);
});

// Crear un nuevo cliente
app.post('/clientes', (req, res) => {
  const nuevoCliente = req.body;

  // Asignar un ID único al cliente
  nuevoCliente.id = Date.now().toString();

  clientes.push(nuevoCliente);

  res.status(201).json(nuevoCliente);
});

// Actualizar un cliente existente
app.put('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const clienteActualizado = req.body;
  const clienteIndex = clientes.findIndex((cliente) => cliente.id === id);

  if (clienteIndex === -1) {
    return res.status(404).json({ error: 'Cliente no encontrado' });
  }

  clientes[clienteIndex] = clienteActualizado;

  res.json(clienteActualizado);
});

// Eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const clienteIndex = clientes.findIndex((cliente) => cliente.id === id);

  if (clienteIndex === -1) {
    return res.status(404).json({ error: 'Cliente no encontrado' });
  }

  clientes.splice(clienteIndex, 1);

  res.sendStatus(204);
});

const Sequelize = require('sequelize');

// Configurar la conexión a la base de datos MySQL
const sequelize = new Sequelize('nombre_basedatos', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql',
});
   

// Definir el modelo de Clientes
const Cliente = sequelize.define('cliente', {
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

// Definir el modelo de Viviendas
const Vivienda = sequelize.define('vivienda', {
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  m2: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  precio: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Definir las relaciones entre Clientes y Viviendas
Cliente.hasMany(Vivienda);
Vivienda.belongsTo(Cliente);

// Sincronizar los modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos:', error);
  });

// Rutas de la API
// ...
// Aquí puedes definir las rutas y la lógica de tu API REST con operaciones CRUD básicas
// ...

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// REGISTRAR UN NUEVO CLIENTE
app.post('/clientes', (req, res) => {
    const { nombre, email } = req.body;
  
    // Crea un nuevo cliente en la base de datos
    Cliente.create({ nombre, email })
      .then((cliente) => {
        res.status(201).json(cliente);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error al crear el cliente' });
      });
  });



  //Obtener todos los clientes:
  app.get('/clientes', (req, res) => {
    // Obtén todos los clientes de la base de datos
    Cliente.find()
      .then((clientes) => {
        res.status(200).json(clientes);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error al obtener los clientes' });
      });
  });
  
  //Obtener un cliente especifico 
  app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
  
    // Busca un cliente por su ID en la base de datos
    Cliente.findById(id)
      .then((cliente) => {
        if (!cliente) {
          return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error al obtener el cliente' });
      });
  });

  //Modificar datos de un cliente
  app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
  
    // Actualiza los datos de un cliente en la base de datos
    Cliente.findByIdAndUpdate(id, { nombre, email }, { new: true })
      .then((cliente) => {
        if (!cliente) {
          return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error al actualizar el cliente' });
      });
  });

  // Eliminar un cliente
  app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
  
    // Elimina un cliente de la base de datos
    Cliente.findByIdAndDelete(id)
      .then((cliente) => {
        if (!cliente) {
          return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Cliente eliminado correctamente' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error al eliminar el cliente' });
      });
  });

  
  //Buscar un cliente por nombre

  app.get('/clientes/buscar', (req, res) => {
    const { nombre } = req.query;
  
    // Busca clientes por su nombre en la base de datos
    Cliente.find({ nombre: { $regex: nombre, $options: 'i' } })
      .then((clientes) => {
        res.status(200).json(clientes);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error al buscar los clientes' });
      });
  });
  
 
