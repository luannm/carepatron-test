import { render, screen, waitFor } from '@testing-library/react';
import CreateClientDialog from '.';
import userEvent from '@testing-library/user-event';

const renderDialog = () => render(<CreateClientDialog show={true} onClose={() => {}} onSuccess={() => {}} />);

describe('Create Client Dialog', () => {
	test('should renders dialog properly', async () => {
		renderDialog();

		expect(await screen.findByTestId('create-client-dialog')).toBeInTheDocument();
		expect(await screen.findByTestId('field-firstName')).toBeInTheDocument();
		expect(await screen.findByTestId('field-lastName')).toBeInTheDocument();
		expect(await screen.findByTestId('btn-continue')).toBeInTheDocument();
		expect(await screen.findByTestId('btn-continue')).toBeDisabled();
	});

	test('should allow continue if personal details filled', async () => {
		renderDialog();

		expect(await screen.findByTestId('btn-continue')).toBeDisabled();

		const firstNameInput = await screen.findByTestId('input-firstName');
		const lastNameInput = await screen.findByTestId('input-lastName');
		userEvent.type(firstNameInput, 'John');
		userEvent.type(lastNameInput, 'Smith');

		await waitFor(async () => {
			expect(await screen.findByTestId('btn-continue')).toBeEnabled();
		});

		userEvent.click(await screen.findByTestId('btn-continue'));

		expect(await screen.findByTestId('field-phoneNumber')).toBeInTheDocument();
		expect(await screen.findByTestId('field-email')).toBeInTheDocument();
	});
});
