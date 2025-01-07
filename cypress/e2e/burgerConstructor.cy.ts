import {setCookie, deleteCookie} from 'src/utils/cookie'

describe('Проверка работы компонента Burger Constructor', () => {
  before(() => {
    setCookie('accessToken', '12345')
    localStorage.setItem('refreshToken', '54321')
  })

  after(() => {
    deleteCookie('accessToken')
    localStorage.removeItem('refreshToken')
  })

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'mockIngredients.json' }).as('getIngredients');
    cy.intercept('GET','/api/auth/user', {fixture: 'user.json'}).as('getUser')
    cy.intercept('POST', '/api/orders', {fixture: 'order.json'}).as('makeOrder')
    cy.visit('http://localhost:4000');
  });

  const burgerConstructorSelector = '[data-cy=burger-constructor]';
  const bunIngredientSelector = `[data-cy='Краторная булка N-200i']`
  const mainIngredientSelector = `[data-cy='Биокотлета из марсианской Магнолии']`
  const sauceIngredientSelector = `[data-cy='Соус Spicy-X']`

  describe('Проверка функциональности ингредиентов', () => {
    
    it('Ингредиенты отображаются на странице', () => {
      cy.get(bunIngredientSelector).should('exist')
      cy.get(mainIngredientSelector).should('exist')
      cy.get(sauceIngredientSelector).should('exist')
      });
    
    it('Ингредиенты при клике на кнопку "добавить" добавляются в конструктор', () => {
      cy.get(burgerConstructorSelector).contains('Выберите булки').should('exist')
      cy.get(burgerConstructorSelector).contains('Выберите начинку').should('exist')

      cy.get(bunIngredientSelector).contains('Добавить').click()
      cy.get(mainIngredientSelector).contains('Добавить').click()
      cy.get(sauceIngredientSelector).contains('Добавить').click()

      cy.get(burgerConstructorSelector).contains('Выберите булки').should('not.exist')
      cy.get(burgerConstructorSelector).contains('Выберите начинку').should('not.exist')

      cy.get(burgerConstructorSelector).contains('Краторная булка N-200i').should('exist')
      cy.get(burgerConstructorSelector).contains('Биокотлета из марсианской Магнолии').should('exist')
      cy.get(burgerConstructorSelector).contains('Соус Spicy-X').should('exist')
    })

    describe('Проверка функциональности модального окна',() => {
      it('При клике на элемент открывается модальное окно', () => {
        cy.get(mainIngredientSelector).click()
        cy.contains('Детали ингредиента').should('exist')
        cy.contains('Биокотлета из марсианской Магнолии').should('exist')
      })

      it('При клике на крестик - модальное окно закрывается', () => {
        cy.get(sauceIngredientSelector).click()
        const closeButtonSelector = `[data-cy='close-modal']`

        cy.get(closeButtonSelector).click()
        cy.contains('Детали ингредиента').should('not.exist')
      })
    })
  })

  describe('Проверка функциональности заказа', () => {
    describe('При попытке нажать на кнопку "Оформить заказ без добавленных булок', () => {
      it('Запрос не отправляется и, следовательно, модальное окно заказа не открывается', () => {
        cy.contains('Оформить заказ').click()
        cy.contains('Оформляем заказ...').should('not.exist')
        cy.contains('идентификатор заказа').should('not.exist')
      })
    })
    
    describe('При успешном оформлении заказа', () => {
      
      beforeEach(() => {
        cy.get(bunIngredientSelector).contains('Добавить').click()
        cy.contains('Оформить заказ').click()
      }) 

      it('Запрос отправляется, и модальное окно заказа открывается', () => {
        cy.contains('идентификатор заказа').should('exist')
        cy.contains('11111').should('exist')
      })
      it('При нажатии на крестик - модальное окно заказа закрывается',() => {
        const closeButtonSelector = `[data-cy='close-modal']`

        cy.get(closeButtonSelector).click()
        cy.contains('идентификатор заказа').should('not.exist')
      })
      it('При закрытии модального окна, конструктор бургера очищается',() => {
        const closeButtonSelector = `[data-cy='close-modal']`

        cy.get(closeButtonSelector).click()
        cy.get(burgerConstructorSelector).contains('Выберите булки').should('exist')
        cy.get(burgerConstructorSelector).contains('Выберите начинку').should('exist')
      })
    })

  })
  
  });