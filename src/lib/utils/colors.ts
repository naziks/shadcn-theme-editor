import type {CSSRuleExtended, ShadcnVariable} from "$lib/types.js";
import {findValueType, hslRegex, normalizeName} from "$lib/utils/index.js";

export const getCurrentVariables = () => {
    const sheets = [...document.styleSheets]

    return sheets.flatMap((sheet) => {
        try {
            const rules = [...sheet.cssRules] as CSSRuleExtended[]

            return rules.flatMap((rule) => {
                if (rule.selectorText !== ':root') return []
                const styles = [...rule.style]
                return styles.flatMap((variable) => {
                    if (!variable.startsWith('--')) return []

                    const base = {
                        variable,
                        name: normalizeName(variable),
                        value: rule.style.getPropertyValue(variable).trim(),
                    }
                    return {
                        ...base,
                        type: findValueType(base.variable, base.value, {}) ?? 'unknown',
                    } as ShadcnVariable
                })
            })
        } catch {
            return []
        }
    }) as ShadcnVariable[]
}

export const parseHsl = (hls: string) => {
    const result = hslRegex.exec(hls)?.groups as undefined | Record<'h' | 's' | 'l', string>
    if (!result) return null

    return [result.h, result.s, result.l].map((e) => parseInt(e)) as [number, number, number]
}
export const hslToString = (h: number, s: number, l: number) => {
    return `${h.toFixed(2)} ${s.toFixed(2)}% ${l.toFixed(2)}%`
}