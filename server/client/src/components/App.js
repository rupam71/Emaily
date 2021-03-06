import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './Header';
import {connect} from 'react-redux'
import * as actions from '../actions'
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';


// const Header = () => <h2>Header</h2>
// const Dashboard = () => <h2>Dashboard</h2>
// const SurveyNew = () => <h2>SurveyNew</h2>
// const Landing = () => <h2>Landing</h2>

class App extends Component {
    state = {  }
    componentDidMount() {
        this.props.fetchUser();
    }
    render() { 
        return ( 
            <div className='container'>
                <BrowserRouter>
                    <div className='container'>
                        <Header />
                        <Route path='/' exact component={Landing} />
                        <Route path='/surveys' exact component={Dashboard} />
                        <Route path='/surveys/new' exact component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
         );
    }
}
 
export default connect(null, actions)(App);