'use client';

import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const menuConfig = [
    {
        title: 'Produtos',
        items: [
            { title: 'Produtos', path: '/dashboard/products' },
            { title: 'Marcas', path: '/dashboard/brands' },
            { title: 'Estoque', path: '/dashboard/stock' },
        ]
    },
    {
        title: 'Notas Fiscais',
        items: [
            { title: 'Notas Fiscais', path: '/dashboard/invoices' },
            { title: 'Fornecedores', path: '/dashboard/suppliers' },
        ]
    },
    {
        title: 'Vendas',
        items: [
            { title: 'Vendas', path: '/dashboard/sales' },
            { title: 'Clientes', path: '/dashboard/customers' },
        ]
    }
];

const adminMenuConfig = [
    {
        title: 'Administração',
        items: [
            { title: 'Usuários', path: '/dashboard/users' },
        ]
    }
];

const Navbar = () => {
    const { logout, user } = useAuth();
    const router = useRouter();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<Record<string, HTMLElement | null>>({});

    const finalMenuConfig = user?.role === 'ADMINISTRADOR' ? [...menuConfig, ...adminMenuConfig] : menuConfig;

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (title: string, event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser({ ...anchorElUser, [title]: event.currentTarget });
    };

    const handleCloseUserMenu = (title: string) => {
        setAnchorElUser({ ...anchorElUser, [title]: null });
    };

    const handleNavigate = (path: string, title: string) => {
        router.push(path);
        handleCloseUserMenu(title);
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/dashboard"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'inherit', textDecoration: 'none' }}
                >
                    HL Market
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        {finalMenuConfig.map((menu) => (
                            <div key={menu.title}>
                                <MenuItem onClick={(e) => handleOpenUserMenu(menu.title, e)}>
                                    <Typography textAlign="center">{menu.title}</Typography>
                                </MenuItem>
                            </div>
                        ))}
                        <MenuItem onClick={() => { handleNavigate('/dashboard/manual', ''); handleCloseNavMenu(); }}>
                            <Typography textAlign="center">Manual</Typography>
                        </MenuItem>
                    </Menu>
                </Box>

                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/dashboard"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    HL Market
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {finalMenuConfig.map((menu) => (
                        <div key={menu.title}>
                            <Button onClick={(e) => handleOpenUserMenu(menu.title, e)} sx={{ my: 2, color: 'white' }}>
                                {menu.title}
                            </Button>
                            <Menu
                                anchorEl={anchorElUser[menu.title]}
                                open={Boolean(anchorElUser[menu.title])}
                                onClose={() => handleCloseUserMenu(menu.title)}
                            >
                                {menu.items.map((item) => (
                                    <MenuItem key={item.title} onClick={() => handleNavigate(item.path, menu.title)}>
                                        {item.title}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    ))}
                    <Button onClick={() => router.push('/dashboard/manual')} sx={{ my: 2, color: 'white' }}>
                        Manual
                    </Button>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Typography component="span" sx={{ mr: 2 }}>
                        Olá, {user?.name}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Sair</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;