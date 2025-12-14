import { Card, CardContent, Typography, CardMedia, Box, Button } from '@mui/material';
import '../index.css';

export default function ResultsList({ results, onSelect }) {
  if (!results || results.length === 0) {
    return (
      <p className="ai-message no-results-message">
        Sorry, I couldn't find any perfect matches for that request. Try a different query.
      </p>
    );
  }

  return (
    <div
      className="card-container"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',   
        gap: '16px',
        justifyItems: 'center',
      }}
    >
      {results.map((r, index) => {
        const imageUrl =
          r.image_url ||
          'https://via.placeholder.com/400x300.png?text=Image+Unavailable';

        return (
          <Card
              key={r.id || index}
              className="card ai-card"
              sx={{
                cursor: "pointer",
                width: 300,        
                height: 320,       
                margin: 1,
              }}
          >
            <CardMedia
              component="img"
              className="card-image"
              height="180"
              image={imageUrl}
              alt={r.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://via.placeholder.com/400x300.png?text=Image+Unavailable';
              }}
            />

            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 700 }}
                >
                  {r.name}
                </Typography>

                {r.rating && (
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, fontSize: '1rem', color: '#f59e0b' }}
                  >
                    ⭐ {r.rating} / 5
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <Button
                  variant="contained"
                  onClick={() => onSelect(r)}
                  sx={{
                    backgroundColor: '#f97316',
                    color: '#fff',
                    fontWeight: 700,
                    borderRadius: '8px',
                    textTransform: 'uppercase',
                    px: 2,
                    py: 0.8,
                    fontSize: '0.85rem',
                    '&:hover': {
                      backgroundColor: '#ea580c',
                    },
                  }}
                >
                  VIEW DETAILS
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
