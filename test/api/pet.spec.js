const supertest = require('supertest')

const petId = 47335732444

describe('API PetStore Swagger - Entidade Pet', () => {

    const request = supertest('https://petstore.swagger.io/v2')
    const massaInicial = require('../../vendors/json/massaPet')

    it('POST Pet', () => {
        const pet = require('../../vendors/json/pet.json')
        return request
            .post('/pet')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(petId)
                expect(res.body.name).toBe("doguinho 2")
                expect(res.body.category.name).toBe("dog")
                expect(res.body.tags[0].name).toBe("vacinned")
            })
    })

    it.each(massaInicial.array.map(elemento => [
            elemento.nomePet,
            elemento.idPet,
            elemento.nomeCategoria,
            elemento.idCategoria
        ]))
        ('POST Pet Data Driven Simples: %s', (nomePet, idPet, nomeCategoria, idCategoria) => {
            const pet = require('../../vendors/json/pet.json')

            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            return request
                .post('/pet')
                .send(pet)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(idPet)
                    expect(res.body.name).toBe(nomePet)
                    expect(res.body.category.name).toBe(nomeCategoria)
                    expect(res.body.tags[0].name).toBe("vacinned")
                })
        })

    it('GET Pet', async() => {
        return request
            .get(`/pet/${petId}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(petId)
                expect(res.body.status).toBe("available")
            })
    })

    it('PUT Pet', () => {
        const pet = require('../../vendors/json/petput.json')
        return request
            .put('/pet')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.status).toBe('sold')
            })
    })

    it('DELETE Pet', () => {
        return request
            .delete(`/pet/${petId}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.type).toBe('unknown')
                expect(res.body.message).toBe(`${petId}`)
            })
    })
    massaInicial.array.forEach(({ nomePet, idPet, nomeCategoria, idCategoria }) => {
        it(`POST Pet Data Driven ForEach- ${nomePet}`, () => {
            const pet = require('../../vendors/json/pet.json')

            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            return request
                .post('/pet')
                .send(pet)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(idPet)
                    expect(res.body.name).toBe(nomePet)
                    expect(res.body.category.name).toBe(nomeCategoria)
                    expect(res.body.tags[0].name).toBe("vacinned")
                })
        })
        it(`GET Pet Data Driven ForEach- ${nomePet}`, async() => {
            return request
                .get(`/pet/${idPet}`)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(idPet)
                    expect(res.body.status).toBe("available")
                })
        })

        it(`PUT Pet Data Driven ForEach- ${nomePet}`, () => {
            const pet = require('../../vendors/json/petput.json')

            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            return request
                .put('/pet')
                .send(pet)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.status).toBe('sold')
                })
        })

        it(`DELETE Pet Data Driven ForEach- ${nomePet}`, () => {
            return request
                .delete(`/pet/${idPet}`)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.message).toBe(`${idPet}`)
                })
        })
    })
})