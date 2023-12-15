import React, { useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import { useParams } from "react-router-dom";
import Titulo from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import TableDe from "./TableDe/TableDe";
import { useContext } from "react";
import { UserContext } from "../../context/AuthContext";
import api, { commentaryEventResource, eventResource } from "../../Services/Service";
import "./DetalhesEventoPage.css"

const DetalhesEventosPage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const {idEvent} = useParams();

  const [comentarios, setComentarios] = useState([]);

  async function getComentarios() {
    try {
      const route = userData.role === 'Aluno' ?  'ListarSomenteExibe' : 'ListarTodos';
      const promise = await api.get(`${commentaryEventResource}/${route}/${idEvent}`);
      const dados = promise.data;

      setComentarios(dados);
      console.log(comentarios)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getComentarios();
  }, []);

  return (
    <>
      <MainContent>
        <div className="lista-detalhes-section">
          <Container>
            <Titulo
              titleText={"Detalhe-Eventos"}
              color="black"
            />
            <TableDe dados={comentarios} />
          </Container>
        </div>
      </MainContent>
    </>
  );
};

export default DetalhesEventosPage;