import React from 'react'
import {Image, Col, Button} from 'react-bootstrap'
import {recipes} from '../data'
import {ingredients} from '../data'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import FaCartPlus from 'react-icons/lib/fa/cart-plus'
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square'
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square'
import FaGooglePlusSquare from 'react-icons/lib/fa/google-plus-square'
import FaCalendar from 'react-icons/lib/fa/calendar'
import GoChecklist from 'react-icons/lib/go/checklist'
import FaCheck from 'react-icons/lib/fa/check'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './RecipeViewStyle.css'
import '../animations.css'
import {addToCalendarFromRecipeView} from '../CalendarView/CalendarReducer/actionCreator'

import {addRecipeToFav, addToShoppingList}from '../FavouriteReducer/actionCreatos'

const mapStateToProps = state => ({
  selectedIngredients: state.selectedIngredients.selectedIngredients,
  session: state.currentUserData.session,
})

const mapDispatchToProps = dispatch => ({
  addToCalendar: (recipe) => dispatch(addToCalendarFromRecipeView(recipe)),
  addToShoppingList: (userId, accessToken, id) => dispatch(addToShoppingList(userId, accessToken, id)),
  addRecipe: (userId, accessToken, id) => dispatch(addRecipeToFav(userId, accessToken, id))
})


export default connect(mapStateToProps, mapDispatchToProps)((props) => {

  const recipeWithId = recipes.find(
      recipe => recipe.id === parseInt(props.params.recipeId, 10)
  );
  const arrayOfSelectedIngredientsID =
      props.selectedIngredients.map(
          selected =>
              selected.id
      );

  return (
      <ReactCSSTransitionGroup
          transitionName="fadeRecipe"
          transitionEnterTimeout={0}
          transitionAppearTimeout={500}
          transitionLeaveTimeout={0}
          transitionAppear={true}>
      <div key={recipeWithId.id}>
        <h1 className="recipeName">{recipeWithId.name}</h1>
        <Col xs={12} className="recipeViewWrapper">
          <Col lg={6}>
            <div className="grow pic">
              <Image className="photo recipeImage" src={recipeWithId.image}/>
            </div>
            {
              props.session !== null ?
                <p >
                  <span title="Dodaj do ulubionych" className="favorite"
                        onClick={() => {
                          const favorite = document.getElementsByClassName('favorite')
                          favorite[0].style.display = 'none'
                          props.addRecipe(props.session.userId, props.session.id, recipeWithId.id)

                        }
                        }
                  >&#9055;</span>
                </p> :
                  null
            }
          </Col>

          <Col lg={6}>
            <hr className="cutIt"/>
            <div className="manualView">
              <span className="ingredient">Składniki:</span>
              <ul className="ingredientsList">
                {
                  recipeWithId.ingredients.map(
                      ingredient =>
                          <li key={ingredient.id}>
                      <span>
                        {ingredients.find(item => item.id === ingredient.id).name}
                      </span>
                            {" "}<span className="amount">{ingredient.ingredientAmount}</span> {ingredient.unitMeasure}
                            <span key={ingredient.id}>
                        { arrayOfSelectedIngredientsID.indexOf(ingredient.id) !== -1 && props.session !== null ?
                            <span title="Masz ten składnik"><FaCheck className="checkedIngredient"/></span> :
                            <span className="iconOptions">
                              {props.session !== null ?
                              <span title="Dodaj do listy zakupów">
                                <GoChecklist className=" addToListRecipeView"
                                             onClick={
                                               () => props.addToShoppingList(props.session.userId, props.session.id, ingredient.id)
                                             }/>
                               </span> : null
                              }
                              <Link className="findIngredient" to={'/ingredient/' + ingredient.id}>
                               <span title="Znajdź sklep">
                                  <FaCartPlus className="cart"/>
                               </span>
                                </Link>
                            </span>
                        }
                        </span>
                          </li>
                  )
                }
              </ul>
              {
                props.session !== null ?
                    <Link to={"/calendar"}>
                      <div title="Dodaj przepis do swojego kalendarza" className="calendarButton">
                        <FaCalendar size="40px" color="#2da834"
                                    className="cart"/>
                        <Button className="addToCalendar"
                                bsStyle="success"
                                onClick={() => props.addToCalendar(recipeWithId)}
                        >Dodaj do kalendarza
                        </Button>
                      </div>
                    </Link> :
                    null
              }
            </div>
            <div title="udostępnij" className="socialIcons">
              <a href="https://plus.google.com/" target="_blank">
                <FaGooglePlusSquare size="40px" className="socialIcon socialGplus"/>
              </a>

              <a href="https://www.facebook.com/" target="_blank">
                <FaFacebookSquare size="40px" className="socialIcon socialFacebook"/>
              </a>

              <a href="https://twitter.com/" target="_blank">
                <FaTwitterSquare size="40px" className="socialIcon socialTwitter"/>
              </a>
            </div>
          </Col>
          <Col xs={12}>
            <hr className="aboveDescription"/>
            <p className="description">{recipeWithId.description}</p>
          </Col>
        </Col>
        <Col xs={12}>
          <p>Dodane komentarze innych uzytkownikow</p>
        </Col>
        {
          props.session !== null ?

              <Col xs={12} md={6} mdOffset={3}>
                <div className="commentsContainer">
                  <div className="userInformation">
                  </div>
                  <form>
                    <label>
                      <p className="commentTitle">tytuł:</p> <input name="title" className="titleField"/>
                    </label>

                    <br/>

                    <label>
                      <p className="commentBody">treść:</p> <textarea name="body" className="bodyField"></textarea>
                    </label>

                    <br/>

                    <input type="submit" value="Dodaj komentarz" className="addBtn"/>
                  </form>
                </div>
              </Col>
              :
              <p>Zaloguj się aby dodać komentarz</p>
        }
        {props.children}
      </div>
      </ReactCSSTransitionGroup>
  )
})

