const supertest = require('supertest')

const petId = 473357

describe('API PetStore Swagger - Entidade Pet', () => {

        const request = supertest('https://petstore.swagger.io/v2')

        it('POST Pet aaaaa', () => {
            const pet = require('../../vendors/json/pet.json')
            return request
                .post('/pet')
                .send(pet)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(petId)
                    expect(res.body.name).toBe('doguinho')
                    expect(res.body.category.id).toBe(1)
                })
        })
    })
    // teste