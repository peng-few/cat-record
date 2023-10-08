import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FieldFood } from './_firebase';
import React from 'react';

export interface FoodTableDetailProps{
  food: FieldFood
}
export const FoodTableDetail = ({food}:FoodTableDetailProps) => {
  return (
    <Box sx={{ m: 1,marginLeft: '72px' }}>
      <Typography variant="h6" gutterBottom component="div">
        {food.name}
      </Typography>
    </Box>
  )
}

export default FoodTableDetail;