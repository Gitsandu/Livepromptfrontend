import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  Grid,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FacebookIcon />, href: '#', label: 'Facebook' },
    { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
    { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
    { icon: <GitHubIcon />, href: '#', label: 'GitHub' },
    { icon: <EmailIcon />, href: 'mailto:contact@liveprompt.com', label: 'Email' },
  ];

  const footerLinks = [
    { title: 'Product', links: ['Features', 'Pricing', 'Documentation', 'API'] },
    { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press'] },
    { title: 'Support', links: ['Help Center', 'Contact Us', 'Status', 'Community'] },
    { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        mt: 'auto',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#1976d2',
              }}
            >
              LivePrompt
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                color: '#b0b0b0',
                lineHeight: 1.6,
              }}
            >
              Empowering developers with intelligent prompt engineering tools
              and real-time collaboration features.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#b0b0b0',
                    '&:hover': {
                      color: '#1976d2',
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    },
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <Grid item xs={6} md={2} key={section.title}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {section.links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    sx={{
                      color: '#b0b0b0',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: '#1976d2',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: '#333' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#b0b0b0',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            © {currentYear} LivePrompt. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', md: 'flex-end' },
            }}
          >
            <Link
              href="#"
              sx={{
                color: '#b0b0b0',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#1976d2',
                  textDecoration: 'underline',
                },
              }}
            >
              Privacy
            </Link>
            <Link
              href="#"
              sx={{
                color: '#b0b0b0',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#1976d2',
                  textDecoration: 'underline',
                },
              }}
            >
              Terms
            </Link>
            <Link
              href="#"
              sx={{
                color: '#b0b0b0',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#1976d2',
                  textDecoration: 'underline',
                },
              }}
            >
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
