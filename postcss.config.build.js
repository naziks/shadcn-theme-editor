import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import prefixWrap from 'postcss-prefixwrap';

const config = {
	plugins: [
		tailwindcss(),
		autoprefixer(),
		prefixWrap('.shadcn-theme-editor-root', {
			blacklist: ['.shadcn-theme-editor-root']
		})
	]
}

export default config
