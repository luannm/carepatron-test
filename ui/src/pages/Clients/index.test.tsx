import { render, screen } from '@testing-library/react';

import ClientsPage from '.';
import { StateContext } from '../../store/DataProvider';

const renderPage = (clients: IClient[] = []) => {
	const state: IApplicationState = {
		clients: [
			{
				firstName: 'John',
				lastName: 'Smith',
				email: 'john@gmail.com',
				phoneNumber: '0123456789',
			},
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
	});
});
