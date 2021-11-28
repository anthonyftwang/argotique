import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import './Loading.css';

const CardSkeleton = (props) => {
  return (
    <Skeleton
      variant="rectangle"

      height={props.height}
      width={props.width}
      sx={{
        borderRadius: "4px",
        animation: "animation-c7515d 1s ease-in-out 0.5s infinite",
      }}
    />
  );
}

export const Loading = (props) => (
  <div className="loadingSkeleton">
    {props.isPreview ? (
      <Stack className="listSkeleton" spacing={2}>
        <CardSkeleton height={160} />
        <CardSkeleton height={160} />
        <CardSkeleton height={160} />
      </Stack>
    ) : (
      <Stack className="detailsSkeleton" spacing={2} alignItems="flex-end">
        <CardSkeleton height={250} width="100%" />
        <CardSkeleton height={45} width="95%" />
        <CardSkeleton height={90} width="95%" />
        <CardSkeleton height={90} width="95%" />
      </Stack>
    )}
  </div>
)