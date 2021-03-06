import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Karyawan.css';
import { PostData } from '../../services/PostDataKaryawan';
import KaryawanData from "../KaryawanData/KaryawanData";
import { confirmAlert } from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';

class Karyawan extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			redirectToReferrer: false,
		
		};

		this.getKaryawanDataThis = this.getKaryawanDataThis.bind(this);
		this.feedUpdate = this.feedUpdate.bind(this);
		this.onChange = this.onChange.bind(this);
		this.deleteFeed = this.deleteFeed.bind(this);

		this.editFeed = this.editFeed.bind(this);

		this.logout = this.logout.bind(this);
	}

	componentWillMount() {

		if (sessionStorage.getItem("userData")) {
			this.getKaryawanDataThis();
		}

		else {
			this.setState({ redirectToReferrer: true });
		}

	}

	feedUpdate(e) {

		e.preventDefault();
		let data = JSON.parse(sessionStorage.getItem("userData"));
		let postData = { user_id: data.userData.user_id, feed: this.state.userFeed };
		if (this.state.userFeed) {
			PostData('feedUpdate', postData).then((result) => {
				let responseJson = result;
				this.setState({ data: responseJson.feedData });
			});
		}
	}

	editFeed(e, FeedData) {
		let Cek = FeedData;
		alert(Cek);
		let postData = FeedData[1];
		alert(postData);

	}

	deleteFeed(e, feedId) {

		let updateIndex = e.target.getAttribute('value');

		let cek = feedId;
		let feed_id = document.getElementById("del").getAttribute("value");

		let data = JSON.parse(sessionStorage.getItem("userData"));

		let postData = { user_id: data.userData.user_id, feed_id: feedId };
		if (postData) {

			PostData('feedDelete', postData).then((result) => {
				//this.state.data.filter((_, i) => i == feedId);




				if (result.success) {
					alert(feedId);

					this.state.data.splice(updateIndex, 1);
					this.setState({ data: this.state.data });
					alert('ID : ' + feedId + ' Data Telah Dihapus');

					console.log(cek);
					console.log(updateIndex);
				}
				else
					alert(result.error);

			});
		}

	}


	getKaryawanDataThis() {

		let data = JSON.parse(sessionStorage.getItem("userData"));
		this.setState({ name: data.userData.name });
		let postData = { user_id: data.userData.user_id };

		if (data) {
			PostData('karyawan', postData).then((result) => {
				let responseJson = result;
				if (responseJson.karyawanData) {
					this.setState({ data: responseJson.karyawanData });
					console.log(this.state);
				}
			});
		}

	}

	onChange(e) {
		this.setState({ userFeed: e.target.value });
	}
	
	logout() {
		sessionStorage.setItem("userData", '');
		sessionStorage.clear();
		this.setState({ redirectToReferrer: true });
	}

	render() {
		if (this.state.redirectToReferrer) {
			return (<Redirect to={'/login'} />)
		}

		return (
			<div className="row" id="Body">
				<div className="medium-12 columns">
					<div style={{  paddingTop:'50px', textAlign:'center',paddingBottom:'50px' }}>
					<a href="/home" className="button1" > <u>Halaman Utama</u></a>
					<a href="/tabel" className="button1" > <u>Tabel</u></a>
					<a href="/datatable" className="button1" > <u>Data Tabel</u></a>
					<a href="/DatatablesKaryawan" className="button1" > <u>Datatables Karyawan</u></a>
					<a href="/DatatablesKaryawanVersi2" className="button1" > <u>Material UI Karyawan</u></a>
					<a href="/karyawan" className="button1" > <u>Karyawan</u></a>
					<a href="/select" className="button1" > <u>Select Option</u></a>
					<a href="#" onClick={this.logout} style={{ color: 'red' }} className="button1">  <u>Logout</u></a>
					</div>
				

				</div>
				<KaryawanData feedData={this.state.data} deleteFeed={this.deleteFeed} editFeed={this.editFeed} name={this.state.name} />

			</div>
		);
	}
}

export default Karyawan;