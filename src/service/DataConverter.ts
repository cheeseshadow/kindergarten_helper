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

export const processData = (data: string) => {
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

export const scrapChildrenFunction = `(function() {
    const data = Array.from($('.j_tr')).slice(1, -1).map(row => {
        const cells = Array.from($(row).children('td'))
        const name = cells[1].innerText
        const id = cells[2].getAttribute('child')

        return {id, name}
    }).reduce((res, child) => {
        res[child.name] = child.id
        return res
    }, {})

    const copyToClipboard = (value) => {
        const button = $('<button>!</button>')
        button.click(() => {
            const input = $('<input id="ultra_input">')
            input.val(value)

            $('body').append(input)
            input.focus()
            input.select()

            res = document.execCommand('copy')
            if (res) {
                alert('Everything is copied successfully')
            } else {
                alert('Something is very wrong')
            }

        })
        button.click()

        $('#ultra_input').remove()
    }
    
    copyToClipboard(JSON.stringify(data))
})()`