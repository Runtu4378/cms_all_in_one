import transformers from './transformer'
import injection from './injection'

const defaultPresets = [
  [
    'es2015',
    {
      modules: false,
    },
  ],
  'es2016',
  'es2017',
  'stage-0',
]

export async function js ({ code, transformer, props }) {
  if (transformer === 'js') {
    return injection('js', code, props)
  } else if (transformer === 'vue') {
    await transformers.init('VuePreset')
    return window.Babel.transform(code, {
      presets: [...defaultPresets, 'flow', await transformers.get('VuePreset')],
    }).code.replace(
      /import [^\s]+ from ['"]babel-helper-vue-jsx-merge-props['"];?/,
      await transformers.get('VueJSXMergeProps'),
    )
  }
  throw new Error(`Unknow js transformer: ${transformer}`)
}

export async function html ({ code, transformer, props }) {
  if (transformer === 'html') {
    return code
  } else if (transformer === 'artm') {
    if (code && code !== '') {
      const compiler = await transformers.get('artm')
      return compiler.render(code, props)
    }
    return code
  }
  throw new Error(`Unknow html transformer: ${transformer}`)
}

export async function css ({ code, transformer, props }) {
  if (transformer === 'css') {
    return code
  } else if (transformer === 'less') {
    const preCode = injection('less', code, props)
    // console.log(preCode)
    const compiler = await transformers.get('less')
    return compiler.render(preCode).then(res => res.css)
  }
  throw new Error(`Unknow css transformer: ${transformer}`)
}
