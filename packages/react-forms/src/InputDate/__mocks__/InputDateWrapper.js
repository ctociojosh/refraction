/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React, { useState, useCallback, Fragment } from 'react';
import InputDate from '../index';

type InputDateWrapperProps = {
  defaultValue: string,
  defaultCalendarValue?: Date,
  onChange?: string => void,
  onCalendarChange?: Date => void,
};

const InputDateWrapper = ({
  onChange,
  defaultValue,
  onCalendarChange,
  defaultCalendarValue,
  ...props
}: InputDateWrapperProps) => {
  const [value, setValue] = useState(defaultValue);
  const [calendarValue, setCalendarValue] = useState(
    onCalendarChange ? defaultCalendarValue : new Date()
  );

  const onChangeHandler = useCallback(
    value => {
      onChange && onChange(value);
      setValue(value);
    },
    [setValue, onChange]
  );

  const handleCalendarChange = useCallback(
    value => {
      onCalendarChange && onCalendarChange(value);
      setCalendarValue(value);
    },
    [setCalendarValue, onCalendarChange]
  );

  return (
    <Fragment>
      <InputDate
        value={value}
        onChange={onChangeHandler}
        onCalendarChange={onCalendarChange ? handleCalendarChange : undefined}
        calendarValue={onCalendarChange ? calendarValue : undefined}
        {...props}
      />
      <button
        data-action="reset"
        onClick={() =>
          onChangeHandler(new Date(defaultValue).toISOString().split('T')[0])
        }
      >
        Reset
      </button>

      <button
        data-action="reset-position"
        onClick={() => handleCalendarChange(new Date(value))}
      >
        Reset calendar position
      </button>
    </Fragment>
  );
};

export default InputDateWrapper;