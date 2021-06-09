import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/header/Header'
import HomeScreen from './pages/HomeScreen'
import SinglePost from './pages/SinglePost'
import CategoryScreen from './pages/CategoriesScreen'
import Footer from './components/footer/Footer'
import CategoryPostsScreen from './pages/categoryPostsScreen'



const App = () => {
	return (
		<>
			<BrowserRouter>
				<Header />

				<Switch>
					<Route exact={true} path='/' component={HomeScreen} />
					<Route exact={true} path='/post/:id' component={SinglePost} />
					<Route exact={true} path='/categories' component={CategoryScreen} />
					<Route
						exact={true}
						path='/posts/category/:id'
						component={CategoryPostsScreen}
					/>
				</Switch>
				<Footer />
			</BrowserRouter>
		</>
	)
}

export default App
