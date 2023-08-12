import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { StateContext } from '../../store/DataProvider';
import Page from '../../components/Page';
import ClientTable from './ClientTable';
import { getClients } from '../../services/api';
import CreateClientDialog from './components/CreateClientDialog';
import useDebounce from '../../hooks/use-debounce';

function Clients() {
	const [showDialog, setShowDialog] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const debouncedSearchTerm = useDebounce(searchTerm);

	const { state, dispatch } = useContext(StateContext);
	const { clients } = state;

	const fetchClients = () => {
		getClients().then((clients) => dispatch({ type: 'FETCH_ALL_CLIENTS', data: clients }));
	};

	useEffect(() => {
		fetchClients();
	}, []);

	const filteredClients = useMemo(
		() =>
			clients.filter((item) => {
				const fullName = `${item.firstName} ${item.lastName}`.trim();
				return fullName.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
			}),
		[clients, debouncedSearchTerm]
	);

	return (
		<>
			<Page>
				<Typography variant='h4' sx={{ textAlign: 'start' }}>
					Clients
				</Typography>
				<Stack direction={['column', 'row']} gap={[2, 0]} justifyContent='space-between' sx={{ mt: 3 }}>
					<TextField
						size='small'
						placeholder='Search clients...'
						InputProps={{
							sx: { background: 'white' },
							endAdornment: <SearchIcon />,
						}}
						onChange={(evt) => setSearchTerm(evt.target.value)}
					/>
					<Button variant='contained' onClick={() => setShowDialog(true)}>
						Create New Client
					</Button>
				</Stack>
				<Paper elevation={0} sx={{ margin: 'auto', marginTop: 2 }}>
					<ClientTable clients={filteredClients} />
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
