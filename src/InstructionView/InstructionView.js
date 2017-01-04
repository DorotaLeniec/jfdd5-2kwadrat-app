import React from 'react'
import {Col} from 'react-bootstrap'
import {Link} from 'react-router'
import './InstructionView.css'

export default () => (
  <div>
    <Col xs={6}>
      <img src={process.env.PUBLIC_URL + '/images/fridge-512.gif'}
           alt="lodowka"
           height={140}
      />
    </Col>
    <Col xs={6}>
      <h1>Nie masz pomysłu na obiad?</h1>
      <h2>
        Wypełnij <span><Link to={'/form'}>formularz</Link></span> aby zobaczyć <span><Link to={'/filtered-recipes'}>Przepisy dla Ciebie</Link></span>.
      </h2>
    </Col>
  </div>
)