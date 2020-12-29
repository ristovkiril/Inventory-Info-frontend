import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import NewMenuItem from './newMenuItem';
import NewMenuTree from './newMenuTree';
import MenuItem from './menuItem';
import MenuTree from './menuTree';
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
      categories: [],
      gasses: [],
      years: [],
      isYearly: false
    };
  }

  componentDidMount() {
    const { menu } = this.refs;

    this.loadCategories();
    if (this.state.isYearly){
      this.loadYears();
    }else {
      this.loadGas();
    }

    // eslint-disable-next-line func-names
    $(function() {
      $(menu).metisMenu({
        toggle: true
      });
    });
  }

  componentWillUpdate() {
    // $('body').toggleClass('mini-navbar');
    // smoothlyMenu();
  }

  loadGas = (yearId = null) => {
    if (yearId === null){
      axios.getGasses().then((response) => {
        const data = response.data;
        //posledniot gas go pravime aktiven koga se bira od select menu
        //site gasovi da bidat checked vo menito
        for (const el of data) {
          el.checked = false;
          el.parent = GAS_PARENT;
        }
        data[0].checked = true;
        const gasChecked = data[0];

        this.setState((prevState) => {
          const newValue = {
            'gasses': data
          };

          return {
            ...prevState,
            ...newValue
          }
        }, () => {
          this.loadYears(gasChecked.id);
        })
      })
    }
    else {
      axios.getGasByYear(yearId).then((response) => {
        const data = response.data;

        //site gasovi da bidat checked vo menito
        for (const el of data) {
          el.checked = true;
          el.parent = GAS_PARENT;
        }

        this.setState((prevState)=>{
          const newValue = {
            'gasses': data
          };

          return {
            ...prevState,
            ...newValue
          }
        })

      })
    }
  }

  loadYears = (gasId = null) => {
    if (gasId === null){
      axios.getYears().then((response) => {
        const data = response.data;
        for (const el of data) {
          el.checked = false;
          el.name = el.year;
          el.parent = YEAR_PARENT;
        }
        data[0].checked = true;
        const yearChecked = data[0];

        this.setState((prevState) => {
          const newValue = {
            'years': data
          };

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
        //site godini da bidat vkluceni, moze da go promenime
        for (const el of data) {
          el.checked = true;
          el.name = el.year;
          el.parent = YEAR_PARENT;
        }

        this.setState((prevState) => {
          const newValue = {
            'years': data
          };

          return {
            ...prevState,
            ...newValue
          }
        })

      })
    }
  }

  // eslint-disable-next-line react/sort-comp
  loadCategories = () => {
    axios.getCategories().then((response) => {
      this.setState((prevState) => {

        const newValue = {
          'categories': getTreeMenu(response.data, CATEGORY_PARENT)
        };

        return {
          ...prevState,
          ...newValue
        };
      }, () => {
      });
    }, (err) => {
      // eslint-disable-next-line no-console
      alert(err);
    });
  };

  setCategories = (data, id) => {
    for (const el of data) {
      if (el.id == id){
        el.checked = !el.checked;
        break;
      } else if (!isEmpty(el.tree)) {
        this.setCategories(el.tree, id);
      }
    }

    return data;
  }

  setAnalysis = (e) => {
    e.preventDefault();

    this.setState((prevState)=>{
        const newValue = {
          'isYearly': !prevState.isYearly
        }

        return{
          ...prevState,
          ...newValue
        }
    }, () => {
      if (this.state.isYearly){
        this.loadYears()
      } else {
        this.loadGas();
      }
    })
  };

  setSelectedItem = (e) => {
    e.preventDefault();
    const id = e.target.value;
    if (this.state.isYearly) {
      this.setState((prevState) => {
        const data = prevState.years;
        let selected = {}
        for (const el of data) {
          el.checked = false;
          if (el.id == id){
            selected = el;
            el.checked = true
          }
        }

        const newValue = {
          'years': data,
          'selected': selected
        }

        return {
          ...prevState,
          ...newValue
        }
      }, () => {
        this.loadGas(this.state.selected.id)
      })
    } else {
      this.setState((prevState) => {
        const data = prevState.gasses;
        let selected = {}
        for (const el of data) {
          el.checked = false;
          if (el.id == id){
            el.checked = true
            selected = el;
          }
        }

        const newValue = {
          'gasses': data,
          'selected': selected
        }

        return {
          ...prevState,
          ...newValue
        }
      }, () => {
        this.loadYears(this.state.selected.id)
      })
    }
  }

  onCategoriesChange = (e) => {
    // e.preventDefault();
    const id = e.target.id;
    const data = this.setCategories(this.state.categories, id);
    console.log(data);

    this.setState((prevState) => {
      const newValue = {
        'categories': data
      }

      return {
        ...prevState,
        ...newValue
      }
    })

  }

  render() {
    return (
        <nav id="leftCol" className="navbar-default navbar-static-side h-100" role="navigation">
          <div className="sidebar-collapse">
            <ul className="nav nav-header metismenu p-1" id="side-menu" ref="menu" style={{ zIndex: 2000 }}>
              <li className="nav-header">
                {this.profile()}
              </li>

              {
                <MenuTree key={GAS_PARENT} show={this.state.isYearly} label="Gasses">
                  {this.state.gasses ? this.categories(this.state.gasses) : " "}
                </MenuTree>
              }
              {
                <MenuTree key={YEAR_PARENT} show={!this.state.isYearly} label="Years">
                  {this.state.years ? this.categories(this.state.years): " "}
                </MenuTree>
              }

              {
                <MenuTree key={CATEGORY_PARENT} show={true} label="Category" >
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
          <ToogleSwitch isChecked={this.state.isYearly} onClick={this.setAnalysis}/>
          <Dropdown items={this.state.isYearly ? this.state.years : this.state.gasses} onChange={this.setSelectedItem} isYearly={this.state.isYearly} />
        </div>
    );
  };

  //3 types 'Category', 'Gas', 'Year'
  categories = (data) => {

    return data.map((item, index) => {
      if (item.name != null) {
        if (isEmpty(item.tree)) {
          return (<NewMenuItem key={index} id={item.id} label={item.name} checked={item.checked} onChange={this.onCategoriesChange} />)
        } else {
          return (
              <NewMenuTree key={index} id={item.id} label={item.name} checked={item.checked} level={2} onChange={this.onCategoriesChange} >
                {
                  item.tree.map((treeItem, treeIndex) => {
                    if (isEmpty(treeItem.tree)){
                      return (<NewMenuItem key={treeIndex} id={treeItem.id} label={treeItem.name} checked={treeItem.checked} onChange={this.onCategoriesChange} />)
                    }
                    return (
                        <NewMenuTree key={treeItem.id} id={treeItem.id} label={treeItem.name} checked={treeItem.checked} level={3}  onChange={this.onCategoriesChange} >
                          {treeItem.tree.map((subItem, subIndex) => {
                            return (<NewMenuItem key={subIndex} id={subItem.id} label={subItem.name} checked={subItem.checked} onChange={this.onCategoriesChange} />);
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
