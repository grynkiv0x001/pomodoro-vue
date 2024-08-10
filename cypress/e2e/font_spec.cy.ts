describe('Font Family Test', () => {
  const route = '/'
  const fontName = 'Roboto Flex'

  it('app should successfully load RobotoFlex.ttf', () => {
    /* Remove browser cache (loading font req can return 304 and test will fail ) */
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Network.clearBrowserCache'
      })
    )

    cy.intercept('**/RobotoFlex-VariableFont.ttf').as('fontRequest')

    cy.visit(route)

    cy.wait('@fontRequest').its('response.statusCode').should('eq', 200)
  })

  it('html should have Roboto Flex font-family included', () => {
    cy.visit(route)

    cy.get('html').then(($el) => {
      const computedStyle = window.getComputedStyle($el[0])
      const fontFamily = computedStyle.getPropertyValue('font-family')

      expect(fontFamily).to.include(fontName)
    })
  })
})
