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

const CATEGORY_PARENT = -1;
const YEAR_PARENT = -2;
const GAS_PARENT = -3;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: getTreeMenu(list.menu),
      navMenu: list.navMenu,
      gasses: [],
      years: [],
      isYearly: true
    };
  }

  componentDidMount() {
    const { menu } = this.refs;
    console.log(this.state.menu)
    this.loadCategories();
    if (this.state.isYearly){
      this.loadYears();
    }else {
      this.loadGas();
    }

    console.log(this.state);
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

  loadGas(yearId = null){
    console.log(yearId);
    if (yearId === null){
      axios.getGasses().then((response) => {
        const data = response.data;
        //posledniot gas go pravime aktiven koga se bira od select menu
        data[data.length - 1].checked = true;

        const gasChecked = data[data.length-1];

        this.setState((prevState) => {
          const newValue = {
            'gasses': data
          };

          return {
            ...prevState,
            ...newValue
          }
        }, () => {
          console.log(this.state);
          this.loadYears(gasChecked.id);
        })
      })
    }
    else {
      axios.getGasByYear(yearId).then((response) => {
        const data = response.data;
        console.log(data);
        //site gasovi da bidat checked vo menito
        for (const el of data) {
          el.checked = true;
          el.parent = GAS_PARENT;
        }

        this.setState((prevState)=>{
          const newValue = {
            'gasses': data
          }

          return {
            ...prevState,
            ...newValue
          }
        }, () => {console.log(this.state)})

      })
    }
  }

  loadYears(gasId = null){
    if (gasId === null){
      axios.getYears().then((response) => {
        const data = response.data;
        for (const el of data) {
          el.checked = false;
          el.parent = YEAR_PARENT;
        }
        data[data.length -1].checked = true;
        const yearChecked = data[data.length-1];
        console.log(data);
        this.setState((prevState) => {
          const newValue = {
            'years': data
          }
          console.log(newValue);

          return {
            ...prevState,
            ...newValue
          }
        }, () => {
          this.loadGas(yearChecked.id);
        })

      })
    } else {
      axios.getYearsByGas(gasId).then((response) => {
        const data = response.data;
        console.log(data)
        //site godini da bidat vkluceni, moze da go promenime
        for (const el of data) {
          el.checked = true;
          el.name = el.year;
          el.parent = YEAR_PARENT;
        }

        this.setState((prevState) => {
          const newValue = {
            'years': data
          }

          return {
            ...prevState,
            ...newValue
          }
        }, () => {console.log(this.state)})

      })
    }
  }

  // eslint-disable-next-line react/sort-comp
  loadCategories = () => {
    axios.getCategories().then((response) => {
      this.setState((prevState) => {
        // console.log(response.data)

        const newValue = {
          'categories': getTreeMenu(response.data, CATEGORY_PARENT)
        };

        return {
          ...prevState,
          ...newValue
        };
      }, () => {
        // console.log(this.state)
        // console.log(this.state.categories)
      });
    }, (err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      alert(err);
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
            {/*{this.menu()}*/}
            {
              this.state.isYearly ?
                  <MenuTree key={GAS_PARENT} label="Gasses">
                    {this.state.gasses ? this.categories(this.state.gasses): " "}
                  </MenuTree>
                  :
                  <MenuTree key={YEAR_PARENT} label="Years">
                    {this.state.years ? this.categories(this.state.years): " "}
                  </MenuTree>
            }

            {
              <MenuTree key={CATEGORY_PARENT} label="Category">
                {this.state.categories ? this.categories(this.state.categories): " "}
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
        <ToogleSwitch isChecked={this.state.isYearly} />
        <Dropdown items={this.state.isYearly ? this.state.years : this.state.gasses} isYearly={this.state.isYearly} />
      </div>
    );
  };

  //3 types 'Category', 'Gas', 'Year'
  categories = (data) => {

    return data.map((item, index) => {
      if (item.name != null) {
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
