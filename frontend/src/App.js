import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/header/Header'
import HomeScreen from './pages/HomeScreen'
import SinglePost from './pages/SinglePost'
import CategoryScreen from './pages/CategoriesScreen'
import Footer from './components/footer/Footer'
import CategoryPostsScreen from './pages/categoryPostsScreen'
import CoverGirl from './pages/CoverGirl'
import VotingScreen from './pages/VotingScreen'
import LoginScreen from './pages/LoginScreen'
import PrivateRoutes from './routes/PrivateRoute'
import ListPostScreen from './pages/ListPostScreen'
import EditPostScreen from './pages/EditPostScreen'
import CreatePostScreen from './pages/CreatePostScreen'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<div className='main bg-gray-200'>
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
						<Route exact={true} path='/cover-girls' component={CoverGirl} />
						<Route
							exact={true}
							path='/cover-girls/:id'
							component={VotingScreen}
						/>
						<Route exact={true} path='/login' component={LoginScreen} />
						<PrivateRoutes
							exact={true}
							path='/admin/posts'
							component={ListPostScreen}
						/>
						<PrivateRoutes
							exact={true}
							path='/admin/posts/edit/:id'
							component={EditPostScreen}
						/>
						<PrivateRoutes
							exact={true}
							path='/admin/posts/create'
							component={CreatePostScreen}
						/>
					</Switch>
					<Footer />
				</div>
			</BrowserRouter>
		</>
	)
}

export default App
