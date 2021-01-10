import React from "react";
import styled from "styled-components";
import Status from "./Status";
import {Title, Wrapper} from "../App.styles";

interface Props {
    title: string,
    text: string,
    completed?: boolean,
    onConfig?: any,
    children?: any
}

const Block = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 420px;
  margin: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, .3), 0 3px 30px rgba(0, 0, 0, .3);
  border-radius: 6px;
  padding: 44px 32px 32px 32px;
`

const ConfigButton = styled.button<{ enabled: boolean }>`
  position: absolute;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  right: 16px;
  top: 16px;
  cursor: ${({enabled}) => enabled ? 'pointer' : 'default'};
  background: ${({enabled}) => enabled ? '#FFC300' : '#eee'}
`

const Card = ({title, text, completed, onConfig, children}: Props) => {
    return (
        <Block>
            <ConfigButton enabled={!!onConfig} onClick={onConfig}/>

            <Wrapper><Title>{title}:</Title> {text}</Wrapper>
            {
                completed !== undefined &&
                <Wrapper><Title>Status:</Title> <Status value={completed!} successLabel='Completed'
                                                        failureLabel='Not completed'/></Wrapper>
            }

            {children}
        </Block>
    )
}

export default Card