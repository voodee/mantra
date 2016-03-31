import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'


let addClass = (o, c) => {
  let re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")

  if (re.test(o.className)) return
  o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
}

export default class Qoute extends Component {

  checkHeight() {
    let blockquote = document.querySelectorAll('.blockquote')[0]
    let root = document.querySelectorAll('#root')[0]
    let screenHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight

    blockquote.className = blockquote.className.replace(/\bblockquote--small\b/,'')
    blockquote.className = blockquote.className.replace(/\bblockquote--very-small\b/,'')

    if (blockquote.clientHeight > (screenHeight / 2) ) {
      addClass(blockquote, 'blockquote--small')
    }

    if (blockquote.clientHeight > (screenHeight / 2) ) {
      addClass(blockquote, 'blockquote--very-small')
    }
  }

  componentDidMount() {
    this.checkHeight()
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkHeight()
  }


  render() {
    const { mantra, author, creator, storage } = this.props

    return (
      <main className="main mdl-layout__content" style={ { backgroundColor: mantra.get('color') } }>
        <div className="mdl-grid main-grid">
          <div className="mdl-cell mdl-cell--4-col mdl-cell--hide-tablet mdl-cell--hide-phone">
            {storage.get('showCreatorInfo') &&
              <ul className='author-info'>
                { creator.company &&
                  <li>
                    <h3>Компания</h3>
                    <p>{ creator.company }</p>
                  </li>
                }
                { creator.industry &&
                  <li>
                    <h3>Сфера деятельности </h3>
                    <p>{ creator.industry }</p>
                  </li>
                }
                {mantra.get('explanation') &&
                  <li>
                    <h3>Кратко о мантре</h3>
                    <p>{ mantra.get('explanation') }</p>
                  </li>
                }
                { creator.site &&
                  <li>
                    <h3>Сайт</h3>
                    <p>
                      { React.createElement('a', { href: creator.site, target: '_blank' }, creator.site ) }
                    </p>
                  </li>
                }
              </ul>
            }
          </div>

          <div className="mdl-cell mdl-cell--7-col mdl-color-text--grey-800">

            <blockquote className="blockquote mdl-color-text--grey-50">
              { mantra.get('qoute') }
              <footer className="mdl-typography--font-light">{ author.name }</footer>
            </blockquote>
            
          </div>
        </div>
      </main>
    )
  }
}

Qoute.propTypes = {
  mantra: React.PropTypes.instanceOf(Immutable.Map),
  author: PropTypes.object.isRequired,
  creator: PropTypes.object.isRequired,
  storage: React.PropTypes.instanceOf(Immutable.Map)
}