// TODO: create more tests
import { SuperTest, Test } from 'supertest';

// TODO: make this variable global
const request: SuperTest<Test> = global.request;

describe('App Controller', () => {
  describe('GET /', () => {
    it('should respond with Hello World!', () => {
      return request.get('/').expect(200).expect('Hello World!');
    });
  });
});
