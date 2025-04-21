import type { Difference } from 'microdiff'

export type Setter<T, R extends unknown[] = []> = (value: T, ...rest: R) => void
export type Getter<T> = () => T
export type MaybeGetter<T> = Getter<T> | T

export const get = <T>(value: MaybeGetter<T>): T => {
	if (typeof value === 'function') {
		return (value as Getter<T>)()
	}

	return value
}

type Patch = Difference[]
export const applyPatch = <T extends unknown[] | object>(state: T, patch: Patch): T => {
	const newState = structuredClone(state)
	for (const change of patch) {
		let target: any = newState
		const path = [...change.path]
		const key = path.pop()
		for (const p of path) {
			if (!(p in target)) target[p] = {}
			target = target[p]
		}
		switch (change.type) {
			case 'CREATE':
			case 'CHANGE':
				target[key!] = change.value
				break
			case 'REMOVE':
				delete target[key!]
				break
		}
	}
	return newState
}

// Function to invert a patch
export const invertPatch = (patch: Patch): Patch => {
	return patch.map((change) => {
		switch (change.type) {
			case 'CREATE':
				return { type: 'REMOVE', path: change.path, oldValue: change.value }
			case 'REMOVE':
				return { type: 'CREATE', path: change.path, value: change.oldValue }
			case 'CHANGE':
				return {
					type: 'CHANGE',
					path: change.path,
					value: change.oldValue,
					oldValue: change.value,
				}
		}
	})
}
