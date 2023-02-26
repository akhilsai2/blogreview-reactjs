import {Component} from 'react'

import Loader from 'react-loader-spinner'
import BlogItem from '../BlogItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogList extends Component {
  state = {listOfData: [], isLoading: true}

  componentDidMount() {
    this.blogData()
  }

  blogData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const formatData = data.map(each => ({
      id: each.id,
      title: each.title,
      imageUrl: each.image_url,
      avatarUrl: each.avatar_url,
      author: each.author,
      topic: each.topic,
    }))
    this.setState({listOfData: formatData, isLoading: false})
  }

  render() {
    const {isLoading, listOfData} = this.state
    return (
      <div className="blog-cont">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          listOfData.map(each => <BlogItem item={each} key={each.id} />)
        )}
      </div>
    )
  }
}
export default BlogList
