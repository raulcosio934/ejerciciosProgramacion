/*  Disena una API REST utilizando Express que permite a los usuarios crear, leer,modificar, actualizar y eliminar elementos de una lista. La lista tendrá objetos que tienen la siguiente forma:
{
    id: 1,
    content: 'Item 1'
} 
*/

import express from 'express'

export const app = express()
app.use(express.json())

const items = [{
    id: 1,
    content: 'Item 1'
}]

app.get('/items', (req, res) => {
    return res.json(items)
})

app.get('/items/:id', (req, res) => {
    const { id } = req.params
    const itemFound = items.find(item => item.id === Number(id))
    return res.json(itemFound)
})

app.post('/items', (req, res) => {
    const { content } = req.body
    const newItem = {
        id: items.length + 1,
        content
    }
    items.push(newItem)
    return res.status(201).json(newItem)
})

app.put('/items/:id', (req, res) => {
    const { id } = req.params
    const { content } = req.body
    const itemFound = items.find(item => item.id === Number(id))
    itemFound.content = content
    return res.json(itemFound)
})

app.delete('/items/:id', (req, res) => {
    const { id } = req.params
    const itemIndex = items.findIndex(item => item.id === Number(id))
    items.splice(itemIndex, 1)
    return res.status(404).json({ error: 'Item not found' })
})

export const server = app.listen(process.env.PORT ?? 3000)