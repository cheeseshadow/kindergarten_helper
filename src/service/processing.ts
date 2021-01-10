const findAllOccurrences = (array: any[], element: any) => {
    const result = []
    let index = 0

    while (true) {
        index = array.indexOf(element, index + 1)
        if (index === -1) {
            break
        } else {
            result.push(index)
        }
    }

    return result
}

const findAbsentDates = (data: string[]) => {
    const absentMarker = 'нн'
    const meaninglessColumnCount = 4 // five meaningless columns and the count starts from one
    const absentDates = findAllOccurrences(data, absentMarker)

    return absentDates.map(date => date - meaninglessColumnCount)
}

export const structureTableData = (data: string) => {
    const significantLines = data.split('\n').filter(line => /^[0-9]+,.*$/.test(line))

    const {children, days} = significantLines.reduce((res: any, line: string) => {
        const rawData = line.split(',')
        const child = rawData[1]
        res.children.push(child)
        res.days.push(findAbsentDates(rawData))

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