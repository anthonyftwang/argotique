import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Stack } from '@mui/material';

/**
 * Helper component to create several similar silhouttes of various sizes.
 */

function CardSkeleton({ height, width }) {
  return (
    <Skeleton
      variant="rectangle"
      height={height}
      width={width}
      sx={{
        borderRadius: '4px',
        animation: 'animation-c7515d 1s ease-in-out 0.5s infinite',
      }}
    />
  );
}

CardSkeleton.propTypes = {
  /** CSS height of the silhouette. */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** CSS width of the silhouette. */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CardSkeleton.defaultProps = {
  height: '1.2em',
  width: '100%',
};

/**
 * Silhouette placeholder UI to display
 * while data is being fetched from the server.
 */

function Loading({ isPreview }) {
  return (
    <div className="loadingSkeleton">
      {isPreview ? (
        <Stack
          className="listSkeleton"
          spacing={2}
          role="status"
          aria-label="post list loading"
        >
          <CardSkeleton height={160} width="100%" />
          <CardSkeleton height={160} width="100%" />
          <CardSkeleton height={160} width="100%" />
        </Stack>
      ) : (
        <Stack
          className="detailsSkeleton"
          spacing={2}
          alignItems="flex-end"
          role="status"
          aria-label="post page loading"
        >
          <CardSkeleton height={250} width="100%" />
          <CardSkeleton height={45} width="95%" />
          <CardSkeleton height={90} width="95%" />
          <CardSkeleton height={90} width="95%" />
        </Stack>
      )}
    </div>
  );
}

Loading.propTypes = {
  /** Dummy UI mirrors post list if true,
   * else post page with comments. */
  isPreview: PropTypes.bool,
};

Loading.defaultProps = {
  isPreview: false,
};

export default Loading;
