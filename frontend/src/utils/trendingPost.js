import trendingPostData from '../components/body/trendingPostData.json'

const trendingPostAndCat = ({ post }) => {
	const sortedPosts = post.sort((a, b) => b.views - a.views)

	const trendingPosts = sortedPosts.slice(0, 4)

	let trendingPostCat = []

	trendingPosts.map(item => trendingPostCat.push(item.category))

	console.log(trendingPostCat)

	return trendingPostCat
}
// export default trendingPostAndCat
