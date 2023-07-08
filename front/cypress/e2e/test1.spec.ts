describe('API Tests', () => {
  let accessToken: string;

  before(() => {
    // Register a new user
    cy.request({
      method: 'POST',
      url: '/api/register/',
      body: {
        username: 'testuser',
        password: 'testpassword'
      }
    }).then((response) => {
      if (response.status === 201) {
        // User created successfully, obtain access token
        cy.request({
          method: 'POST',
          url: '/api/token/',
          body: {
            username: 'testuser',
            password: 'testpassword'
          }
        }).then((response) => {
          if (response.body.token) {
            accessToken = response.body.token;
          } else {
            throw new Error('Access token not found in response');
          }
        });
      } else {
        throw new Error('User registration failed');
      }
    });
  });

  it('should return at least 1 product from the API endpoint', () => {
    cy.request({
      method: 'GET',
      url: '/api/products/',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.length.greaterThan(0);
    });
  });
});
