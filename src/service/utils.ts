import $ from 'jquery'

export const copyToClipboard = (value: string) => {
    const INPUT_ID = 'very_long_input_id'
    const button = $('<button>!</button>')
    button.click(() => {
        const input = $(`<textarea id="${INPUT_ID}">`)
        input.val(value)

        $('body').append(input)
        input.focus()
        input.select()

        const res = document.execCommand('copy')
        if (res) {
            alert('Everything is copied successfully')
        } else {
            alert('Something is very wrong')
        }

    })
    const currentScroll = document.documentElement.scrollTop
    button.click()

    $(`#${INPUT_ID}`).remove()
    document.documentElement.scrollTop = currentScroll
}

export const fillWithZeros = (value: string, length: number): string => {
    let result = value
    while (result.length < length) {
        result = '0' + result
    }

    return result
}

export const readFile = (file: File, handler: (result: string | ArrayBuffer) => string): string => {
    const reader = new FileReader()
    let result = ''

    reader.onload = (event) => {
        result = handler(event.target!.result!)
    }
    reader.readAsBinaryString(file)

    return result
}