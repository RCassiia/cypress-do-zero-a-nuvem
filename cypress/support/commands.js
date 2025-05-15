Cypress.Commands.add('fillMandatoryFieldsAndSubmit', dat =>{
    cy.get('#firstName').type(dat.firstName)
    cy.get('#lastName').type(dat.lastName)
    cy.get('#email').type(dat.email)
    cy.get('#open-text-area').type(dat.text)
    cy.get('button[type="submit"]').click()
})