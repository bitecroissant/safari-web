var isDev: boolean

type JSONValue = string | number | boolean | null | { [k: string]: JSONValue } | JSONValue[]

// Biz
type PoetryLinesType = {
	id: number
	gmtCreate: string
	gmtModified: string
	isDeleted: number
	line: string
	author: string
	dynasty: string
	title: string
	showDate: string
}

type EventDatesTypes = {
	id: number
	gmtCreate: string
	gmtModified: string
	isDeleted: number
	group: string
	eventName: string
	happenAt: string
}
