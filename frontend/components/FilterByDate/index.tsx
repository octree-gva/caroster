import {useState} from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Icon,
  List,
  Menu,
  MenuItem,
} from '@mui/material';
import theme from '../../theme';
import {type Moment} from 'moment';

interface FilterByDateProps {
  dates: Moment[];
  setSelectedDates: React.Dispatch<React.SetStateAction<Moment[]>>;
  buttonFilterContent: string | string[];
}

const FilterByDate = ({
  dates,
  setSelectedDates,
  buttonFilterContent,
}: FilterByDateProps) => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(dates.length).fill(false)
  );
  const menuOpen = Boolean(anchorElement);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElement(event.currentTarget);

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !checkedItems[index];
    setCheckedItems(newCheckedItems);
    const selectedDate = dates[index];
    setSelectedDates(prevSelectedDates => {
      if (checkedItems[index])
        return prevSelectedDates.filter(date => !date.isSame(selectedDate));
      else return [...prevSelectedDates, selectedDate];
    });
  };

  return (
    <Box
      sx={{
        outline: 'none',
        '& > *': {
          cursor: 'default',
        },
        position: 'absolute',
        top: 60,
        zIndex: 666,
        [theme.breakpoints.down('sm')]: {
          left: 15,
        },
        [theme.breakpoints.up('sm')]: {
          left: 25,
        },
      }}
    >
      <List sx={{bgcolor: 'background.paper', borderRadius: 1, p: 0}}>
        <Button
          onClick={handleClickListItem}
          endIcon={<Icon>calendar_today_outlined</Icon>}
        >
          {buttonFilterContent}
        </Button>
      </List>
      <Menu
        anchorEl={anchorElement}
        open={menuOpen}
        onClose={() => setAnchorElement(null)}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {Array.isArray(dates) &&
          dates.map((date, index) => (
            <MenuItem key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                }
                label={date.format('dddd Do MMMM')}
              />
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

export default FilterByDate;
