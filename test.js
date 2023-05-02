const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('./items.js'); 
const { expect } = chai;

chai.use(chaiHttp);

describe('API Integration Tests', function() {
  this.timeout(5000);
  // Test /categories POST endpoint
  describe('/POST category', () => {
    it('it should POST a category', (done) => {
      let category = {
        name: 'TestCategory'
      }
      chai.request(app)
        .post('/categories')
        .send(category)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // Test /items POST endpoint
  describe('/POST item', () => {
    it('it should not POST an item with an wrong category field', (done) => {
      let item = {
        name: 'Test Item',
        description: 'Test Description',
        phone_number: '+1234567890',
        category: '123213123123' 
      }
      chai.request(app)
        .post('/items')
        .send(item)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  // Test /items GET endpoint
  describe('/GET items', () => {
    it('it should GET all the items', (done) => {
      chai.request(app)
        .get('/items')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });

  // Test /items/:id DELETE endpoint
  describe('/DELETE/:id item', () => {
    it('it should DELETE an item given the id', (done) => {
        let itemId = '645152a737b48b9f6f0587be'; // replace with your actual item ID
        chai.request(app)
            .delete('/items/' + itemId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('string').eql("Item deleted");
                done();
            });
    });
});

describe('/GET categories', () => {
  it('it should GET all the categories', (done) => {
    chai.request(app)
      .get('/categories')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        done();
      });
  });
});
  // Test /items/:id PUT endpoint
  describe('/PUT/:id item', () => {
    this.timeout(10000);
    it('it should UPDATE an item given the id', (done) => {
        let itemId = '6449b3718d45705ab78e072b'; // replace with your actual item ID
        chai.request(app)
            .put('/items/' + itemId)
            .send({
                name: 'Updated Test Item', 
                phone_number: '+96178880990',
                description: 'Updated Description',
                category: '644eea4c3afa1d43a58604cb' // replace with your actual category ID
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});


});
