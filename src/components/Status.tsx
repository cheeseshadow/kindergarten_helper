import React from "react";
import styled from "styled-components";

interface Props {
    value: boolean,
    successLabel: string,
    failureLabel: string
}

const Container = styled.div<{ color: string }>`
  display: inline;
  padding: 4px;
  text-transform: lowercase;
  border-radius: 8px;
  border: ${({color}) => color} 1px solid;
  color: ${({color}) => color};
`

const Status = ({value, successLabel, failureLabel}: Props) => {
    return (
        <Container color={value ? '#39C700' : '#C70039'}>{value ? successLabel : failureLabel}</Container>
    )
}

export default Status