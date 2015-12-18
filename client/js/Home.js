import React from 'react';

import {Footer} from './footer.js';

exports.Home = React.createClass({
  componentDidMount: function () {
    $('.parallax').parallax();
    $(".button-collapse").sideNav();
  },

  render: function() {
    return(
      <div>

        {/*Parallax*/}
        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c1.staticflickr.com/5/4142/4931601202_92f9bb7152_b.jpg" />
          </div>
          <div className="caption center-align shadow-white">
            <h3>See the lives changed by your donation!</h3>
            <h5 className="light grey-text text-lighten-3 shadow">Follow the impact of your money</h5>
          </div>
        </div>

        <div className="section white">
          <p className="grey-text text-darken-3 lighten-3"></p>
          <div className="container">

            <div className="row">

              <div className="col s4">
                <i className="material-icons">flash_on</i>
                <h6>Charity Tree is an application designed to answer the classic questions when it comes to donating to charities. "Where is my money going?". "Am I contributing in a meaningful way?"."Can I trust this organization with the money I donate?" We've all been in a giving mood and have been willing to donate to a cause that resonates with us. The problem is that in today's climate there is so many inconsistencies and ambiguities when it comes to transparency with how the money is spent. People are aware that there exists some less than trustworthy organizations out there that allocates the money selfishlessly or without the best of intentions.</h6>
              </div>
              <div className="col s4">
                <h6>Charity Tree was built to shed light on the gray areas when it comes to donating to Charities. Our aim is to give clear and immediate feedback as to how your money is being spent and how specifically you are contributing to a cause. We do this by breaking down causes into organinization, organizations into projects, and projects into registries. For example, lets say you have a soft spot in your heart for breast cancer research and choose to help The Breast Cancer Research Foundation. That organization must give us information on its current projects and completed projects in the past. A project is a current specific goal within that organization that has either been realized or is a work in progress. For Example, The Breast Cancer Research may have a project to submit an expensive vacine registry form to the FDA for approval. If you were interested in helping with this project then you'd suscribe to that project.</h6>
              </div>
              <div className="col s4">
                <h6>Once you've settled on a project it is then time to inspect that projects registry. This "registry" concept is the same idea as that for a baby shower or bridal shower. This registry list the all the minutae of all the financially dependent goals of the project. It could be the cost of sixty pairs of shoes or all the expenses of purchasing four bunkbeds for an orphanage in Los Angeles. While viewing the registry it is clear what has already been purchased and what still needs to be purchased. The donor is then able to decide in what way they will contribute financially to this particular project. Once a donation has been made a receipt outlining their contribution down to the tax is rendered for the user to keep for their own records. The concepts of Projects, registries, and receipts is what sets charity tree apart all the other charity applications. We are able to provide clear an immediate feedback</h6>
              </div>

            </div>
          </div>
        </div>

        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c2.staticflickr.com/6/5477/10570079866_b622f2a732_b.jpg" />
          </div>
        </div>

        {/*Footer*/}
        <Footer />
      </div>
    );
  }
});
