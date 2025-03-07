import { useLocation, useNavigate  } from "react-router-dom" 
import { useState, useEffect } from "react" 

import styles from './Projects.module.css'
import Message from "../layout/Message"
import Container from '../layout/Container'
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"
import Loading from "../layout/Loading"

function Project(){

    const [projects, setProjects]= useState([])
    const [removeLoading, setRemoveLoading]=useState(false)
    const [projectMessage, setProjectMessage]=useState("")
    const [message, setMessage] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);

            navigate(location.pathname, { replace: true });

            const timer = setTimeout(() => {
                setMessage("");
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [location, navigate]);


    useEffect(() => {
        const timer = setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(data => {
                console.log("Dados recebidos:", data);
                setProjects(data);
                setRemoveLoading(true);
            })
            .catch(err => console.error("Erro ao buscar os projetos:", err));
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    function removeProject(id){

        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project)=> project.id !==id))
            setProjectMessage('Projeto excluído com sucesso!')
        })
        .catch(err=> console.log(err))
    }


    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto'/>
            </div>
           
                {message && <Message type='success' msg={message}/>}
            {projectMessage && <Message type='basic' msg={projectMessage}/>}
            <Container customClass='start'>
            {projects.length > 0 &&
                projects.map((project)=> (
                    <ProjectCard
                    name={project.name}
                    id={project.id}
                    budget={project.budget}
                    category={project?.category?.name}
                    key={project.id}
                    handleRemove={removeProject}
                    />
                 ))}
                 {!removeLoading && <Loading/>}
                    {removeLoading && projects.length === 0 &&(
                        <p>Não há projetos cadastrados</p>
                    )           
                 }
            </Container>
            
        </div>
    )
}

export default Project