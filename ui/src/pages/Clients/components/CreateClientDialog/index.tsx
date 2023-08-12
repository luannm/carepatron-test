import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	Step,
	StepLabel,
	Stepper,
	TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { createClient } from '../../../../services/api';
import { useSnackbar } from 'notistack';

interface Props {
	show: boolean;
	onClose: () => void;
	onSuccess: () => void;
}

enum Steps {
	PERSONAL_DETAILS = 0,
	CONTACT_DETAILS = 1,
}

const STEP_LABELS = ['Personal details', 'Contact details'];

const CreateClientDialog: React.FC<Props> = ({ show, onClose, onSuccess }) => {
	const { enqueueSnackbar } = useSnackbar();

	const [activeStep, setActiveStep] = useState(Steps.PERSONAL_DETAILS);
	const [loading, setLoading] = useState(false);

	const {
		control,
		formState: { isValid },
		trigger,
		handleSubmit,
	} = useForm<IClient>({
		mode: 'onChange',
		//@ts-ignore
		resolver: yupResolver(
			yup.object().shape({
				id: yup.string().nullable(),
				firstName: yup.string().required('First name is required'),
				lastName: yup.string().required('Last name is required'),
				email: yup
					.string()
					.email('Invalid email format')
					.test('is-required', 'Email is required', (value) =>
						activeStep === Steps.CONTACT_DETAILS ? Boolean(value) : true
					),
				phoneNumber: yup
					.string()
					.matches(/^[0-9]+$/, 'Must be only digits')
					.min(9, 'Must between 9-11 digits')
					.max(11, 'Must between 9-11 digits')
					.test('is-required', 'Phone number is required', (value) =>
						activeStep === Steps.CONTACT_DETAILS ? Boolean(value) : true
					),
			})
		),
	});

	const displayFields: Array<{ label: string; fieldName: keyof IClient; isVisible: boolean }> = useMemo(
		() => [
			{
				label: 'First name',
				fieldName: 'firstName',
				isVisible: activeStep === Steps.PERSONAL_DETAILS,
			},
			{
				label: 'Last name',
				fieldName: 'lastName',
				isVisible: activeStep === Steps.PERSONAL_DETAILS,
			},
			{
				label: 'Email',
				fieldName: 'email',
				isVisible: activeStep === Steps.CONTACT_DETAILS,
			},
			{
				label: 'Phone number',
				fieldName: 'phoneNumber',
				isVisible: activeStep === Steps.CONTACT_DETAILS,
			},
		],
		[activeStep]
	);

	const handleContinue = async () => {
		await trigger();
		if (activeStep === Steps.CONTACT_DETAILS) {
			return;
		}
		setActiveStep((step) => step + 1);
	};

	const handleBack = () => {
		setActiveStep((step) => step - 1);
	};

	const onSubmit = async (values: IClient) => {
		try {
			setLoading(true);
			await createClient(values);
			enqueueSnackbar('Client created successfully!', {
				variant: 'success',
			});

			onClose();
			onSuccess();
		} catch (error) {
			enqueueSnackbar('Something wrong! Failed to create client.', {
				variant: 'error',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={show} maxWidth='sm' fullWidth>
			<DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				Create New Client
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogContent>
					<Stepper activeStep={activeStep}>
						{STEP_LABELS.map((label, index) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<Stack sx={{ mt: 3 }} gap={2}>
						{displayFields.map(({ fieldName, label, isVisible }) => {
							if (!isVisible) return null;

							return (
								<Controller
									key={fieldName}
									name={fieldName}
									control={control}
									render={({ field, fieldState: { error } }) => (
										<TextField
											size='small'
											fullWidth
											label={label}
											error={Boolean(error)}
											helperText={error?.message}
											{...field}
										/>
									)}
								/>
							);
						})}
					</Stack>
				</DialogContent>
				<DialogActions sx={{ px: 3, mt: 5, justifyContent: 'space-between' }}>
					<Button
						sx={{ visibility: activeStep > 0 ? 'visible' : 'hidden' }}
						startIcon={<KeyboardBackspaceIcon />}
						onClick={handleBack}
					>
						Back
					</Button>
					<Button
						variant='contained'
						onClick={handleContinue}
						disabled={!isValid || loading}
						type={activeStep === Steps.CONTACT_DETAILS ? 'submit' : 'button'}
					>
						{activeStep === Steps.CONTACT_DETAILS ? 'Create client' : 'Continue'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default CreateClientDialog;
