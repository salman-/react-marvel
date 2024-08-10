import React, { lazy, Suspense } from "react";

const Lazymarvels = lazy(() => import("./marvels"));

const marvels = (props) => (
  <Suspense fallback={null}>
    <Lazymarvels {...props} />
  </Suspense>
);

export default marvels;
