import { useEffect } from "react";
import Swal from "sweetalert2";
import { PERFIL } from "@/data/Perfil";

export default function LoginAccess() {
  useEffect(() => {
    const loginBtn = document.getElementById("iniciarSesion");

    loginBtn?.addEventListener("click", function () {
      const correo = document.getElementsByName("correo")[0].value.trim();
      const clave = document.getElementsByName("clave")[0].value.trim();

      if (correo === "" || clave === "") {
        Swal.fire({ icon: "info", title: "Campos incompletos" });
        return;
      }

      const perfil = PERFIL.find(
        (emp) => emp.correo === correo && emp.contraseña === clave
      );

      if (perfil) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("nomUsuario", perfil.nombres);

        Swal.fire({
          icon: "success",
          title: `Bienvenido, ${perfil.nombres}`,
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/panel";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
        });
      }
    });
  }, []);

  return null;
}
