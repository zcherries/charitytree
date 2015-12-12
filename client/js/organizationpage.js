var dummyOrgdata = {
  name: "3HO Foundation",
  address: "6 Narayan Court, Espanola, New Mexico 87532, USA",
  about: "The Mission of 3HO is to uplift humanity through the technologies of Kundalini Yoga, meditation and conscious living. Addressing one of the greatest problems facing the world today, substance abuse and addictions, 3HO SuperHealth, which includes the practice of Kundalini Yoga, meditation, vegetarian diet, offers an effective, evidence-based and time-proven rehabilitation and treatment programme. Programs have operated successfully in the United States since 1973 and in India.",
  signup_date: "11/11/2014",
  areas_of_focus: ["Counseling", "Education", "Rehabilitation", "Drug Treatment", "Human Rights", "Women's Issues", "Health", "Addiction"],
  profile_img: {
    data: Buffer,
    contentType: String
  },
  media: [ObjectId],
  projects: [{ type: ObjectId, ref: 'Project' }],//does this have past and curr
  endorsements: [{ type: ObjectId, ref: 'Donor' }]
}

var projects={
  past:[{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    },{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    },{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    }],
  current: [{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    },{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    },{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    }]
}

var organization = React.createClass({

  var pastProject = this.props.org.projects.past.map(function(project){
    return(
      <div>
        <div>the org is {project.org}</div>
        <div>the info is {project.info}</div>
        <div>this is the start_date {project.start_date}</div>
        <div>the end_date {project.end_date}</div>
      </div>
      )
  })

  var currentProjects = this.props.org.projects.current.map(function(project){
    return(
      <div>
        <div>the org is {project.org}</div>
        <div>the info is {project.info}</div>
        <div>this is the start_date {project.start_date}</div>
        <div>the end_date {project.end_date}</div>
      </div>
      )
  })
  

  render: function() {
    return (
        <img className="image" src={this.props.org.profile_img}/> 
        <h2>{this.props.org.name}</h2>
        <h4>{this.props.org.address}</h4>
        <h4>What We are About</h4>
          <p>{this.props.org.about}</p>
        <h4>Our Current Project</h4>
          <p>{currentProjects}</p>
        <h4>Our Past Projects<h4>
         <div>{pastProjects}</div>
        //mapProjects
      </div>
    );
  }
});

