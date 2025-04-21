/* eslint-disable no-undef */
import { Debounced, watch } from 'runed'
import diff, { type Difference } from 'microdiff'
import { applyPatch, get, invertPatch, type MaybeGetter, type Setter } from '$lib/utils/state-history/utils.js'

type LogEvent = {
	difference: Difference[]
	timestamp: number
}

type StateHistoryOptions = {
	capacity?: MaybeGetter<number>
}

/**
 * Tracks the change history of a value, providing undo and redo capabilities.
 *
 * @see {@link https://runed.dev/docs/utilities/state-history}
 */
export class StateHistoryDiff<T extends Record<string, unknown> | unknown[]> {
	#redoStack: LogEvent[] = $state([])
	#ignoreUpdate: boolean = false
	#set: Setter<T>
	log: LogEvent[] = $state([])
	snapshot: T = $state(null as unknown as T)
	readonly canUndo = $derived(this.log.length > 1)
	readonly canRedo = $derived(this.#redoStack.length > 0)

	constructor(value: MaybeGetter<T>, set: Setter<T>, options?: StateHistoryOptions) {
		this.#redoStack = []
		this.#set = set
		this.undo = this.undo.bind(this)
		this.redo = this.redo.bind(this)
		this.snapshot = get(value)

		const addEvent = (event: LogEvent): void => {
			this.log.push(event)
			const capacity$ = options?.capacity ? get(options?.capacity) : undefined
			if (capacity$ && this.log.length > capacity$) {
				this.log = this.log.slice(-capacity$)
			}
		}

		const debouncedValue = new Debounced(() => get(value), 300)

		watch(
			() => debouncedValue.current,
			(v) => {
				if (this.#ignoreUpdate) {
					this.#ignoreUpdate = false
					return
				}

				const difference = diff($state.snapshot(this.snapshot)!, v)
				if (!difference.length) return

				this.snapshot = v
				addEvent({ difference, timestamp: new Date().getTime() })

				console.log('Added Event', difference)
				this.#redoStack = []
			},
		)

		watch(
			() => get(options?.capacity ?? 0),
			(c) => {
				if (!c) return
				this.log = this.log.slice(-c)
			},
		)
	}

	undo(): void {
		const curr = this.log.at(-1)
		if (!curr) return
		this.#ignoreUpdate = true
		this.#redoStack.push(curr)
		this.log.pop()

		const newSnapshot = applyPatch(
			$state.snapshot(this.snapshot) as T,
			invertPatch(curr.difference),
		) as T
		this.#set(newSnapshot)
	}

	redo(): void {
		const nextEvent = this.#redoStack.pop()
		if (!nextEvent) return
		this.#ignoreUpdate = true
		this.log.push(nextEvent)

		const newSnapshot = applyPatch($state.snapshot(this.snapshot) as T, nextEvent.difference) as T
		this.#set(newSnapshot)
	}
}
