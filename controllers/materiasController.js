// controllers/materiasController.js
const pool = require('../config/db');

exports.getMaterias = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM materias');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener materias:', error);
    res.status(500).json({ error: 'Error al obtener materias' });
  }
};

exports.getMateriaById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM materias WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Materia no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener materia' });
  }
};

exports.createMateria = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    await pool.query('INSERT INTO materias (nombre, descripcion) VALUES ($1, $2)', [nombre, descripcion]);
    res.status(201).json({ message: 'Materia creada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear materia' });
  }
};

exports.updateMateria = async (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion } = req.body;
  try {
    await pool.query('UPDATE materias SET nombre=$1, descripcion=$2 WHERE id=$3', [nombre, descripcion, id]);
    res.json({ message: 'Materia actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar materia' });
  }
};

exports.deleteMateria = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM materias WHERE id = $1', [id]);
    res.json({ message: 'Materia eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar materia' });
  }
};