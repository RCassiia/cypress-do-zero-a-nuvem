
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(()=>{
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })
  //only permite executar um teste específico, ao invés de executar tudo
  it('Não preenche todos os campos obrigatórios e envia o formulário', ()=>{
  const longText = Cypress._.repeat('Obrigada', 10)
    cy.get('#firstName').type('Rita')
    cy.get('#lastName').type('Gomes da Costa')
    cy.get('#email').type('rdcassiagmail.com')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Enviar').click()//Uso do contains é uma forma de identificar elementos que não tem um id único para o elemento. Onde é incluído a tag no primeiro argumento e o segundo argumento é o conteúdo
    
    cy.get('.error').should('be.visible')
  
  })
  it('validar campo vazio ao digitar um valor não númerico no telefone', ()=>{
    cy.get('#phone').type('abc')
   
    cy.get('#phone').should('have.value', '')


    
  })
  it('Preencher e limpar os campos: nome, sobrenome e telefone', ()=>{
    
      cy.get('#firstName')
        .type('Rita')
        .should('have.value', 'Rita')
        .clear()
        .should('have.value', '')
      cy.get('#lastName')
        .type('Gomes da Costa')
        .should('have.value', 'Gomes da Costa')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type(12345-8765)
        .should('have.value',12345-8765 )
        .clear()
        .should('have.value','' )
    
    })
    it('Enviar formulário usando comando customizado', ()=>{
      const dat= {
        firstName: 'Ana',
        lastName: 'Gomes da Costa',
        email: 'rdcassia24@gmail.com',
        text: 'Obrigada'

      }
      cy.fillMandatoryFieldsAndSubmit(dat)
     
      cy.get('.success').should('be.visible')
  
  
      
    })
    it('validar campo vazio ao digitar um valor não númerico no telefone', ()=>{
      cy.get('#phone').type('abc')
     
      cy.get('#phone').should('have.value', '')
      
    })
    
    it('Selecionar Produto por seu texto', ()=>{
      cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
      
    })

    it('Selecionar Produto pelo velue', ()=>{
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')

    })

    it('Selecionar Produto pelo index', ()=>{
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
      
})
it('marca o tipo de atendimento "Feedback"',()=>{
  cy.get('input[type="radio"][value="feedback"]')
  .check() 
  .should('be.checked')
  
})
it('marca cada tipo de atendimento "Feedback"',()=>{
  cy.get('input[type="radio"]')
  .each(tipoServico =>{
    cy.wrap(tipoServico)
    .check()
    .should('be.checked')

  })
  })

  it('Marca ambos checkboxes, depois desmarca o último', ()=>{
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')

  })
  
  it('seleciona um arquivo da pasta fixtures', () => {
  cy.get('#file-upload')
  .selectFile('cypress/fixtures/example.json')
  .should(input => {
    //console.log(input)// Verificar o caminho no console ao nspecionar elemento
    expect(input[0].files[0].name).to.equal('example.json')
  })
})

  it(' seleciona um arquivo simulando um drag-and-drop', () => {
  cy.get('#file-upload')
  .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
  .should(input => {
    expect(input[0].files[0].name).to.equal('example.json')
    })  
  })

   it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
    cy.fixture('example.json').as('arquivoExemplo')
    cy.get('#file-upload')
    .selectFile('@arquivoExemplo')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')  
    .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
        cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
      })

})
  

