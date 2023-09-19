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
            VALUES(?,?,?,?)`, req.body.titulo, req.body.conteudo, req.body.autor, req.body.image)
            res.send(`Notícia: ${req.body.titulo} inserida com sucesso.`)
            db.close()
        })()
    }

    app.get('/sobre', exibir)
    function exibir(req, res) {
        (async () => {
            const db = await open({
                filename: './infra/dados.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM sobre')
            res.send(result)
            // res.cookie('cookieName', 'cookieValue', { sameSite: 'none', secure: true})
            db.close()
        })()
    }

    app.post('/sobre', inserir)
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './infra/dados.db',
                driver: sqlite3.Database
            })
            await db.run(`INSERT INTO sobre(titulo,conteudo) 
            VALUES(?,?)`, req.body.titulo, req.body.conteudo)
            res.send(`Título do sobre: ${req.body.titulo} inserido com sucesso.`)
            db.close()
        })()
    }

    app.put('/sobre/:id', Atualizar)
    function Atualizar(req, res) {
        (async () => {
            const db = await open({
                filename: './infra/dados.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM sobre where id like ?', req.params.id)
            if (result != '') {
                if (req.body.titulo == '' && req.body.conteudo == '') {
                    res.send({ resp: `Sem dados para atualizar!` })
                    return
                } else if (req.body.titulo == '' && req.body.conteudo != '') {
                    await db.run('UPDATE sobre SET conteudo=?', req.body.conteudo)
                    res.send({ resp: `Conteúdo atualizado com sucesso!` })
                    return
                } else if (req.body.titulo != '' && req.body.conteudo == '') {
                    await db.run('UPDATE sobre SET titulo=?', req.body.titulo)
                    res.send({ resp: `Título atualizado com sucesso!` })
                    return
                } else {
                    await db.run('UPDATE sobre SET titulo=?, conteudo=?', req.body.titulo, req.body.conteudo)
                    res.send({ resp: `Título e conteúdo atualizados com sucesso!` })
                    return
                }
            } else {
                res.send({ resp: `erro` })
            }
            db.close()
        })()
    }


    
    app.post('/usuario', checar)
    function checar(req, res) {
        (async () => {
            const db = await open({
                filename: './infra/dados.db',
                driver: sqlite3.Database
            })
            
            const select = await db.run('SELECT * FROM usuario where username like ? and password like ?', req.body.username, req.body.password)
            if (select = !'') {
                res.send({
                    mensagem: `Usuário: ${req.body.username} encontrado.`,
                    valid: true
                })
            }else{
                res.send({
                    mensagem: `Usuário: ${req.body.username} não encontrado.`,
                    valid: false
                })
            }
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
}
export default PostagemController