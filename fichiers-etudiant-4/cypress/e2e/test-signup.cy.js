// Les variables ci-dessous peuvent être utilisées pour vous aider
// dans l'écriture de vos tests
const tomato = 'rgb(255, 99, 71)',
  green = 'rgb(0, 128, 0)';

describe('test-signup', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8090/');
  });

  it('TF1 : "John Doe" is a valid name', () => {
    // À compléter
  });

  it('TF2 : "00ab" is an invalid first name', () => {
    // À compléter
  });

  it('TF3: "abc@provider." is an invalid e-mail address', () => {
    // À compléter
  });

  it('TF4: a valid field has a green border color and the validation message is green', () => {
    // À compléter
  });

  it('TF5: an invalid field has a tomato border color and the validation message is tomato', () => {
    // À compléter
  });

  it('TF6 : an email that has not already been used displays a success message', () => {
    // À compléter
  });

  it('TF7 : an email that has already been used displays an error message', () => {
    // À compléter
  });

  it('TF8 : entering a wrong Capcha displays an error message', () => {
    // À compléter
  });

  it('TF9 : entering a correct Capcha displays a success message', () => {
    // À compléter
  });

  it('TF10 : adding a programming language creates a new badge', () => {
    // À compléter
  });

  it('TF11 : entering less than three programming languages displays an error message', () => {
    // À compléter
  });

  it('TF12 : entering three or more programming languages is valid', () => {
    // À compléter
  });

  it('TF13 : the signup form can be validated upon completing all fields', () => {
    // À compléter
  });
});
