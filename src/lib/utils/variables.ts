import type {ShadcnVariable} from "$lib/types.js";
import {hslRegex, numberRegexp} from "$lib/utils/index.js";

export const findValueType = (
    variable: string,
    value: string,
    typesMap: Record<string, ShadcnVariable['type']>,
) => {
    variable = variable.replace(/--/g, '')
    const matchedVariable = typesMap[variable]
    if (matchedVariable) return matchedVariable

    if (hslRegex.test(value)) return 'color'
    if (numberRegexp.test(value)) return 'number'
}

export const mergeVariables = (defaultValues: ShadcnVariable[], values: ShadcnVariable[]) => {
    const variables = defaultValues.reduce((r, e) => {
        r.set(e.variable, e)
        return r
    }, new Map<string, ShadcnVariable>())

    for (const value of values) {
        variables.set(value.variable, value)
    }

    return [...variables.values()]
}
