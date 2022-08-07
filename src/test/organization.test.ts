import supertest from 'supertest'
import { app, server } from '../index'

const api = supertest(app)

const organization = {
  id_organization: 0,
  name: 'organization test',
  status: 1
}

beforeEach(async () => {
  await api.delete('/api/organization/all')
  const response = await api.post('/api/organization').send(organization)
  .expect(201)
  organization.id_organization = response.body.id_organization
})

describe('POST create a organization', () => {
  test('with valid information', async () => {
    await api
      .post('/api/organization')
      .send(organization)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  // test('with invalid information', async () => {
  //   const response = await api
  //     .post('/api/organization')
  //     .send({ name: '' })
  //     .expect(400)
  //     .expect('Content-Type', /application\/json/)
  //   expect(response.body.message).toBe('Invalid Information')
  // })

  // test('without body', async () => {
  //   const response = await api
  //     .post('/api/organization')
  //     .send()
  //     .expect(400)
  //     .expect('Content-Type', /application\/json/)
  //   expect(response.body.message).toBe('Invalid Information')
  // })
})

describe('GET a organization', () => {
  test('by id and returned it as JSON', async () => {
    await api
      .get('/api/organization/' + organization.id_organization)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // test('by id and check the field detail', async () => {
  //   const response = await api
  //     .get('/api/' + task.id)
  //     .expect(200)
  //     .expect('Content-Type', /application\/json/)

  //   const details = response.body.map((task) => task.detail)
  //   expect(details).toContain(task.detail)
  // })

  test('by id with an invalid id', async () => {
    const response = await api
      .get('/api/organization/' + organization.id_organization * 100)
      .expect(404)
      .expect('Content-Type', /application\/json/)
    expect(response.body.message).toEqual('Not found')
  })
})

describe('GET all organization', () => {
  test('and check if it is an array', async () => {
    const response = await api
      .get('/api/organization')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(Array.isArray(response.body.result)).toBe(true)
  })
  test('and check if its length is greater than zero', async () => {
    const response = await api
      .get('/api/organization')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.result.length > 0).toBe(true)
  })

  // test('and check the field detail', async () => {
  //   const response = await api
  //     .get('/api/' + task.id)
  //     .expect(200)
  //     .expect('Content-Type', /application\/json/)

  //   const details = response.body.map((task) => task.detail)
  //   expect(details).toContain(task.detail)
  // })
})

describe('PUT update a organization', () => {
  test('with valid information', async () => {
    await api
      .put('/api/organization/' + organization.id_organization)
      .send(organization)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // test('with invalid information', async () => {
  //   const response = await api.put('/api/organization').send({ name: '' })
  //   expect(400)
  //   expect(response.body.message).toBe('Invalid Information')
  // })

  // test('without body', async () => {
  //   const response = await api.put('/api/').send().expect(400)
  //   expect(response.body.message).toBe('Invalid Information')
  // })
})

describe('DELETE a organization', () => {
  test('by id, with a valid id', async () => {
    await api
      .delete('/api/organization/' + organization.id_organization)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all organizations', async () => {
    await api
      .delete('/api/organization/all')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

// describe('DELETE all organization', () => {
//   test('and check if rowCount is a number', async () => {
//     const response = await api
//       .delete('/api/')
//       .expect(200)
//       .expect('Content-Type', /application\/json/)
//     expect(typeof response.body.rowCount).toBe('number')
//   })
// })

afterAll(() => {
  server.close()
})