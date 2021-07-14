import {Link} from 'react-router-dom'
import './index.css'

const TopRatedBlog = props => {
  // const apiKey = '8a156aa6960f5b664a4cceffee321f77'
  const {topData} = props

  const {id, posterPath} = topData
  console.log(id)

  return (
    <Link to={`/movie/${id}`}>
      <div className="item-container">
        <img className="item-image" src={posterPath} alt={`item${id}`} />
      </div>
    </Link>
  )
}
export default TopRatedBlog
