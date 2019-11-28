import React, { Component } from 'react';
import Linkify from 'react-linkify';
import './UserFeed.css';
//import TimeAgo from 'react-timeago';
class UserFeed extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		let userFeed = this.props.feedData
			.map(function (feedData, index) {
				return (
					<div className="medium-4 columns" key={index}>

						<div className="people-you-might-know">

							<div className="row add-people-section">
								<div className="small-12 medium-10 columns about-people">

									<div className="about-people-author">
										<p className="author-name">
											<b>User : {this.props.name}</b>
											
											
											<Linkify>Feed : {feedData.feed}</Linkify><br />
											ID Feed : {feedData.feed_id}<br />
											a :
											
											<br />

										</p>

									</div>
								</div>
								<div className="small-12 medium-2 columns add-friend">

									<div className="add-friend-action">
											<button id="edit" className="button small btn-color2" onClick={(e) => this.props.editFeed(e, feedData.feed_id)} data={feedData.feed_id} value={index}>
											<i className="fa fa-user-times" aria-hidden="true"></i>
											edit {feedData.feed_id}
											</button>
											<button id="del" className="button small btn-color" onClick={(e) => this.props.deleteFeed(e, feedData.feed_id)} data={feedData.feed_id} value={index}>
											<i className="fa fa-user-times" aria-hidden="true"></i>
											Delete {feedData.feed_id}
											</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			}, this);

		return (
			<div>
				{userFeed}

			</div>
		);
	}

}

export default UserFeed;