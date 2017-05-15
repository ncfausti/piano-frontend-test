import React from 'react';
import axios from 'axios'; 
export default class VideoList extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {videos:[]}
    }
    componentDidMount() {
	    this.getItems();
  }
  removeVideo(id){
  	axios.delete(`/videos/${id}`, {
	    
	  })
	  .then( (response) =>{
	     this.getItems();
	     $('#myModal').modal('hide');
	     
	  }).catch( (error) => {
	    alert(error);
	  });
  }
  getItems(){
  	axios.get(`/videos`)
	      .then(res => {
	        this.setState({ videos:res.data });
	      });
  }
  clearForm(){
  	var form = document.getElementById(`save-video-undefined`);
  	form.getElementsByClassName('image')[0].value='';
  	form.getElementsByClassName('title')[0].value = '';
  	form.getElementsByClassName('order')[0].value = '';
    form.getElementsByClassName('description')[0].value='';
    this.componentDidMount();
  }
  editVideo(modalId,id){
  	var form = document.getElementById(`save-video-${id}`);
  	var image = form.getElementsByClassName('image')[0].value;
  	var title = form.getElementsByClassName('title')[0].value;
  	var order = form.getElementsByClassName('order')[0].value;
    var description = form.getElementsByClassName('description')[0].value;
  	axios.put(`/videos/${id}`, {
	    coverImage: image,
	    title: title,
	    sortOrder: order,
	    description:description
	  })
	  .then( (response) =>{
	  	 $(`#myModal${id}`).modal('hide');
	     this.getItems();

	  })
	  .catch( (error) => {
	    alert(error);
	  });
  }
  createNewVideo(){
  	var form = document.getElementById('save-video-undefined');
  	var image = form.getElementsByClassName('image')[0].value;
  	var title = form.getElementsByClassName('title')[0].value;
  	var order = form.getElementsByClassName('order')[0].value;
    var description = form.getElementsByClassName('description')[0].value;
  	axios.post('/videos', {
	    coverImage: image,
	    title: title,
	    sortOrder: order,
	    description:description
	  })
	  .then( (response) =>{
	  	 $('#myModal').modal('hide');
	     this.clearForm();
	     this.getItems();
	     
	     
	  }).then(()=>{
	
	  	
	  })
	  .catch( (error) => {
	    alert(error);
	  });
  }
	render(){
        
		return (
			<div>
				<h1> Videos!</h1>
				<ul>
				{
					this.state.videos.map((video,i)=>{
						return <li key={i+'-l'}> <VideoModal key={video._id} i={video._id}  {...video} editVideo={this.editVideo.bind(this,i,video._id)}  /> <a href="#" onClick={this.removeVideo.bind(this,video._id)}><strong>-</strong> </a></li>
					})
					
				}
				</ul>
				<div> + <VideoModal createNewVideo={this.createNewVideo.bind(this)}  /></div>
			</div>
		);
	}
}
 
class VideoModal extends React.Component {
   
	render(){
		if(this.props.i){
			return (
					<span>
						<a  className="" style={{cursor:"pointer"}} data-toggle="modal" data-target={`#myModal`+this.props.i}>{this.props.title}</a>
						<div id={"myModal"+this.props._id} className="modal fade" role="dialog">
						  <div className="modal-dialog">
						    <div className="modal-content">
						      <div className="modal-header">
						        <button type="button" className="close" data-dismiss="modal">&times;</button>
						        <h4 className="modal-title">{this.props.title}</h4>
						      </div>
						      <div className="modal-body">
						    		<VideoForm {...this.props} />
						      </div>
						      
						      <div className="modal-footer">
						         <a type="button" className="btn btn-primary"  onClick={this.props.editVideo}>Edit</a>
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
								        <VideoForm {...this.props} />
								      </div>
								      <div className="modal-footer">
								        <a type="button" className="btn btn-success"  onClick={this.props.createNewVideo}>Create</a>
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
 

class VideoForm extends React.Component {
	
	render(){
		let date;
		if(this.props.i){
			date=<div className="form-group row">
						  <label for="" className="col-md-3 col-md-form-label">date: </label>
						  <div className="col-md-7">
						    <input className="form-control" type="text" value={this.props.publishedDate} id="example-search-input"  className="date" />
						  </div>
					</div>;
		}
		return(
			<div id={"save-video-"+this.props.i} data-mid={this.props._id}>
				<div className="form-group row">
				  <label for="" className="col-md-3 col-md-form-label">title: </label>
				  <div className="col-md-7">
				    <input className="form-control" type="text" defaultValue={this.props.title} className="title" />
				  </div>
				</div>
				{date}
				<div className="form-group row">
				  <label for="" className="col-md-3 col-md-form-label">image:</label>
				  <div className="col-md-7">
				    <input className="form-control" type="text" defaultValue={this.props.coverImage} className="image" />
				  </div>
				</div>
				<div className="form-group row">
				  <label for="" className="col-md-3 col-md-form-label">description:</label>
				  <div className="col-md-7">
				    <textarea className="form-control" type="text"   className="description" >{this.props.description}</textarea> 
				  </div>
				</div>
				<div className="form-group row">
					<label for="" className="col-md-3 col-md-form-label">order: </label>
					<div className="col-md-7">
					    <input className="form-control" type="text" defaultValue={this.props.sortOrder} className="order" />
					  </div>
				</div>
			</div>
		)
	}
}