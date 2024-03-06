// Les variables ci-dessous peuvent être utilisées pour vous aider
// dans l'écriture de vos tests
const tomato = "rgb(255, 99, 71)",
  green = "rgb(0, 128, 0)";

describe("test-signup", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8090/");
  });

  it('TF1 : "John Doe" is a valid name', () => {
    // on rentre le nom et le prénom
    cy.get("#first-name-field").type("John");
    cy.get("#last-name-field").type("Doe");

    // on vérifie que le champ est valide
    cy.get("#first-name-field").should("have.class", "valid");
    cy.get("#last-name-field").should("have.class", "valid");

    // on vérifie que le message de validation est valid
    cy.get("#validation-name").should("have.class", "validation valid");

    // on vérifie que le message de validation est correct
    cy.get("#validation-name").should("have.text", "Welcome John Doe!");
  });

  it('TF2 : "00ab" is an invalid first name', () => {
    // on rentre le nom et le prénom
    cy.get("#first-name-field").type("00ab");

    // on vérifie que le champ est invalide
    cy.get("#first-name-field").should("have.class", "invalid");

    // on vérifie que le message de validation est invalide
    cy.get("#validation-name").should("have.class", "validation invalid");

    // on vérifie que le message de validation est correct
    cy.get("#validation-name").should(
      "have.text",
      "At least two characters needed, only letters, spaces, and dashes"
    );
  });

  it('TF3: "abc@provider." is an invalid e-mail address', () => {
    // on rentre l'adresse mail
    cy.get("#email-field").type("abc@provider");

    // on verifit que le champ est invalide
    cy.get("#email-field").should("have.class", "invalid");

    // on vérifie que le message de validation est invalide
    cy.get("#validation-email").should("have.class", "validation invalid");

    // on vérifie que le message de validation est correct
    cy.get("#validation-email").should("have.text", "Wrong email format");
  });

  it("TF4: a valid field has a green border color and the validation message is green", () => {
    // on rentre le prénom et le nom
    cy.get("#first-name-field").type("John");
    cy.get("#last-name-field").type("Doe");

    // on vérifie que les champs sont valide
    cy.get("#first-name-field").should("have.class", "valid");
    cy.get("#last-name-field").should("have.class", "valid");

    // on vérifie que la bordure des champs est verte
    cy.get("#first-name-field").should("have.css", "border-color", green);
    cy.get("#last-name-field").should("have.css", "border-color", green);

    // on vérifie que le message de validation est de couleur verte
    cy.get("#validation-name").should("have.css", "color", green);
  });

  it("TF5: an invalid field has a tomato border color and the validation message is tomato", () => {
    // on rentre le prénom et le nom
    cy.get("#first-name-field").type("00ab");
    cy.get("#last-name-field").type("00ab");

    // on vérifie que les champs sont valide
    cy.get("#first-name-field").should("have.class", "invalid");
    cy.get("#last-name-field").should("have.class", "invalid");

    // on vérifie que la bordure des champs est verte
    cy.get("#first-name-field").should("have.css", "border-color", tomato);
    cy.get("#last-name-field").should("have.css", "border-color", tomato);

    // on vérifie que le message de validation est de couleur verte
    cy.get("#validation-name").should("have.css", "color", tomato);
  });

  it("TF6 : an email that has not already been used displays a success message", () => {
    // on rentre l'adresse mail
    cy.get("#email-field").type("abc@provider.com");

    // on simule la perte de focus
    cy.get("#email-field").blur();

    // on verifit que le champ est valide
    cy.get("#email-field").should("have.class", "valid");

    // on vérifie que le message de validation est invalide
    cy.get("#validation-email").should("have.class", "validation valid");

    // on vérifie que le message de validation est correct
    cy.get("#validation-email").should(
      "have.text",
      "This email has not already been used"
    );
  });

  it("TF7 : an email that has already been used displays an error message", () => {
    // on intercept la requete GET
    cy.intercept("GET", "/email?email=*", {
      presentInDatabase: true,
      msg: "This email has already been used",
    });

    // on rentre l'adresse mail
    cy.get("#email-field").type("abc@provider.com");

    // on simule la perte de focus
    cy.get("#email-field").blur();

    // on verifit que le champ est invalide
    cy.get("#email-field").should("have.class", "invalid");

    // on vérifie que le message de validation est invalide
    cy.get("#validation-email").should("have.class", "validation invalid");

    // on vérifie que le message de validation est correct
    cy.get("#validation-email").should(
      "have.text",
      "This email has already been used"
    );
  });

  it("TF8 : entering a wrong Capcha displays an error message", () => {
    // on simule un click sur le bouton 🔁
    cy.get("#reload-btn").click();

    // on simule une saisie d'une raiponse fausse
    cy.get("#capcha-field").type("abc");

    // on veridit que le champ est invalide
    cy.get("#capcha-field").should("have.class", "invalid");

    // on vérifie que le message de validation est invalide
    cy.get("#validation-capcha").should("have.class", "validation invalid");

    // on vérifie que le message de validation est une erreur
    cy.get("#validation-capcha").should(
      "have.text",
      "The result is incorrect. Are you a robot?"
    );
  });

  it("TF9 : entering a correct Capcha displays a success message", () => {
    // on intercept la requete GET
    cy.intercept("GET", "/capcha").as("res");

    // on simule un click sur le bouton 🔁
    cy.get("#reload-btn").click();

    // on recupère le résultat de l'addition et on le rentre dans le champ
    cy.wait("@res").then(({ response }) => {
      let res = response.body.op1 + response.body.op2;
      cy.get("#capcha-field").type(res);
    });

    // on veridit que le champ est invalide
    cy.get("#capcha-field").should("have.class", "valid");

    // on vérifie que le message de validation est invalide
    cy.get("#validation-capcha").should("have.class", "validation valid");

    // on vérifie que le message de validation est une erreur
    cy.get("#validation-capcha").should("have.text", "Nice work!");
  });

  it("TF10 : adding a programming language creates a new badge", () => {
    // on simule la saisie d'un langage
    cy.get("#language-list").type("JavaScript");

    // on simule la perte de focus
    cy.get("#language-list li:last-child").blur();

    // on vérifie que le badge a bien été créé
    cy.get("#language-list li:first-child").should("have.class", "badge");
  });

  it("TF11 : entering less than three programming languages displays an error message", () => {
    // on simule la saisie d'un langage
    cy.get("#language-list").type("JavaScript");

    // on simule la perte de focus
    cy.get("#language-list li:last-child").blur();

    //on simule la saisie d'un autre langage
    cy.get("#language-list").type("Python");

    // on simule la perte de focus
    cy.get("#language-list li:last-child").blur();

    // on verifit que le champ est invalide
    cy.get("#language-list").should("have.class", "invalid");

    // on vérifie que le message de validation est invalide
    cy.get("#validation-languages").should("have.class", "validation invalid");

    // on vérifie que le message de validation est correct
    cy.get("#validation-languages").should("have.text", "1 remaining.");
  });

  it("TF12 : entering three or more programming languages is valid", () => {
    // on simule la saisie d'un langage
    cy.get("#language-list").type("JavaScript");

    // on simule la perte de focus
    cy.get("#language-list li:last-child").blur();

    //on simule la saisie d'un autre langage
    cy.get("#language-list").type("Python");

    // on simule la perte de focus
    cy.get("#language-list li:last-child").blur();

    //on simule la saisie d'un autre langage
    cy.get("#language-list").type("C++");

    // on simule la perte de focus
    cy.get("#language-list li:last-child").blur();

    // on verifit que le champ est valide
    cy.get("#language-list").should("have.class", "valid");

    // on vérifie que le message de validation est valide
    cy.get("#validation-languages").should("have.class", "validation valid");
  });

  it("TF13 : the signup form can be validated upon completing all fields", () => {
    // on rentre le prénom et le nom
    cy.get("#first-name-field").type("John");
    cy.get("#last-name-field").type("Doe");

    // on rentre l'adresse mail
    cy.get("#email-field").type("essaye@gmail.com");

    // on simule la saisie d'un langage
    cy.get("#language-list").type("JavaScript");

    // on simule la perte de focus
    cy.get("#language-list li:last-child").blur();

    //on simule la saisie d'un autre langage
    cy.get("#language-list").type("Python");

    // on simule la perte de focus
    cy.get("#language-list li:last-child").blur();

    //on simule la saisie d'un autre langage
    cy.get("#language-list").type("C++");

    // on simule la perte de focus
    cy.get("#language-list li:last-child").blur();

    cy.intercept("GET", "/capcha").as("res");

    // on simule un click sur le bouton 🔁
    cy.get("#reload-btn").click();

    // on recupère le résultat de l'addition et on le rentre dans le champ
    cy.wait("@res").then(({ response }) => {
      let res = response.body.op1 + response.body.op2;
      cy.get("#capcha-field").type(res);
    });

    cy.get("#signup-btn").should("be.enabled");

    cy.get("#signup-btn").click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("submission in progress, please wait...");
    });
  });
});
