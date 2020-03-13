import React from 'react';
import { 
  Stack, Text, FontWeights, PrimaryButton, DefaultButton, StackItem, TextField, DatePicker, 
  IDatePickerStrings, DayOfWeek, initializeIcons, ComboBox, IComboBoxOption, IComboBox, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import * as _ from 'lodash';
import moment, { Moment } from 'moment'
import { OnlineMeetingInput } from './meeting-creator/models';
import { SET_MEETING_COMMAND, CREATE_MEETING_COMMAND, CreateMeetingCommand } from './meeting-creator/actions';
import { goBack } from 'connected-react-router';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };
initializeIcons(); //TODO: move to root. 

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
const timePickerFormat = "h:mm A";

const meetingIconClass = mergeStyles({
  fontSize: 16,
  height: 16,
  width: 16,
  margin: '0 7px',
  position: 'relative',
  top: 1,
  backgroundColor: '#6264a7',
  padding: '10px',
  color: '#fff',
  borderRadius: '3px'
});

const inputIconClass = mergeStyles({
  position: 'relative',
  top: 7,
});

//
// Date and time picker component
//

interface DateTimePickerProps {
  dateTime?: Moment,
  minDate?: Moment,
  onTimeUpdated: (date?: Moment) => void,
}

function DateTimePicker(props: DateTimePickerProps) {

  function onDayPicked(date: Date | null | undefined) {
    const currentDateTime = moment(props.dateTime);

    const offsetFromStartOfDay = currentDateTime.diff(moment(currentDateTime).startOf('day'));
    const newDateTime = moment(date ?? currentDateTime).startOf('day').add(offsetFromStartOfDay);

    props.onTimeUpdated(newDateTime);
  }

  function onTimePicked(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) {
    const currentDateTimeStartOfDay = moment(props.dateTime).startOf('day');

    let newDateTime: moment.Moment;
    if (option) {
      const offsetFromStartOfDay = moment.duration(option.key, 'minutes') ;
      newDateTime = currentDateTimeStartOfDay.add(offsetFromStartOfDay);
    } else {
      // User entered a free-form string, try to parse it as a time
      const enteredTime = moment(value, timePickerFormat);
      if (enteredTime.isValid()) {
        const offsetFromStartOfDay = enteredTime.diff(moment(enteredTime).startOf('day')) ;
        newDateTime = currentDateTimeStartOfDay.add(offsetFromStartOfDay);
      } else {
        newDateTime = moment(props.dateTime);
      }
    }

    props.onTimeUpdated(newDateTime);
  }

  const timeSuggestions = _.range(0, 1440, 30)
    .map(minutes => ({
      key: minutes,
      text: moment().startOf('day').minutes(minutes).format(timePickerFormat),
      disabled: moment(props.minDate).isAfter(moment(props.dateTime).startOf('day').add(moment.duration(minutes, 'minutes')))
    }));
  return (
    <Stack horizontal>
      <DatePicker firstDayOfWeek={DayOfWeek.Sunday} strings={DayPickerStrings} ariaLabel="Select a date" value={props.dateTime?.toDate()} onSelectDate={onDayPicked} minDate={props.minDate?.toDate()}/>
      <ComboBox allowFreeform={true} autoComplete="on" options={timeSuggestions} onChange={onTimePicked} text={props.dateTime?.format(timePickerFormat)} />
    </Stack>
  );
}


//
// Meeting page component
//

interface MeetingPageProps {
  meeting: OnlineMeetingInput,
  creationInProgress: boolean
  setMeeting: (meeting: OnlineMeetingInput) => void,
  createMeeting: (meeting: OnlineMeetingInput) => void,
  cancel: () => void,
}

const mapStateToProps = (state : AppState) => ({
  meeting: state.meeting.inputMeeting,
  creationInProgress: state.meeting.creationInProgress 
});

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
      fromPage: "meeting",
      meeting
    } as CreateMeetingCommand)
  },
  cancel: () => dispatch(goBack()),
});

