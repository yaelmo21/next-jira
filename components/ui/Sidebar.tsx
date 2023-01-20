import { useContext } from 'react';
import {
  Drawer,
  List,
  Typography,
  Box,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { UIContext } from '../../context/ui';
const menuItems = ['inbox', 'starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);
  return (
    <Drawer anchor='left' open={sidemenuOpen} onClose={closeSideMenu}>
      <Box sx={{ with: 250 }}>
        <Box
          sx={{
            padding: '5px 10px',
          }}
        >
          <Typography variant='h4'>Menú</Typography>
        </Box>
        <List>
          {menuItems.map((text, index) => (
            <ListItemButton key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxOutlinedIcon />
                ) : (
                  <EmailOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
