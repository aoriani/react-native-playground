'use strict';

import React, {
	Component,
	Text,
	View,
	ListView,
	StyleSheet,
	ToastAndroid
} from 'react-native';

import BookItem from './bookitem';

class BookList extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      dataSource: new ListView.DataSource({
	        rowHasChanged: (row1, row2) => row1 !== row2,
	        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
	      }),
	      loaded: false,
	    };
  	}

	render() {
		if (!this.state.loaded) {
			return <Text>Loading...</Text>
		} else {
			return (
				<ListView 
					style={styles.container}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}
					renderHeader={this.renderHeader.bind(this)} 
					renderFooter={this.renderFooter.bind(this)}
					renderSectionHeader={this.renderSectionHeader.bind(this)}
					onEndReached = {()=> {ToastAndroid.show('Reached the end',ToastAndroid.SHORT)}}
					renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}-sep`} style={{backgroundColor: 'black', height: 1}}/>}/>
			);
		}
	}

	componentDidMount() {
		this.fetchBooks();
	}

	fetchBooks() {
		const API_KEY = '73b19491b83909c7e07016f4bb4644f9:2:60667290';
		const QUERY_TYPE = 'hardcover-fiction';
		const API_STEM = 'http://api.nytimes.com/svc/books/v3/lists'
		const ENDPOINT = `${API_STEM}/${QUERY_TYPE}?response-format=json&api-key=${API_KEY}`;

		fetch(ENDPOINT)
			.then((response) => response.json())
			.then((json) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRowsAndSections({"Fiction": json.results.books, "Biography" : json.results.books}, ["Fiction", "Biography"]),
					loaded: true
				});
			})
			.catch((error) => {console.warn(error)});
	}

	renderRow(data, sectionID, rowID, highlightRow) {
		return (
			<BookItem key={`${sectionID}-${rowID}`} onTap={this.onItemPress.bind(this, data, sectionID, rowID)} cover={data.book_image} title={data.title} author={data.author}/>
		);
	}

	renderHeader() {
		return <Text style={styles.header}>{this.state.dataSource.getRowCount()} results</Text>
	}

	renderFooter() {
		return (
			<Text style={styles.header}>Footer</Text>
		);
	}

	renderSectionHeader(sectionData, sectionID) {
		return <Text style={styles.header}>{sectionID}</Text>
	}

	onItemPress(data, sectionID, rowID) {
		ToastAndroid.show(data.title, ToastAndroid.SHORT);
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1
	},

	header: {
		backgroundColor: '#CCCCCC',
		padding: 5,
		textAlignVertical: 'center'
	}
});

export default BookList;