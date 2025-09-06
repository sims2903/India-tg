import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Chip,
  Rating,
  Skeleton
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/reviews');
        const data = await response.json();
        console.log(data);
        setReviews(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
        {[1, 2, 3].map((i) => (
          <Card key={i} sx={{ mb: 3, p: 2 }}>
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" height={100} />
          </Card>
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 3, textAlign: 'center', color: 'red' }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
  {reviews.map((review) => (
    <Card
      key={review._id}
      elevation={2}
      sx={{
        mb: 3,
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardHeader
        avatar={
          <Avatar src={review.userId?.avatar} sx={{ width: 40, height: 40 }}>
            {review.userId?.name?.charAt(0)}
          </Avatar>
        }
        action={
          <Box>
            <IconButton size="small">
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <ShareIcon fontSize="small" />
            </IconButton>
          </Box>
        }
        title={
          <Typography variant="subtitle1" fontWeight={600}>
            {review.placeId || 'Anonymous'}
          </Typography>
        }
        subheader={
          <Box display="flex" alignItems="center" gap={0.5}>
            <CalendarTodayIcon sx={{ fontSize: 14, color: 'gray' }} />
            <Typography variant="caption" color="text.secondary">
              {formatDate(review.createdAt)}
            </Typography>
          </Box>
        }
        sx={{ pb: 1 }}
      />

      {/* Gradient Place Bar */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
          color: '#fff',
          px: 2,
          py: 1.5
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <LocationOnIcon sx={{ fontSize: 18 }} />
          {review.placeName}
        </Typography>
        <Typography variant="caption">Location Review</Typography>
      </Box>

      <CardContent sx={{ py: 1.5 }}>
        {/* Rating */}
        <Box display="flex" alignItems="center" mb={1}>
          <Rating value={review.rating} readOnly size="small" />
          <Typography variant="caption" color="text.secondary" ml={1}>
            ({review.rating}/5)
          </Typography>
        </Box>

        {/* Review Text */}
        <Typography
          variant="body2"
          color="text.primary"
          sx={{
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {review.reviewText}
        </Typography>

        {/* Tags */}
        <Box mb={1} display="flex" flexWrap="wrap" gap={0.5}>
          {review.tags?.slice(0, 4).map((tag, index) => (
            <Chip
              key={index}
              label={`#${tag}`}
              size="small"
              color="secondary"
              variant="outlined"
            />
          ))}
        </Box>

        {/* Image */}
        {review.image && (
          <Box
            component="img"
            src={review.image}
            alt={`Review of ${review.placeName}`}
            sx={{
              width: '100%',
              height: 160,
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 1,
              mt: 1
            }}
          />
        )}
      </CardContent>
    </Card>
  ))}
</Box>
  );
};

export default ReviewComponent;
