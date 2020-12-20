import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

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
    // this.loadCategories();
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
        const data = response.data;
        // eslint-disable-next-line no-console
        console.log(response.data);
        for (let el in data) {
          el = { id: el.id, path: '/app/home', icon: 'home', label: 'Home', parent: el.subcategory.id };
        }
        const newValue = {
          'categories': getTreeMenu(response.data)
        };

        return {
          ...prevState,
          ...newValue
        };
      }, [], (err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        alert(err);
      });
    });
  };

  render() {
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu" ref="menu" style={{ zIndex: 2000 }}>
            <li className="nav-header">
              {this.profile()}
              <div className="logo-element"> <img alt="" className="img-circle logo" src={logo}/> </div>
            </li>
            {this.menu()}
          </ul>
        </div>
      </nav>
    );
  }

  profile = () => {
    return (
      <div className="form-group">
        <ToogleSwitch/>
        <Dropdown />
      </div>
    );
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
