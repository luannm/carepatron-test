import { memo, useContext, useEffect, useState } from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { StateContext } from '../../store/DataProvider';
import Page from '../../components/Page';
import ClientTable from './ClientTable';
import { getClients } from '../../services/api';
import CreateClientDialog from './components/CreateClientDialog';

function Clients() {
	const [showDialog, setShowDialog] = useState(false);
	const { state, dispatch } = useContext(StateContext);
	const { clients } = state;

	const fetchClients = () => {
		getClients().then((clients) => dispatch({ type: 'FETCH_ALL_CLIENTS', data: clients }));
	};

	useEffect(() => {
		fetchClients();
	}, []);

	return (
		<>
			<Page>
				<Typography variant='h4' sx={{ textAlign: 'start' }}>
					Clients
				</Typography>
				<Stack direction='row' justifyContent='space-between' sx={{ mt: 3 }}>
					<span>Searchbox here</span>
					<Button variant='contained' onClick={() => setShowDialog(true)}>
						Create New Client
					</Button>
				</Stack>
				<Paper elevation={0} sx={{ margin: 'auto', marginTop: 2 }}>
					<ClientTable clients={clients} />
				</Paper>
			</Page>

			{showDialog && (
				<CreateClientDialog
					show={showDialog}
					onClose={() => setShowDialog(false)}
					onSuccess={() => fetchClients()}
				/>
			)}
		</>
	);
}

export default memo(Clients);
