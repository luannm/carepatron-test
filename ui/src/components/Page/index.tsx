import { Box } from '@mui/material';
import React from 'react';

export default function Page({ children }: { children?: React.ReactNode }) {
	return <Box sx={{ marginX: [3, 'auto'], marginTop: 3, maxWidth: '700px' }}>{children}</Box>;
}
