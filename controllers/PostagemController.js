import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
function PostagemController(app) {
    app.get('/noticias', exibir)
    function exibir(req, res) {
        (async () => {
            const db = await open({
                filename: './infra/dados.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM noticias')
            res.send(result)
            // res.cookie('cookieName', 'cookieValue', { sameSite: 'none', secure: true})
            db.close()
        })()
    }
    app.post('/noticias', inserir)
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './infra/dados.db',
                driver: sqlite3.Database
            })
            await db.run(`INSERT INTO noticias(titulo,conteudo, autor, image) 
            VALUES(?,?,?,?)`, req.body.titulo, req.body.conteudo, req.body.autor,req.body.image)
            res.send(`Notícia: ${req.body.titulo} inserida com sucesso.`)
            db.close()
        })()
    }
    // app.get('/tecnologia/id/:id', buscarTitulo)
    // function buscarTitulo(req, res) {
    //     (async () => {
    //         const db = await open({
    //             filename: './src/infra/bdTarefas.db',
    //             driver: sqlite3.Database
    //         })
    //         const result = await db.all('SELECT * FROM Tecnologia where id_tecnologia like ?', req.params.id)
    //         if (result != '') {
    //             res.send(result)
    //         } else {
    //             res.send(`Tecnologia com titulo: ${req.params.id} não encontrado`)
    //         }
    //         db.close()
    //     })()
    // }
    
    // app.delete('/tecnologia/id/:id', deletarTitulo)
    // function deletarTitulo(req, res) {
    //     (async () => {
    //         const db = await open({
    //             filename: './src/infra/bdTarefas.db',
    //             driver: sqlite3.Database
    //         })
    //         const result = await db.all('SELECT * FROM Tecnologia where id_tecnologia like ?', req.params.id)
    //         if (result != '') {
    //             res.send(`Tecnologia: ${req.params.id} deletada`)
    //             await db.run('DELETE from Tecnologia WHERE id_tecnologia= ?', req.params.id)
    //         } else {
    //             res.send(`Tecnologia: ${req.params.id} não encontrada`)
    //         }
    //         db.close()
    //     })()
    // }
    // app.put('/tecnologia/id/:id', Atualizar)
    // function Atualizar(req, res) {
    //     (async () => {
    //         const db = await open({
    //             filename: './src/infra/bdTarefas.db',
    //             driver: sqlite3.Database
    //         })
    //         const result = await db.all('SELECT * FROM Tecnologia where id_tecnologia like ?', req.params.id)
    //         if (result != '') {
    //             res.send(`Tecnologia: ${req.params.id} Atualizada`)
    //             await db.run('UPDATE Tecnologia SET titulo=?, descricao=?, status=?, data_criacao=?, id_usuario=?, img=? WHERE id_tecnologia= ?', req.body.titulo, req.body.descricao, req.body.status,req.body.data_criacao,req.body.id_usuario,req.body.img,req.params.id)
    //         } else {
    //             res.send(`Tecnologia: ${req.params.id} não encontrada`)
    //         }
    //         db.close()
    //     })() 
    // }
}
export default PostagemController