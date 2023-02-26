import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {clickData: {}, isLoading: true}

  componentDidMount() {
    this.detailData()
  }

  detailData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const Data = await response.json()
    const selectedData = {
      title: Data.title,
      imageUrl: Data.image_url,
      avatarUrl: Data.avatar_url,
      content: Data.content,
      author: Data.author,
    }
    this.setState({clickData: selectedData, isLoading: false})
  }

  render() {
    const {clickData, isLoading} = this.state
    const {title, imageUrl, avatarUrl, content, author} = clickData
    return (
      <div className="details-cont">
        {isLoading ? (
          <Loader type="TailSpin" color="00BFFF" height={50} width={50} />
        ) : (
          <div className="blog-info">
            <h1 className="blog-details-title">{title}</h1>
            <div className="author-details">
              <img className="author-pic" src={avatarUrl} alt={author} />
              <p className="details-author-name">{author}</p>
            </div>
            <img className="blog-image" src={imageUrl} alt={title} />
            <p className="blog-content">{content}</p>
          </div>
        )}
      </div>
    )
  }
}
export default BlogItemDetails
