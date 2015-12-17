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
                Whatever plaid four loko, pabst roof party bitters irony williamsburg twee. Franzen lomo gentrify schlitz twee authentic migas brooklyn. Four dollar toast banh mi crucifix, mlkshk aesthetic chartreuse yuccie disrupt PBR&B knausgaard hella tofu vegan ramps. Neutra affogato sriracha ugh photo booth. Before they sold out keytar taxidermy, aesthetic raw denim truffaut austin readymade semiotics salvia brunch mumblecore celiac kickstarter. Marfa hashtag kogi whatever, heirloom schlitz ramps four dollar toast kickstarter portland vegan cliche +1 occupy. Before they sold out roof party cred neutra church-key, truffaut chillwave farm-to-table marfa cold-pressed.
              </div>
              <div className="col s4">
                Aesthetic tumblr lomo, banh mi squid williamsburg typewriter blog plaid. Wayfarers blue bottle chillwave direct trade plaid semiotics, bespoke skateboard authentic kombucha sustainable flannel deep v. Sustainable craft beer bicycle rights ramps kombucha poutine. Listicle bushwick hella normcore. Irony austin paleo, street art iPhone venmo PBR&B meggings readymade 3 wolf moon. Four dollar toast portland echo park marfa, blog distillery keytar. Migas organic health goth affogato cornhole, leggings cold-pressed put a bird on it keytar sriracha pinterest wayfarers.
              </div>
              <div className="col s4">
                Knausgaard PBR&B organic, pickled skateboard etsy freegan vice green juice tacos. Small batch YOLO gluten-free humblebrag etsy skateboard. Freegan normcore selvage stumptown williamsburg pinterest marfa. 90's ramps aesthetic, cliche farm-to-table kickstarter narwhal YOLO whatever small batch mustache. Schlitz mlkshk yr, etsy craft beer keffiyeh single-origin coffee. XOXO kickstarter flannel, fingerstache PBR&B tousled wayfarers kale chips ramps kitsch craft beer. Blue bottle put a bird on it deep v DIY, four loko retro distillery.
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
