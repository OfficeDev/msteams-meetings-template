import React from 'react';
import { Stack, Text, FontWeights, PrimaryButton, Button, StackItem, TextField, DatePicker, IDatePickerStrings, DayOfWeek, Toggle, initializeIcons } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { msalApp } from './auth';
import { AuthResponse } from 'msal';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };
initializeIcons(); //TODO: move to root. 

interface MeetingPageProps {
  
}

const mapStateToProps = (state : AppState) => ({

}) as Partial<MeetingPageProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  
}) as Partial<MeetingPageProps>;

//TODO: see if only want work week
const DayPickerStrings: IDatePickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker'
};
const meetingIconClass = mergeStyles({
  fontSize: 35,
  height: 35,
  width: 35,
  margin: '0 7px',
  position: 'relative',
  top: 7
});

const inputIconClass = mergeStyles({
  position: 'relative',
  top: 7
});

function MeetingPageComponent(props: Partial<MeetingPageProps>) {
  
  return (
    <Stack
    verticalFill
    styles={{
      root: {
        width: '960px',
        color: '#605e5c'
      }
    }}
    gap={35}>
      <Stack horizontal tokens={{childrenGap: 15}}>
        <StackItem grow>
          <FontIcon iconName="Calendar" className={meetingIconClass} />
          <Text variant="xxLarge" styles={boldStyle}>
            New Meeting
          </Text>
        </StackItem>
        <StackItem align="end">
          <Stack horizontal tokens={{childrenGap: 10}}>
            <PrimaryButton primary text="Save" />
            <Button text="Close" />
          </Stack>
        </StackItem>
      </Stack>
      <Stack horizontal>
        <StackItem><FontIcon iconName="Edit" className={inputIconClass} /></StackItem>
        <StackItem grow>
          <TextField placeholder="Event Name" underlined />
        </StackItem>
      </Stack>

      <Stack horizontal tokens={{childrenGap: 15}}>
        <FontIcon iconName="Clock" className={inputIconClass} />
        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} strings={DayPickerStrings} ariaLabel="Select a date"/>
        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} strings={DayPickerStrings} ariaLabel="Select a date"/>
        <Toggle label="All day" inlineLabel />
      </Stack>
      <Text variant="medium">We will create an event which includes a Microsoft Teams meeting link on your course calendar.</Text>
  </Stack>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPageComponent);