function MeetingPageComponent(props: MeetingPageProps) {

  function onSubjectChanged(evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined)
  {
    // The meeting objects are small, cloning is cheap enough
    // Normally would use immutable records or similar to avoid overhead.
    const nextMeeting = _.cloneDeep(props.meeting);
    nextMeeting.subject = newValue ?? '';
    props.setMeeting(nextMeeting);
  }

  function onStartDateSelected(date?: Moment)
  {
    const nextMeeting = _.cloneDeep(props.meeting);
    nextMeeting.startDateTime = date ?? nextMeeting.startDateTime;

    // If start >= end, adjust to be the same delta as before from the start time
    if (nextMeeting.startDateTime.isSameOrAfter(nextMeeting.endDateTime)) {
      const existingDelta = moment(props.meeting.endDateTime).diff(moment(props.meeting.startDateTime));
      const newEndDateTime = moment(nextMeeting.startDateTime).add(existingDelta);
      if (nextMeeting.startDateTime.isSameOrAfter(newEndDateTime)) {
        newEndDateTime.add(existingDelta);
      }
      nextMeeting.endDateTime = newEndDateTime;
    }

    props.setMeeting(nextMeeting);
  }

  function onEndDateSelected(date?: Moment)
  {
    const nextMeeting = _.cloneDeep(props.meeting);
    const newEndDateTime = date ?? nextMeeting.endDateTime;

    // Allow the change only if it maintains start < end
    if (!nextMeeting.startDateTime.isAfter(newEndDateTime)) {
      nextMeeting.endDateTime = newEndDateTime;
    }

    props.setMeeting(nextMeeting);
  }

  if (props.creationInProgress) {
    return (
      <Stack className="container"
      verticalFill
      verticalAlign="center"
      tokens={{
        childrenGap: 35
      }}>
        <StackItem grow>
          <Spinner size={SpinnerSize.large} />
        </StackItem>
      </Stack> 
    )
  }

  return (
    <Stack
      className="container"
      verticalFill
      tokens={{
        childrenGap: 35
      }} >
      <Stack horizontal tokens={{childrenGap: 15}}>
        <StackItem grow>
          <FontIcon iconName="Calendar" className={meetingIconClass} />
          <Text variant="xLarge" styles={boldStyle}>
            New meeting link
          </Text>
        </StackItem>
        <StackItem align="end">
          <Stack horizontal tokens={{childrenGap: 10}}>
            <PrimaryButton className="teamsButton" primary text="Create" disabled = {props.creationInProgress} onClick={() => props.createMeeting(props.meeting)} />
            <DefaultButton className="teamsButtonInverted" text="Cancel" disabled = {props.creationInProgress} onClick={() => props.cancel()}/>
          </Stack>
        </StackItem>
      </Stack>
      <Stack horizontal>
        <StackItem className="newMeetingInputIcon"><FontIcon iconName="Edit" className={inputIconClass} /></StackItem>
        <StackItem grow>
          <TextField className="newMeetingInput" placeholder="Event Name" value={props.meeting?.subject} underlined onChange={onSubjectChanged}/>
        </StackItem>
      </Stack>

      <Stack horizontal tokens={{childrenGap: 15}}>
        <FontIcon iconName="Clock" className={inputIconClass} />
        <DateTimePicker dateTime={props.meeting.startDateTime} minDate={moment()} onTimeUpdated={onStartDateSelected} />
        <DateTimePicker dateTime={props.meeting.endDateTime} minDate={props.meeting.startDateTime} onTimeUpdated={onEndDateSelected} />
      </Stack>
      {/* Include the element below if your integration creates an event in the course calendar
        <Text variant="medium">We will create an event which includes a Microsoft Teams meeting link on your course calendar.</Text> */}
    </Stack>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPageComponent);
