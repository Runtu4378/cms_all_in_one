import { resolve } from 'path';

export default {
  alias: {
    components: resolve(__dirname,'./src/components'),
    styles: resolve(__dirname, './src/styles'),
    utils: resolve(__dirname,'./src/utils'),
    services: resolve(__dirname, './src/services'),
  },
}
