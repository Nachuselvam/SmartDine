import React from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import '../index.css';

export default function Footer() {
  return (
    <footer id ='app-footer' style={{ backgroundColor: '#0b0b0b', color: '#ffffff', padding: '40px 20px', marginTop: '40px' }}>
      <Box 
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: '1200px', margin: 'auto' }}
      >
        {/* About */}
        <Box sx={{ flex: '1 1 200px', marginBottom: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1ed760', mb: 2 }}>
            About SmartDine
          </Typography>
          <Typography variant="body2" sx={{ color: '#cfd8dc' }}>
            We provide curated food suggestions to make your dining experience smarter and faster.
          </Typography>
        </Box>

        {/* Quick Links */}
        <Box sx={{ flex: '1 1 150px', marginBottom: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1ed760', mb: 2 }}>
            Quick Links
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link href="/" underline="none" sx={{ color: '#cfd8dc' }}>Home</Link>
            <Link href="/services" underline="none" sx={{ color: '#cfd8dc' }}>Services</Link>
            <Link href="/menu" underline="none" sx={{ color: '#cfd8dc' }}>Menu</Link>
            <Link href="/contact" underline="none" sx={{ color: '#cfd8dc' }}>Contact</Link>
          </Box>
        </Box>

        {/* Contact */}
        <Box sx={{ flex: '1 1 200px', marginBottom: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1ed760', mb: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="body2" sx={{ color: '#cfd8dc' }}>Email: support@smartdine.com</Typography>
          <Typography variant="body2" sx={{ color: '#cfd8dc' }}>Phone: +91 9876543210</Typography>
          <Typography variant="body2" sx={{ color: '#cfd8dc' }}>Address: 123 Food Street, Chennai, India</Typography>
        </Box>

        {/* Follow Us */}
        <Box sx={{ flex: '1 1 150px', marginBottom: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1ed760', mb: 2 }}>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Facebook sx={{ color: '#cfd8dc', cursor: 'pointer' }} />
            <Twitter sx={{ color: '#cfd8dc', cursor: 'pointer' }} />
            <Instagram sx={{ color: '#cfd8dc', cursor: 'pointer' }} />
            <LinkedIn sx={{ color: '#cfd8dc', cursor: 'pointer' }} />
          </Box>
        </Box>

        {/* Newsletter */}
        <Box sx={{ flex: '1 1 250px', marginBottom: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1ed760', mb: 2 }}>
            Subscribe to our Newsletter
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField 
              placeholder="Enter your email" 
              variant="outlined" 
              size="small" 
              sx={{ backgroundColor: '#ffffff', borderRadius: 1, flex: 1 }}
            />
            <Button variant="contained" sx={{ backgroundColor: '#1ed760', color: '#000' }}>Subscribe</Button>
          </Box>
        </Box>
      </Box>

      {/* Bottom */}
      <Box sx={{ textAlign: 'center', mt: 4, borderTop: '1px solid #2e2e2e', pt: 2 }}>
        <Typography variant="body2" sx={{ color: '#cfd8dc' }}>
          © {new Date().getFullYear()} SmartDine | All Rights Reserved | 
          <Link href="/privacy" underline="none" sx={{ color: '#1ed760', ml: 1 }}>Privacy Policy</Link> | 
          <Link href="/terms" underline="none" sx={{ color: '#1ed760', ml: 1 }}>Terms of Service</Link>
        </Typography>
      </Box>
    </footer>
  );
}
