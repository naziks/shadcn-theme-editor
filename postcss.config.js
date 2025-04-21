import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import prefixWrap from 'postcss-prefixwrap';

const config = {
	plugins: [
		tailwindcss(),
		autoprefixer(),
		prefixWrap('.shadcn-theme-editor', {
			whitelist: ['.shadcn-theme-editor']
		})
	]
}

export default config
