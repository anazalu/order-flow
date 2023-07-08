describe('API Tests - /api/products/', () => {
  const username = 'user_products'
  const password = 'password_products'
  let accessToken: string;

  before(() => {
    // Register a new user
    cy.request({
      method: 'POST',
      url: '/api/register/',
      body: {
        username: username,
        password: password
      }
    }).then((response) => {
      if (response.status === 201) {
        // User created successfully, obtain access token
        cy.request({
          method: 'POST',
          url: '/api/token/',
          body: {
            username: username,
            password: password
          }
        }).then((response) => {
          if (response.body.access) {
            accessToken = response.body.access;
          } else {
            throw new Error('Access token not found in response from /api/token/');
          }
        });
      } else {
        throw new Error('User registration failed');
      }
    });
  });

  it('GET should fetch at least 1 product from the /api/products/ endpoint', () => {
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
