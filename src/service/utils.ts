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
    button.click()

    $(`#${INPUT_ID}`).remove()
}