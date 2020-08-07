import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import IngredientList from '../data/ingredients';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';
import SingleCard from './SingleCard';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Slider from '@material-ui/core/Slider';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(254, 98, 57)'
        }
    }
});

class Discover extends Component {
    state = {  
        saltFree: true,
        oilFree: true,
        sugarFree: true,
        glutenFree: false,
        nutFree: false,
        peanutFree: false,
        soyFree: false,
        allergens: ['saltFree', 'oilFree', 'sugarFree'],
        ingredients: [],
        difficulty: '',
        time: 0,
        recipes: [],
        search: '',
        expanded: false
    };


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.checked});
        var allergens = this.state.allergens
        if(e.target.checked) {
            allergens.push(e.target.name);
        }
        else {
            var index = allergens.indexOf(e.target.name);
            allergens.splice(index, 1);
        }

        this.handleSubmit()
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleIngredients = (e) => {
        var ingredients = [];
        if(e) {
            for(var i = 0; i < e.length; i++) {
                ingredients.push(e[i].value);
            }
        }
        this.setState({ingredients: ingredients});

        this.handleSubmit();
    }

    handleSubmit = () => {
        const { ingredients, time, difficulty, allergens } = this.state;

        axios.post('/discover', {ingredients, difficulty, time, allergens})
        .then((res) => {
            this.setState({recipes: res.data.recipes});
        });
    }

    checkKey = (e) => {
        if(e.keyCode === 13) {
            this.handleSearch();
        }
    }

    handleSearch = () => {
        axios.get('/search', {
            params: {
                search: this.state.search
            }
        })
        .then((res) => {
            this.setState({recipes: res.data.recipes});
        });
    }

    valuetext = (value) => {
        return`${value}`;
    }

    render() { 

        const styles = {
            expand: {
                transform: 'rotate(0deg)'
            },
            expandOpen: {
                transform: 'rotate(180deg)'
            },
            checkbox: {
                marginTop: '-2em'
            }
        }

        return (  
            <div>
                <Paper
                    elevation={3}
                    style={{
                        backgroundColor: 'rgb(228, 221, 211)',
                        width: '1366px',
                        margin: 'auto'
                    }}>
                    <h2 style={{textAlign: 'center', paddingTop: '.5em', marginBottom: '2em'}}>Discover New Recipes!</h2>
                    <Grid container>

                        <Grid align="center" item xs={12}>
                            <ThemeProvider theme={theme}>
                                <TextField 
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton size="small" onClick={this.handleSearch}>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    onKeyDown={this.checkKey}
                                    onChange={this.onChange}
                                    name="search"
                                    style={{width: '38em'}}
                                    color="primary"
                                ></TextField>
                            </ThemeProvider>
                        </Grid>


                        {/*********** Allergens ***********/}
                        <Grid item xs={3} align='left' style={{
                                                                marginLeft: '1em',
                                                                marginTop: '1em',
                                                                paddingLeft: '1em',
                                                                }}>     
                            <div style={{ border: 'solid 2px rgb(254, 98, 57)', borderRadius: '10px'}}> 
                            <div style={{height: '.5em'}}></div>                                
                            <h2 style={{display: 'inline', marginLeft: '.5em'}}>Allergens:</h2>
                            <IconButton style={{marginLeft: '1em'}} size="small" onClick={() => this.setState({expanded: !this.state.expanded})}>
                                <ExpandMoreIcon style={this.state.expanded ? styles.expandOpen : styles.expand} />
                            </IconButton> 
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <div style={{textAlign: 'left', marginLeft: '3em'}}>
                                    <p><Checkbox name="saltFree" onChange={this.handleChange} checked={this.state.saltFree}/>no added salt</p>
                                    <p style={styles.checkbox}><Checkbox name="oilFree" onChange={this.handleChange} checked={this.state.oilFree}/>oil-free</p>
                                    <p style={styles.checkbox}><Checkbox name="sugarFree" onChange={this.handleChange} checked={this.state.sugarFree}/>no added sugar</p>
                                    <p style={styles.checkbox}><Checkbox name="glutenFree" onChange={this.handleChange} />gluten free</p>
                                    <p style={styles.checkbox}><Checkbox name="nutFree" onChange={this.handleChange} />nut free</p>
                                    <p style={styles.checkbox}><Checkbox name="peanutFree" onChange={this.handleChange} />peanut free</p>
                                    <p style={styles.checkbox}><Checkbox name="soyFree" onChange={this.handleChange} />soy free</p>
                                </div>
                            </Collapse>


                        {/*********** Time ***********/}
                            <h2 style={{marginLeft: '.5em'}}>Time:</h2>
                            <ThemeProvider theme={theme}>
                                {/* <p style={{display: 'inline'}}>Less than</p>
                                <TextField name="time" inputProps={{min: 0}} style={{width: '4em'}} onChange={this.onChange} type="number"></TextField>
                                <p style={{display: 'inline'}}>minutes</p> */}
                                <div style={{textAlign: 'center'}}>
                                    <Slider
                                        style={{width: '18em', marginTop: '-1.5em'}}
                                        defaultValue={0}
                                        step={5}
                                        marks
                                        min={0}
                                        max={120}
                                        getAriaValueText={this.valuetext}
                                        valueLabelDisplay="auto"
                                        color="primary"
                                        onChange={this.onChange}
                                    />
                                </div>
                            </ThemeProvider>


                        {/*********** Difficulty ***********/}
                            <h2 style={{marginLeft: '.5em'}}>Difficulty:</h2>
                            <div style={{display: 'block'}}>
                                <p style={{display: 'inline', marginLeft: '1.9em'}}>Easy</p>
                                <Radio
                                    checked={this.state.difficulty === 'Easy'}
                                    value={"Easy"}
                                    onChange={this.onChange}
                                    name="difficulty"
                                />
                            </div>

                            <div style={{display: 'block'}}>
                                <p style={{display: 'inline', marginLeft: '.5em'}}>Medium</p>
                                <Radio
                                    checked={this.state.difficulty === 'Medium'}
                                    value={"Medium"}
                                    onChange={this.onChange}
                                    name="difficulty"
                                />
                            </div>

                            <div style={{display: 'block'}}>
                                <p style={{display: 'inline', marginLeft: '1.9em'}}>Hard</p>
                                <Radio
                                    checked={this.state.difficulty === 'Hard'}
                                    value={"Hard"}
                                    onChange={this.onChange}
                                    name="difficulty"
                                />
                            </div>

                            {/*********** Ingredients ***********/}
                            <h2 style={{marginLeft: '.5em'}}>Ingredients:</h2>
                            <div style={{width: '18em', margin: 'auto'}}>
                                <Select 
                                    isMulti
                                    onChange={this.handleIngredients}
                                    options={IngredientList}
                                    isSearchable={true}
                                />
                                </div>
                            <div style={{height: '.5em'}}></div>
                        </div>
                        </Grid> 


                        {/*********** Results ***********/}
                        <Grid item xs={8}>
                        <h2 style={{marginLeft: '1em'}}>Displaying {this.state.recipes.length} results</h2>
                        <Grid spacing={3} style={{margin: 'auto'}} container>
                        {this.state.recipes.map((details, index) => (
                            <Grid key={index} item xs={4}>
                                <SingleCard
                                    name={details.name}
                                    description={details.description}
                                    author={details.author}
                                    source={details.source}
                                    directions={details.directions}
                                    ingredients={details.ingredients}
                                    date={details.date}
                                    image={details.image}
                                    recipeID={details.recipeID}
                                    likedBy={details.likedBy}
                                    likes={details.likes}
                                    authorImage={details.authorImage}
                                ></SingleCard>
                            </Grid>
                        ))}
                    </Grid>
                        </Grid>
                    </Grid>
                    {/* <Button variant="outlined" style={{margin: '2em auto 2em auto'}} onClick={this.handleSubmit}>Submit</Button>  */}
                    <div style={{height: '2em'}}></div>
                </Paper>
            </div>
        );
    }
}
 
export default Discover;