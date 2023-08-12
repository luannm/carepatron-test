import { blue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: blue['A700'],
		},
	},
	
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
					textTransform: 'initial',
					fontWeight: 'bold',
					padding: '12px 16px',
					lineHeight: 'normal',
					borderRadius: '8px',
				},
			},
		},
	},
});

export default theme;
