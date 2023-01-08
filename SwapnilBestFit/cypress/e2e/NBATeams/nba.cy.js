/// <reference types="cypress" />

describe('SWAPNILBESTFIT: NBA Teams Page testing',()=>{
  beforeEach(()=>{
     cy.visit('http://localhost:3000/')
  })
  it('NBA Teams Page should load',()=>{
    cy.get(`[data-cy='name']`)
    cy.get(`[data-cy='city']`)
    cy.get(`[data-cy='abbreviation']`)
    cy.get(`[data-cy='conference']`)
    cy.get(`[data-cy='division']`)
  })
    it('On Row Click Modal should open on right side and URL should be appended with details',()=>{
    cy.get(`[data-cy='name']`)
    cy.get(`[data-cy='city']`)
    cy.get(`[data-cy='abbreviation']`)
    cy.get(`[data-cy='conference']`)
    cy.get(`[data-cy='division']`)
    cy.get(`[data-cy='row']:first-child`).click()
    cy.get('.team-details-modal').wait(2000)
  })

    it('On Click of close icon in team details modal, the Modal on right should get closed',()=>{
    cy.get(`[data-cy='name']`)
    cy.get(`[data-cy='city']`)
    cy.get(`[data-cy='abbreviation']`)
    cy.get(`[data-cy='conference']`)
    cy.get(`[data-cy='division']`)
    cy.get(`[data-cy='row']:first-child`).click()
    cy.get(`[data-cy='details-close-icon']`).wait(2000).click()
    cy.get('.team-details-modal').should('not.exist')
  })

  it('Next button/5 button should be disabled on last page',()=>{
    cy.get(`[data-cy='5-button']`).click()
    cy.get(`[data-cy='next-button']`).should('be.disabled')
    cy.get(`[data-cy='5-button']`).should('be.disabled')
  })

  it('Previous button/1 button should be disabled on first page',()=>{
    cy.get(`[data-cy='prev-button']`).should('be.disabled')
    cy.get(`[data-cy='1-button']`).should('be.disabled')
  })

  it('Search with team name',()=>{
    cy.get(`[data-cy='input-search']`).type('hawks').wait(2000)
    cy.get(`[data-cy='name']`).contains('Hawks')
    cy.get(`[data-cy='input-search']`).clear().wait(2000)
  })

  it('Search with city name',()=>{
    cy.get(`[data-cy='input-search']`).type('utah').wait(2000)
    cy.get(`[data-cy='city']`).contains('Utah')
    cy.get(`[data-cy='input-search']`).clear().wait(2000)
  })

  it('Search with abbreviation name',()=>{
    cy.get(`[data-cy='input-search']`).type('ind').wait(2000)
    cy.get(`[data-cy='abbreviation']`).contains('IND')
    cy.get(`[data-cy='input-search']`).clear().wait(2000)
  })

  it('While Searching pagination button should be disabled',()=>{
    cy.get(`[data-cy='input-search']`).type('swapnil').wait(2000)
    cy.get(`[data-cy='prev-button']`).should('be.disabled')
    cy.get(`[data-cy='1-button']`).should('be.disabled')
    cy.get(`[data-cy='5-button']`).should('be.disabled')
    cy.get(`[data-cy='next-button']`).should('be.disabled')
    cy.get(`[data-cy='input-search']`).clear().wait(2000)
  })
})