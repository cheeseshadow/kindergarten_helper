import React, {ChangeEvent} from 'react'
import styled from "styled-components";

interface Props {
    value: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
}

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  border: solid #333 1px;
  border-radius: 4px;
  padding: 4px;
  height: 120px;
  margin-top: 12px;
`

const AreaInput = ({value, placeholder, onChange}: Props) => {
    return (
        <TextArea placeholder={placeholder} value={value} onChange={onChange}/>
    )
}

export default AreaInput