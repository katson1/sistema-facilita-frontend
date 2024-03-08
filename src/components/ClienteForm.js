import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';

const ClienteForm = () => {
    const [cliente, setCliente] = useState({
        nome: '',
        email: '',
        telefone: '',
        coordenada_x: '',
        coordenada_y: ''
    });
    const [errorFields, setErrorFields] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
    
        if (name === 'telefone') {
            formattedValue = formatPhoneNumber(value);
        }
    
        setCliente({ ...cliente, [name]: formattedValue });
    
        if (value.trim() !== '') {
            setErrorFields({ ...errorFields, [name]: false });
        }
    };
    

        const validateEmail = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };

        const formatPhoneNumber = (value) => {
            const numbers = value.replace(/\D/g, '');
            const char = {0:'(', 2:') ', 3:' ', 7:'-'};
            let phone = '';
            for (let i = 0; i < numbers.length; i++) {
                phone += (char[i] || '') + numbers[i];
            }
            return phone;
        };

        const validateForm = () => {
            const newErrors = {};
            let isValid = true;
        
            Object.keys(cliente).forEach(key => {
                if (cliente[key].trim() === '') {
                    newErrors[key] = true;
                    isValid = false;
                }
            });
        
            if (!validateEmail(cliente.email)) {
                newErrors['email'] = 'E-mail inválido';
                isValid = false;
            }
        
            setErrorFields(newErrors);
            return isValid;
        };
        

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setSnackbarMessage('Preencha todos os campos obrigatórios.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }
    
        try {
            await axios.post('http://localhost:3001/', cliente);
            setSnackbarMessage('Cliente cadastrado com sucesso!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setCliente({
                nome: '',
                email: '',
                telefone: '',
                coordenada_x: '',
                coordenada_y: ''
            });
        } catch (error) {
            let errorMessage = 'Erro ao cadastrar cliente. Tente novamente.'; // Mensagem padrão
            if (error.response && error.response.data && error.response.data.message) {
                // Usa a mensagem de erro do back-end se disponível
                errorMessage = error.response.data.message;
            }
            setSnackbarMessage(errorMessage);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };
    

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '50%',
                        marginX: 'auto'
                    }}
                >
                    {Object.keys(cliente).map(key => (
                        <TextField
                            key={key}
                            name={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                            value={cliente[key]}
                            onChange={handleChange}
                            error={!!errorFields[key]}
                            helperText={errorFields[key] ? (typeof errorFields[key] === 'string' ? errorFields[key] : 'Campo obrigatório') : ''}
                        />
                    ))}
                    <Button type="submit" variant="contained">Cadastrar Cliente</Button>
                </Box>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ClienteForm;
