import { render, screen, waitFor } from '@testing-library/react';

import ClientsPage from '.';
import { StateContext } from '../../store/DataProvider';
import userEvent from '@testing-library/user-event';

const renderPage = (clients: IClient[] = []) => {
	const state: IApplicationState = {
		clients: [
			{
				firstName: 'John',
				lastName: 'Smith',
				email: 'john@gmail.com',
				phoneNumber: '0123456789',
			},
			...clients,
		],
	};
	return render(
		<StateContext.Provider value={{ state, dispatch: () => {} }}>
			<ClientsPage />
		</StateContext.Provider>
	);
};

describe('Client Page', () => {
	test('should renders properly', async () => {
		renderPage();

		expect(await screen.findByTestId('search-input')).toBeInTheDocument();
		expect(await screen.findByTestId('btn-create')).toBeInTheDocument();
		expect(await screen.findByTestId('client-table')).toBeInTheDocument();
		expect(await screen.findAllByTestId('client-row')).toHaveLength(1);
	});

	test('should display filtered client correct', async () => {
		renderPage([
			{
				firstName: 'Tom',
				lastName: 'Cruise',
				email: 'tom@gmail.com',
				phoneNumber: '0123456789',
			},
		]);

		const searchInput = await screen.findByTestId('search-input');

		expect(searchInput).toBeInTheDocument();
		expect(await screen.findAllByTestId('client-row')).toHaveLength(2);

		userEvent.type(searchInput, 'Tom');
		await waitFor(async () => {
			expect(await screen.findAllByTestId('client-row')).toHaveLength(1);
		});
	});
});
