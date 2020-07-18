const express = require("express")
const cors = require("cors")

const { uuid } = require("uuidv4")

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

/**
 * Lista todos os repositórios
 */
app.get("/repositories", (request, response) => {
  return response.json(repositories)
})

/**
 * Cria um repositório
 */
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  data = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(data)

  return response.json(data)
})

/**
 * Atualiza um repositório
 */
app.put("/repositories/:id", (request, response) => {

  const { id } = request.params

  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex(e => e.id === id)

  /**
   * Verifica se o repositório existe
   */
  if (repositoryIndex >= 0) {
    /**
     * Atualiza o repositório
     */
    repositories[repositoryIndex] = {
      id,
      title,
      url,
      techs,
      likes: repositories[repositoryIndex].likes
    }
  
    return response.json(repositories[repositoryIndex])
  }


  return response.status(400).json({
    error: "Repositório não encontrado."
  })
})

/**
 * Remove um repositório
 */
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(e => e.id === id)

  /**
   * Verifica se o repositório existe
   */
  if (repositoryIndex >= 0) {
    /**
     * Remove o repositório do array
     */
    repositories.splice(repositoryIndex, 1)

    return response.status(204).json({})
  }

  return response.status(400).json({
    error: "Repositório não encontrado."
  })
})

/**
 * Dá like em um repositório
 */
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(e => e.id === id)

  /**
   * Verifica se o repositório existe
   */
  if (repositoryIndex >= 0) {
    /**
     * Aumenta o numero de likes
     */
    repositories[repositoryIndex].likes++;

    return response.json(repositories[repositoryIndex])
  }

  return response.status(400).json({
    error: "Repositório não encontrado."
  })
})

module.exports = app;
