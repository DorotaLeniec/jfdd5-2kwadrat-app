import React from 'react'
import './styles.css'
import {ingredients} from '../data'

import {Image, Col, Row, FormControl, Button} from 'react-bootstrap'
import {Link} from 'react-router'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
  selectedIngredients: state.selectedIngredients.selectedIngredients
})

const mapDispatchToProps = dispatch => ({
  addIngredient: (ingredient) => dispatch({
    type: 'ADD_SELECTED_INGREDIENT',
    ingredient: ingredient
  }),

  removeIngredient: (ingredient) => dispatch({
    type: 'REMOVE_SELECTED_INGREDIENT',
    ingredientId: ingredient
  })
})


class FridgeView extends React.Component {
  constructor() {
    super()

    this.handleSubmit = (event) => {
      event.preventDefault()
    }

    this.state = {
      ingredients: []
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Row className="ingredientInputRow">
            <h1 className="titles">Wybierz produkty, które posiadasz</h1>
            <Col xs={12} sm={6} md={4}
                 xsOffset={0} smOffset={3} mdOffset={4}
            >
              <FormControl
                className="ingredientInput"
                bsSize="sm"
                type="text"
                placeholder="W lodówce mam..."
                onChange={(event) => this.setState({search: event.target.value})}
              />
            </Col>
          </Row>

          <Row>
            {ingredients.filter(
              ingredient => this.state.search === '' ? false : ingredient.name.includes(this.state.search)
            ).slice(0, 4).map(
              ingredient => {
                return (
                  <Col key={ingredient.id} xs={6} sm={4} md={3} onClick={
                    () => {
                      if (this.props.selectedIngredients.find(item => item.id === ingredient.id) === undefined) {
                        this.setState(
                          {
                            ingredients: this.state.ingredients.concat(
                              {
                                name: ingredient.name,
                                id: ingredient.id,
                                img: ingredient.img
                              })
                          },
                          () => this.props.addIngredient(ingredient)
                        )
                      } else {
                        this.setState(
                          {
                            ingredients: this.state.ingredients.filter(
                              item => item.id !== ingredient.id
                            )
                          },
                          () => this.props.removeIngredient(ingredient.id)
                        )
                      }
                    }
                  }>
                    <div className="ingredientFieldContent filtered">
                      <Image className="filteredIngredientImage" src={ingredient.img}/>
                      <div className="ingredientName">
                        {ingredient.name}
                      </div>
                    </div>
                  </Col>
                )
              }
            )}
          </Row>
        </form>

        <Row>
          {this.props.selectedIngredients.length === 0 ? null :
          <h2 className="titles">Produkty, na podstawie których zostaną wyszukane przepisy</h2>}

          {
            this.state.ingredients.map(
              ingredient =>
                <Col key={ingredient.id} xs={12} sm={6} md={4} onClick={
                  () => {
                    if (this.props.removeIngredient(ingredient.id)) {
                      this.setState(
                        {
                          ingredients: this.state.ingredients.filter(
                            item => item.id !== ingredient.id
                          )
                        },
                        () => this.props.removeIngredient(ingredient.id)
                      )
                    }
                  }
                }>
                  <div className="ingredientFieldContent chosen">
                    <Image className="chosenIngredientImage" src={ingredient.img}/>
                    <div className="ingredientName">
                      {ingredient.name}
                    </div>
                  </div>
                </Col>
            )
          }
        </Row>

        <Row>
            {this.props.selectedIngredients.length === 0 ? null :
              <Link to={'/filtered-recipes'}>
              <Button>
                Wyszukaj przepisy
              </Button>
              </Link>}
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FridgeView)