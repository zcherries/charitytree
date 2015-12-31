import React from 'react';
import { Link, History } from 'react-router';
exports.Thankyou = React.createClass({

handleClick: function(){

	console.log('You are about to return home');

	this.props.history.pushState(null, `/dashboard`);

},

render: function(){
		return(
			<div>
				<div>you have made it to Thankyou page. Congrats!</div>
				<button onClick={this.handleClick}>Return To Homepage</button>
			</div>
			);
	}
});
