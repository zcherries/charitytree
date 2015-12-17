"use strict";
var React = require('react');

var Organization = exports.Organization = React.createClass({

  dummyOrgdata : {
  name: "3HO Foundation",
  address: "6 Narayan Court, Espanola, New Mexico 87532, USA",
  about: "The Mission of 3HO is to uplift humanity through the technologies of Kundalini Yoga, meditation and conscious living. Addressing one of the greatest problems facing the world today, substance abuse and addictions, 3HO SuperHealth, which includes the practice of Kundalini Yoga, meditation, vegetarian diet, offers an effective, evidence-based and time-proven rehabilitation and treatment programme. Programs have operated successfully in the United States since 1973 and in India.",
  signup_date: "11/11/2014",
  areas_of_focus: ["Counseling", "Education", "Rehabilitation", "Drug Treatment", "Human Rights", "Women's Issues", "Health", "Addiction"]
  // profile_img: {
  //   data: Buffer,
  //   contentType: String
  // }
  // media: [ObjectId],
  // projects: [{ type: ObjectId, ref: 'Project' }],//does this have past and curr
  // endorsements: [{ type: ObjectId, ref: 'Donor' }]
  },

  projects:{
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
    }
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
    }
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
    }}],
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
    }},{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    }},{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    }}]
  },

  componentWillMount: function(){
    console.log('Insideof orgpage logging current org', this.props.currentOrganization);
  },

  render: function() {

    var pastProject = this.projects.past.map(function(project, index){
      return(
        <div key={index}>
          <div>the org is {project.org}</div>
          <div>the info is {project.info}</div>
          <div>this is the start_date {project.start_date}</div>
          <div>the end_date {project.end_date}</div>
        </div>
        );
    });


    var currentProjects = this.projects.current.map(function(project, index){
      return(
        <div key={index}>
          <div>the org is {project.org}</div>
          <div>the info is {project.info}</div>
          <div>this is the start_date {project.start_date}</div>
          <div>the end_date {project.end_date}</div>
        </div>
        );
    });

    return (
      <div>


           <div className="row s12 text center">
              <h1>
                {this.props.currentOrganization.name}
                {/* {this.props.currentOrganization._id} */}
              </h1>
             <img src="https://c1.staticflickr.com/5/4140/4930996357_8c6f018343_z.jpg" />

           </div>
           <div className="text center">
             <h5> Description: {this.props.currentOrganization.about}</h5>
             <h6> Address: {this.props.currentOrganization.address}</h6>
            </div>

         <div className="row">
            <div className="col s6 valign-wrapper">
              <h3 className="valign">
                Additional info here about what the Org Cares about
                Boom and there goes the dynamite
              </h3>
            </div>

           <div className="col s6">
             <img src="https://c1.staticflickr.com/5/4116/4931019303_2f386bffb7_z.jpg" />
           </div>
           </div>


           <div>
            <h4>
             Areas of focus:
             {this.props.currentOrganization.areas_of_focus}
            </h4>
           </div>

           <div className="row">
             <h2>Our currrent Projects are</h2>
             {currentProjects}
           </div>
           <div>
             <h2>Our Past Projects</h2>
            <div>{pastProject}</div>
           </div>

           <div>
            <h2>Endorsements</h2>
            <div>Various Endorsements</div>
           </div>

         </div>
    );
  }
});
