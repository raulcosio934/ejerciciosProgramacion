import express from 'express'
import fs from 'node:fs'

const app = express()
app.use(express.json())

const readJSON = () => {
    const data = fs.readFileSync('languages.json', 'utf-8')
    return JSON.parse(data)
}

const languages = readJSON()

let currentLanguage = null

// Dos: POST
app.post('/languages', (req, res) => {
    const {
        language,
        greeting
    } = req.body
    const newID = +(languages.length) + 1
    const newLanguage = {
        id: String(newID),
        language,
        greeting: greeting ?? null
    }

    const result = languages.find(language => language.language === newLanguage.language)
    if (result) return res.status(422).json({ error: 'Language already exists' })

    languages.push(newLanguage)

    currentLanguage = newLanguage

    return res.status(201).json({ message: 'Language created', newLanguage })
})

// Cuatro: GET que te informe en que idioma estas
app.get('/languages', (req, res) => {
    if (currentLanguage) return res.json({ message: `You are in the language: ${currentLanguage.language}` })
    return res.status(404).json({ message: 'Language not found' })
})

app.get('/languages/greeting', (req, res) => {
    if (!currentLanguage?.greeting) return res.status(404).json({ message: 'No translation available' })
    return res.json({ greeting: currentLanguage.greeting })
})

// Uno: Montar un server en el puerto 3000
const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})