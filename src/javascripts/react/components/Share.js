import React, { PropTypes, Component } from 'react'

import {
  FacebookShareButton,
  TwitterShareButton,
  GooglePlusShareButton,
  VkontakteShareButton } from './share/share-buttons'


export default class Share extends Component {

  componentDidMount() {

    this.state = {
      menuOpen: false,
      spacing: 75
    }
    
    let footer = document.getElementsByClassName('footer')[0]
    this.state.shareButtons = footer.getElementsByClassName('share-button')
    this.state.toggleButton = footer.getElementsByClassName('share-toggle-button')[0]

    this.state.buttonsNum = this.state.shareButtons.length
    this.state.buttonsMid = this.state.buttonsNum / 2
  }
  
  openShareMenu() {
    const { shareButtons, toggleButton, buttonsMid, spacing } = this.state

    TweenMax.to(toggleButton,0.1,{
      scaleX:1.2,
      scaleY:0.75,
      ease:Quad.easeOut,
      onComplete: function(){
        TweenMax.to(toggleButton,.8,{
          scale:0.75,
          ease:Elastic.easeOut,
          easeParams:[1.1,0.75]
        })

        TweenMax.to(toggleButton.querySelectorAll('.share-icon'),.8,{
          scale:1,
          ease:Elastic.easeOut,
          easeParams:[1.1,0.75]
        })
      }
    })

    Array.prototype.forEach.call(shareButtons, function(el, i) {
      let pos = i - buttonsMid
      if (pos >= 0) pos += 1
      let dist = Math.abs(pos)

      el.style.zIndex = buttonsMid-dist

      TweenMax.to(el, 1.1*(dist),{
        x:pos*spacing,
        scaleY:0.75,
        scaleX:1.1,
        ease:Elastic.easeOut,
        easeParams:[1.01,0.5]
      });
      TweenMax.to(el, .8,{
        delay:(0.2*(dist))-0.1,
        scale:0.75,
        ease:Elastic.easeOut,
        easeParams:[1.1,0.75]
      })
        
      TweenMax.fromTo(el.querySelectorAll('.share-icon'),0.2,{
        scale:0
      },{
        delay:(0.2*dist)-0.1,
        scale: 0.9,
        ease:Quad.easeInOut
      })
    })
  }

  closeShareMenu() {

    const { toggleButton, shareButtons, buttonsMid } = this.state

    TweenMax.to([toggleButton, toggleButton.querySelectorAll('.share-icon')],1,{
      delay:0.1,
      scale: 1,
      ease:Elastic.easeOut,
      easeParams:[1.1,0.3]
    })

    Array.prototype.forEach.call(shareButtons, function(el, i) {
      let pos = i - buttonsMid
      if (pos >= 0) pos += 1
      let dist = Math.abs(pos)
      el.style.zIndex = dist

      TweenMax.to(el, 0.4+((buttonsMid-dist)*0.1),{
        x:0,
        scale:.95,
        ease:Quad.easeInOut,
      });
        
      TweenMax.to(el.querySelectorAll('.share-icon'),0.2,{
        scale: 0,
        ease:Quad.easeIn
      });
    })
  }

  clickShared() {

    if (this.state.menuOpen) {
      this.state.menuOpen = false
      this.closeShareMenu()
    } else {
      this.state.menuOpen = true
      this.openShareMenu()
    }
  }

  render() {
    const qoute = this.props.mantra ? this.props.mantra.get('qoute') : ''
    const url = 'http://mantra.online'
    const desc = 'Ежедневные мантры, цитаты и просто слова от мотивированных людей'

    return (
      <div className="share">
        <button className="share-toggle-button" onClick={() => this.clickShared()}>
          <i className="share-icon material-icons" >share</i>
        </button>
        <ul className="share-items">
          <li>
            <FacebookShareButton
              url={url}
              title={qoute}
              className="share-button" >
              <i className="share-icon fa fa-facebook" />
            </FacebookShareButton>
          </li>

          <li>
            <TwitterShareButton
              url={url}
              title='Ежедневные мантры, цитаты и просто слова от мотивированных людей'
              hashtags={ ['mantra'] } 
              className="share-button" >
              <i className="share-icon fa fa-twitter" />
            </TwitterShareButton>
          </li>
          <li>
            <VkontakteShareButton 
              url={url}
              title={ qoute }
              description={desc}
              className="share-button" >
              <i className="share-icon fa fa-vk" />
            </VkontakteShareButton>
          </li>
          <li>
            <GooglePlusShareButton 
              url={url}
              className="share-button" >
              <i className="share-icon fa fa-google-plus" />
            </GooglePlusShareButton>
          </li>  
        </ul>
      </div>
    )
  }
}  