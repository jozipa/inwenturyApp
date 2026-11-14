import { useState } from "react";
import { Input, ButtonGroup, IconButton } from "@mui/joy";
import { useSnackbar } from "../context/snackBarContext";
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

export default function NumberInput({ defaultValue = 0, minVal = 0, maxVal = 50, valueChangeFun }) {
    const [value, setValue] = useState(defaultValue);
    const { showSnackbar } = useSnackbar();

    function updateValue(newVal) {
        setValue(newVal);
        if (valueChangeFun) {
            valueChangeFun(newVal);
        }
    }

    function handleKeyDown(key) {
        if (key === "Backspace") {
            updateValue(Math.floor(value / 10));
            return;
        }
        
        const valueToAdd = parseInt(key, 10);
        if (!Number.isNaN(valueToAdd)) {
            addValue(valueToAdd);
        }
    }

    function addValue(val) {
        let newValue = value * 10 + val;
        if (newValue > maxVal) {
            newValue = maxVal;
            showSnackbar(`Maksymalna wartość to ${maxVal}!`, "warning");
        }
        updateValue(newValue);
    }

    return (
        <ButtonGroup>
            <IconButton
                size="xs"
                sx={{ p: 0.8 }}
                variant="soft"
                onClick={() => updateValue(Math.max(minVal, value - 1))}
            >
                <Remove fontSize="sm" />
            </IconButton>
            
            <Input 
                onKeyDown={(e) => handleKeyDown(e.key)} 
                value={value} 
            />
            
            <IconButton
                size="xs"
                sx={{ p: 0.8 }}
                variant="soft"
                onClick={() => updateValue(Math.min(maxVal, value + 1))}
            >
                <Add fontSize="sm" />
            </IconButton>
        </ButtonGroup>
    );
}