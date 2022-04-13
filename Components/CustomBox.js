import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}



export default function VerticalTabs({ numbers, sms }) {
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [dataNumbers, setDataNumbers] = React.useState(numbers);
  const [dataSms, setDataSms] = React.useState(sms.values);

  // console.log(dataSms);

  return (
    <Box
      className='vertical-tabss'
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 400 }}
    >
      <div className='numTab'>
        <h1 className='title'>Choose a number</h1>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >

          {
            Array.isArray(dataNumbers) && dataNumbers?.map((item, index) => {
              return (
                <Tab key={index} label={item.number} {...a11yProps(index)} />
              )
            })
          }
          {dataNumbers.status === "error" && <p className='notFound'>{"Numbers not found"}</p>}

        </Tabs>
      </div>

      <div className='msgWraper'>
        <h1 className='title titletw'>Messages</h1>
        {
          Array.isArray(dataSms) && dataSms?.map((item, index) => {
            return (
              <TabPanel key={index} value={value} index={index}>
                <p className='msg'>{item.text}</p>
              </TabPanel>
            )
          })
        }
        {dataNumbers.status === "error" && <p className='notFoundSms'>{"Messages have not yet arrived. Send SMS to the number and it will immediately be shown here"}</p>}


      </div>

    </Box>
  );
}

