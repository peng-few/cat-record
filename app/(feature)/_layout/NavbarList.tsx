import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { SxProps, Theme } from '@mui/material/styles'
import NavbarItemLink from './NavbarItemLink';
import List, { ListProps } from '@mui/material/List';

export interface NavbarItemProps {
  name: string;
  path?: string;
  Icon?: React.ElementType;
  sub?: NavbarItemProps[];
} 

export interface NavbarListProps extends ListProps {
  list: NavbarItemProps[]
}

const listStyle: SxProps<Theme> = {
  py: 0,
  px: 0,
  '.MuiListItem-root': {
    alignItems: 'stretch',
    flexDirection: 'column',
    py: 0.2
  },
  '.MuiListItemIcon-root': {
    minWidth: 'auto',
    color: '#b8b4ae',
    py: 0.2,
  },
}


export const NavbarList = ({list,sx,...props}: NavbarListProps) => {
  return (
    <List sx={{...listStyle,...sx}} {...props}>
    {list.map((item) => (
      <ListItem key={item.path}>
        <NavbarItemLink href={item.path}
          sub={ item.sub && <NavbarList list={item.sub} /> }>
          <ListItemIcon>
            {item.Icon && <item.Icon />}
          </ListItemIcon>
          <ListItemText
            primary={item.name}
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: 'bold',
              py: 0.2,
            }}
            className="drawer-text ml-3" />
        </NavbarItemLink>
      </ListItem>
    ))}
    </List>
  )
}

export default NavbarList;