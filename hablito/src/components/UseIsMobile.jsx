import { useMediaQuery } from '@mui/material';

const UseIsMobile = () => {
  return useMediaQuery('(max-width: 500px)'); // Adjust the breakpoint as needed
};

export default UseIsMobile;