// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import { Card } from '@mui/material';

// export default function Basictabs() {
//   const [value, setValue] = React.useState('one');

//   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//     setValue(newValue);
//   };

//   return (
//     <Card>

   
//     <Box sx={{ width: '100%' }}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         textColor="secondary"
//         indicatorColor="secondary"
//         aria-label="secondary tabs example"
//       >
//         <Tab value="one" label="Item One" />
//         <Tab value="two" label="Item Two" />
//         <Tab value="three" label="Item Three" />
//       </Tabs>
//     </Box>
//     </Card>
//   );
// }
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, CardContent } from '@mui/material';
import AdminDetails from './Dashboard/Adminprofile/Adminprofile';

export default function Basictabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card sx={{minHeight:84+"vh"}}>
        <CardContent>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Profile" value="1" />
            <Tab label="Password Change" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><AdminDetails /></TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        
      </TabContext>
    </Box>
    </CardContent>
    </Card>
  );
}

