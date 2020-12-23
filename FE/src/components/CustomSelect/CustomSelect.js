import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

import styles from "../../assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

const useStyles = makeStyles(styles);


export default function CustomSelect(props) {

    const classes = useStyles();

    const { name, label, value,error=null, onChange, options, helperText, disabled } = props;

    return (
        <FormControl fullWidth className={classes.selectFormControl}
        {...(error && {error:true})}>
            <InputLabel className={classes.selectLabel}>{label}</InputLabel>
            <MuiSelect
                 MenuProps={{
                    className: classes.selectMenu
                  }}
                classes={{
                    select: classes.select
                  }}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}