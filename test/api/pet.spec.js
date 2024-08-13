const supertest = require('supertest')

const petId = 47335732444

describe('API PetStore Swagger - Entidade Pet', () => {

    const request = supertest('https://petstore.swagger.io/v2')

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
})