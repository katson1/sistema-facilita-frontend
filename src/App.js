import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClienteList from './components/ClienteList';
import ClienteForm from './components/ClienteForm';
import RotaModal from './components/RotaModal';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

function App() {
  const [openRotaModal, setOpenRotaModal] = useState(false);

  const handleOpenRotaModal = () => setOpenRotaModal(true);
  const handleCloseRotaModal = () => setOpenRotaModal(false);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Sistema de Gerenciamento de Clientes
          </Typography>
          <Button color="inherit" component={Link} to="/">Clientes</Button>
          <Button color="inherit" component={Link} to="/novo-cliente">Cadastrar Cliente</Button>
          <Button color="inherit" onClick={handleOpenRotaModal}>Calcular Rota</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<ClienteList />} />
          <Route path="/novo-cliente" element={<ClienteForm />} />
        </Routes>
        <RotaModal open={openRotaModal} handleClose={handleCloseRotaModal} />
      </Container>
    </Router>
  );
}

export default App;
