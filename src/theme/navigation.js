import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import NewMenuItem from './newMenuItem';
import NewMenuTree from './newMenuTree';
import MenuItem from './menuItem';
import MenuTree from './menuTree';
import logo from '../assets/img/logo.png';
import { smoothlyMenu } from './helpers/helpers';
import $ from 'jquery';
import list from '../constants/list';
import { getTreeMenu } from '../helpers/permissions';
import axios from '../axios/axios-repository';
import ToogleSwitch from "./toogleSwitch";
import Dropdown from "./dropdown";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: getTreeMenu(list.menu),
      navMenu: list.navMenu
    };
  }

  componentDidMount() {
    const { menu } = this.refs;
    console.log(this.state.menu)
    this.loadCategories();
    // eslint-disable-next-line func-names
    $(function() {
      $(menu).metisMenu({
        toggle: true
      });
    });
  }

  componentWillUpdate() {
    $('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

  // eslint-disable-next-line react/sort-comp
  loadCategories = () => {
    axios.getCategories().then((response) => {
      this.setState((prevState) => {
        console.log(response.data)

        const newValue = {
          'categories': getTreeMenu(response.data, -1)
        };

        return {
          ...prevState,
          ...newValue
        };
      }, () => {
        console.log(this.state)
        console.log(this.state.categories)
      }, (err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        alert(err);
      });
    });
  };

  render() {
    return (
      <nav id="leftCol" className="navbar-default navbar-static-side h-100" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav nav-header metismenu p-1" id="side-menu" ref="menu" style={{ zIndex: 2000 }}>
            <li className="nav-header">
              {this.profile()}
            </li>
            {this.menu()}
            {
              <MenuTree key={-1} label="Category">
                {this.state.categories ? this.categories(): " "}
              </MenuTree>
            }
          </ul>
        </div>
      </nav>
    );
  }

  profile = () => {
    return (
      <div className="form-group nav-label">
        <ToogleSwitch/>
        <Dropdown />
      </div>
    );
  };
  
  categories = () => {
    
    return this.state.categories.map((item, index) => {
      if (item.name != null || item.enName != null) {
        if (isEmpty(item.tree)) {
          return (<NewMenuItem key={index} id={item.id} label={item.name} checked={item.checked} />)
        } else {
          return (
              <NewMenuTree key={index} id={item.id} label={item.name} checked={item.checked} level={2}>
                {
                  item.tree.map((treeItem, treeIndex) => {
                    if (isEmpty(treeItem.tree)){
                      return (<NewMenuItem key={treeIndex} id={treeItem.id} label={treeItem.name} checked={treeItem.checked}/>)
                    }
                    return (
                        <NewMenuTree key={treeItem.id} id={treeItem.id} label={treeItem.name} checked={treeItem.checked} level={3} >
                          {treeItem.tree.map((subItem, subIndex) => {
                            return (<NewMenuItem key={subIndex} id={subItem.id} label={subItem.name} checked={subItem.checked}/>);
                          })}
                        </NewMenuTree>
                    )
                  })
                }
              </NewMenuTree>
          )
        }
      }
    })

  };

  menu = () => {
    return this.state.menu.map((item, index) => {
      if (isEmpty(item.tree)) {
        return (<MenuItem key={index} path={item.path} icon={item.icon} label={item.label}/>);
      }
      return (
        <MenuTree key={index} icon={item.icon} label={item.label}>
          {
            item.tree.map((treeItem, treeIndex) => {
              if (isEmpty(treeItem.tree)) {
                return (<MenuItem key={treeIndex} path={treeItem.path} label={treeItem.label} icon={treeItem.icon} tree />);
              }
              return (
                <MenuTree key={treeIndex} icon={treeItem.icon} label={treeItem.label} >
                  {treeItem.tree.map((subItem, subIndex) => {
                    return (<MenuItem key={subIndex} path={subItem.path} label={subItem.label} icon={subItem.icon} />);
                  })}
                </MenuTree>
              );
            })
          }
        </MenuTree>
      );
    });
  };
}

const mapStateToProps = () => ({ });
const mapDispatchToProps = (dispatch) => bindActionCreators({ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
