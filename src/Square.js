import React from 'react'
import PropTypes from 'prop-types'

function Square (props) {
	return (
		<button
			className={'square ' + props.customStyle}
			data-testid={props.testId}
			onClick={props.onClick}
		/>
	)
}

Square.propTypes = {
	onClick: PropTypes.func.isRequired,
	customStyle: PropTypes.string,
	testId: PropTypes.string.isRequired
}

Square.defaultProps = {
	customStyle: ''
}

export default Square
