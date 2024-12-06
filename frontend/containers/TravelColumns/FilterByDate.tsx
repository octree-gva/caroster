import {useState} from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Icon,
  Menu,
  MenuItem,
} from '@mui/material';
import {type Moment} from 'moment';
import useTravelsStore from '../../stores/travelsStore';

interface FilterByDateProps {
  dates: Moment[];
  buttonFilterContent: string | string[];
}

const FilterByDate = ({dates, buttonFilterContent}: FilterByDateProps) => {
  const datesFilters = useTravelsStore(s => s.datesFilter);
  const setDatesFilter = useTravelsStore(s => s.setDatesFilter);
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
    const newDatesFilters = checkedItems[index]
      ? datesFilters.filter(date => !date.isSame(selectedDate))
      : [...datesFilters, selectedDate];
    setDatesFilter(newDatesFilters);
  };

  return (
    <>
      <Button
        sx={{bgcolor: 'background.paper', width: {xs: 1, sm: 'auto'}}}
        variant="contained"
        color="inherit"
        onClick={handleClickListItem}
        endIcon={<Icon>calendar_today_outlined</Icon>}
      >
        {buttonFilterContent}
      </Button>
      <Menu
        anchorEl={anchorElement}
        open={menuOpen}
        onClose={() => setAnchorElement(null)}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {dates
          ?.filter(date => date.isValid())
          .map((date, index) => (
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
    </>
  );
};

export default FilterByDate;
