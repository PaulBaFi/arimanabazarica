import { useState } from "react";
import Swal from "sweetalert2";

interface Columna {
  label: string;
  key: string;
}

interface Props {
  columnas: Columna[];
  datos: any[];
  viewInfo: boolean;
}

export default function VentasTable({ columnas, datos, viewInfo }: Props) {
  const [filaSeleccionada, setFilaSeleccionada] = useState<any | null>(null);

  const handleView = (fila: any) => {
    setFilaSeleccionada(fila);
  };

  const handleEdit = (fila: any) => {
    Swal.fire({
      title: "Editar registro",
      text: `¿Deseas editar a ${fila.cliente}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, editar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Editar:", fila);
        Swal.fire(
          "Editado",
          "El registro ha sido marcado para edición.",
          "success"
        );
      }
    });
  };

  const handleDelete = (fila: any) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a eliminar a ${fila.cliente}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Eliminar:", fila);
        Swal.fire("Eliminado", "El registro fue eliminado.", "success");
      }
    });
  };

  const cerrarModal = () => setFilaSeleccionada(null);

  return (
    <article className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columnas.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, index) => (
            <tr key={index}>
              {columnas.map((col) => (
                <td key={col.key} data-register={fila[col.key]}>
                  <span>{fila[col.key]}</span>
                </td>
              ))}
              <td>
                <div className="actions">
                  {viewInfo && (
                    <button
                      className="btn btn-info"
                      onClick={() => handleView(fila)}
                    >
                      <i className="fa-solid fa-eye" />
                    </button>
                  )}
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(fila)}
                  >
                    <i className="fa-solid fa-edit" />
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(fila)}
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filaSeleccionada && (
        <div className="modal">
          <div className="modal-content">
            <h2>Información de la venta</h2>
            <ul>
              {columnas.map((col) => (
                <li key={col.key}>
                  <strong>{col.label}:</strong> {filaSeleccionada[col.key]}
                </li>
              ))}
            </ul>
            <button className="btn btn-close" onClick={cerrarModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
