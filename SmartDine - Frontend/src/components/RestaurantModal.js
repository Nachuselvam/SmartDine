import React from 'react';
import { Modal, Box, Typography, CardMedia, Button } from '@mui/material';
import '../index.css';

export default function RestaurantModal({ open, onClose, restaurant }) {
  if (!restaurant) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="restaurant-modal-title"
      aria-describedby="restaurant-modal-description"
    >
      <Box
        className="modal"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 450, md: 520 },
          bgcolor: '#ffffff',
          color: '#111827',
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          p: 3,                  
          borderRadius: 3,
          outline: 'none',
        }}
      >
        <CardMedia
          component="img"
          height="260"           
          image={restaurant.image_url || 'https://via.placeholder.com/500x300.png?text=Image+Unavailable'}
          alt={restaurant.name}
          sx={{ borderRadius: 2, mb: 2 }}   
        />

        <Typography
          id="restaurant-modal-title"
          variant="h5"           
          component="h2"
          sx={{ fontWeight: 800, mb: 1.2, textAlign: 'center', color: '#f59e0b' }}
        >
          {restaurant.name}
        </Typography>

        {restaurant.rating && (
          <Typography
            variant="body1"
            sx={{ mb: 2, textAlign: 'center', color: '#111827' }}
          >
            ⭐ Rating: {restaurant.rating} / 5
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: '0.95rem' }}>
          {restaurant.cuisine && (
            <Typography>🍽 <strong>Cuisine:</strong> {restaurant.cuisine}</Typography>
          )}
          {restaurant.specialties && (
            <Typography>⭐ <strong>Specialties:</strong> {restaurant.specialties}</Typography>
          )}
          {restaurant.priceRange && (
            <Typography>💰 <strong>Price:</strong> {restaurant.priceRange.charAt(0).toUpperCase() + restaurant.priceRange.slice(1)}</Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            sx={{ background: '#f59e0b', color: '#fff', fontWeight: 700, px: 4 }}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
