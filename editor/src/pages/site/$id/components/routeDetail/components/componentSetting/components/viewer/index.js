import * as React from 'react'
import les from './index.less'

const createIframe  = (opts) => {
  const iframe = document.createElement('iframe')
  iframe.setAttribute('sandbox', opts.join(' '))
  iframe.setAttribute('scrolling', 'yes')
  iframe.style.width = '100%'
  iframe.style.height = '100%'
  iframe.style.border = '0'
  return iframe
}

class Viewer extends React.Component {
  constructor (props) {
    super(props)
    this.iframeDOM = React.createRef()
  }

  componentDidMount () {
    const opts = [
      'allow-modals',
      'allow-forms',
      'allow-pointer-lock',
      'allow-popups',
      'allow-same-origin',
      'allow-scripts',
    ]
    this.iframe = createIframe(opts)
    this.iframeDOM.current.parentNode.replaceChild(this.iframe, this.iframeDOM.current)
    if (this.props.htmlStr) {
      this.iframeSet(this.props)
    }
  }

  // props 更新时更新iframe内容
  shouldComponentUpdate (nextProps) {
    this.iframeSet(nextProps)
    return true
  }

  iframeSet (props) {
    const { htmlStr } = props
    this.iframe.contentWindow.document.open()
    this.iframe.contentWindow.document.write(htmlStr)
    this.iframe.contentWindow.document.close()
  }

  render () {
    return (
      <div className={les.container}>
        <div ref={this.iframeDOM} />
      </div>
    )
  }
}

export default Viewer
