export default function AddressLink({ children, className = null }) {
  if (!className) {
    className = "my-3 block ";
  }
<<<<<<< HEAD:client/src/pages/AddressLink.jsx
  className += "felx gap-1 font-semibold underline w-56";
=======
  className += " flex gap-1 font-semibold underline ";
>>>>>>> 6bbfc94a7ba794ec7c0cdf94c4c7ae54f3201d9d:client/src/AddressLink.jsx
  return (
    <a
      className={className}
      target="_blank"
      href={"https://maps.google.com/?q=+" + children}
    >
<<<<<<< HEAD:client/src/pages/AddressLink.jsx
      <div className="flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          data-slot="icon"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        {children}
      </div>
=======
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>

      {children}
>>>>>>> 6bbfc94a7ba794ec7c0cdf94c4c7ae54f3201d9d:client/src/AddressLink.jsx
    </a>
  );
}
