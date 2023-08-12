import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ClientRow from './ClientRow';
import { TablePagination } from '@mui/material';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ROWS_PER_PAGE = 5;

export default function BasicTable({ clients }: { clients: IClient[] }) {
	const { t } = useTranslation();
	const [page, setPage] = useState(0);

	const rows = useMemo(() => {
		return clients.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE);
	}, [clients, page]);

	return (
		<TableContainer data-testid='client-table' sx={{ maxWidth: '100%' }}>
			<Table sx={{ minWidth: 400 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell sx={{ fontWeight: 600 }}>{t('client-table-column-name', 'Name')}</TableCell>
						<TableCell sx={{ fontWeight: 600 }}>{t('client-table-column-phone', 'Phone Number')}</TableCell>
						<TableCell sx={{ fontWeight: 600 }}>{t('client-table-column-email', 'Email')}</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((client) => (
						<ClientRow key={client.id} client={client} />
					))}
					{!clients ||
						(!clients.length && (
							<TableRow sx={{ padding: 3 }}>
								<TableCell component='th' scope='row' colSpan={3} sx={{ textAlign: 'center' }}>
									No clients
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[]}
				component='div'
				count={clients.length}
				rowsPerPage={ROWS_PER_PAGE}
				page={page}
				onPageChange={(_, newPage) => setPage(newPage)}
			/>
		</TableContainer>
	);
}
