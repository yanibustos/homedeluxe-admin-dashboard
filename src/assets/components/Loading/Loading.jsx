import React from "react";

function Loading() {
  return (
    <div class="d-flex justify-content-center vh-100">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
