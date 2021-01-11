import React, {useRef} from "react";
import {Button} from "@material-ui/core";

interface Props {
    file: File | null,
    setFile: (file: File | null) => void
}

const FileInput = ({file, setFile}: Props) => {
    const fileInput = useRef<HTMLInputElement>(null)

    const onFileSet = () => {
        const selectedFile = fileInput.current!.files![0]
        if (selectedFile) {
            setFile(selectedFile)
        } else {
            setFile(null)
        }
    }

    return (
        <Button variant='outlined' color='secondary' component='label'>
            {!!file ? file.name : 'Upload table'}
            <input type='file' onChange={onFileSet} ref={fileInput} hidden/>
        </Button>
    )


}

export default FileInput