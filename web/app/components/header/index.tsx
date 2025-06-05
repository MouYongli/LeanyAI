'use client'

import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { usePathname } from 'next/navigation';
import { useI18n } from '../i18n-client';
import LanguageSwitcher from '../language-switcher';
import Logo from '../logo';

export default function Header() {
  const { t } = useI18n();
  const pathname = usePathname();

  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar>
        <Logo />
        <Box sx={{ flexGrow: 1, ml: 2, display: { xs: 'none', sm: 'flex' } }}>
          <Button component={Link} href="/" color={pathname === '/' ? 'primary' : 'inherit'}>
            {t('home')}
          </Button>
          <Button component={Link} href="/workflow" color={pathname === '/workflow' ? 'primary' : 'inherit'}>
            {t('workflow')}
          </Button>
          <Button component={Link} href="/about" color={pathname === '/about' ? 'primary' : 'inherit'}>
            {t('about')}
          </Button>
          <Button component={Link} href="/studio" color={pathname === '/studio' ? 'primary' : 'inherit'}>
            {t('studio')}
          </Button>
          <Button component={Link} href="/knowledge" color={pathname === '/knowledge' ? 'primary' : 'inherit'}>
            {t('knowledge')}
          </Button>
        </Box>
        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
}