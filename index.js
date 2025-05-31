const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importamos las rutas
const estudiantesRoutes = require('./routes/estudiantesRoutes');
const maestrosRoutes = require('./routes/maestrosRoutes');
const materiasRoutes = require('./routes/materiasRoutes');
const cursosRoutes = require('./routes/cursosRoutes');
const clasesRoutes = require('./routes/clasesRoutes');
const inscripcionesRoutes = require('./routes/inscripcionesRoutes');


const app = express();

// Middlewares
app.use(cors());                    // Permite solicitudes desde otros orígenes (como React)
app.use(express.json());           // Para leer datos en formato JSON (req.body)

// Rutas
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/maestros', maestrosRoutes);
app.use('/api/materias', materiasRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/clases', clasesRoutes);
app.use('/api/inscripciones', inscripcionesRoutes);




// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});