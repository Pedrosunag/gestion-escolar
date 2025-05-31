const pool = require('../config/db');

// Obtener todos los estudiantes
const getEstudiantes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estudiantes');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
};

// Obtener un estudiante por ID
const getEstudianteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM estudiantes WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener estudiante por ID:', error);
    res.status(500).json({ error: 'Error al obtener estudiante por ID' });
  }
};

// Agregar un nuevo estudiante
const addEstudiante = async (req, res) => {
  try {
    const { nombre, apellido, correo, fecha_nacimiento } = req.body;

    await pool.query(
      'INSERT INTO estudiantes (nombre, apellido, correo, fecha_nacimiento) VALUES ($1, $2, $3, $4)',
      [nombre, apellido, correo, fecha_nacimiento]
    );

    res.status(201).json({ message: 'Estudiante agregado correctamente' });
  } catch (error) {
    console.error('Error al agregar estudiante:', error);
    res.status(500).json({ error: 'Error al agregar estudiante' });
  }
};

// Actualizar un estudiante por ID
const updateEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo, fecha_nacimiento } = req.body;

    await pool.query(
      'UPDATE estudiantes SET nombre=$1, apellido=$2, correo=$3, fecha_nacimiento=$4 WHERE id=$5',
      [nombre, apellido, correo, fecha_nacimiento, id]
    );

    res.status(200).json({ message: 'Estudiante actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
};

// Eliminar un estudiante por ID
const deleteEstudiante = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM estudiantes WHERE id = $1', [id]);

    res.status(200).json({ message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
};

module.exports = {
  getEstudiantes,
  getEstudianteById,
  addEstudiante,
  updateEstudiante,
  deleteEstudiante
};