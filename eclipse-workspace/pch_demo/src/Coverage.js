import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class Coverage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      coverages : [
        {
          name: "Basic Coverage",
          description: "This is the basic coverage everyone has."
        },
        {
          name: "Anti Theft",
          description: "There are many thieves in some areas."
        },
        {
          name: "Anti Hail",
          description: "Alberta has hail as big as a basketball!"
        }
      ]
    };

  }

  render() {
    if (this.props.dimensions.width < 400) {
      return (
        <div>
          <Nav tabs>
            {this.state.coverages.map(coverage => {
              return (
                <NavItem key={coverage.name}>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    coverage.name
                  </NavLink>
                </NavItem>
              )
            })}
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            {this.state.coverages.map(coverage => {
              return (
                <TabPane key={coverage.name} tabId="1">
                  <Row>
                    <Col sm="12">
                      <h4>coverage.description</h4>
                    </Col>
                  </Row>
                </TabPane>
              )
            })}      
          </TabContent>
        </div>
      )
    } else {
      return <div>Empty div</div>;
    }
  } 
}

export default Coverage;