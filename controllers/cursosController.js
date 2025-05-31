const db = require('../config/db');

exports.getCursos = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM cursos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    res.status(500).json({ error: 'Error al obtener cursos' });
  }
};

exports.getCursoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM cursos WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el curso:', error);
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
};

exports.createCurso = async (req, res) => {
  const { nombre, año, maestro } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO cursos (nombre, año, maestro) VALUES ($1, $2, $3) RETURNING *',
      [nombre, año, maestro]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar curso:', error);
    res.status(500).json({ error: 'Error al agregar curso' });
  }
};

exports.updateCurso = async (req, res) => {
  const { id } = req.params;
  const { nombre, año, maestro } = req.body;
  try {
    const result = await db.query(
      'UPDATE cursos SET nombre = $1, año = $2, maestro = $3 WHERE id = $4 RETURNING *',
      [nombre, año, maestro, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar curso:', error);
    res.status(500).json({ error: 'Error al actualizar curso' });
  }
};

exports.deleteCurso = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM cursos WHERE id = $1', [id]);
    res.json({ message: 'Curso eliminado' });
  } catch (error) {
    console.error('Error al eliminar curso:', error);
    res.status(500).json({ error: 'Error al eliminar curso' });
  }
};