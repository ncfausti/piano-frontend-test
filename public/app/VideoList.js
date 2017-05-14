import React from 'react';
import axios from 'axios'; 
export default class VideoList extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {videos:[]}
    }
    componentDidMount() {
	    axios.get(`/videos`)
	      .then(res => {
	        this.setState({ videos:res.data });
	      });
  }
	render(){
        
		return (
			<div>
				<h1> Videos!</h1>
				<ul>
				{
					this.state.videos.map((video,i)=>{
						return <li key={i+'-l'}> <VideoModal key={i} i={i}  {...video} /></li>
					})
					
				}
				</ul>
				<div> + <VideoModal /></div>
			</div>
		);
	}
}
 
class VideoModal extends React.Component {
    
	render(){
		if(this.props.i>=0){
			return (
					<span>
						<a  className="" style={{cursor:"pointer"}} data-toggle="modal" data-target={`#myModal`+this.props.i}>{this.props.title}</a>
						
						
						<div id={"myModal"+this.props.i} className="modal fade" role="dialog">
						  <div className="modal-dialog">
						    <div className="modal-content">
						      <div className="modal-header">
						        <button type="button" className="close" data-dismiss="modal">&times;</button>
						        <h4 className="modal-title">{this.props.title}</h4>
						      </div>
						      <div className="modal-body">
						        <div>title: {this.props.title}</div>
						        <div>published Date: {this.props.publishedDate}</div>
						        <div>cover Image: {this.props.coverImage}</div>
						        <div>sort Order: {this.props.sortOrder}</div>
						      </div>
						      <div className="modal-footer">
						        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
						      </div>
						    </div>
						
						  </div>
						</div>
				</span>
		);
		}else{
				return(
					<span>
						<a  className="" style={{cursor:"pointer"}} data-toggle="modal" data-target={`#myModal`}>add a video</a>
						
						
						<div id={"myModal"} className="modal fade" role="dialog">
						  <div className="modal-dialog">
						    <div className="modal-content">
						      <div className="modal-header">
						        <button type="button" className="close" data-dismiss="modal">&times;</button>
						        <h4 className="modal-title">add a video: </h4>
						      </div>
						      <div className="modal-body">
						        <div>title: </div>
						        <div>published Date: </div>
						        <div>cover Image: </div>
						        <div>sort Order: </div>
						      </div>
						      <div className="modal-footer">
						        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
						      </div>
						    </div>
						
						  </div>
						</div>
				</span>
				)
		}
        
	}
}
 

