export const capitalize = (str: string) => {
	const firstLetter = str.at(0)
	if (!firstLetter) return ''

	return firstLetter.toUpperCase() + str.slice(1)
}

export const normalizeName = (variable: string) => {
	return variable
		.replace(/--/g, '')
		.replace(/-/g, ' ')
		.split(' ')
		.map((word) => capitalize(word))
		.join(' ')
}

export const numberRegexp = /^(?<value>(?:\d+)?(?:\.\d+)?)(?<unit>[a-z]+)$/

export const customSerialization = {
	serialize: JSON.stringify,
	deserialize: (value: string) => {
		try {
			return JSON.parse(value)
		} catch (e) {

		}
	},
}