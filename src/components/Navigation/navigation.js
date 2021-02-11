import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';
import * as analysisActionCreator from "../../redux/actions/gas_year_category";

import NewMenuItem from './newMenuItem';
import NewMenuTree from './newMenuTree';
import MenuItem from './menuItem';
import MenuTree from './menuTree';
import $ from 'jquery';
import {getTreeMenu} from '../../helpers/permissions';
import axios from '../../axios/axios-repository';
import ToggleSwitch from "../Custom/toggleSwitch";
import Dropdown from "../Custom/dropdown";


import jQuery from 'jquery';
import {withTranslation} from "react-i18next";
import AlertDialog from "../Dialog/alertDialog.js";

window.$ = jQuery;

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
            analysis: [],
            message: "",
            error: false
        };
    }

    componentDidMount() {
        const {menu} = this.refs;

        this.loadCategories();
        if (this.props.isYearly) {
            this.loadYears();
        } else {
            this.loadGas();
        }

        // eslint-disable-next-line func-names
        $(function () {
            $(menu).metisMenu({
                toggle: true
            });
        });
        // this.props.getAnalysis()
        this.props.onSelected(this.state.gasses, this.state.categories, this.state.analysis);
    }


    // componentWillUpdate() {
    //     $('body').toggleClass('mini-navbar');
    //     smoothlyMenu();
    // }

    //So vaa ce gi citame site selektirani
    loadAllByIds = () => {
        let temp = this.state.categories;
        const gasses = this.state.gasses.filter(f => f.checked).map(f => f.id);
        const analysis = this.state.years.filter(f => f.checked).map(f => f.id);
        const categories = (function () {
            let data = [];
            (function recursive(arr) {
                for (const el of arr) {
                    if (el.checked) {
                        data.push(el.id);
                    }
                    if (!isEmpty(el.tree)) {
                        recursive(el.tree)
                    }
                }
            }(temp));

            return data;
        }());

        if (gasses.length > 0 && analysis.length > 0 && categories.length > 0) {
            this.props.onSelected(gasses, categories, analysis);
        }
    };

    setError = (message = '') => {
        if (this.state.error !== true){
            this.setState((prevState) => {
                const newValue = {
                    message: message,
                    error: !prevState.error
                }
                return {
                    ...prevState,
                    ...newValue
                }
            })
        }
    }
    
    loadGas = (yearId = null) => {
        if (yearId === null) {
            axios.getGasses().then((response) => {
                if (response.data.length === 0) {
                    this.setError("There is no data to show");
                    return;
                }
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
        } else {
            axios.getGasByYear(yearId).then((response) => {
                if (response.data.length === 0) {
                    this.setError("There is no data to show");
                    return;
                }
                const data = response.data;

                //site gasovi da bidat checked vo menito
                for (const el of data) {
                    el.checked = false;
                    el.parent = GAS_PARENT;
                }
                data[0].checked = true;


                this.setState((prevState) => {
                    const newValue = {
                        'gasses': data
                    };

                    return {
                        ...prevState,
                        ...newValue
                    }
                }, () => {
                    this.loadAllByIds();
                })

            })
        }
    };

    loadYears = (gasId = null) => {
        if (gasId === null) {
            axios.getYears().then((response) => {
                if (response.data.length === 0) {
                    this.setError("There is no data to show");
                    return;
                }
                const data = response.data.sort((a, b) => b.year - a.year);
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
                if (response.data.length === 0) {
                    this.setError("There is no data to show");
                    return;
                }
                const data = response.data.sort((b, a) => a.year - b.year);

                //site godini da bidat vkluceni, moze da go promenime
                for (const el of data) {
                    el.checked = false;
                    el.name = el.year;
                    el.parent = YEAR_PARENT;
                }
                data[0].checked = true;

                this.setState((prevState) => {
                    const newValue = {
                        'years': data
                    };

                    return {
                        ...prevState,
                        ...newValue
                    }
                }, () => {
                    this.loadAllByIds()
                })

            })
        }
    };

    // eslint-disable-next-line react/sort-comp
    loadCategories = () => {
        axios.getCategories().then((response) => {
            if (response.data.length === 0) {
                this.setError("There is no data to show");
                return;
            }
            this.setState((prevState) => {

                const newValue = {
                    'categories': getTreeMenu(response.data, CATEGORY_PARENT)
                };

                return {
                    ...prevState,
                    ...newValue
                };
            }, () => {
                this.loadAllByIds();
            });
        }, (err) => {
            // eslint-disable-next-line no-console
            alert(err);
        });
    };

    setCategories = (data, id) => {
        for (const el of data) {
            if (el.id === id) {
                el.checked = !el.checked;
                break;
            } else if (!isEmpty(el.tree)) {
                this.setCategories(el.tree, id);
            }
        }

        return data;
    };

    setAnalysis = (e) => {
        e.preventDefault();

        this.props.setAnalysis();

        if (this.props.isYearly) {
            this.loadYears()
        } else {
            this.loadGas();
        }
    };

    setSelectedItem = (e) => {
        e.preventDefault();
        const id = parseInt(e.target.value);
        if (this.props.isYearly) {
            this.setState((prevState) => {
                const data = prevState.years;
                let selected = {}
                for (const el of data) {
                    el.checked = false;
                    if (el.id === id) {
                        selected = el;
                        el.checked = true
                    }
                }

                const newValue = {
                    'years': data,
                    'selected': selected
                };

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
                let selected = {};
                for (const el of data) {
                    el.checked = false;
                    if (el.id === id) {
                        el.checked = true;
                        selected = el;
                    }
                }

                const newValue = {
                    'gasses': data,
                    'selected': selected
                };

                return {
                    ...prevState,
                    ...newValue
                }
            }, () => {
                this.loadYears(this.state.selected.id)
            })
        }
    };

    onCategoriesChange = (e) => {
        // e.preventDefault();
        const id = parseInt(e.target.id);
        const data = this.setCategories(this.state.categories, id);

        this.setState((prevState) => {
            const newValue = {
                'categories': data
            };

            return {
                ...prevState,
                ...newValue
            }
        }, () => {
            this.loadAllByIds();
        })

    };

    onGasChange = (e) => {
        const id = parseInt(e.target.id);
        this.setState((prevState) => {
            const data = prevState.gasses;
            for (const el of data) {
                if (el.id === id) {
                    el.checked = !el.checked;
                }
            }

            const newValue = {
                'gasses': data
            };

            return {
                ...prevState,
                ...newValue
            }
        }, () => {
            this.loadAllByIds();
        })
    };

    onYearChange = (e) => {
        const id = parseInt(e.target.id);
        this.setState((prevState) => {
            const data = prevState.years;
            for (const el of data) {
                if (el.id === id) {
                    el.checked = !el.checked;
                }
            }
            console.log(data)
            const newValue = {
                'years': data
            };

            return {
                ...prevState,
                ...newValue
            }
        }, () => {
            this.loadAllByIds();
        })
    };

    render() {
        return (
            <nav id="leftCol" className="navbar-default navbar-static-side h-100" role="navigation">
                <div className=" h-100">
                    <ul className="nav nav-header metismenu p-1 d-block" id="side-menu" ref="menu" style={{zIndex: 2000}}>
                        <li className="nav-header">
                            {this.profile()}
                        </li>

                        {
                            <MenuTree active={true} key={GAS_PARENT} show={this.props.isYearly}
                                      label={this.props.t('Gasses')}>
                                {this.state.gasses && this.state.gasses.length > 0 ? this.categories(this.state.gasses, this.onGasChange) : " "}
                            </MenuTree>
                        }
                        {
                            <MenuTree active={true} key={YEAR_PARENT} show={!this.props.isYearly}
                                      label={this.props.t('Years')}>
                                {this.state.years && this.state.years.length > 0 ? this.categories(this.state.years, this.onYearChange) : " "}
                            </MenuTree>
                        }

                        {
                            <MenuTree active={false} key={CATEGORY_PARENT} show={true}
                                      label={this.props.t('Categories')}>
                                {this.state.categories && this.state.categories.length > 0 ? this.categories(this.state.categories, this.onCategoriesChange) : " "}
                            </MenuTree>
                        }
                    </ul>
                </div>
                <AlertDialog error={this.state.error} message={this.state.message} handleError={() =>{
                    this.setState((prevState) => {
                        const newValue = {
                            error: false,
                            message: ''
                        }
                        return {
                            ...prevState,
                            ...newValue
                        }
                    })
                }}/>
            </nav>
        );
    }

    profile = () => {
        return (
            <div className="row">
                <div className=" col-md-6 element1 col-md-pull-1 pl-2">
                    <label className="nav-label text-light font-weight-bold">{}
                        {this.props.t('Analysis') + ":"}
                    </label><br/>
                    <ToggleSwitch isChecked={this.props.isYearly}
                                  onClick={this.setAnalysis}/>
                </div>
                <div className="element2 col-md-6">
                    <label className="nav-label text-light font-weight-bold">
                        {this.props.isYearly ? this.props.t('Year') + ":" : this.props.t('Gas') + ":"}
                    </label><br/>
                    <Dropdown items={this.props.isYearly ? this.state.years : this.state.gasses}
                              onChange={this.setSelectedItem}
                              isYearly={this.props.isYearly}/>
                </div>
            </div>
        );
    };

    //3 types 'Category', 'Gas', 'Year'
    categories = (data, onChange) => {

        return data.map((item, index) => {
            if (item.name != null) {
                if (isEmpty(item.tree)) {
                    return (<NewMenuItem key={index} id={item.id} label={this.props.t(item.name)} checked={item.checked}
                                         onChange={onChange}/>)
                } else {
                    return (
                        <NewMenuTree key={index}
                                     id={item.id}
                                     label={this.props.t(item.name)}
                                     checked={item.checked}
                                     level={2}
                                     onChange={onChange}>
                            {
                                item.tree.map((treeItem, treeIndex) => {
                                    if (isEmpty(treeItem.tree)) {
                                        return (<NewMenuItem
                                            key={treeIndex}
                                            id={treeItem.id}
                                            label={this.props.t(treeItem.name)}
                                            checked={treeItem.checked}
                                            onChange={onChange}/>)
                                    }
                                    return (
                                        <NewMenuTree key={treeItem.id}
                                                     id={treeItem.id}
                                                     label={this.props.t(treeItem.name)}
                                                     checked={treeItem.checked}
                                                     level={3}
                                                     onChange={onChange}>
                                            {treeItem.tree.map((subItem, subIndex) => {
                                                return (<NewMenuItem key={subIndex}
                                                                     id={subItem.id}
                                                                     label={this.props.t(subItem.name)}
                                                                     checked={subItem.checked}
                                                                     onChange={onChange}/>);
                                            })}
                                        </NewMenuTree>
                                    )
                                })
                            }
                        </NewMenuTree>
                    )
                }
            }
            else {
                return ""
            }
        })

    };

    menu = () => {
        return this.state.menu.map((item, index) => {
            if (isEmpty(item.tree)) {
                return (<MenuItem key={index} path={item.path} icon={item.icon} label={this.props.t(item.label)}/>);
            }
            return (
                <MenuTree key={index} icon={item.icon} label={item.label}>
                    {
                        item.tree.map((treeItem, treeIndex) => {
                            if (isEmpty(treeItem.tree)) {
                                return (<MenuItem key={treeIndex} path={treeItem.path}
                                                  label={this.props.t(treeItem.label)}
                                                  icon={treeItem.icon} tree/>);
                            }
                            return (
                                <MenuTree key={treeIndex} icon={treeItem.icon} label={treeItem.label}>
                                    {treeItem.tree.map((subItem, subIndex) => {
                                        return (<MenuItem key={subIndex}
                                                          path={subItem.path}
                                                          label={this.props.t(subItem.label)}
                                                          icon={subItem.icon}/>);
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

const mapStateToProps = (state) => {
    return {
        analysis: state.analysisReducer.analysis
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAnalysis: () => dispatch(analysisActionCreator.loadAnalysis()),
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Navigation));