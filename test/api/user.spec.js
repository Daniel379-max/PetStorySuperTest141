const supertest = require('supertest')

const username = "user_succes_code"
const userId = "111222"


describe('API PetStore Swagger - Entidade User', () => {

    const request = supertest('https://petstore.swagger.io/v2')
    const massaInicial = require('../../vendors/json/user/massaUser')

    it('POST User', () => {
        const user = require('../../vendors/json/user/user.json')
        return request
            .post('/user')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.type).toBe(`unknown`)
                expect(res.body.message).toBe(`${userId}`)
            })
    })

    it.each(massaInicial.array.map(elemento => [
            elemento.idUser,
            elemento.username,
            elemento.firstName,
            elemento.lastName,
            elemento.email,
            elemento.password,
            elemento.phone,
            elemento.userStatus,


        ]))
        ('POST User Data Driven Simples: %s', (idUser, username, firstName, lastName, email, password, phone, userStatus) => {
            const user = require('../../vendors/json/user/user.json')

            user.id = idUser
            user.username = username
            user.firstName = firstName
            user.lastName = lastName
            user.email = email
            user.password = password
            user.phone = phone
            user.userStatus = userStatus

            return request
                .post('/user')
                .send(user)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.type).toBe(`unknown`)

                })
        })

    it('GET User', async() => {
        return request
            .get(`/user/${username}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.username).toBe(`${username}`)

            })
    })

    it('PUT User', () => {
        const user = require('../../vendors/json/user/userput.json')
        return request
            .put(`/user/${username}`)
            .send(user)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.message).toBe('444333')
            })
    })

    it('DELETE user', () => {
        return request
            .delete(`/user/${username}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.type).toBe('unknown')
                expect(res.body.message).toBe(`${username}`)
            })
    })
    massaInicial.array.forEach(({ usernameUser, idUser, fristnameUser, lastnameUser }) => {
        it(`POST User Data Driven ForEach- ${usernameUser}`, () => {
            const user = require('../../vendors/json/user/user.json')

            user.id = idUser
            user.username = usernameUser
            user.firstName = fristnameUser
            user.lastName = lastnameUser

            return request
                .post('/user')
                .send(user)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.message).toBe(`${idUser}`)
                })
        })
        it(`GET User Data Driven ForEach- ${usernameUser}`, async() => {
            return request
                .get(`/user/${usernameUser}`)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.username).toBe(`${usernameUser}`)

                })
        })

        it(`PUT User Data Driven ForEach- ${usernameUser}`, () => {
            const pet = require('../../vendors/json/user/userput.json')

            user.id = idUser
            user.username = usernameUser
            user.firstName = fristnameUser
            user.lastName = lastnameUser

            return request
                .put(`/user/${username}`)
                .send(user)
                .then((res) => {
                    expect(res.statusCode).toBe(200)

                })
        })

        it(`DELETE User Data Driven ForEach- ${usernameUser}`, () => {
            return request
                .delete(`/user/${usernameUser}`)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.type).toBe('unknown')
                    expect(res.body.message).toBe(`${usernameUser}`)
                })
        })
    })
})