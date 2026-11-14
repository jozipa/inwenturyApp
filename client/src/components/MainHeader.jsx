import {
  Box,
  Typography,
} from '@mui/joy';


export default function MainHeader({info}) {
  return (
    <Box
        sx={{
        display: 'flex',
        my: 2,
        gap: 1,
        flexDirection: { xs: 'column', xsm: 'row' },
        alignItems: { xs: 'start', xsm: 'center' },
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        }}
    >
        <Typography level="h1" component="h1">
            {info}
        </Typography>
    </Box>
  );
}
