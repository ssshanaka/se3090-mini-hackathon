export default function Logo({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Rounded Square */}
      <rect x="0" y="0" width="100" height="100" rx="22" fill="#12766e" />
      
      {/* Outer Leaf/Shield Outline */}
      <path 
        d="M 50 14 C 20 30 15 70 50 90 C 85 70 80 30 50 14 Z" 
        stroke="#ccfbf1" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Inner Water Drop */}
      <path 
        d="M 50 38 C 50 38 34 55 34 68 A 16 16 0 0 0 66 68 C 66 55 50 38 50 38 Z" 
        fill="#ccfbf1" 
      />
      
      {/* Inner Medical Cross */}
      <path 
        d="M 47 54 H 43 V 60 H 47 V 66 H 53 V 60 H 57 V 54 H 53 V 48 H 47 Z" 
        fill="#12766e" 
      />
    </svg>
  );
}
