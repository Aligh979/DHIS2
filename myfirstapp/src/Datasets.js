import React, { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { Menu, MenuItem, Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell } from '@dhis2/ui'

const dataQuery = {
    dataSets: {
        resource: 'dataSets',
        params: {
            fields: ['id', 'displayName', 'created'],
            paging: 'false',
        },
    },
}

export function Datasets() {
    const { loading, error, data } = useDataQuery(dataQuery)
    const [selectedProgram, setSelectedProgram] = useState(null)

    if (loading) {
        return <span>Loading...</span>
    }

    if (error) {
        return <span>ERROR: {error.message}</span>
    }

    if (data) {
        console.log('Fetched data:', data)
        
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <h1>Datasets</h1>
                    <Menu>
                        {data.dataSets.dataSets.map(dataset => (
                            <MenuItem
                                key={dataset.id}
                                label={dataset.displayName}
                                onClick={() => setSelectedProgram(dataset)}
                            />
                        ))}
                    </Menu>
                </div>
                <div style={{ flex: 2, marginLeft: '20px' }}>
                    {selectedProgram && (
                        <div>
                            <h2>Program Details</h2>
                            <Table>
                                <TableHead>
                                    <TableRowHead>
                                        <TableCellHead>Field</TableCellHead>
                                        <TableCellHead>Value</TableCellHead>
                                    </TableRowHead>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Display Name</TableCell>
                                        <TableCell>{selectedProgram.displayName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>{selectedProgram.id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Creation Date</TableCell>
                                        <TableCell>{selectedProgram.created}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return null
}