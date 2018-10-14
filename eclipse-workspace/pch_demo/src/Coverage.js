import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class Coverage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1', 
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

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    if (this.props.dimensions.width < 400) {
      return (
        <div>
          <Nav tabs>
            {this.state.coverages.map((coverage, index) => {
              return (
                <NavItem key={coverage.name}>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === index })}
                    onClick={() => { this.toggle(index); }}
                  >
                    {coverage.name}
                  </NavLink>
                </NavItem>
              )
            })}
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            {this.state.coverages.map((coverage, index) => {
              return (
                <TabPane key={coverage.name} tabId={index}>
                  <Row>
                    <Col sm="12">
                      <h4>{coverage.description}</h4>
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