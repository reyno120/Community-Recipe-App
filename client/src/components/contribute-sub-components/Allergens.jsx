import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

class Allergens extends Component {
    state = { 
        saltFree: true,
        saltFreeSelected: false,
        oilFree: true,
        oilFreeSelected: false,
        sugarFree: true,
        sugarFreeSelected: false,
        glutenFree: true,
        glutenFreeSelected: false,
        nutFree: true,
        nutFreeSelected: false,
        soyFree: true,
        soyFreeSelected: false,
        peanutFree: true,
        peanutFreeSelected: false
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.checked});
        this.props.handleAllergens(e.target.name, e.target.checked);
    }


    checkSalt = () => {
        if(this.props.ingredients.includes('salt')) {
            if(!this.state.saltFreeSelected) {
                this.setState({saltFreeSelected: true});
                this.setState({saltFree: false});
                this.props.handleAllergens("saltFree", false);
                return this.state.saltFree;
            }
            else {
                return this.state.saltFree;
            }
        }
        else {
            return this.state.saltFree;
        }
    }

    checkOil = () => {
        var { ingredients } = this.props;
        var oils = ["olive oil", "coconut oil"];

        for(var i = 0; i < ingredients.length; i++) {
            if(oils.includes(ingredients[i])) {
                if(!this.state.oilFreeSelected) {
                    this.setState({oilFreeSelected: true});
                    this.setState({oilFree: false});
                    this.props.handleAllergens("oilFree", false);
                    return this.state.oilFree;
                }
                else {
                    return this.state.oilFree;
                }
            }
            else {
                return this.state.oilFree;
            }
        }

        return this.state.oilFree;
    }

    checkSugar = () => {
        var { ingredients } = this.props;
        var sugar = ["brown sugar", "cane sugar"];

        for(var i = 0; i < ingredients.length; i++) {
            if(sugar.includes(ingredients[i])) {
                if(!this.state.sugarFreeSelected) {
                    this.setState({sugarFreeSelected: true});
                    this.setState({sugarFree: false});
                    this.props.handleAllergens("sugarFree", false);
                    return this.state.sugarFree;
                }
                else {
                    return this.state.sugarFree;
                }
            }
            else {
                return this.state.sugarFree;
            }
        }

        return this.state.sugarFree;
    }

    checkGluten = () => {
        var { ingredients } = this.props;
        var gluten = ["pasta", "pasta (whole-grain)", "spaghetti", "spaghetti (whole-grain)",
                      "linguine", "linguine (whole-grain)", "fusilli", "fusilli (whole-grain)",
                      "lasagna", "lasagna (whole-grain)", "elbow macaroni", "elbow macaroni (whole-grain)",
                      "tortillas", "tortillas (whole-grain)", "whole wheat pastry flour",
                      "bread crumbs", "whole-grain bread crumbs", "pita bread", "whole-wheat pita bread",
                      "unbleached all-purpose flour"];

        for(var i = 0; i < ingredients.length; i++) {
            if(gluten.includes(ingredients[i])) {
                if(!this.state.glutenFreeSelected) {
                    this.setState({glutenFreeSelected: true});
                    this.setState({glutenFree: false});
                    this.props.handleAllergens("glutenFree", false);
                    return this.state.glutenFree;
                }
                else {
                    return this.state.glutenFree;
                }
            }
            else {
                return this.state.glutenFree;
            }
        }

        return this.state.glutenFree;
    }

    checkNut = () => {
        var { ingredients } = this.props;
        var nuts = ["almond butter", "cashew butter", "almonds", "cashews", "walnuts", "pecans",
                    "almond milk", "almond milk (unsweetended)", "almond milk (chocolate)", 
                    "almond milk (vanilla)", "coconut milk", "coconut milk (unsweetened)",
                    "cashew milk", "cashew milk (unsweetened)", "almond flour"];

        for(var i = 0; i < ingredients.length; i++) {
            if(nuts.includes(ingredients[i])) {
                if(!this.state.nutFreeSelected) {
                    this.setState({nutFreeSelected: true});
                    this.setState({nutFree: false});
                    this.props.handleAllergens("nutFree", false);
                    return this.state.nutFree;
                }
                else {
                    return this.state.nutFree;
                }
            }
            else {
                return this.state.nutFree;
            }
        }

        return this.state.nutFree;
    }

    checkSoy = () => {
        var { ingredients } = this.props;
        var soy = ["tempeh", "tofu", "tofu (silken)", "tofu (firm)", "tofu (regular)", "tofu (extra-firm)",
                   "tofu (super-firm)", "edamame", "soy milk", "soy milk (unsweetened)", "soy milk (chocolate)",
                   "soy milk (vanilla)"];

        for(var i = 0; i < ingredients.length; i++) {
            if(soy.includes(ingredients[i])) {
                if(!this.state.soyFreeSelected) {
                    this.setState({soyFreeSelected: true});
                    this.setState({soyFree: false});
                    this.props.handleAllergens("soyFree", false);
                    return this.state.soyFree
                }
                else {
                    return this.state.soyFree;
                }
            }
            else {
                return this.state.soyFree;
            }
        }

        return this.state.soyFree;
    }

    checkPeanut = () => {
        var { ingredients } = this.props;
        var peanuts = ["peanuts", "peanut butter"];

        for(var i = 0; i < ingredients.length; i++) {
            if(peanuts.includes(ingredients[i])) {
                if(!this.state.peanutFreeSelected) {
                    this.setState({peanutFreeSelected: true});
                    this.setState({peanutFree: false});
                    this.props.handleAllergens("peanutFree", false);
                    return this.state.peanutFree;
                }
                else {
                    return this.state.peanutFree;
                }
            }
            else {
                return this.state.peanutFree;
            }
        }
        
        return this.state.peanutFree;
    }

    render() { 
        return ( 
            <Grid container>
                <Grid item xs={12} align="center">
                    <h2>Allergens</h2>
                </Grid>
                <Grid item xs={4} align="center">
                    <p><Checkbox name="saltFree" checked={this.checkSalt()} onChange={this.onChange}/>no added salt</p>
                    <p><Checkbox name="oilFree" checked={this.checkOil()} onChange={this.onChange}/>oil free</p>
                    <p><Checkbox name="sugarFree" checked={this.checkSugar()} onChange={this.onChange}/>no added sugar</p>
                </Grid>
                <Grid item xs={4} align="center">
                    <p><Checkbox name="glutenFree" checked={this.checkGluten()} onChange={this.onChange}/>gluten free</p>
                    <p><Checkbox name="nutFree" checked={this.checkNut()} onChange={this.onChange}/>nut free</p>
                </Grid>
                <Grid item xs={4} align="center">
                    <p><Checkbox name="soyFree" checked={this.checkSoy()} onChange={this.onChange}/>soy free</p>
                    <p><Checkbox name="peanutFree" checked={this.checkPeanut()} onChange={this.onChange}/>peanut free</p>
                </Grid>
            </Grid>  
        );
    }
}
 
export default Allergens;