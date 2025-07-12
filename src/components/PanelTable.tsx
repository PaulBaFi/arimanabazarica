import { useState } from "react";
import Swal from "sweetalert2";

interface Columna {
  label: string;
  key: string;
}

interface Props {
  columnas: Columna[];
  datos: any[];
}

export default function PanelTable({ columnas, datos }: Props) {
  const [filaSeleccionada, setFilaSeleccionada] = useState<any | null>(null);

  const handleEdit = (fila: any) => {
    Swal.fire({
      title: "Editar registro",
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
      text: `Vas a eliminar el registro permanentemente`,
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
    </article>
  );
}
