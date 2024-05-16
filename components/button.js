export const button = (value, number, color) => {
  return ` <button type="button" class="btn ${color} position-relative mx-1">
    ${value}
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      ${number}
  
    </span>
  </button>`;
};
