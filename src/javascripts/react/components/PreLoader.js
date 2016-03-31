import React, { PropTypes, Component } from 'react'

export default class LoaderEl extends Component {

  

  componentDidMount() {

    const container = document.getElementById('loader')
    const drop = document.getElementById('drop')
    const drop2 = document.getElementById('drop2')
    const outline = document.getElementById('outline')

    // TweenMax.set(['svg'], {
    //   position: 'absolute',
    //   top: '50%',
    //   left: '50%',
    //   xPercent: -50,
    //   yPercent: -50
    // })

    TweenMax.set([container], {
      position: 'absolute',
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50
    })

    TweenMax.set(drop, {
      transformOrigin: '50% 50%'
    })

    var tl = new TimelineMax({
      repeat: -1,
      paused: false,
      repeatDelay: 0,
      immediateRender: false
    });

    tl.timeScale(3);

    tl.to(drop, 4, {
      attr: {
        cx: 250,
        rx: '+=10',
        ry: '+=10'
      },
      ease: Back.easeInOut.config(3)
    })
    .to(drop2, 4, {
      attr: {
        cx: 250
      },
      ease: Power1.easeInOut
    }, '-=4')
    .to(drop, 4, {
      attr: {
        cx: 125,
        rx: '-=10',
        ry: '-=10'
      },
      ease: Back.easeInOut.config(3)
    })
    .to(drop2, 4, {
      attr: {
        cx: 125,
        rx: '-=10',
        ry: '-=10'
      },
      ease: Power1.easeInOut
    }, '-=4')
  }

  componentWillUnmount() {
    const svgPreloader = document.getElementById('svg-preloader')

    TweenMax.set([svgPreloader], {
      display: 'none'
    })
  }



  render() {
    return (
      <div id='loader' />
    )
  }
}
