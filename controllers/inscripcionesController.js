const db = require('../config/db');

exports.getInscripciones = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM inscripciones');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener inscripciones:', error);
    res.status(500).json({ error: 'Error al obtener inscripciones' });
  }
};

exports.getInscripcionById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM inscripciones WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener la inscripción:', error);
    res.status(500).json({ error: 'Error al obtener la inscripción' });
  }
};

exports.createInscripcion = async (req, res) => {
  const { estudiante_id, fecha_inscripcion } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO inscripciones (estudiante_id, fecha_inscripcion) VALUES ($1, $2) RETURNING *',
      [estudiante_id, fecha_inscripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar inscripción:', error);
    res.status(500).json({ error: 'Error al agregar inscripción' });
  }
};

exports.updateInscripcion = async (req, res) => {
  const { id } = req.params;
  const { estudiante_id, fecha_inscripcion } = req.body;
  try {
    const result = await db.query(
      'UPDATE inscripciones SET estudiante_id = $1, fecha_inscripcion = $2 WHERE id = $3 RETURNING *',
      [estudiante_id, fecha_inscripcion, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar inscripción:', error);
    res.status(500).json({ error: 'Error al actualizar inscripción' });
  }
};

exports.deleteInscripcion = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM inscripciones WHERE id = $1', [id]);
    res.json({ message: 'Inscripción eliminada' });
  } catch (error) {
    console.error('Error al eliminar inscripción:', error);
    res.status(500).json({ error: 'Error al eliminar inscripción' });
  }
};