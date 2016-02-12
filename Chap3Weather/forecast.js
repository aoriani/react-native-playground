import React, {
	StyleSheet,
	Text,
	View,
	Component
} from "react-native";

class Forecast extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style= {{padding: 10}}>
				<Text style={styles.hugeText}> {this.props.city}</Text>
				<Text style={styles.bigText}> {this.props.main}</Text>
				<Text style={styles.mainText}> Current conditions: {this.props.description}</Text>
				<Text style={styles.bigText}> {this.props.temp} F</Text>
			</View>
		)

	}
}

const styles = StyleSheet.create({
	hugeText: {
		flex: 3,
		fontSize: 36,
		textAlign: 'center',
		color: "yellow"
	},

	bigText: {
		flex: 2,
		fontSize: 20,
		textAlign : 'center',
		color: '#FFFFFF'
	}, 

	mainText: {
		flex: 1,
		fontSize: 16,
		textAlign: 'center',
		color: '#FFFFFF'
	}
});

Forecast.propTypes = {
	city: React.PropTypes.string.isRequired,
	main: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	temp: React.PropTypes.number.isRequired
}; 

export default Forecast;