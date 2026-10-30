const request = require('supertest');
const app = require('../src/app');

describe('GET /health', () => {
  it('returns 200 and status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('POST /api/tasks', () => {
  it('creates a task and returns 201', async () => {
    const res = await request(app).post('/api/tasks').send({ title: 'Learn DevOps' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Learn DevOps');
    expect(res.body.id).toEqual(expect.any(Number));
  });

  it('returns 400 when the title is empty', async () => {
    const res = await request(app).post('/api/tasks').send({ title: '   ' });
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when the title is missing', async () => {
    const res = await request(app).post('/api/tasks').send({});
    expect(res.statusCode).toBe(400);
  });
});
