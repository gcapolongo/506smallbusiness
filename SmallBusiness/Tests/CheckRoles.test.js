const { CreateStudent } = require('./LoginScreen');
const { CreateRestaurant } = require('./restaurant_views/CreateRestaurant');
const { CreateStudent } = require('./student_views/CreateStudent');

test('Should successfully return Student Role',() =>{

    const testStudent = new CreateStudent;

    testStudent.CreateAccount();
    
    expect(this.role).toBe('Student');

});

test('Should successfully return Restaurant Role',() =>{

    const testStudent = new CreateRestaurant;

    testRestaurant.CreateRestaurant();
    
    expect(this.role).toBe('Restaurant');

});