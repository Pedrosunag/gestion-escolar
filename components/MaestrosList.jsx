import { useEffect, useState } from 'react';
import axios from 'axios';
import MaestroForm from './MaestroForm';

const MaestrosList = () => {
  const [maestros, setMaestros] = useState([]);
  const [maestroSeleccionado, setMaestroSeleccionado] = useState(null);

  const obtenerMaestros = async () => {
    const res = await axios.get('http://localhost:3000/api/maestros');
    setMaestros(res.data);
  };

  const eliminarMaestro = async (id) => {
    await axios.delete(`http://localhost:3000/api/maestros/${id}`);
    obtenerMaestros();
  };

  useEffect(() => {
    obtenerMaestros();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Lista de Maestros</h2>
      <MaestroForm
        maestro={maestroSeleccionado}
        onSave={() => {
          obtenerMaestros();
          setMaestroSeleccionado(null);
        }}
      />
      <table className="mt-4 w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {maestros.map(mae => (
            <tr key={mae.id} className="text-center border-t">
              <td>{mae.id}</td>
              <td>{mae.nombre}</td>
              <td>{mae.apellido}</td>
              <td>{mae.correo}</td>
              <td>
                <button
                  onClick={() => setMaestroSeleccionado(mae)}
                  className="bg-yellow-400 text-white px-2 rounded mx-1"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarMaestro(mae.id)}
                  className="bg-red-500 text-white px-2 rounded mx-1"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaestrosList;