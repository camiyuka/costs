import style from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Container from "../layout/Container";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          console.log("Dados recebidos:", data);
        })
        .catch((err) => console.error("Erro ao buscar projeto:", err));
    }, 1000);
  }, [id]);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project ? (
        <div className={style.project_details}>
          <Container customClass="column">
            <div className={style.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button onClick={toggleProjectForm} className={style.btn}>
                {!showProjectForm ? "Editar Projeto" : "Fechar Projeto"}
              </button>
            </div>
            {!showProjectForm ? (
                <div className={style.project_info}>
                <p>
                  <span>Categoria:</span> {project.category.name}
                </p>

                <p>
                  <span>Total de orçamento:</span> {project.budget}
                </p>

                <p>
                  <span>Total utilizado:</span> {project.cost}
                </p>
              </div>
            ) : (
                <div className={style.project_info}>
                    <p> detalhes do projeto</p>
                </div>
            )}
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
