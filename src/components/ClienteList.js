import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const ClienteList = () => {
    const [clientes, setClientes] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        const fetchClientes = async () => {
            const { data } = await axios.get('http://localhost:3001/'); // Substitua pela URL correta do seu backend
            setClientes(data);
        };
        fetchClientes();
    }, []);

    return (
        <div>
            <TextField label="Filtrar Clientes" variant="outlined" onChange={e => setFiltro(e.target.value)} />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Coordenadas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientes.filter(cliente => 
                            cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
                            cliente.email.toLowerCase().includes(filtro.toLowerCase()) ||
                            cliente.telefone.includes(filtro) ||
                            (`(${cliente.coordenada_x}, ${cliente.coordenada_y})`).includes(filtro)
                        ).map((cliente) => (
                            <TableRow key={cliente.id}>
                                <TableCell>{cliente.nome}</TableCell>
                                <TableCell>{cliente.email}</TableCell>
                                <TableCell>{cliente.telefone}</TableCell>
                                <TableCell>({cliente.coordenada_x} , {cliente.coordenada_y})</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ClienteList;
