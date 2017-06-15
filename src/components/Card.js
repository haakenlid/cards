import React from 'react'
import classNames from 'classnames'

const CardFront = ({ title, text }) => (
  <div className="CardFront">
    <div className="card-content">
      <h2 className="card-title">
        {title}
      </h2>
      <div className="card-text">
        {text}
      </div>
    </div>
  </div>
)

const CardBack = () => <div className="CardBack" />

const Card = ({
  title,
  text,
  className = '',
  flip = false,
  discarded = false,
  top = false,
  ...props
}) => (
  <div
    className={classNames('Card', className, { top, flip, discarded })}
    {...props}
  >
    <CardFront title={title} text={text} />
    <CardBack />
  </div>
)

export default Card
