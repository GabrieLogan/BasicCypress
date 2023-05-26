context('Form Devs', () => {
  // before( () => cy.exec('rm -rf cypress/screenshots'))
  beforeEach(() => cy.visit('../../formulario.html'))

  it('fills the form and submits it', () => {
    cy.get('#nome').as('name').type('Gabriel')
    cy.get('#sobrenome').as('LastName').type('Logan')
    cy.get('#email').as('email').type('emailtesting@gmail.com')
    cy.get('input[type="radio"][value="fullstack"]').as('fullstackRadio').check()
    cy.get('#senioridade').as('seniority').select('Sênior')
    cy.get('input[type="checkbox"][value="HTML"]').as('HTMLcheckBox').check()
    cy.get('input[type="checkbox"][value="CSS"]').as('CSScheckBox').check()
    cy.get('input[type="checkbox"][value="Javascript"]').as('JScheckBox').check()
    cy.screenshot('before-submittin-the-form')
    cy.get('.botao').click()

    //
    cy.get('@name').should('be.empty')
    cy.get('@LastName').should('be.empty')
    cy.get('@email').should('be.empty')
    cy.get('@fullstackRadio').should('not.be.checked')
    cy.get('input[type="radio"][value="frontend"]').should('be.checked')
    cy.get('@seniority').find('option').contains('Selecione').should('be.selected')
    cy.get('@HTMLcheckBox').should('not.be.checked')
    cy.get('@CSScheckBox').should('not.be.checked')
    cy.get('@JScheckBox').should('not.be.checked')
    cy.get('input[type="checkbox"][value="PHP"]').should('not.be.checked')
    cy.get('input[type="checkbox"][value="C#"]').should('not.be.checked')
    cy.get('input[type="checkbox"][value="Python"]').should('not.be.checked')
    cy.get('input[type="checkbox"][value="Java"]').should('not.be.checked')
    cy.screenshot('after-submittin-the-form')
  })

  it('fills the form and submits it using a custom command', () => {
    cy.fillFormAndSubmit()
    
    cy.assertsFormInitialState()
  })

  it('has a title and subtitle', () => {
    cy.get('#titulo').should('be.visible').and('have.text', 'Cadastro de DEVs')
    cy.get('#subtitulo').should('be.visible').and('have.text', 'Complete suas informações')
    cy.get('#fundo-branco').prev().screenshot('header')
  })
})