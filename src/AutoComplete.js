import React , { Component } from 'react';
import axios from 'axios';

const numberOfUsers = 20;
const apiPath = `https://randomuser.me/api/?results=${numberOfUsers}&nat=au`;

class AutoComplete extends Component {
	constructor(props){
		super(props);
		this.state = {
			users:[],
			fileterUsers:[],
			value:'',
			dropDownOpen:false
		}
	}
	componentDidMount(){
		axios.get(apiPath)
		.then(res=>{
			const users = res.data.results.map(user=>{
				const email = user.email||'';
				const image = user.picture.thumbnail||'';
				const firstName = user.name.first.charAt(0).toUpperCase()+user.name.first.substr(1).toLowerCase();
				const lastName = user.name.last.charAt(0).toUpperCase()+user.name.last.substr(1).toLowerCase();
				const name = firstName+' '+lastName;
				return {
					email:email,
					image:image,
					name:name
				}
			}).sort(function(a,b){
				if (a.name < b.name)
					return -1;
				if (a.name>b.name)
					return 1;
				return 0;
			});
			this.setState({
				users:users,
				filterUsers:users
			})
		})
		.catch(err=>{
			console.log('get users error:',err)
		})
	}
	clickDropdown(event){
		const dropDownOpen = !this.state.dropDownOpen
		this.setState({
			dropDownOpen:dropDownOpen
		})
	}
	itemSelected(value){
		const name = value.name||'';
		const users = this.state.users;
		const dropDownOpen = !this.state.dropDownOpen
		this.setState({
			value:name,
			dropDownOpen:dropDownOpen,
			filterUsers:users
		});
	}
	renderListItems(){
		console.log('render items');
		const filterUsers = this.state.filterUsers||[];
		if (filterUsers.length == 0){
			return null;
		}
		return filterUsers.map(item=>{
			const key = item.email;
			const name = item.name;
			const image = item.image;
			return (
				<li key={key} className="dropdown-list-item" value={name} onClick={this.itemSelected.bind(this,{name})}>
					<img src={image}/>
					<p>{name}</p>
				</li>
			)
		})
	}
	onChangeInput(e){
		const value = e.target.value.toLowerCase()||'';
		const filterUsers = this.state.users.filter(user=>{
			return user.name.toLowerCase().indexOf(value)>=0;
		})
		this.setState({
			value:value,
			filterUsers:filterUsers,
			dropDownOpen:true
		})
	}
	render(){
		const value = this.state.value||'';
		const dropDownStyle = this.state.dropDownOpen?'dropdown-list':'hidden';
		return(

			<div className="autocomplete-div">
				<div>
					<div className="autocomplete-input-wrapper">
						<span className="fa fa-search"></span>
						<input 
							value={value} 
							placeholder = 'search for a person' 
							className="autocomplete-input"
							onChange = {this.onChangeInput.bind(this)}
						/>
						<span className="fa fa-sort-down" onClick={this.clickDropdown.bind(this)}></span>
					</div>
					<ul className={dropDownStyle}>
						{this.renderListItems()}
					</ul>
				</div>
			</div>
		)
	}
}
export default AutoComplete;