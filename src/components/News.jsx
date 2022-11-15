import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 4,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`

  }

  async updateNews() {
    // this.props.setProgress(10)
    
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWSAPI}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(40)
    let data = await fetch(url)
    this.props.setProgress(80)
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,

    })
    this.props.setProgress(100)
    console.log("uPDATE "+this.state.page)
  }
  async componentDidMount() {
    this.updateNews()
  }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWSAPI}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1})
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    })
    console.log(parsedData)
    console.log(" fetch " + this.state.page)
    this.updateNews()
  }
  render() {
    return (
      <>
        <h1 className='text-center' style={{ margin: "35px 0px" }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length <= this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) + "..." : ""} description={element.description ? element.description.slice(0, 108) + "..." : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeDLUgPm6eqlc3xZzykaaMRKvUUlMVaaiUlA&usqp=CAU"} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} /></div>
              })}
            </div>

          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
