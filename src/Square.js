import React from 'react'
import PropTypes from 'prop-types'

function Square (props) {
	return (
		<button className="square" data-testid={props.testId} onClick={props.onClick}>
			{props.value}
		</button>
	)
}

Square.propTypes = {
	onClick: PropTypes.func,
	value: PropTypes.string,
	testId: PropTypes.string
}

export default Square
