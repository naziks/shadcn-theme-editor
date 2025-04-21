export interface CSSRuleExtended extends CSSRule {
	selectorText: string
	style: CSSStyleDeclaration
}

export interface ShadcnVariable {
	variable: string
	name: string
	value: string
	type: 'color' | 'number' | 'unknown'
}
