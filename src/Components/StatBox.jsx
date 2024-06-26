import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
       <Box width="100%" m="0 30px">
       <Box display="flex" justifyContent="space-between">
         <Box>
           {icon}
           <Typography
             variant="h4"
             fontWeight="bold"
             sx={{ color: colors.grey[100],mt:1, mx:0.5 }}
           >
             {title}
           </Typography>
         </Box>
         <Box>
           <ProgressCircle progress={progress} />
         </Box>
       </Box>
       
       <Box display="flex" justifyContent="space-between" mt="10px">
         <Typography variant="h5" sx={{ color: colors.greenAccent[300] }}>
           {subtitle}
         </Typography>
         <Typography
           variant="h5"
           fontStyle="italic"
           sx={{ mx:"15px", color: colors.greenAccent[300] }}
         >
           {increase}
         </Typography>
       </Box>
     </Box>
  );
};

export default StatBox;
