/// <reference types="cypress" />

describe('API Sanity testing',()=>{
  it('getTeams',()=>{
     cy.request({
      method:'GET',
      url:'https://www.balldontlie.io/api/v1/teams'

     }).then((res)=>{
      expect(res.status).to.eq(200)
      expect(res.body.meta.total_count).to.eq(30)
     })
  })
  it('getGames',()=>{
    cy.request({
     method:'GET',
     url:'https://www.balldontlie.io/api/v1/games?seasons[]=2021'

    }).then((res)=>{
     expect(res.status).to.eq(200)
     expect(res.body.meta.total_count).to.eq(1416)
    })
 })
})