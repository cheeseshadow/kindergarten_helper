const findAllOccurrences = (array: string[], element: string, ignoreCase: boolean) => {
    const processedArray = ignoreCase ? array.map(data => data.toLowerCase()) : array.slice()
    const result = []
    let index = 0

    while (true) {
        index = processedArray.indexOf(element, index + 1)
        if (index === -1) {
            break
        } else {
            result.push(index)
        }
    }

    return result
}

const findAbsentDates = (data: string[], numberFieldPresent: boolean) => {
    const absentMarker = 'нн'
    const meaninglessColumnCount = numberFieldPresent ? 3 : 2
    const absentDates = findAllOccurrences(data, absentMarker, true)

    return absentDates.map(date => date - meaninglessColumnCount)
}

export const structureTableData = (data: string) => {
    const enteredRegex = /^[0-9]+,[а-яА-я]+ [а-яА-я]+,.*$/
    const exportedRegex = /^[а-яА-я]+ [а-яА-я]\. [а-яА-я]\.,.*$/
    let numberFieldPresent = true

    const lines = data.split('\n').map(line => line.trim())
    let significantLines = lines.filter(line => enteredRegex.test(line))
    if (significantLines.length === 0) {
        significantLines = lines.filter(line => exportedRegex.test(line))
        numberFieldPresent = false
    }

    const {children, days} = significantLines.reduce((res: any, line: string) => {
        const rawData = line.split(',')
        const child = rawData[numberFieldPresent ? 1 : 0]
        res.children.push(child)
        res.days.push(findAbsentDates(rawData, numberFieldPresent))

        return res
    }, {children: [], days: []})

    const absentData: any = {}
    for (let i = 0; i < children.length; ++i) {
        const child = children[i]
        days[i].forEach((day: number) => {
            if (!absentData[day]) {
                absentData[day] = []
            }

            absentData[day].push(child)
        })
    }

    return {children, absentData}
}

export const matchData = (childrenIds: { [key: string]: string }, tableChildren: string[]) => {
    const childrenNames = Object.keys(childrenIds)
    const scrapedSecondNames = childrenNames.map(name => {
        const match = name.match(/^(.+) .\. .\._.*$/)
        if (match && match[1]) {
            return match[1]
        }
        return name
    })

    const tableSecondNames = tableChildren.map(name => name.split(' ')[0])

    const matches = tableSecondNames.map(name => {
        const index = scrapedSecondNames.indexOf(name)
        if (index === -1) {
            return null
        }

        scrapedSecondNames[index] = ''
        return childrenIds[childrenNames[index]]
    })

    const failures = []
    const matchedIds = new Map<string, string>()
    for (let i = 0; i < matches.length; ++i) {
        const name = tableChildren[i]
        const id = matches[i]
        if (id) {
            matchedIds.set(name, id)
        } else {
            failures.push(name)
        }

    }

    return {failures, matchedIds}
}