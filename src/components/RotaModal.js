import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column', // Garante que o conteúdo flua verticalmente
};

const RotaModal = ({ open, handleClose }) => {
    const [rota, setRota] = useState([]);

    const calcularRota = async () => {
        const { data } = await axios.get('http://localhost:3001/api/calcular-rota/');
        if(data.success) {
            setRota(data.rota);
        } else {
            console.error('Falha ao calcular rota');
        }
    };

    const fecharModal = () => {
        handleClose();
        setRota([]);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Rota de Visitação
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Com origem e destino sendo a empresa (0, 0)
            </Typography>
                <List sx={{
                    mt: 2,
                    maxHeight: '380px', // Define uma altura máxima para a lista
                    overflow: 'auto', // Adiciona uma barra de rolagem se o conteúdo exceder a altura máxima
                }}>
                    {rota.map((cliente, index) => (
                        <ListItem key={cliente.id} divider>
                            <ListItemText 
                                primary={`${cliente.nome} (${cliente.email}, ${cliente.telefone})`}
                                secondary={`Coordenadas: (${cliente.coordenada_x}, ${cliente.coordenada_y})`}
                            />
                        </ListItem>
                    ))}
                </List>
                <Button onClick={calcularRota} sx={{ mt: 'auto' }}>Calcular Rota</Button>
                <Button onClick={fecharModal} sx={{ mt: 2 }}>Fechar</Button>
            </Box>
        </Modal>
    );
};

export default RotaModal;
