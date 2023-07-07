import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function Header() {
    const { data: username } = useQuery<string>(['username'], {
        select: (data: string) => data,
    });
    const queryClient = useQueryClient();
    const signOut = () => {
        queryClient.clear()
        queryClient.invalidateQueries()
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {'OrderFlow'}
                </Typography>
                {username && (
                    <>
                        <Typography variant="body1" component="div" sx={{ marginRight: '1rem' }}>
                            Welcome, {username}
                        </Typography>
                        <Button color="inherit" onClick={signOut}>
                            Sign Out
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};
