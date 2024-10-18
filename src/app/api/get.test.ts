describe('GET /api/get', () => {
  it('should return { hello: "world" }', async () => {
    const response = await fetch('http://localhost:3000/api');

    const bory = await response.json();

    expect(bory).toEqual({ hello: 'world' });
  });
});
