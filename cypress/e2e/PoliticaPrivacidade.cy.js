
      Cypress._.times(3, ()=>{ //_.times()serve para você executar uma função de callback um certo número de vezes, onde o número de vezes é o primeiro argumento, e a função de callback é o segundo. Serve para repetir o teste
     it.only('Testa a página de política de privacidade de forma independente', () =>{
    cy.visit('./src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.visible')
    
    })   
 })