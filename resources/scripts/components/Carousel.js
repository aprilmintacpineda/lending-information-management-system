import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Carousel extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    speed: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    this.forward = this.forward.bind(this);
    this.backward = this.backward.bind(this);
    this.moveCarousel = this.moveCarousel.bind(this);

    this.state = {
      currentPage: 1,
      target: 0,
      speed: this.props.speed
    }
  }

  moveCarousel(direction) {
    if(direction == 'forward') {
      this.setState({
        ...this.state,
        target: this.state.target + this.refs.carousel.clientWidth,
        currentPage: this.state.currentPage + 1
      }, this.forward);
    } else if(direction == 'backward') {
      this.setState({
        ...this.state,
        target: this.state.target - this.refs.carousel.clientWidth,
        currentPage: this.state.currentPage - 1
      }, this.backward);
    }
  }

  forward() {
    if(this.state.currentPage > 5) {
      this.setState({
        target: 0,
        currentPage: 1
      }, this.backward);
    } else {
      if(this.refs.carousel.scrollLeft < this.state.target) {
        if(this.state.target - this.refs.carousel.scrollLeft < this.state.speed) {
          this.refs.carousel.scrollLeft += this.state.target - this.refs.carousel.scrollLeft;
        } else {
          this.refs.carousel.scrollLeft += this.state.speed;
          setTimeout(this.forward, 1);
        }
      }
    }
  }

  backward() {
    if(this.state.currentPage < 1) {
      this.setState({
        target: this.refs.carousel.clientWidth * 4,
        currentPage: 5
      }, this.forward);
    } else {
      if(this.refs.carousel.scrollLeft > this.state.target) {
        if(this.refs.carousel.scrollLeft - this.state.target < this.state.speed) {
          this.refs.carousel.scrollLeft -= this.refs.carousel.scrollLeft - this.state.target;
        } else {
          this.refs.carousel.scrollLeft -= this.state.speed;
          setTimeout(this.backward, 1);
        }
      }
    }
  }

  render() {
    let items = this.props.items.map((item, index) => (
      <li key={index}>{item}</li>
    ));

    return (
      <div className="carousel-wrapper">
        <div className="carousel-btn-backward" onClick={() => this.moveCarousel('backward')}>
          <i className="icon fa fa-step-backward" aria-hidden="true"></i>
        </div>

        <div className="carousel-container" ref="carousel">
          <ul className="carousel-items">
            {items}
          </ul>
        </div>

        <div className="carousel-btn-forward" onClick={() => this.moveCarousel('forward')}>
          <i className="icon fa fa-step-forward" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

export default Carousel;