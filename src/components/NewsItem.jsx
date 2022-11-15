import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date,source } = this.props;
        return (
            <div>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}
                            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:"1",left: "85%"}}>{source}</span></h5>
                        <p className="card-text">{description}</p>
                        <p class="card-text"><small class="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        ) 
    }
}

export default NewsItem
