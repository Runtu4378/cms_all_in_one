import progress from 'nprogress'
import 'nprogress/nprogress.css'
import pify from 'pify'

class Transformers {
  /**
   * 编译器类，默认状态不挂载任何编译器，只在需要时进行挂载
   */
  constructor () {
    this.map = {}
  }

  init = async (type) => {
    if (type === 'less') {
      await loadLess()
    }  else if (type === 'artm') {
      await loadArtm()
    } else {
      throw new Error('incorrect type of compiler')
    }
    return this.get(type)
  }

  set (k, v) {
    this.map[k] = v
  }

  test (k) {
    return this.map[k]
  }

  get = async (k) => {
    // console.log('[Transformers]')
    // console.log(this)
    let compiler = this.map[k]
    if (compiler) {
      return compiler
    }
    compiler = await this.init(k)
    return compiler
  }
}

const transformers = new Transformers()

// 挂载 less 编译器
async function loadLess () {
  if (!transformers.test('less')) {
    progress.start()
    const less = await import('less')
    transformers.set('less', pify(less))
    progress.done()
  }
}

// 挂载 art-template 编译器
async function loadArtm () {
  if (!transformers.test('artm')) {
    progress.start()
    const artm = await import('art-template/lib/template-web.js')
    transformers.set('artm', artm)
    progress.done()
  }
}

export default transformers
