import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

type Props = {
    lable: string[]
}

const TableHeader = ({lable}: Props) => {
    return (
        <TableHead>
            <TableRow>
                {
                    lable.map((item, index) => (
                        <TableCell key={index} align="left">{item}</TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
}

export default TableHeader