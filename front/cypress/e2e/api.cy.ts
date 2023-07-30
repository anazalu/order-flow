describe('API Tests', () => {
  const username = 'user'
  const password = 'password'
  let accessToken: string;

  before(() => {
    // register a new user
    cy.request({
      method: 'POST',
      url: '/api/register/',
      failOnStatusCode: false,
      body: {
        username: username,
        password: password
      }
    })
      .then((response) => {
        if (response.status != 201 && response.status != 400) { // HTTP 400 is returned if the user already exists (note the 'failOnStatusCode: false' above)
          throw new Error('User registration failed');
        }

        // user created successfully (or already exists in the database), obtain access token
        return cy.request({
          method: 'POST',
          url: '/api/token/',
          body: {
            username: username,
            password: password
          }
        });
      })
      .then((response) => {
        if (response.body.access) {
          accessToken = response.body.access;
        } else {
          throw new Error('Access token not found in response from /api/token/');
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
    })
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.greaterThan(0);
      });
  });

  it('GET should fetch product details from the /api/products/1/ endpoint', () => {
    cy.request({
      method: 'GET',
      url: '/api/products/1/',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('name', 'Whiskerjig Table')
        expect(response.body).to.have.property('price', '299.99')
        expect(response.body).to.have.property('image_url', 'http://localhost:3000/images/01.jpg')
      });
  });

  it('GET should fetch 1 order from the /api/orders/ endpoint', () => {
    cy.request({
      method: 'GET',
      url: '/api/orders/',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status', 'new');
        expect(response.body).to.have.property('created_at');
      });
  });

  it('POST should add item to cart and GET should fetch last cart item from the /api/cart/items/ endpoint', () => {

    const expected_product_id = 1;
    const expected_quantity = 1;

    cy.request({
      method: 'POST',
      url: '/api/cart/items/',
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: {
        product_id: expected_product_id,
        quantity: expected_quantity
      }
    })
      .then((postResponse) => {
        
        if (postResponse.status != 201) {
          cy.log(postResponse.body);
        }
        expect(postResponse.status).to.equal(201);

        return cy.request({
          method: 'GET',
          url: '/api/cart/items/',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      })
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.greaterThan(0);
        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('product_id', expected_product_id);
        expect(response.body[0]).to.have.property('quantity', expected_quantity);
      });
  });

  it('PUT should modify quantity of a cart item using the /api/cart/items/1/ endpoint', () => {

    let itemId: number;
    let expectedQuantity: number;

    cy.request({
      method: 'POST',
      url: '/api/cart/items/',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: {
        product_id: 1,
        quantity: 1
      }
    })
      .then((postResponse) => {
        expect(postResponse.status).to.equal(201);

        return cy.request({
          method: 'GET',
          url: '/api/cart/items/',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      })
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.greaterThan(0);
        itemId = response.body[response.body.length - 1].id;
        expectedQuantity = response.body[response.body.length - 1].quantity + 1;

        return cy.request({
          method: 'PUT',
          url: `/api/cart/items/${itemId}/`,
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: {
            product_id: 1,
            quantity: expectedQuantity
          }
        });
      })
      .then((postResponse) => {
        expect(postResponse.status).to.equal(200);

        return cy.request({
          method: 'GET',
          url: `/api/cart/items/${itemId}/`,
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      })
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('quantity', expectedQuantity);
      });
  });

  it('DELETE should remove a cart item using the /api/cart/items/1/ endpoint', () => {

    let itemId: number;

    cy.request({
      method: 'POST',
      url: '/api/cart/items/',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: {
        product_id: 1,
        quantity: 1
      }
    })
      .then((postResponse) => {
        expect(postResponse.status).to.equal(201);

        return cy.request({
          method: 'GET',
          url: '/api/cart/items/',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      })
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.greaterThan(0);
        itemId = response.body[response.body.length - 1].id;

        return cy.request({
          method: 'DELETE',
          url: `/api/cart/items/${itemId}/`,
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      })
      .then((postResponse) => {
        expect(postResponse.status).to.equal(204);

        return cy.request({
          method: 'GET',
          url: `/api/cart/items/${itemId}/`,
          failOnStatusCode: false,
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      })
      .then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body).to.have.property('detail', 'Not found.');
      });
  });
});
