import style from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data);
            console.log("Dados recebidos:", data);
        })
        .catch((err) => console.error("Erro ao buscar projeto:", err));
    }, [id]); 
    return (
        <div>
            <h1>Projeto Detalhes</h1>
            
        </div>
    );
}

export default Project;
