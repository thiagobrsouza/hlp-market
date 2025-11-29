'use client';

import { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import TextField from '@mui/material/TextField';

interface CustomProps {
  onChange: (event: {
    target: {
      name: string;
      value: string;
    };
  }) => void;
  name: string;
}

const NumericFormatAdapter = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatAdapter(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value, // Pass the unformatted value
            },
          });
        }}
        thousandSeparator='.'
        decimalSeparator=','
        prefix='R$ '
        decimalScale={2}
        fixedDecimalScale
      />
    );
  },
);

// A wrapper for TextField that can be used with react-hook-form Controller
const CurrencyInput = (props: any) => {
    return (
        <TextField
            {...props}
            InputProps={{
                inputComponent: NumericFormatAdapter as any,
            }}
        />
    );
};

export default CurrencyInput;