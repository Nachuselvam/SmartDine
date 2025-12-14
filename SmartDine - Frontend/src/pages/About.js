// src/pages/About.jsx
import React from "react";
import { Box, Typography, Card, Button } from "@mui/material";
import Footer from "../components/Footer";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function About() {
  const navigate = useNavigate(); // React Router hook

  const features = [
    {
      title: "Understanding Cravings",
      desc: "We don’t just search — we listen. Your words guide us to discover exactly what you desire.",
      icon: <LocalDiningIcon sx={{ fontSize: 50, color: "#f59e0b", mb: 2 }} />,
    },
    {
      title: "Intelligent Suggestions",
      desc: "Our AI blends experience, reviews, and ambience to suggest restaurants that truly resonate with you.",
      icon: <AutoAwesomeIcon sx={{ fontSize: 50, color: "#1a73e8", mb: 2 }} />,
    },
    {
      title: "Moments Over Meals",
      desc: "Every choice is curated to create memories, not just meals — because dining should delight all senses.",
      icon: <FavoriteIcon sx={{ fontSize: 50, color: "#22c55e", mb: 2 }} />,
    },
  ];

  return (
    <Box
      className="about-root"
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https:/50.jpeg?cs=srgb&dl=appetizer-brunch-close-up-1095550.jpg&fm=jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        color: "#fff",
      }}
    >
      <main style={{ position: "relative", zIndex: 1, paddingTop: "72px" }}>
        {/* ===== HERO SECTION ===== */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            py: 16,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              mb: 3,
              textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            }}
          >
            Smart Dining, Smarter Choices
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 4,
              lineHeight: 1.8,
              textShadow: "1px 1px 6px rgba(0,0,0,0.7)",
            }}
          >
            SmartDine helps you discover dining experiences that delight your taste and soul.<br />
            Our AI understands your cravings and guides you to restaurants that feel just right.
          </Typography>

          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg,#ff6b6b,#f59e0b)",
              color: "#111",
              fontWeight: 700,
              px: 5,
              py: 1.5,
            }}
            onClick={() => navigate("/login")} // Navigate to login
          >
            Explore Restaurants
          </Button>
        </Box>

        {/* ===== FEATURES / HOW WE THINK ===== */}
        <Box sx={{ maxWidth: 1200, mx: "auto", mb: 12, px: 2 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              mb: 6,
              textAlign: "center",
              color: "#f59e0b",
              textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            How We Think About Dining
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              justifyContent: "center",
            }}
          >
            {features.map((f, i) => (
              <Card
                key={i}
                sx={{
                  flex: "1 1 300px",
                  minHeight: 300,
                  borderRadius: 6,
                  p: 4,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.95)",
                  color: "#0b1220",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  },
                }}
              >
                {f.icon}
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  {f.title}
                </Typography>
                <Typography sx={{ lineHeight: 1.6 }}>{f.desc}</Typography>
              </Card>
            ))}
          </Box>
        </Box>

        {/* ===== PHILOSOPHY SECTION ===== */}
        <Box
          sx={{
            maxWidth: 1000,
            mx: "auto",
            textAlign: "center",
            py: 12,
            px: 4,
            borderRadius: 4,
            background: "rgba(255,250,242,0.95)",
            color: "#0b1220",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
            Our Philosophy
          </Typography>
          <Typography sx={{ mb: 4, lineHeight: 1.8, fontSize: "1.1rem" }}>
            Smart dining is about more than food — it’s about understanding your taste, valuing your time, and enriching your moments.
            We combine technology with empathy to guide every bite you take.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              background: "linear-gradient(90deg,#ff6b6b,#f59e0b)",
              color: "#111",
              fontWeight: 700,
              px: 5,
              py: 1.5,
            }}
            onClick={() => navigate("/login")} // Navigate to login
          >
            Discover SmartDine
          </Button>
        </Box>
      </main>

      <Footer />
    </Box>
  );
}
