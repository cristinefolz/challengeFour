
{/* 
  HIERARCHY


  -PeopleApp (will get data from /api/people and set the state of people)
    -PeopleList
      -Person
*/}

var PeopleApp = React.createClass({

  propTypes: {    // propTypes are good to have
    url: React.PropTypes.string.isRequired  // url is required property type for PeopleApp
  },

  getInitialState: function() {
    return {
      people: [],
    }
  },

  loadPeopleFromServer: function() {
    var self = this;
    $.ajax({
      url: this.props.url,
      method: 'GET'
    }).done(function(data){
      console.log(data)
      self.setState({
        people: data
      })
    })
  },

  componentDidMount: function() {  // returns of function will happen when component mounts to the page
    this.loadPeopleFromServer();
  },

  render: function() {
    return (
      <div>
        <PeopleList people={ this.state.people }/>
      </div>
      )
  }
});

var PeopleList = React.createClass({
  render: function() {
    console.log(this.props.people)
    var person = this.props.people.map(function(p){
      return <Person username={p.username} 
                    img={p.img} 
                    country={p.country} 
                    birth_date={p.birth_date} />
      })
    return (
      <div>
        { person }
      </div>
      )
  }
});


{/*
  Have this component render actual data.
  BONUS: Create a function which will take a persons birth_date
  and calculate their age. Use this function to render the persons age.
*/}
var Person = React.createClass({
  getAge: function(age) {
    return (new Date()).getYear() - (new Date(age)).getYear()
  },
  
    // var bDate = this.props.birth_date.split("T").shift().toString();
    // console.log(bDate);
    // var age = moment().diff(bDate, 'years');
    // console.log('Age is: ' + age);

    render: function() {
    return (
      <div className="panel panel-default">
        <div classname="panel-body">
          <img src={ this.props.img } className="img-thumbnail" />
          <p>{ this.props.username }</p>
          <p>{ this.props.country }</p>
          <p>{ this.getAge(this.props.birth_date) }</p>
        </div>
      </div>
      )
  }
})






React.render(<PeopleApp url="/api/people/" />, document.getElementById('react-container'));
