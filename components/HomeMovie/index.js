import {Component} from 'react'

import Header from '../Header'

import './index.css'

const imgBaseUrl = 'https://image.tmdb.org/t/p/w500'

class HomeMovie extends Component {
  state = {
    movieDetails: [],
    imgUrl: '',
  }

  componentDidMount() {
    this.getMovieData()
  }

  getMovieData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=1dfd35cc2f4f283ed63c9dd1c869ef38&language=en-US`,
    )
    const fetchedData = await response.json()
    const posterPath = imgBaseUrl + fetchedData.backdrop_path
    this.setState({imgUrl: posterPath})

    console.log(fetchedData)
  }

  render() {
    const {imgUrl} = this.state

    return (
      <>
        <div
          className="home-image-container"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        >
          <Header />
          <div className="movie-details-card">
            <h1 className="main-movie-name">SuperMan</h1>

            <p className="main-movie-discription">
              Superman is a fictional superhero who first appeared in American
              comic books published by DC Comics.
            </p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default HomeMovie
