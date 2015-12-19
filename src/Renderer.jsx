/* jshint esnext: true */
class Renderer extends React.Component {
	// Constructor
	constructor(props) {
		super(props);
		this.state = {name: props.name};
	}

	// This method will allow us to change the current name of the person
	setName(name) {
		this.setState({name: name});
	}

	render() {
		return (
			<div className="renderer">
				Hello World!
			</div>
		);
	}
}
Person.propTypes = {name: React.PropTypes.string};
Person.defaultProps = { name: "anonymous"};
