import { Switch } from '@mui/material';

export default function CustomSwitch({ checked, setChecked, color }) {
    return (
        <Switch
            checked={checked}
            onChange={setChecked}
            color={color}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}
