'use strict';

import React, {
	Component,
	PropTypes,
	View,
	Text,
	TouchableNativeFeedback,
	Image,
	StyleSheet
} from 'react-native';


class BookItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableNativeFeedback onPress={this.props.onTap} background={TouchableNativeFeedback.SelectableBackground()}>
				<View style={styles.container}>
					<Image style={styles.cover} source={{uri: this.props.cover}}/>
					<View style={styles.textContainer}>
						<Text style={styles.title}>{this.props.title}</Text>
						<Text>{this.props.author}</Text>
					</View>
				</View>
			</TouchableNativeFeedback>
		);
	}
}


let styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 10
	},

	textContainer: {
		flex:3,
		flexDirection: 'column',
		marginLeft: 10

	},

	cover: {
		flex:1 ,
		resizeMode: 'contain',
		height: 100,
	},

	title: {
		fontSize: 20,
		fontFamily: 'sans-serif-medium'
	}

});

BookItem.propTypes = {
	cover: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	onTap: PropTypes.func
	
};

export default BookItem;