import React from 'react'
import PropTypes from 'prop-types'

function Square (props) {
	return (<button className={'square ' + props.value} data-testid={props.testId} onClick={props.onClick}/>)
}

Square.propTypes = {
	onClick: PropTypes.func,
	value: PropTypes.string,
	testId: PropTypes.string
}

export default Square
