const db = require('../config/db');

exports.getClases = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM clases');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener clases:', error);
    res.status(500).json({ error: 'Error al obtener clases' });
  }
};

exports.getClaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM clases WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener la clase:', error);
    res.status(500).json({ error: 'Error al obtener la clase' });
  }
};

exports.createClase = async (req, res) => {
  const { curso_id, materia_id, horario } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO clases (curso_id, materia_id, horario) VALUES ($1, $2, $3) RETURNING *',
      [curso_id, materia_id, horario]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar clase:', error);
    res.status(500).json({ error: 'Error al agregar clase' });
  }
};

exports.updateClase = async (req, res) => {
  const { id } = req.params;
  const { curso_id, materia_id, horario } = req.body;
  try {
    const result = await db.query(
      'UPDATE clases SET curso_id = $1, materia_id = $2, horario = $3 WHERE id = $4 RETURNING *',
      [curso_id, materia_id, horario, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar clase:', error);
    res.status(500).json({ error: 'Error al actualizar clase' });
  }
};

exports.deleteClase = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM clases WHERE id = $1', [id]);
    res.json({ message: 'Clase eliminada' });
  } catch (error) {
    console.error('Error al eliminar clase:', error);
    res.status(500).json({ error: 'Error al eliminar clase' });
  }
};