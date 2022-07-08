import {StyleSheet, Text, View, ImageBackground, Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import * as Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import BlogItem from '../BlogItem'
import TopRatedBlog from '../TopRatedBlog'
import OriginalsBlog from '../Originals'
import './index.css'

const imageUrl =
  'https://image.tmdb.org/t/p/w500/bOFaAXmWWXC3Rbv4u4uM9ZSzRXP.jpg'
const originalsUrl =
  'https://api.themoviedb.org/3/discover/tv?api_key=1dfd35cc2f4f283ed63c9dd1c869ef38'
const topRatedUrl =
  'https://api.themoviedb.org/3/movie/top_rated?api_key=1dfd35cc2f4f283ed63c9dd1c869ef38'
const trendingUrl =
  'https://api.themoviedb.org/3/trending/all/week?api_key=1dfd35cc2f4f283ed63c9dd1c869ef38'
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500'

class Home extends Component {
  state = {trendingData: [], topData: [], movieData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
    this.getTopRatedData()
    this.getMovieData()
  }

  getMovieData = async () => {
    const response = await fetch(originalsUrl)
    const data = await response.json()

    const updatedData = data.results.map(eachItem => ({
      id: eachItem.id,
      posterPath: imgBaseUrl + eachItem.poster_path,
    }))

    this.setState({movieData: updatedData, isLoading: false})
  }

  getBlogsData = async () => {
    const response = await fetch(trendingUrl)
    const data = await response.json()

    const updatedData = data.results.map(eachItem => ({
      id: eachItem.id,
      posterPath: imgBaseUrl + eachItem.poster_path,
    }))

    this.setState({trendingData: updatedData, isLoading: false})
  }

  getTopRatedData = async () => {
    const response = await fetch(topRatedUrl)
    const data = await response.json()

    const formateData = data.results.map(eachItem => ({
      id: eachItem.id,
      posterPath: imgBaseUrl + eachItem.poster_path,
    }))

    this.setState({topData: formateData, isLoading: false})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {trendingData, topData, isLoading, movieData} = this.state

    return (
      <div className="blog-list-container">
        <div>
          <div className="home-image-container">
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
        </div>

        <div>
          <h1 className="head">Trending Now</h1>
        </div>
        <div className="img-list-cont">
          {isLoading ? (
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          ) : (
            trendingData.map(item => (
              <BlogItem trendingData={item} key={item.id} />
            ))
          )}
        </div>
        <div>
          <h1 className="head">Top Rated</h1>
        </div>
        <div className="img-list-cont">
          {isLoading ? (
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          ) : (
            topData.map(item => <TopRatedBlog topData={item} key={item.id} />)
          )}
        </div>
        <div>
          <h1 className="head">Netflix Originals</h1>
        </div>
        <div className="img-list-cont">
          {isLoading ? (
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          ) : (
            trendingData.map(item => (
              <OriginalsBlog topData={item} key={item.id} />
            ))
          )}
        </div>
      </div>
    )
  }
}

export default Home
