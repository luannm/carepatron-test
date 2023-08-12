import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import DataProvider from './store/DataProvider';
import Clients from './pages/Clients';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { SnackbarProvider } from 'notistack';

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider>
				<div className='App'>
					<DataProvider>
						<Routes>
							<Route path='/' element={<Clients />} />
							<Route path='/Clients' element={<Clients />} />
						</Routes>
					</DataProvider>
				</div>
			</SnackbarProvider>
		</ThemeProvider>
	);
}
