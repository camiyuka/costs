
function ProjectForm(){
    return(
        <form> 
            <div>
            <input type="text" placeholder="Insira o nome do projeto"/>
            </div>

            <div>
            <input type="number" placeholder="Insira o orçamento do projeto"/>
            </div>

            <div>
            <select name="category_id" id="">
                <option disabled>Selecione a categoria</option>
            </select>
            </div>

            <input type="submit" value="Criar Projeto" />

        </form>
    )
}

export default ProjectForm