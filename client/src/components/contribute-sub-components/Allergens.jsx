import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

class Allergens extends Component {
    state = { }

    checkSalt = () => {
        if(this.props.ingredients.includes('salt')) {
            return false;
        }
        else {
            return true;
        }
    }

    checkOil = () => {

    }

    checkSugar = () => {
        if(this.props.ingredients.includes('brown sugar')) {
            return false;
        }
        else {
            return true;
        }
    }

    checkGluten = () => {
        var { ingredients } = this.props;
        var gluten = ["pasta", "pasta (whole-grain)", "spaghetti", "spaghetti (whole-grain)",
                      "linguine", "linguine (whole-grain)", "fusilli", "fusilli (whole-grain)",
                      "lasagna", "lasagna (whole-grain)", "elbow macaroni", "elbow macaroni (whole-grain)",
                      "tortillas", "tortillas (whole-grain)"];

        for(var i = 0; i < ingredients.length; i++) {
            if(gluten.includes(ingredients[i])) {
                return false;
            }
        }

        return true;
    }

    checkNut = () => {
        var { ingredients } = this.props;
        var nuts = ["almond butter", "cashew butter", "almonds", "cashews", "walnuts", "pecans",
                    "almond milk", "almond milk (unsweetended)", "almond milk (chocolate)", 
                    "almond milk (vanilla)", "coconut milk", "coconut milk (unsweetened)",
                    "cashew milk", "cashew milk (unsweetened)"];

        for(var i = 0; i < ingredients.length; i++) {
            if(nuts.includes(ingredients[i])) {
                return false;
            }
        }

        return true;
    }

    checkSoy = () => {
        var { ingredients } = this.props;
        var soy = ["tempeh", "tofu", "tofu (silken", "tofu (firm)", "tofu (regular)", "tofu (extra-firm)",
                   "tofu (super-firm)", "edamame", "soy milk", "soy milk (unsweetened)", "soy milk (chocolate)",
                   "soy milk (vanilla)"];

        for(var i = 0; i < ingredients.length; i++) {
            if(soy.includes(ingredients[i])) {
                return false;
            }
        }

        return true;
    }

    checkPeanut = () => {
        var { ingredients } = this.props;
        var peanuts = ["peanuts", "peanut butter"];

        for(var i = 0; i < ingredients.length; i++) {
            if(peanuts.includes(ingredients[i])) {
                return false;
            }
        }
        
        return true;
    }

    render() { 
        return ( 
            <Grid container>
                <Grid item xs={12} align="center">
                    <h2>Allergens</h2>
                </Grid>
                <Grid item xs={4} align="center">
                    <p><Checkbox checked={this.checkSalt()}/>no added salt</p>
                    <p><Checkbox checked={this.checkOil()}/>oil free</p>
                    <p><Checkbox checked={this.checkSugar()}/>no added sugar</p>
                </Grid>
                <Grid item xs={4} align="center">
                    <p><Checkbox checked={this.checkGluten()}/>gluten free</p>
                    <p><Checkbox checked={this.checkNut()}/>nut free</p>
                </Grid>
                <Grid item xs={4} align="center">
                    <p><Checkbox checked={this.checkSoy()}/>soy free</p>
                    <p><Checkbox checked={this.checkPeanut()}/>peanut free</p>
                </Grid>
            </Grid>  
        );
    }
}
 
export default Allergens;