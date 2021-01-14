import React from 'react'
import PropTypes from 'prop-types'

function Square (props) {
	return (
		<button
			className={props.className}
			data-testid={props.testId}
			onClick={props.onClick}
		/>
	)
}

Square.propTypes = {
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string,
	testId: PropTypes.string.isRequired
}

Square.defaultProps = {
	className: ''
}

export default Square
