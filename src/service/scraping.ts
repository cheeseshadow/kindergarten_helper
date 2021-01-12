import {fillWithZeros, range} from "./utils";

export const scrapChildrenFunction = `(function() {
    const children = Array.from($('.j_tr')).slice(1, -1).map(row => {
        const cells = Array.from($(row).children('td'))
        const name = cells[1].innerText
        const id = cells[2].getAttribute('child')

        return {id, name}
    }).reduce((res, child) => {
        res[child.name + '_' + child.id] = child.id
        return res
    }, {})
    
    const groupId = $('#id_group')[0].value
    const dou_id = $('[name="dou_id"]')[0].value
    const month = $('#id_period')[0].value
    const year = $('#id_year')[0].value
    const lastDay = $('#table tbody tr').first().children().length - 4
    
    const data = {children, groupId, dou_id, month, year, lastDay}

    const copyToClipboard = (value) => {
        const button = $('<button>!</button>')
        button.click(() => {
            const input = $('<input id="ultra_input">')
            input.val(value)

            $('body').append(input)
            input.focus()
            input.select()

            const res = document.execCommand('copy')
            if (res) {
                alert('Names and ids were copied successfully')
            } else {
                alert('Something went very wrong')
            }

        })
        button.click()

        $('#ultra_input').remove()
    }
    
    copyToClipboard(JSON.stringify(data))
})()`

const fixDayFunction = `
function fixDay(dou_id, childrenIds, groupId, dateStr) {
    return new Promise(resolve => {
        $.post('/cabinet/children/visit/save/?dou_id=' + dou_id, {
            children: childrenIds,
            group: groupId,
            date: dateStr
        }, (data) => {
            resolve(data)
        });
    })
}
`

export const getSetAbsentFunction = (data: Map<string, string[]>, groupId: string, dou_id: string, month: string, year: string, lastDay: number) => {
    const outerStyles = `position: fixed;
                        background: #FFC0CBaa;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;`.split('\n').map(a => a.trim()).join('')

    const innerStyles = `color: #fff;
                        font-weight: bold;
                        font-size: 26px;
                        background: #3333;
                        border-radius: 8px;
                        padding: 4px;`.split('\n').map(a => a.trim()).join('')

    const promises = range(0, lastDay + 1).map(day => {
        const dayStr = fillWithZeros('' + day, 2)
        const monthStr = fillWithZeros(month, 2)
        const dateStr = `${dayStr}.${monthStr}.${year}`

        const childrenIds = data.get('' + day) || []

        return `fixDay('${dou_id}', '${childrenIds.join('|')}', '${groupId}', '${dateStr}')`
    }).join(',\n')

    return `
    (function() {
        let completed = ${lastDay}
        if (completed > 0) {
            ${fixDayFunction}
        
            let cover = $('<div style="${outerStyles}"><div style="${innerStyles}">Ща, ща, погоди.</div></div>')
            $('body').append(cover)
            
            Promise.all(${promises}).then(() => {
                cover.remove()
            })
        }
    })()
    `
}