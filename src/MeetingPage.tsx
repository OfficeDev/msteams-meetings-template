import React from 'react';
import { 
  Stack, Text, FontWeights, PrimaryButton, DefaultButton, StackItem, TextField, DatePicker, 
  IDatePickerStrings, DayOfWeek, Toggle, initializeIcons, ComboBox, IComboBoxOption, IComboBox } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import * as _ from 'lodash';
import moment, { Moment } from 'moment'

import { OnlineMeetingInput, OnlineMeeting } from './meeting-creator/models';
import { SET_MEETING_COMMAND, CREATE_MEETING_COMMAND } from './meeting-creator/actions';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };
initializeIcons(); //TODO: move to root. 

interface MeetingPageProps {
  meeting: OnlineMeetingInput,
  setMeeting: (meeting: OnlineMeetingInput) => void
  createMeeting: (meeting: OnlineMeetingInput) => void
}

const mapStateToProps = (state : AppState) => ({
  meeting: state.meeting?.inputMeeting
}) as Partial<MeetingPageProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMeeting: (meeting: OnlineMeetingInput) => {
    dispatch({
      type: SET_MEETING_COMMAND,
      meeting
    })
  },
  createMeeting: (meeting: OnlineMeetingInput) => {
    dispatch({
      type: CREATE_MEETING_COMMAND,
      meeting
    })
  }
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

interface DateTimePickerProps {
  dateTime?: Moment
  onTimeUpdated: (date?: Moment) => void
  dayBoundry: boolean
}

const timeSuggestions = _.range(0, 1440, 30)
  .map(minutes => ({
    key: minutes,
    text: moment().startOf('day').minutes(minutes).format("h:mm A")
  }));

function DateTimePicker(props: DateTimePickerProps) {
  function onDayPicked(date: Date | null | undefined) {
    const nextDateTime = date ?? props.dateTime?.clone()
    // get the delta of minutes from the start of the day
    const offset = moment.duration(moment(props.dateTime?.clone()).diff(moment(props.dateTime?.clone()).startOf('day')));
    const updatedNextDateTime = moment(nextDateTime).startOf('day').add(offset);
    props.onTimeUpdated(updatedNextDateTime);
  }

  function onTimePicked(event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined) {
    const offset = moment.duration(option?.key, 'minutes');
    
    const nextTime = moment(props.dateTime?.clone())?.startOf('day').add(offset);
    props.onTimeUpdated(nextTime)
  }

  const defaultMinuteKey = props.dateTime?.endOf('hour').diff(props.dateTime?.startOf('day'));
  // TODO: figure out why this keeps winding up as zero. 
  return (
    <Stack horizontal>
      <DatePicker firstDayOfWeek={DayOfWeek.Sunday} strings={DayPickerStrings} ariaLabel="Select a date" value={props.dateTime?.toDate()} onSelectDate={onDayPicked}/>
      {props.dayBoundry ? null : <ComboBox allowFreeform={true} autoComplete="on" options={timeSuggestions} onChange={onTimePicked} defaultSelectedKey={defaultMinuteKey} />}
    </Stack>
  )
}

function MeetingPageComponent(props: Partial<MeetingPageProps>) {
  const setMeeting = props.setMeeting || ((meeting) => {});
  function onSubjectChanged(evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined)
  {
    if (!props.meeting) {
      console.warn("Meeting is undefined, ignoring input");
      return;
    }

    // The meeting objects are small, cloning is cheap enough
    // Normally would use immutable records or similar to avoid overhead.
    const nextMeeting = _.cloneDeep(props.meeting);
    nextMeeting.subject = newValue ?? '';
    setMeeting(nextMeeting);
  }

  function onStartDateSelected(date?: Moment)
  {
    if (!props.meeting) {
      console.warn("Meeting is undefined, ignoring input");
      return;
    }

    // The meeting objects are small, cloning is cheap enough
    // Normally would use immutable records or similar to avoid overhead.
    const nextMeeting = _.cloneDeep(props.meeting);
    nextMeeting.startDateTime = date ?? props.meeting.startDateTime?.clone();
    setMeeting(nextMeeting);
  }

  function onEndDateSelected(date?: Moment)
  {
    console.log('end date selected:', date);
    if (!props.meeting) {
      console.warn("Meeting is undefined, ignoring input");
      return;
    }

    // The meeting objects are small, cloning is cheap enough
    // Normally would use immutable records or similar to avoid overhead.
    const nextMeeting = _.cloneDeep(props.meeting);
    nextMeeting.endDateTime = date ?? props.meeting.endDateTime?.clone()
    console.log('next meeting', nextMeeting.endDateTime);
    setMeeting(nextMeeting);
  }

  function onAllDayToggle(nextValue: boolean)
  {
    if (!props.meeting) {
      console.warn("Meeting is undefined, ignoring input");
      return;
    }

    // The meeting objects are small, cloning is cheap enough
    // Normally would use immutable records or similar to avoid overhead.
    const nextMeeting = _.cloneDeep(props.meeting);
    nextMeeting.allDay = nextValue;
    nextMeeting.startDateTime = props.meeting.startDateTime?.clone()?.startOf('day');
    nextMeeting.endDateTime = props.meeting.endDateTime?.clone()?.endOf('day')
    setMeeting(nextMeeting);
  }

  function createMeeing(meeting?: OnlineMeetingInput)
  {
    if (!meeting) {
      console.warn("Meeting is undefined, ignoring input");
      return;
    }
    const createMeeting = props.createMeeting || (() => {})
    createMeeting(meeting);
  }

  return (
    <Stack
    verticalFill
    styles={{
      root: {
        width: '960px',
        color: '#605e5c'
      }
    }}
    tokens={{
      childrenGap: 35
    }}>
      <Stack horizontal tokens={{childrenGap: 15}}>
        <StackItem grow>
          <FontIcon iconName="Calendar" className={meetingIconClass} />
          <Text variant="xxLarge" styles={boldStyle}>
            New Meeting
          </Text>
        </StackItem>
        <StackItem align="end">
          <Stack horizontal tokens={{childrenGap: 10}}>
            <PrimaryButton primary text="Save" onClick={() => createMeeing(props.meeting)} />
            <DefaultButton text="Close" />
          </Stack>
        </StackItem>
      </Stack>
      <Stack horizontal>
        <StackItem><FontIcon iconName="Edit" className={inputIconClass} /></StackItem>
        <StackItem grow>
          <TextField placeholder="Event Name" value={props?.meeting?.subject} underlined onChange={onSubjectChanged}/>
        </StackItem>
      </Stack>

      <Stack horizontal tokens={{childrenGap: 15}}>
        <FontIcon iconName="Clock" className={inputIconClass} />
        <DateTimePicker dayBoundry={props?.meeting?.allDay ?? false} dateTime={props?.meeting?.startDateTime?.clone()} onTimeUpdated={onStartDateSelected} />
        <DateTimePicker dayBoundry={props?.meeting?.allDay ?? false} dateTime={props?.meeting?.endDateTime?.clone()} onTimeUpdated={onEndDateSelected} />
        <Toggle label="All day" inlineLabel onChanged={onAllDayToggle}/>
      </Stack>
      <Text variant="medium">We will create an event which includes a Microsoft Teams meeting link on your course calendar.</Text>
  </Stack>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPageComponent);
