import cypress from 'cypress';
import { bunIngredientSelector, burgerConstructorSelector, closeButtonSelector, constructorIngredientInitialSelector, constructorIngredientSelector, mainIngredientSelector, modalSelector, sauceIngredientSelector } from 'cypress/constants';
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
    cy.visit('');
  });
  
  describe('Проверка функциональности ингредиентов', () => {
    
    it('Ингредиенты отображаются на странице', () => {
      cy.get(bunIngredientSelector).should('exist')
      cy.get(mainIngredientSelector).should('exist')
      cy.get(sauceIngredientSelector).should('exist')
      });
    
    it('Ингредиенты при клике на кнопку "добавить" добавляются в конструктор', () => {
      cy.get(burgerConstructorSelector).contains('Выберите булки').should('exist')
      cy.get(burgerConstructorSelector).contains('Выберите начинку').should('exist')
      cy.get(constructorIngredientInitialSelector).should('not.exist')

      cy.get(bunIngredientSelector).contains('Добавить').click()
      cy.get(mainIngredientSelector).contains('Добавить').click()
      cy.get(sauceIngredientSelector).contains('Добавить').click()

      cy.get(constructorIngredientSelector).should('exist')
      cy.get(burgerConstructorSelector).contains('Выберите булки').should('not.exist')
      cy.get(burgerConstructorSelector).contains('Выберите начинку').should('not.exist')

      cy.get(burgerConstructorSelector).contains('Краторная булка N-200i').should('exist')
      cy.get(burgerConstructorSelector).contains('Биокотлета из марсианской Магнолии').should('exist')
      cy.get(burgerConstructorSelector).contains('Соус Spicy-X').should('exist')
    })

    describe('Проверка функциональности модального окна',() => {
      it('При клике на элемент открывается модальное окно', () => {
        cy.get(mainIngredientSelector).click()

        cy.get(modalSelector).should('exist')
        cy.contains('Детали ингредиента').should('exist')
        cy.contains('Биокотлета из марсианской Магнолии').should('exist')
      })

      it('При клике на кнопку закрытия - модальное окно закрывается', () => {
        cy.get(sauceIngredientSelector).click()
        cy.get(closeButtonSelector).click()

        cy.get(modalSelector).should('not.exist')
      })
    })
  })

  describe('Проверка функциональности заказа', () => {
    describe('При попытке нажать на кнопку "Оформить заказ без добавленных булок', () => {
      it('Запрос не отправляется и, следовательно, модальное окно заказа не открывается', () => {
        cy.contains('Оформить заказ').click()

        cy.get(modalSelector).should('not.exist')
      })
    })
    
    describe('При успешном оформлении заказа', () => {
      
      beforeEach(() => {
        cy.get(bunIngredientSelector).contains('Добавить').click()
        cy.contains('Оформить заказ').click()
      }) 

      it('Запрос отправляется, и модальное окно заказа открывается', () => {
        cy.get(modalSelector).should('exist')

        cy.contains('11111').should('exist')
      })
      it('При нажатии на кнопку закрытия - модальное окно заказа закрывается',() => {
        cy.get(closeButtonSelector).click()

        cy.get(modalSelector).should('not.exist')
      })
      it('При закрытии модального окна, конструктор бургера очищается',() => {
        cy.get(closeButtonSelector).click()

        cy.get(constructorIngredientSelector).should('not.exist')
        cy.get(burgerConstructorSelector).contains('Выберите булки').should('exist')
        cy.get(burgerConstructorSelector).contains('Выберите начинку').should('exist')
      })
    })

  })
  
  });