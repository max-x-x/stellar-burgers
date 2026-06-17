declare global {
  namespace Cypress {
    interface Chainable {
      addIngredientByName(name: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('addIngredientByName', (name: string) => {
  cy.contains('li', name).contains('button', 'Добавить').click();
});

export {};
