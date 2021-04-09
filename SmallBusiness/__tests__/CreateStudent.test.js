const { CreateStudent } = require('../student_views/CreateStudent');

//constructor for testing purposes
const testStudent= {
    email: "testEmail@gmail.com",
    username: "testStudent",
    password: "12345678",
    cfpassword: "12345678",
    uid: "something",
    role: "Student",
}

test('Should successfully return account email',() =>{

    const testStudent = new CreateStudent;

    testStudent.CreateAccount();
    
    expect(this.email).toBe('testEmail@gmail.com');

});

test('Should successfully return account password',() =>{
    const testStudent = new CreateStudent;

    testStudent.CreateAccount();
    
    expect(this.password).toBe('12345678');

});

test('Should successfully return student username',() =>{
    const testStudent = new CreateStudent;

    testStudent.CreateAccount();
    
    expect(this.name).toBe('testStudent');

});

test('Should successfully return Student UIDs',() =>{
    const testStudent = new CreateStudent;

    testStudent.CreateAccount();
    
    expect(this.address).toBe('something');

});

test('Should successfully return account cfpassword',() =>{
    const testStudent = new CreateStudent;

    testStudent.CreateAccount();
  
    expect(this.cfpassword).toBe('12345678');
});

test('Should successfully return account role',() =>{
    const testStudent = new CreateStudent;

    testStudent.CreateAccount();
    
    expect(this.role).toBe('Student');

});