const BUN_NAME = 'Краторная булка N-200i';
const MAIN_NAME = 'Биокотлета из марсианской Магнолии';

const interceptIngredients = () => {
  cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
};

const addIngredientByName = (name: string) => {
  cy.contains('li', name).contains('button', 'Добавить').click();
};

describe('Страница конструктора бургера', () => {
  it('добавляет булку и начинку в конструктор', () => {
    interceptIngredients();
    cy.visit('/');
    cy.wait('@getIngredients');

    addIngredientByName(BUN_NAME);
    addIngredientByName(MAIN_NAME);

    cy.contains(`${BUN_NAME} (верх)`).should('be.visible');
    cy.contains(`${BUN_NAME} (низ)`).should('be.visible');
    cy.contains('ul', MAIN_NAME).should('be.visible');
  });

  describe('Модальное окно ингредиента', () => {
    beforeEach(() => {
      interceptIngredients();
      cy.visit('/');
      cy.wait('@getIngredients');
    });

    it('открывается по клику на карточку ингредиента и показывает данные именно этого ингредиента', () => {
      cy.contains('li', MAIN_NAME).find('a').click();

      cy.get('#modals').within(() => {
        cy.contains('Детали ингредиента').should('be.visible');
        cy.contains(MAIN_NAME).should('be.visible');
        cy.contains('Калории, ккал').should('be.visible');
      });
      cy.location('pathname').should('include', '/ingredients/');
    });

    it('закрывается по клику на крестик', () => {
      cy.contains('li', MAIN_NAME).find('a').click();
      cy.get('#modals button').first().click();

      cy.contains('Детали ингредиента').should('not.exist');
      cy.location('pathname').should('eq', '/');
    });

    it('закрывается по клику на оверлей', () => {
      cy.contains('li', MAIN_NAME).find('a').click();
      cy.get('#modals > div').last().click({ force: true });

      cy.contains('Детали ингредиента').should('not.exist');
      cy.location('pathname').should('eq', '/');
    });
  });

  it('создаёт заказ, показывает номер и очищает конструктор', () => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
      }
    });
    cy.setCookie('accessToken', 'test-access-token');

    cy.wait('@getUser');
    cy.wait('@getIngredients');

    addIngredientByName(BUN_NAME);
    addIngredientByName(MAIN_NAME);
    cy.contains('button', 'Оформить заказ').click();

    cy.wait('@createOrder')
      .its('request.body.ingredients')
      .should('have.length', 3);
    cy.contains('12345').should('be.visible');
    cy.contains('идентификатор заказа').should('be.visible');

    cy.get('#modals button').first().click();
    cy.contains('идентификатор заказа').should('not.exist');
    cy.contains('button', 'Оформить заказ')
      .closest('section')
      .within(() => {
        cy.contains(`${BUN_NAME} (верх)`).should('not.exist');
        cy.contains(`${BUN_NAME} (низ)`).should('not.exist');
        cy.contains('li', MAIN_NAME).should('not.exist');
        cy.contains('Выберите булки').should('be.visible');
        cy.contains('Выберите начинку').should('be.visible');
      });
  });
});
